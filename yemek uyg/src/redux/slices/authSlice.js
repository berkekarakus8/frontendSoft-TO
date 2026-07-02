import { createSlice } from '@reduxjs/toolkit';

// [Oturum Takibi]: LocalStorage'da önceden saklanmış aktif bir kullanıcı olup olmadığı kontrol edilir
const savedUser = localStorage.getItem('user');
const parsedUser = savedUser ? JSON.parse(savedUser) : null;

// [Başlangıç Durumu]: Giriş yapmış kullanıcı bilgileri, oturum durumu ve yetki rolü belirlenir
const initialState = {
  user: parsedUser,
  isLoggedIn: !!parsedUser,
  role: parsedUser ? parsedUser.role : null,
};

// [Yetkilendirme Dilimi (authSlice)]: Kullanıcı giriş/çıkış ve yetki kontrol durumlarını yönetir
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // [Giriş Başarılı Aksiyonu]: Kullanıcı bilgilerini store'a yazar, oturumu açar ve LocalStorage'a kalıcı olarak kaydeder
    loginSuccess: (state, action) => {
      const user = action.payload;
      state.user = user;
      state.isLoggedIn = true;
      state.role = user.role;
      localStorage.setItem('user', JSON.stringify(user));
    },
    // [Çıkış Yapma Aksiyonu]: Oturum verilerini ve yetki rollerini temizler, LocalStorage kaydını siler
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.role = null;
      localStorage.removeItem('user');
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
