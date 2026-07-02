import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Grid,
  CardMedia,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import toast from 'react-hot-toast';

const FormPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 16,
  border: '1px solid #e2e8f0',
  boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
}));

// [RestaurantProfile / Restoran Profil Düzenleme]: Restoran sahiplerinin dükkan isimlerini, minimum sepet tutarlarını, çalışma durumlarını düzenlediği ekran
const RestaurantProfile = () => {
  const navigate = useNavigate();
  // Giriş bilgileri ve restoran ID'si alınır
  const { isLoggedIn, user, role } = useSelector((state) => state.auth);

  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  // Form girdi alanları için yerel state tanımlamaları
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [minimumOrder, setMinimumOrder] = useState(100);
  const [deliveryTime, setDeliveryTime] = useState('30-40 dk');
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [isDiscounted, setIsDiscounted] = useState(false);
  const [discountRate, setDiscountRate] = useState(0);
  const [isOpen, setIsOpen] = useState(true);

  // [Restoran Detaylarını Çekme Fonksiyonu]: Restorana ait genel künye bilgilerini API'den getirir
  const fetchRestaurant = async () => {
    if (user?.restaurantId) {
      try {
        const res = await fetch(`http://localhost:5000/restaurants/${user.restaurantId}`);
        if (res.ok) {
          const data = await res.json();
          setRestaurant(data);
          setName(data.name);
          setCategory(data.category);
          setImage(data.image);
          setMinimumOrder(data.minimumOrder);
          setDeliveryTime(data.deliveryTime);
          setDeliveryFee(data.deliveryFee);
          setIsDiscounted(data.isDiscounted);
          setDiscountRate(data.discountRate);
          setIsOpen(data.isOpen);
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        toast.error('Restoran detayları yüklenemedi.');
        setLoading(false);
      }
    }
  };

  // Yetki doğrulama yapar, yetkisizse ana sayfaya atar, yetkiliyse bilgileri yükler
  useEffect(() => {
    if (!isLoggedIn || (role !== 'restaurant' && role !== 'admin')) {
      navigate('/');
      return;
    }
    fetchRestaurant();
  }, [isLoggedIn, user, role, navigate]);

  // [Profil Güncelleme Eylemi]: Form verilerini alarak restoranın DB kaydını PUT isteğiyle günceller
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!name || !category || !image || !deliveryTime) {
      toast.error('Lütfen gerekli tüm alanları doldurun.');
      return;
    }

    const updatedRestaurant = {
      ...restaurant,
      name,
      category,
      image,
      minimumOrder: parseInt(minimumOrder),
      deliveryTime,
      deliveryFee: parseInt(deliveryFee),
      isDiscounted,
      discountRate: isDiscounted ? parseInt(discountRate) : 0,
      isOpen,
    };

    try {
      const res = await fetch(`http://localhost:5000/restaurants/${user.restaurantId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedRestaurant),
      });

      if (res.ok) {
        toast.success('Restoran bilgileri başarıyla güncellendi!');
        fetchRestaurant();
      } else {
        toast.error('Güncelleme işlemi başarısız.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Bağlantı hatası.');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 4 }}>
        Restoran Profil Ayarları
      </Typography>

      <Grid container spacing={4}>
        {/* SOL KOLON: KART ÖNİZLEMESİ VE DÜKKAN RESMİ */}
        <Grid item xs={12} md={4}>
          <Paper elevation={0} sx={{ borderRadius: 4, overflow: 'hidden', border: '1px solid #e2e8f0' }}>
            <CardMedia
              component="img"
              height="200"
              image={image}
              alt={name}
            />
            <Box sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {category} • Puan: {restaurant?.rating}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* SAĞ KOLON: RESTORAN BİLGİ GÜNCELLEME FORMU */}
        <Grid item xs={12} md={8}>
          <FormPaper elevation={0} component="form" onSubmit={handleUpdate}>
            <Grid container spacing={3}>
              {/* Restoran Adı */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Restoran Adı"
                  fullWidth
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>

              {/* Kategori Seçici */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Kategori"
                  fullWidth
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </Grid>

              {/* Dükkan Görsel Adresi */}
              <Grid item xs={12}>
                <TextField
                  label="Resim URL"
                  fullWidth
                  required
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </Grid>

              {/* Minimum Sepet Limiti */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Minimum Sipariş Limiti (TL)"
                  type="number"
                  fullWidth
                  required
                  value={minimumOrder}
                  onChange={(e) => setMinimumOrder(e.target.value)}
                />
              </Grid>

              {/* Ortalama Teslim Süresi */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Teslimat Süresi"
                  fullWidth
                  required
                  value={deliveryTime}
                  onChange={(e) => setDeliveryTime(e.target.value)}
                />
              </Grid>

              {/* Teslimat Ücreti */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Teslimat Ücreti (TL)"
                  type="number"
                  fullWidth
                  required
                  value={deliveryFee}
                  onChange={(e) => setDeliveryFee(e.target.value)}
                />
              </Grid>

              {/* İndirim Tanımlama Checkbox */}
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isDiscounted}
                      onChange={(e) => setIsDiscounted(e.target.checked)}
                    />
                  }
                  label="Flaş İndirim Var mı?"
                />
              </Grid>

              {/* Flaş İndirim Aktifse Gösterilecek Oran Girdisi */}
              {isDiscounted && (
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="İndirim Oranı (%)"
                    type="number"
                    fullWidth
                    required
                    value={discountRate}
                    onChange={(e) => setDiscountRate(e.target.value)}
                  />
                </Grid>
              )}

              {/* Siparişlere Açık / Kapalı Checkbox */}
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isOpen}
                      onChange={(e) => setIsOpen(e.target.checked)}
                    />
                  }
                  label="Restoran Siparişe Açık mı?"
                />
              </Grid>
            </Grid>

            {/* Güncelleme Eylemi Butonu */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
              <Button type="submit" variant="contained" color="primary" size="large" sx={{ px: 4, borderRadius: 3 }}>
                Ayarları Güncelle
              </Button>
            </Box>
          </FormPaper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RestaurantProfile;
