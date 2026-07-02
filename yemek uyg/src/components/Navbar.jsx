import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Box,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  LocationOn as LocationIcon,
  Favorite as FavoriteIcon,
  ShoppingBasket as BasketIcon,
  Person as PersonIcon,
  ExitToApp as LogoutIcon,
  Storefront as StoreIcon,
} from '@mui/icons-material';
import { logout } from '../redux/slices/authSlice';
import { setDistrict } from '../redux/slices/addressSlice';
import { ISTANBUL_DISTRICTS } from '../constants/districts';

// --- STYLED COMPONENTS (Arayüz Stil Bileşenleri) ---

// Üstte akan duyuru kampanya bandı sarmalı
const CampaignBanner = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.primary.main,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  padding: '6px 0',
  fontSize: '0.85rem',
  fontWeight: 'bold',
  borderBottom: `1px solid ${theme.palette.primary.main}`,
}));

// Marquee (Akan metin) animasyon ve fareyle durdurulma stili
const ScrollingText = styled('div')({
  display: 'inline-block',
  paddingLeft: '100%',
  animation: 'marquee 20s linear infinite',
  cursor: 'pointer',
  '&:hover': {
    animationPlayState: 'paused', // Üzerine gelindiğinde akışı durdurur
  },
  '@keyframes marquee': {
    '0%': { transform: 'translate3d(0, 0, 0)' },
    '100%': { transform: 'translate3d(-100%, 0, 0)' },
  },
});

// Logo metninin hover scale animasyonu
const LogoText = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 800,
  fontSize: '1.8rem',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  letterSpacing: '-1px',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

// Logonun renkli vurgu kısmı
const LogoHighlight = styled('span')(({ theme }) => ({
  color: theme.palette.warning.main,
}));

// Başlık çubuğunun (Navbar) genel gölge ve yapışkanlık ayarları
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#ffffff',
  color: theme.palette.secondary.main,
  boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
  position: 'sticky',
  top: 0,
  zIndex: 1100,
}));

// İlçe seçmek için tıklanan butonun sınır ve geçiş efektleri
const DistrictButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  color: theme.palette.text.primary,
  textTransform: 'none',
  border: '1px solid #e2e8f0',
  borderRadius: 20,
  padding: '6px 16px',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: '#ffffff',
    borderColor: theme.palette.primary.main,
  },
}));

// İlçe pop-up'ı içerisindeki her bir ilçe buton seçeneği
const DistrictItem = styled(Button)(({ theme }) => ({
  width: '100%',
  justifyContent: 'flex-start',
  padding: theme.spacing(1.5),
  borderRadius: 8,
  border: '1px solid #f1f5f9',
  color: theme.palette.text.primary,
  '&:hover': {
    backgroundColor: '#fef2f2',
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.light,
  },
}));

// [Navbar / Üst Menü Çubuğu]: Uygulama genelinde sepet, favori, oturum ve ilçe yönetimini sağlayan ortak navbar
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Oturum, sepet, favori ve seçilen ilçe durumları Redux'tan dinlenir
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const favorites = useSelector((state) => state.favorites);
  const { selectedDistrict } = useSelector((state) => state.address);

  // İlçe seçme ve restoran listesi yükleniyor pop-up durum yönetimi
  const [addressOpen, setAddressOpen] = useState(false);
  const [loadingOpen, setLoadingOpen] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  // [Kampanyaları Yükleme Kancası]: Üst barda kayacak kampanyaları backend API'sinden çeker
  useEffect(() => {
    fetch('http://localhost:5000/campaigns')
      .then((res) => res.json())
      .then((data) => setCampaigns(data))
      .catch((err) => console.log('Campaigns load error', err));
  }, []);

  // [Logo Tıklama]: Ana sayfaya yönlendirir ve sayfayı sıfırdan tazelemek için yeniler
  const handleLogoClick = () => {
    navigate('/');
    window.location.reload();
  };

  // [İlçe Seçim Eylemi]: Seçim ekranını kapatıp yükleniyor animasyonunu açar, 3 saniye sonra ilçeyi set eder
  const handleDistrictSelect = (district) => {
    setAddressOpen(false);
    setLoadingOpen(true);

    setTimeout(() => {
      setLoadingOpen(false);
      dispatch(setDistrict(district));
    }, 3000);
  };

  // [Oturum Kapatma İşlemi]: Auth durumunu sıfırlar ve ana sayfaya yönlendirir
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  // Sepetteki toplam ürün adedi ve favori sayısı hesaplamaları
  const cartItemsCount = cart.items ? cart.items.reduce((acc, item) => acc + item.qty, 0) : 0;
  const favoritesCount = favorites.items ? favorites.items.length : 0;

  // Kampanyaları aralarında çizgi olacak şekilde tek bir kayar metin haline getirir
  const campaignString = campaigns.length > 0 
    ? campaigns.map(c => `🎉 ${c.title} - ${c.text}`).join('   |   ')
    : '🎉 Hoş Geldiniz! Harika restoranlar ve flaş indirimler sizi bekliyor. Siparişinizi hemen oluşturun!';

  return (
    <>
      {/* 1. Akan Kampanya Bandı (Üzerine gelince durur) */}
      <CampaignBanner>
        <ScrollingText>
          {campaignString}
        </ScrollingText>
      </CampaignBanner>

      {/* 2. Ana Navbar Gövdesi */}
      <StyledAppBar position="sticky">
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          
          {/* Sol Kısım: Logo ve Adres Seçim Butonu */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LogoText onClick={handleLogoClick}>
              Deli<LogoHighlight>vora</LogoHighlight>
            </LogoText>
            
            <DistrictButton 
              variant="outlined" 
              startIcon={<LocationIcon sx={{ color: 'primary.main' }} />}
              onClick={() => setAddressOpen(true)}
            >
              {selectedDistrict ? (
                <>
                  Adres: <strong style={{ marginLeft: 4 }}>{selectedDistrict}</strong>
                </>
              ) : (
                'Adresinizi Seçin'
              )}
            </DistrictButton>
          </Box>

          {/* Sağ Kısım: Hızlı Yetkili Paneli, Favoriler, Sepet ve Giriş Butonları */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            
            {/* Rol Admin ise hızlı erişim butonu */}
            {isLoggedIn && user?.role === 'admin' && (
              <Button 
                component={Link} 
                to="/admin" 
                variant="contained" 
                color="secondary" 
                startIcon={<StoreIcon />}
                size="small"
              >
                Admin Paneli
              </Button>
            )}

            {/* Rol Restoran Sahibi ise hızlı erişim butonu */}
            {isLoggedIn && user?.role === 'restaurant' && (
              <Button 
                component={Link} 
                to="/restaurant-panel" 
                variant="contained" 
                color="warning" 
                startIcon={<StoreIcon />}
                size="small"
              >
                Restoran Paneli
              </Button>
            )}

            {/* Favorilerim Rozetli İkon Butonu */}
            <IconButton 
              component={Link} 
              to="/favorites" 
              color="inherit" 
              sx={{ '&:hover': { color: 'primary.main' } }}
            >
              <Badge badgeContent={favoritesCount} color="primary">
                <FavoriteIcon />
              </Badge>
            </IconButton>

            {/* Sepetim Rozetli İkon Butonu */}
            <IconButton 
              component={Link} 
              to="/cart" 
              color="inherit" 
              sx={{ '&:hover': { color: 'primary.main' } }}
            >
              <Badge badgeContent={cartItemsCount} color="primary">
                <BasketIcon />
              </Badge>
            </IconButton>

            {/* Oturum Durum Alanı (Kullanıcı Adı & Çıkış veya Giriş Yap Butonu) */}
            {isLoggedIn ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 600, display: { xs: 'none', md: 'block' } }}>
                  {user.name}
                </Typography>
                <IconButton onClick={handleLogout} color="inherit" title="Çıkış Yap">
                  <LogoutIcon />
                </IconButton>
              </Box>
            ) : (
              <Button 
                component={Link} 
                to="/login" 
                variant="contained" 
                color="primary"
                startIcon={<PersonIcon />}
                sx={{ ml: 1 }}
              >
                Giriş Yap
              </Button>
            )}
          </Box>

        </Toolbar>
      </StyledAppBar>

      {/* [İlçe Seçim Modali (Dialog)]: Kullanıcının İstanbul ilçelerini seçtiği grid tablosu */}
      <Dialog 
        open={addressOpen} 
        onClose={() => setAddressOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { borderRadius: 4 } }}
      >
        <DialogTitle sx={{ fontWeight: 700, pb: 1 }}>
          İstanbul'dan Bir İlçe Seçin
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Grid container spacing={2}>
            {ISTANBUL_DISTRICTS.slice(0, 20).map((district) => (
              <Grid item xs={12} sm={6} md={3} key={district}>
                <DistrictItem onClick={() => handleDistrictSelect(district)}>
                  {district}
                </DistrictItem>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
      </Dialog>

      {/* [Restoranlar Listeleniyor Yükleme Modali]: İlçe seçimi sonrası 3 saniye dönen büyük modal */}
      <Dialog 
        open={loadingOpen}
        PaperProps={{ 
          sx: { 
            borderRadius: 6, 
            p: 8, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: 460,
            minHeight: 320,
            gap: 2
          } 
        }}
      >
        <CircularProgress color="primary" size={80} thickness={4} sx={{ mb: 2 }} />
        <Typography variant="h5" sx={{ fontWeight: 800, textAlign: 'center', color: 'secondary.main' }}>
          Restoranlar Listeleniyor...
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center' }}>
          Seçtiğiniz lokasyondaki lezzetler hazırlanıyor, lütfen bekleyiniz.
        </Typography>
      </Dialog>
    </>
  );
};

export default Navbar;
