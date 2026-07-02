import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// [Ana Kullanıcı Düzeni (MainLayout)]: Tüm müşteri sayfalarını sarmalayan, Navbar ve Footer'ı sabit tutan ana şablon
const MainLayout = () => {
  return (
    // Esnek dikey kutu düzeni: Sayfanın tam ekran yüksekliğini doldurmasını sağlar
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Üst menü çubuğu ve logo alanı */}
      <Navbar />
      
      {/* Ana dinamik içerik alanı: Sayfalar bu kutu içine (Outlet) yüklenir */}
      <Box component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Outlet />
      </Box>
      
      {/* Alt bilgi bandı ve iletişim linkleri */}
      <Footer />
    </Box>
  );
};

export default MainLayout;
