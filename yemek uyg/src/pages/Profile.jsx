import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Divider,
  Grid,
  Avatar,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Person as PersonIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Home as HomeIcon,
  Badge as BadgeIcon,
} from '@mui/icons-material';
import toast from 'react-hot-toast';
import { loginSuccess } from '../redux/slices/authSlice';

const ProfilePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 20,
  border: '1px solid #f1f5f9',
  boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
}));

const InfoRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2.5),
}));

// [Profil Sayfası]: Giriş yapan müşterilerin kişisel iletişim ve adres bilgilerini güncellediği ekran
const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Oturum durumu ve giriş yapan kullanıcı verileri Redux'tan alınır
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  // Form girdileri için yerel state tanımlamaları
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  // [Oturum Kontrolü ve Bilgilerin Yüklenmesi]: Oturum açılmamışsa giriş ekranına yönlendirir, 
  // oturum açıksa kullanıcının mevcut verilerini form alanlarına doldurur.
  useEffect(() => {
    if (!isLoggedIn) {
      toast.error('Profilinizi görüntülemek için giriş yapmalısınız.');
      navigate('/login');
      return;
    }

    if (user) {
      setName(user.name || '');
      setPhone(user.phone || '');
      setAddress(user.address || '');
    }
  }, [isLoggedIn, user, navigate]);

  // [Bilgileri Güncelleme İşlemi]: Form verilerini kontrol eder, backend veritabanına PUT isteği gönderir 
  // ve başarılı olursa Redux durumunu & LocalStorage verilerini günceller.
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!name || !phone || !address) {
      toast.error('Lütfen tüm alanları doldurun.');
      return;
    }

    try {
      const updatedUser = {
        ...user,
        name,
        phone,
        address,
      };

      const res = await fetch(`http://localhost:5000/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      if (res.ok) {
        dispatch(loginSuccess(updatedUser));
        toast.success('Profil bilgileriniz başarıyla güncellendi!');
      } else {
        toast.error('Güncelleme sırasında hata oluştu.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Bağlantı hatası.');
    }
  };

  if (!isLoggedIn || !user) {
    return null;
  }

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      {/* Sayfa Ana Başlığı */}
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 4, color: 'secondary.main' }}>
        Profil Bilgilerim
      </Typography>

      <Grid container spacing={4}>
        {/* SOL KOLON: KULLANICI AVATARI VE YETKİ DETAYLARI */}
        <Grid item xs={12} md={4}>
          <ProfilePaper elevation={0} variant="outlined" sx={{ textAlign: 'center', py: 4 }}>
            {/* Kullanıcı isminin ilk harfini içeren dairesel profil ikonu */}
            <Avatar 
              sx={{ 
                width: 100, 
                height: 100, 
                mx: 'auto', 
                mb: 2, 
                bgcolor: 'primary.main',
                fontSize: '2.5rem',
                fontWeight: 700
              }}
            >
              {user.name ? user.name[0].toUpperCase() : 'U'}
            </Avatar>
            
            {/* Ad Soyad ve E-posta/Kullanıcı adı alanları */}
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {user.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {user.email || user.username}
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            {/* Kullanıcı rolünün gösterildiği rozet bandı */}
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ bgcolor: 'secondary.main', color: '#ffffff', py: 0.5, px: 2, borderRadius: 2, fontSize: '0.85rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>
                <BadgeIcon fontSize="small" /> Yetki Rolü: {user.role.toUpperCase()}
              </Box>
            </Box>
          </ProfilePaper>
        </Grid>

        {/* SAĞ KOLON: KULLANICI BİLGİ GÜNCELLEME FORMU */}
        <Grid item xs={12} md={8}>
          <ProfilePaper elevation={0} variant="outlined" component="form" onSubmit={handleUpdate}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
              Bilgileri Düzenle
            </Typography>

            <Grid container spacing={3}>
              {/* Ad Soyad Girdi Alanı */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Ad Soyad"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              
              {/* Telefon Numarası Girdi Alanı */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Telefon"
                  fullWidth
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Grid>
              
              {/* Teslimat Adresi Detay Alanı */}
              <Grid item xs={12}>
                <TextField
                  label="Teslimat Adresi"
                  multiline
                  rows={3}
                  fullWidth
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Grid>
            </Grid>

            {/* Güncelleme Eylemi Butonu */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
              <Button type="submit" variant="contained" color="primary" size="large" sx={{ px: 4, borderRadius: 3 }}>
                Bilgileri Güncelle
              </Button>
            </Box>
          </ProfilePaper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
