import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import nftReducer from './nftSlice';
import cartReducer from './cartSlice';
import uiReducer from './uiSlice';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('nexus_nft_state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Could not load state", err);
    return undefined;
  }
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    nft: nftReducer,
    cart: cartReducer,
    ui: uiReducer,
  },
  preloadedState: loadState(),
});
