import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  toast: {
    message: '',
    type: 'info', // 'success' | 'error' | 'info' | 'warning'
    isVisible: false,
    id: 0,
  },
  exploreCategory: 'Tümü'
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showToast: (state, action) => {
      state.toast = {
        message: action.payload.message,
        type: action.payload.type || 'info',
        isVisible: true,
        id: Date.now(),
      };
    },
    hideToast: (state) => {
      state.toast.isVisible = false;
    },
    setExploreCategory: (state, action) => {
      state.exploreCategory = action.payload;
    }
  }
});

export const { showToast, hideToast, setExploreCategory } = uiSlice.actions;
export default uiSlice.reducer;
