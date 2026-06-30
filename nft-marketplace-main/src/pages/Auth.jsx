import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, setActivePage } from '../store/authSlice';
import { addUser } from '../store/nftSlice';
import { showToast } from '../store/uiSlice';
import { Mail, Lock, User, LogIn, UserPlus } from 'lucide-react';

export default function Auth() {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const users = useSelector(state => state.nft.users);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isLogin) {
      const user = users.find(u => u.email === formData.email && u.password === formData.password);
      if (user) {
        dispatch(login(user));
        dispatch(showToast({ message: `Hoş geldiniz, @${user.username}!`, type: 'success' }));
        dispatch(setActivePage('home'));
      } else {
        dispatch(showToast({ message: 'E-posta veya şifre hatalı.', type: 'error' }));
      }
    } else {
      const newUser = {
        id: `usr_${Date.now()}`,
        email: formData.email,
        password: formData.password,
        username: formData.username,
        role: 'user',
        walletAddress: `0xNEW${Math.floor(Math.random()*1000)}`,
        ethBalance: 0,
        usdBalance: 0
      };
      
      dispatch(addUser(newUser));
      dispatch(login(newUser));
      dispatch(showToast({ message: 'Kayıt başarılı! Hesabınıza giriş yapıldı.', type: 'success' }));
      dispatch(setActivePage('home'));
    }
  };

  return (
    <div className="w-full flex justify-center items-center py-12 animate-fade-in">
      <div className="w-full max-w-md panel-container flex flex-col items-center shadow-lg border border-border-platinum">
        
        {/* Tab Butonları */}
        <div className="flex w-full bg-pearl-canvas rounded-xl p-1 mb-8">
          <button 
            onClick={() => setIsLogin(true)}
            type="button"
            className={`flex-1 py-3 text-sm font-bold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer
              ${isLogin ? 'bg-surface-white text-charcoal-deep shadow-sm' : 'text-smoke-grey hover:text-charcoal-deep'}`}
          >
            <LogIn className="w-4 h-4" /> Giriş Yap
          </button>
          <button 
            onClick={() => setIsLogin(false)}
            type="button"
            className={`flex-1 py-3 text-sm font-bold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer
              ${!isLogin ? 'bg-surface-white text-charcoal-deep shadow-sm' : 'text-smoke-grey hover:text-charcoal-deep'}`}
          >
            <UserPlus className="w-4 h-4" /> Kayıt Ol
          </button>
        </div>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
          {!isLogin && (
            <div className="form-group">
              <label className="form-label">Kullanıcı Adı</label>
              <div className="relative">
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Kullanıcı adınızı girin" 
                  required={!isLogin}
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">E-posta Adresi</label>
            <div className="relative">
              <input 
                type="email" 
                className="form-input" 
                placeholder="ornek@mail.com" 
                required 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Şifre</label>
            <div className="relative">
              <input 
                type="password" 
                className="form-input" 
                placeholder="••••••••" 
                required 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          <button type="submit" className="btn-primary w-full mt-2 py-3.5 text-lg cursor-pointer">
            {isLogin ? 'Giriş Yap' : 'Hesap Oluştur'}
          </button>
        </form>
      </div>
    </div>
  );
}
