import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import favoritesReducer from './slices/favoritesSlice';
import addressReducer from './slices/addressSlice';

// [Redux Store Yapılandırması]: Uygulamanın tüm global durumlarını yöneten merkezi veri deposu
const store = configureStore({
  // Dilimlerin (slices) reducer fonksiyonlarını bir araya getiren ana eşleştirme tablosu
  reducer: {
    auth: authReducer,           // Kullanıcı kimlik doğrulama ve rol bilgileri
    cart: cartReducer,           // Sepetteki ürünler ve tutar hesaplamaları
    favorites: favoritesReducer, // Favoriye eklenen restoranlar listesi
    address: addressReducer,     // Seçilen aktif ilçe/lokasyon verisi
  },
});

export default store;
