import { createSlice } from '@reduxjs/toolkit';

// [Başlangıç Durumu]: İlçe bilgisi her sayfa yenilendiğinde sıfırlanması için null olarak başlatılır.
const initialState = {
  selectedDistrict: null,
};

// [Lokasyon Dilimi (addressSlice)]: Aktif teslimat ilçesini tutan durum yönetimi
const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    // Seçilen ilçeyi güncelleyen aksiyon
    setDistrict: (state, action) => {
      state.selectedDistrict = action.payload;
    },
  },
});

export const { setDistrict } = addressSlice.actions;
export default addressSlice.reducer;
