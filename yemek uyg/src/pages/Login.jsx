import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Divider,
  Grid,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import toast from 'react-hot-toast';
import { loginSuccess } from '../redux/slices/authSlice';

const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(8),
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: 16,
  boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
}));

const FormButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  padding: theme.spacing(1.5),
  fontSize: '1rem',
}));

const QuickLoginButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  borderRadius: 8,
  padding: theme.spacing(1, 2),
  fontSize: '0.85rem',
}));

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // If already logged in, redirect home
  React.useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Lütfen tüm alanları doldurun.');
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/users?email=${email}`);
      const data = await res.json();
      
      if (data && data.length > 0) {
        const loggedUser = data[0];
        if (loggedUser.password.toString() === password.toString()) {
          dispatch(loginSuccess(loggedUser));
          toast.success(`Hoş geldiniz, ${loggedUser.name}!`);
          
          if (loggedUser.role === 'admin') {
            navigate('/admin');
          } else if (loggedUser.role === 'restaurant') {
            navigate('/restaurant/orders');
          } else {
            navigate('/');
          }
        } else {
          toast.error('Hatalı e-posta veya şifre.');
        }
      } else {
        toast.error('Hatalı e-posta veya şifre.');
      }
    } catch (err) {
      toast.error('Bağlantı hatası oluştu.');
      console.error(err);
    }
  };

  const handleQuickLogin = (role) => {
    if (role === 'user') {
      setEmail('user@example.com');
      setPassword('123');
    } else if (role === 'restaurant') {
      setEmail('restaurant@example.com');
      setPassword('123');
    } else if (role === 'admin') {
      // Admin login requires username instead of email, but in db.json it is: { username: "admin", password: "123", role: "admin" }
      // To simulate admin quick login, we bypass or direct log in
      const adminUser = {
        id: '3',
        name: 'Sistem Yöneticisi',
        username: 'admin',
        role: 'admin',
      };
      dispatch(loginSuccess(adminUser));
      toast.success('Yönetici girişi başarılı!');
      navigate('/admin');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ pb: 8 }}>
      <StyledPaper elevation={0} variant="outlined">
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 1, color: 'secondary.main' }}>
          Giriş Yap
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Hesabınıza giriş yaparak sipariş vermeye başlayın.
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="E-posta Adresi"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Şifre"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <FormButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Giriş Yap
          </FormButton>
        </Box>

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Hesabınız yok mu?{' '}
            <Link to="/register" style={{ color: '#9B1C1C', fontWeight: 600 }}>
              Kayıt Olun
            </Link>
          </Typography>
        </Box>

        <Divider sx={{ width: '100%', my: 3 }}>
          <Typography variant="caption" color="text.secondary">
            HIZLI DENEME GİRİŞLERİ
          </Typography>
        </Divider>

        <Grid container spacing={1} sx={{ justifyContent: 'center' }}>
          <Grid item>
            <QuickLoginButton 
              variant="outlined" 
              color="primary"
              onClick={() => handleQuickLogin('user')}
            >
              Kullanıcı Girişi
            </QuickLoginButton>
          </Grid>
          <Grid item>
            <QuickLoginButton 
              variant="outlined" 
              color="warning"
              onClick={() => handleQuickLogin('restaurant')}
            >
              Restoran Girişi
            </QuickLoginButton>
          </Grid>
          <Grid item>
            <QuickLoginButton 
              variant="outlined" 
              color="secondary"
              onClick={() => handleQuickLogin('admin')}
            >
              Admin Girişi
            </QuickLoginButton>
          </Grid>
        </Grid>
      </StyledPaper>
    </Container>
  );
};

export default Login;
