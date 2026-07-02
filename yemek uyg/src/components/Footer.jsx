import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { loginSuccess } from '../redux/slices/authSlice';

const FooterContainer = styled('footer')(({ theme }) => ({
  backgroundColor: '#ffffff',
  borderTop: '1px solid #e2e8f0',
  padding: theme.spacing(4, 0),
  marginTop: 'auto',
  width: '100%',
  position: 'relative',
}));

const AuthorizedLink = styled(Link)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(2),
  right: theme.spacing(3),
  fontSize: '0.75rem',
  color: theme.palette.text.secondary,
  cursor: 'pointer',
  userSelect: 'none',
  '&:hover': {
    color: theme.palette.primary.main,
    textDecoration: 'underline',
  },
}));

// [Alt Bilgi Alanı (Footer)]: Platformun en altındaki telif hakları, popüler bölgeler, yetkili gizli girişi ve iletişim bilgilerini içeren bileşen
const Footer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Admin giriş modal durumları ve girdi değişkenleri
  const [adminOpen, setAdminOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // [Yönetici (Admin) Giriş Kontrolü]: Sabit admin/123 bilgilerini kontrol eder, Redux auth durumunu günceller ve yönlendirir.
  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error('Lütfen tüm alanları doldurun.');
      return;
    }

    if (username === 'admin' && password === '123') {
      const adminUser = {
        id: '3',
        name: 'Sistem Yöneticisi',
        username: 'admin',
        role: 'admin',
      };
      dispatch(loginSuccess(adminUser));
      toast.success('Yönetici girişi başarılı!');
      setAdminOpen(false);
      setUsername('');
      setPassword('');
      navigate('/admin');
    } else {
      toast.error('Geçersiz kullanıcı adı veya şifre.');
    }
  };

  // [Yetkili Birime Bağlanma Simülasyonu]: Admin şifresini unutanlar veya destek isteyen yetkililer için SweetAlert uyarısı açar.
  const handleSupportConnect = () => {
    setAdminOpen(false);
    Swal.fire({
      title: 'Yetkili Birime Bağlanıyor',
      text: '5-15 dakika içerisinde tarafınıza dönüş yapılacaktır.',
      icon: 'info',
      confirmButtonText: 'Tamam',
      confirmButtonColor: '#9B1C1C',
    });
  };

  return (
    <FooterContainer>
      <Container maxWidth="lg">
        {/* Grid düzeni: Sol, orta ve sağ olmak üzere üç ana bilgi kolonu listeler */}
        <Grid container spacing={3} sx={{ mb: 2 }}>
          {/* Delivora marka tanımı ve kısa vizyon */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: 'primary.main' }}>
              Delivora
            </Typography>
            <Typography variant="body2" color="text.secondary">
              İstanbul'un en iyi lezzetlerini en hızlı şekilde kapınıza getiriyoruz. Güvenli ve lezzetli siparişin adresi.
            </Typography>
          </Grid>
          
          {/* Popüler dağıtım bölgeleri */}
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
              Popüler Bölgeler
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Kadıköy • Beşiktaş • Şişli • Üsküdar • Ataşehir • Fatih
            </Typography>
          </Grid>
          
          {/* İletişim ve destek bilgileri */}
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
              İletişim & Destek
            </Typography>
            <Typography variant="body2" color="text.secondary">
              E-posta: destek@delivora.com<br />
              Telefon: 0850 555 55 55
            </Typography>
          </Grid>
        </Grid>
        
        {/* Telif Hakları Bandı */}
        <Box sx={{ borderTop: '1px solid #f1f5f9', pt: 2, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Delivora. Tüm hakları saklıdır. Geliştirici: Berke & Antigravity IDE.
          </Typography>
        </Box>
      </Container>

      {/* [Gizli "Yetkili" Giriş Linki]: Yöneticilerin admin paneline giriş yapabileceği pop-up modali tetikler */}
      <AuthorizedLink underline="none" onClick={() => setAdminOpen(true)}>
        Yetkili
      </AuthorizedLink>

      {/* [Yönetici Giriş Modali (Dialog)]: Yöneticiler için şifreli giriş formu */}
      <Dialog 
        open={adminOpen} 
        onClose={() => setAdminOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: 4 } }}
      >
        <DialogTitle sx={{ fontWeight: 700, pb: 1, textAlign: 'center' }}>
          Yetkili Personel Girişi
        </DialogTitle>
        <form onSubmit={handleAdminLogin}>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
              label="Kullanıcı Adı"
              variant="outlined"
              fullWidth
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Şifre"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </DialogContent>
          
          {/* Form işlemleri ve modal alt butonları */}
          <DialogActions sx={{ p: 3, pt: 0, justifyContent: 'space-between' }}>
            <Link 
              variant="body2" 
              onClick={handleSupportConnect}
              sx={{ cursor: 'pointer', color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
            >
              Yetkili Birime Bağlan
            </Link>
            <Box>
              <Button onClick={() => setAdminOpen(false)} sx={{ mr: 1 }}>
                İptal
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Giriş Yap
              </Button>
            </Box>
          </DialogActions>
        </form>
      </Dialog>
    </FooterContainer>
  );
};

export default Footer;
