import { createSlice } from '@reduxjs/toolkit';

const getTodayString = () => {
  // Let's hardcode or dynamic load based on 2026-07-02 to keep matches aligned with mock data dates
  return "2026-07-02";
};

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    drawerOpen: false,
    activeTab: 'overview',
    selectedSport: 'football',
    selectedDate: getTodayString(),
    searchModalOpen: false,
  },
  reducers: {
    setDrawerOpen(state, action) {
      state.drawerOpen = action.payload;
    },
    setActiveTab(state, action) {
      state.activeTab = action.payload;
    },
    setSelectedSport(state, action) {
      state.selectedSport = action.payload;
    },
    setSelectedDate(state, action) {
      state.selectedDate = action.payload;
    },
    setSearchModalOpen(state, action) {
      state.searchModalOpen = action.payload;
    }
  }
});

export const { setDrawerOpen, setActiveTab, setSelectedSport, setSelectedDate, setSearchModalOpen } = uiSlice.actions;
export default uiSlice.reducer;
