import React from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
} from '@mui/material';
import {
  ReceiptLong as OrdersIcon,
  RestaurantMenu as ProductsIcon,
  AccountBox as ProfileIcon,
  ExitToApp as LogoutIcon,
  ArrowBack as HomeIcon,
} from '@mui/icons-material';
import toast from 'react-hot-toast';
import { logout } from '../redux/slices/authSlice';

// Sol navigasyon çekmecesinin (Sidebar) piksel cinsinden genişliği
const drawerWidth = 240;

// [Restoran Sahibi Arayüz Düzeni]: Restoran sahiplerinin ürün ve sipariş paneline erişmesini sağlayan layout
const RestaurantLayout = () => {
  // [Yönlendirme ve Eylem Kancaları]: Sayfa yönlendirmesi, Redux eylemleri ve URL konum kontrolü için kancalar
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { user, isLoggedIn, role } = useSelector((state) => state.auth);

  // [Rol Tabanlı Güvenlik Kontrolü]: Kullanıcı giriş yapmamışsa ya da rolü restoran sahibi veya admin değilse 
  // ana sayfaya yönlendirir ve erişim yetkisi yok hatası gösterir.
  React.useEffect(() => {
    if (!isLoggedIn || (role !== 'restaurant' && role !== 'admin')) {
      toast.error('Bu alana erişim yetkiniz bulunmamaktadır.');
      navigate('/');
    }
  }, [isLoggedIn, role, navigate]);

  if (!isLoggedIn || (role !== 'restaurant' && role !== 'admin')) {
    return null;
  }

  // [Çıkış Yapma İşlemi]: Restoran sahibi hesabının oturumunu sonlandırır, Redux durumunu siler ve ana sayfaya yönlendirir.
  const handleLogout = () => {
    dispatch(logout());
    toast.success('Çıkış yapıldı.');
    navigate('/');
  };

  // [Sol Panel Menü Linkleri]: Restoran panelinde listelenecek sayfa yolları ve bunlara ait ikon listesi
  const menuItems = [
    { text: 'Siparişler', icon: <OrdersIcon />, path: '/restaurant/orders' },
    { text: 'Ürün Yönetimi', icon: <ProductsIcon />, path: '/restaurant/products' },
    { text: 'Restoran Profili', icon: <ProfileIcon />, path: '/restaurant/profile' },
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f8fafc' }}>
      
      {/* [Üst Navigasyon Çubuğu (Header)]: Aktif restoranın adı ve çıkış yap butonunu barındıran üst kontrol alanı */}
      <AppBar 
        position="fixed" 
        sx={{ 
          width: `calc(100% - ${drawerWidth}px)`, 
          ml: `${drawerWidth}px`,
          bgcolor: '#ffffff',
          color: 'text.primary',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          borderBottom: '1px solid #e2e8f0'
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
            Restoran Yönetim Paneli
          </Typography>
          <Typography variant="body2" sx={{ mr: 2, color: 'text.secondary' }}>
            Restoran: <strong>{user?.name}</strong>
          </Typography>
          <IconButton color="inherit" onClick={handleLogout} title="Çıkış Yap">
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* [Sol Navigasyon Çekmecesi (Drawer/Sidebar)]: Yönetici menüsünü ve çıkış/ana sayfa yönlendirmelerini içeren panel */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: '#ffffff',
            borderRight: '1px solid #e2e8f0',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        {/* Sidebar Başlığı */}
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 800, color: 'primary.main' }}>
            RESTORAN SAHİBİ
          </Typography>
        </Toolbar>
        <Divider />
        
        {/* Menü Seçenekleri Listesi */}
        <List>
          {menuItems.map((item) => {
            const isSelected = location.pathname === item.path;
            return (
              <ListItem key={item.text} disablePadding>
                <ListItemButton 
                  component={Link} 
                  to={item.path}
                  selected={isSelected}
                  sx={{
                    '&.Mui-selected': {
                      bgcolor: 'rgba(155, 28, 28, 0.08)',
                      borderLeft: '4px solid #9B1C1C',
                      color: 'primary.main',
                      '& .MuiListItemIcon-root': {
                        color: 'primary.main',
                      }
                    },
                    '&:hover': {
                      bgcolor: 'rgba(0, 0, 0, 0.02)',
                    }
                  }}
                >
                  <ListItemIcon sx={{ color: isSelected ? 'primary.main' : 'text.secondary' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: isSelected ? 600 : 500 }} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        
        <Divider sx={{ mt: 'auto' }} />
        
        {/* Alt Kısımdaki Ana Sayfaya Dönüş Butonu */}
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Ana Sayfaya Dön" primaryTypographyProps={{ fontSize: '0.9rem' }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      {/* [Ana İçerik Alanı (Main Content)]: Sayfa yönlendirmelerinin yüklendiği ve Outlet bileşeninin render edildiği kısım */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: '#f8fafc',
          p: 3,
          mt: 8,
          width: `calc(100% - ${drawerWidth}px)`,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default RestaurantLayout;
