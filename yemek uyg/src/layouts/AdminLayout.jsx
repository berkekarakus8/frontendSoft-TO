import React, { useState } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  ThemeProvider,
  createTheme,
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
  Avatar,
  Badge,
  InputBase,
} from '@mui/material';
import {
  People as PeopleIcon,
  Storefront as StoreIcon,
  ReceiptLong as OrdersIcon,
  Category as CategoryIcon,
  Campaign as CampaignIcon,
  ExitToApp as LogoutIcon,
  ArrowBack as HomeIcon,
  Menu as MenuIcon,
  Notifications as BellIcon,
  Fullscreen as FullscreenIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import toast from 'react-hot-toast';
import { logout } from '../redux/slices/authSlice';

const drawerWidth = 250;

// AdminLTE 4 Koyu Tema (Dark Mode) Tasarımı
const adminTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3f51b5', // AdminLTE 4 Mavi Vurgusu
    },
    secondary: {
      main: '#9B1C1C', // Delivora Bordo
    },
    background: {
      default: '#1e222b', // AdminLTE 4 Dark body background
      paper: '#2d323e', // Sidebar ve kart arka planı
    },
    text: {
      primary: '#ffffff',
      secondary: '#c2c7d0',
    },
  },
  typography: {
    fontFamily: '"Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          boxShadow: '0 0 1px rgba(0,0,0,.125), 0 1px 3px rgba(0,0,0,.2)',
          borderTop: '3px solid #3f51b5', // AdminLTE Signature Card Top-border
          backgroundColor: '#2d323e',
          transition: 'none',
          '&:hover': {
            transform: 'none',
            boxShadow: '0 0 1px rgba(0,0,0,.125), 0 1px 3px rgba(0,0,0,.2)',
          }
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          backgroundColor: '#2d323e',
        }
      }
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#252932',
          '& th': {
            color: '#3f51b5',
            fontWeight: 700,
          }
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #3d4454',
          color: '#c2c7d0',
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: 'none',
        }
      }
    }
  },
});

const AdminLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { user, isLoggedIn, role } = useSelector((state) => state.auth);

  const [mobileOpen, setMobileOpen] = useState(false);

  // [Yönetici Yetki Kontrolü]: Kullanıcı giriş yapmamışsa veya rolü admin değilse 
  // ana sayfaya yönlendirir ve hata bildirimi fırlatır.
  React.useEffect(() => {
    if (!isLoggedIn || role !== 'admin') {
      toast.error('Bu alana erişim yetkiniz bulunmamaktadır.');
      navigate('/');
    }
  }, [isLoggedIn, role, navigate]);

  if (!isLoggedIn || role !== 'admin') {
    return null;
  }

  // [Yönetici Çıkış İşlemi]: Admin oturumunu sonlandırır, Redux durumunu 
  // temizler, başarılı çıkış bildirimi gösterir ve ana sayfaya yönlendirir.
  const handleLogout = () => {
    dispatch(logout());
    toast.success('Yönetici çıkışı yapıldı.');
    navigate('/');
  };

  // [Tam Ekran Modu Geçişi]: Tarayıcı penceresinin tam ekran modunu 
  // açmasını veya zaten açıksa tam ekrandan çıkmasını tetikler.
  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const menuItems = [
    { text: 'Kullanıcı Yönetimi', icon: <PeopleIcon />, path: '/admin/users' },
    { text: 'Restoran Yönetimi', icon: <StoreIcon />, path: '/admin/restaurants' },
    { text: 'Sipariş Yönetimi', icon: <OrdersIcon />, path: '/admin/orders', badge: '1' },
    { text: 'Kategori Yönetimi', icon: <CategoryIcon />, path: '/admin/categories' },
    { text: 'Kampanya Yönetimi', icon: <CampaignIcon />, path: '/admin/campaigns' },
  ];

  // [Breadcrumb / Sayfa Yolu Belirleme]: Yöneticinin o anda bulunduğu url yoluna (path) 
  // bakarak üst barda ve breadcrumb alanında gösterilecek sayfa başlığını belirler.
  const getBreadcrumb = () => {
    const path = location.pathname;
    if (path.includes('users')) return 'Kullanıcılar';
    if (path.includes('restaurants')) return 'Restoranlar';
    if (path.includes('orders')) return 'Siparişler';
    if (path.includes('categories')) return 'Kategoriler';
    if (path.includes('campaigns')) return 'Kampanyalar';
    return 'Dashboard';
  };

  return (
    <ThemeProvider theme={adminTheme}>
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
        
        {/* AdminLTE 4 Top Navbar Header */}
        <AppBar 
          position="fixed" 
          sx={{ 
            width: `calc(100% - ${drawerWidth}px)`, 
            ml: `${drawerWidth}px`,
            bgcolor: 'background.paper',
            backgroundImage: 'none',
            borderBottom: '1px solid #3d4454',
            boxShadow: 'none'
          }}
        >
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            {/* Left Nav Header Links */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton color="inherit" onClick={() => setMobileOpen(!mobileOpen)}>
                <MenuIcon />
              </IconButton>
              <Typography variant="body2" component={Link} to="/" sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { color: '#ffffff' } }}>
                Home
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', cursor: 'pointer', '&:hover': { color: '#ffffff' } }}>
                Contact
              </Typography>
            </Box>

            {/* Right Nav Options */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton color="inherit" onClick={handleFullscreen}>
                <FullscreenIcon />
              </IconButton>
              
              <IconButton color="inherit">
                <Badge badgeContent={3} color="primary">
                  <BellIcon />
                </Badge>
              </IconButton>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>AD</Avatar>
                <Typography variant="body2" sx={{ fontWeight: 600, display: { xs: 'none', md: 'block' } }}>
                  {user?.name}
                </Typography>
              </Box>
              
              <IconButton color="inherit" onClick={handleLogout} title="Çıkış Yap">
                <LogoutIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        {/* AdminLTE 4 Dark Left Sidebar */}
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              bgcolor: '#252932', // Darker background for sidebar
              borderRight: '1px solid #3d4454',
            },
          }}
          variant="permanent"
          anchor="left"
        >
          {/* Brand Header */}
          <Toolbar sx={{ px: 2, display: 'flex', alignItems: 'center', gap: 1, borderBottom: '1px solid #3d4454' }}>
            <Avatar src="/favicon.svg" sx={{ width: 28, height: 28, bgcolor: 'primary.main' }} />
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#ffffff', letterSpacing: '0.5px', fontSize: '1.15rem' }}>
              Delivora <span style={{ fontWeight: 300, color: 'text.secondary' }}>LTE 4</span>
            </Typography>
          </Toolbar>

          {/* User Panel */}
          <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2, borderBottom: '1px solid #3d4454' }}>
            <Avatar sx={{ width: 34, height: 34, bgcolor: 'secondary.main' }}>SY</Avatar>
            <Box>
              <Typography variant="body2" sx={{ color: '#ffffff', fontWeight: 600 }}>
                {user?.name}
              </Typography>
              <Typography variant="caption" sx={{ color: '#22c55e', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#22c55e', display: 'inline-block' }}></span>
                Online
              </Typography>
            </Box>
          </Box>

          {/* Sidebar Search */}
          <Box sx={{ p: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#2d323e', borderRadius: 1, px: 1, py: 0.5, border: '1px solid #3d4454' }}>
              <InputBase placeholder="Search" sx={{ ml: 1, flex: 1, fontSize: '0.85rem', color: '#ffffff' }} />
              <IconButton size="small" color="inherit">
                <SearchIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          {/* Nav List */}
          <List sx={{ px: 1 }}>
            {menuItems.map((item) => {
              const isSelected = location.pathname === item.path;
              return (
                <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                  <ListItemButton 
                    component={Link} 
                    to={item.path}
                    selected={isSelected}
                    sx={{
                      borderRadius: 1,
                      py: 1,
                      '&.Mui-selected': {
                        bgcolor: 'primary.main',
                        color: '#ffffff',
                        '& .MuiListItemIcon-root': {
                          color: '#ffffff',
                        },
                        '&:hover': {
                          bgcolor: 'primary.main',
                        }
                      },
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.05)',
                      }
                    }}
                  >
                    <ListItemIcon sx={{ color: isSelected ? '#ffffff' : '#c2c7d0', minWidth: 40 }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.text} 
                      primaryTypographyProps={{ fontSize: '0.85rem', fontWeight: isSelected ? 600 : 500 }} 
                    />
                    {item.badge && !isSelected && (
                      <Badge badgeContent={item.badge} color="primary" sx={{ mr: 1 }} />
                    )}
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>

          <Divider sx={{ mt: 'auto', borderColor: '#3d4454' }} />
          
          <List sx={{ px: 1 }}>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/">
                <ListItemIcon sx={{ color: '#c2c7d0', minWidth: 40 }}>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Ana Sayfaya Dön" primaryTypographyProps={{ fontSize: '0.85rem' }} />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>

        {/* Content Area Wrapper (Includes breadcrumbs header) */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: 'background.default',
            p: 3,
            mt: 8,
            width: `calc(100% - ${drawerWidth}px)`,
          }}
        >
          {/* AdminLTE 4 Breadcrumb Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, fontSize: '1.4rem' }}>
              {getBreadcrumb()}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'flex', gap: 0.5 }}>
              <span style={{ cursor: 'pointer' }} onClick={() => navigate('/admin')}>Home</span> &gt; <span>{getBreadcrumb()}</span>
            </Typography>
          </Box>

          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AdminLayout;
