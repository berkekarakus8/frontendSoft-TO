import { createSlice } from '@reduxjs/toolkit';

// [Oturum Sepet Verisi]: LocalStorage üzerinde kayıtlı sepet verisi varsa yükler, yoksa boş sepet şablonu oluşturur
const savedCart = localStorage.getItem('cart');
const parsedCart = savedCart ? JSON.parse(savedCart) : { items: [], restaurantId: null, restaurantName: null, totalAmount: 0 };

// Başlangıç durumu yerel depodan (LocalStorage) gelen veriyle yüklenir
const initialState = parsedCart;

// [Toplam Tutar Hesaplayıcı Yardımcı Fonksiyon]: Sepetteki tüm ürünlerin adet ve fiyatlarını çarparak genel toplamı bulur
const calculateTotal = (items) => {
  return items.reduce((total, item) => total + item.price * item.qty, 0);
};

// [Sepet Dilimi (cartSlice)]: Sepete ürün ekleme, miktar değiştirme ve temizleme işlemlerini yönetir
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // [Sepete Ekleme Aksiyonu]: Ürünü sepete ekler. Farklı restorandan ürün eklendiğinde eski sepeti temizler
    addToCart: (state, action) => {
      const { item, restaurantId, restaurantName } = action.payload;

      // Farklı bir restorandan ürün ekleniyorsa, önceki sepeti temizle
      if (state.restaurantId && state.restaurantId !== restaurantId) {
        state.items = [{ ...item, qty: 1 }];
        state.restaurantId = restaurantId;
        state.restaurantName = restaurantName;
      } else {
        if (!state.restaurantId) {
          state.restaurantId = restaurantId;
          state.restaurantName = restaurantName;
        }
        const existingItem = state.items.find((i) => i.id === item.id);
        if (existingItem) {
          existingItem.qty += 1;
        } else {
          state.items.push({ ...item, qty: 1 });
        }
      }
      state.totalAmount = calculateTotal(state.items);
      localStorage.setItem('cart', JSON.stringify(state));
    },
    // [Sepetten Çıkarma Aksiyonu]: Belirtilen ürünü ID değerine göre sepet listesinden siler
    removeFromCart: (state, action) => {
      const { id } = action.payload;
      state.items = state.items.filter((i) => i.id !== id);
      if (state.items.length === 0) {
        state.restaurantId = null;
        state.restaurantName = null;
      }
      state.totalAmount = calculateTotal(state.items);
      localStorage.setItem('cart', JSON.stringify(state));
    },
    // [Adet Artırma Aksiyonu]: Sepetteki belirli bir ürünün miktarını 1 birim artırır
    incrementQty: (state, action) => {
      const { id } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) {
        item.qty += 1;
      }
      state.totalAmount = calculateTotal(state.items);
      localStorage.setItem('cart', JSON.stringify(state));
    },
    // [Adet Azaltma Aksiyonu]: Sepetteki ürünün miktarını 1 azaltır. Miktar 0'a inerse ürünü sepetten tamamen siler
    decrementQty: (state, action) => {
      const { id } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) {
        if (item.qty > 1) {
          item.qty -= 1;
        } else {
          state.items = state.items.filter((i) => i.id !== id);
        }
      }
      if (state.items.length === 0) {
        state.restaurantId = null;
        state.restaurantName = null;
      }
      state.totalAmount = calculateTotal(state.items);
      localStorage.setItem('cart', JSON.stringify(state));
    },
    // [Sepeti Boşaltma Aksiyonu]: Tüm sepeti temizler, restoran kimliklerini ve tutarı sıfırlar
    clearCart: (state) => {
      state.items = [];
      state.restaurantId = null;
      state.restaurantName = null;
      state.totalAmount = 0;
      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});

export const { addToCart, removeFromCart, incrementQty, decrementQty, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
