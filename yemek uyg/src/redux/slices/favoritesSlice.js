import { createSlice } from '@reduxjs/toolkit';

// [Oturum Favorileri]: LocalStorage üzerindeki favori restoran verilerini yükler, yoksa boş bir dizi başlatır
const savedFavorites = localStorage.getItem('favorites');
const parsedFavorites = savedFavorites ? JSON.parse(savedFavorites) : [];

// [Başlangıç Durumu]: Favorilenen restoranlar dizisi
const initialState = {
  items: parsedFavorites, 
};

// [Favoriler Dilimi (favoritesSlice)]: Kullanıcının favori restoran listesini ekleme/çıkarma durumunu yönetir
const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    // [Favori Ekleme/Çıkarma Aksiyonu]: Restoran favorilerde varsa listeden siler, yoksa listeye ekler ve senkronize eder
    toggleFavorite: (state, action) => {
      const restaurant = action.payload;
      const isExist = state.items.some((item) => item.id === restaurant.id);
      if (isExist) {
        state.items = state.items.filter((item) => item.id !== restaurant.id);
      } else {
        state.items.push(restaurant);
      }
      localStorage.setItem('favorites', JSON.stringify(state.items));
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
