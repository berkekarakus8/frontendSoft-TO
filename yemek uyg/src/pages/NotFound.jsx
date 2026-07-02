import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Container } from '@mui/material';
import { SentimentVeryDissatisfied as SadIcon } from '@mui/icons-material';

// [NotFound / 404 Sayfası]: Kullanıcı geçersiz veya mevcut olmayan bir adrese yönlendiğinde gösterilen 404 ekranı
const NotFound = () => {
  return (
    // Ana konteyner: Dikeyde ve yatayda ortalanmış bir düzen sunar
    <Container maxWidth="md" sx={{ mt: 10, mb: 10, textAlign: 'center' }}>
      {/* Esnek kutu düzeni: Tüm elemanları alt alta hizalar */}
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          gap: 3
        }}
      >
        {/* Üzgün yüz ikonu */}
        <SadIcon sx={{ fontSize: 100, color: 'primary.main' }} />
        
        {/* Hata numarası başlığı */}
        <Typography variant="h1" sx={{ fontSize: '6rem', fontWeight: 800, color: 'secondary.main', lineHeight: 1 }}>
          404
        </Typography>
        
        {/* Sayfa bulunamadı uyarı başlığı */}
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Sayfa Bulunamadı
        </Typography>
        
        {/* Açıklama metni */}
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 500 }}>
          Aradığınız sayfa silinmiş, ismi değiştirilmiş veya geçici olarak kullanım dışı olabilir.
        </Typography>
        
        {/* Ana sayfaya güvenli dönüş butonu */}
        <Button 
          component={Link} 
          to="/" 
          variant="contained" 
          color="primary" 
          size="large"
          sx={{ mt: 2 }}
        >
          Ana Sayfaya Dön
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
