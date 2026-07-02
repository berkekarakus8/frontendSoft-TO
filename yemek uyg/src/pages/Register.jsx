import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import toast from 'react-hot-toast';
import { loginSuccess } from '../redux/slices/authSlice';

const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(6),
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

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !phone || !address) {
      toast.error('Lütfen tüm alanları doldurun.');
      return;
    }

    try {
      // Check if user already exists
      const checkRes = await fetch(`http://localhost:5000/users?email=${email}`);
      const checkData = await checkRes.json();
      if (checkData.length > 0) {
        toast.error('Bu e-posta adresi zaten kullanımda.');
        return;
      }

      // Create new user
      const newUser = {
        name,
        email,
        password,
        phone,
        address,
        role: 'user',
      };

      const res = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (res.ok) {
        const createdUser = await res.json();
        dispatch(loginSuccess(createdUser));
        toast.success('Kayıt işleminiz başarıyla tamamlandı!');
        navigate('/');
      } else {
        toast.error('Kayıt sırasında bir hata oluştu.');
      }
    } catch (err) {
      toast.error('Bağlantı hatası.');
      console.error(err);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ pb: 8 }}>
      <StyledPaper elevation={0} variant="outlined">
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 1, color: 'secondary.main' }}>
          Oturum Aç / Kayıt Ol
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Hemen kaydolun ve en lezzetli yemekleri keşfedin.
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Ad Soyad"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="E-posta Adresi"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Şifre"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Telefon Numarası"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            multiline
            rows={2}
            label="Teslimat Adresi"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          
          <FormButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Kayıt Ol ve Giriş Yap
          </FormButton>
        </Box>

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Zaten hesabınız var mı?{' '}
            <Link to="/login" style={{ color: '#9B1C1C', fontWeight: 600 }}>
              Giriş Yapın
            </Link>
          </Typography>
        </Box>
      </StyledPaper>
    </Container>
  );
};

export default Register;
