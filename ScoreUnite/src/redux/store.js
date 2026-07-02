import { configureStore } from '@reduxjs/toolkit';
import matchesReducer from './slices/matchesSlice';
import favoritesReducer from './slices/favoritesSlice';
import searchReducer from './slices/searchSlice';
import uiReducer from './slices/uiSlice';

const store = configureStore({
  reducer: {
    matches: matchesReducer,
    favorites: favoritesReducer,
    search: searchReducer,
    ui: uiReducer,
  },
});

export default store;
