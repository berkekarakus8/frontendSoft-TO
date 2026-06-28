import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  isAuthenticated: false,
  activePage: 'home', // 'home', 'explore', 'collections', 'nft-detail', 'cart', 'profile', 'login', etc.
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.currentUser = action.payload; // user object from mock db
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.currentUser = null;
      state.activePage = 'login';
    },
    setActivePage: (state, action) => {
      state.activePage = action.payload;
    },
    updateBalance: (state, action) => {
      if (state.currentUser) {
        state.currentUser.ethBalance += action.payload.eth;
        state.currentUser.usdBalance += action.payload.usd;
      }
    }
  },
});

export const { login, logout, setActivePage, updateBalance } = authSlice.actions;
export default authSlice.reducer;
