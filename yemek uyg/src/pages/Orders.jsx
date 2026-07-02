import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Chip,
  Divider,
  CircularProgress,
  Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  ReceiptLong as ReceiptIcon,
  Restaurant as RestaurantIcon,
} from '@mui/icons-material';
import toast from 'react-hot-toast';

const OrderCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  border: '1px solid #f1f5f9',
  boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
  marginBottom: theme.spacing(3),
}));

const Orders = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      toast.error('Siparişlerinizi görüntülemek için giriş yapmalısınız.');
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await fetch(`http://localhost:5000/orders?userId=${user.id}&_sort=date&_order=desc`);
        if (res.ok) {
          const data = await res.json();
          setOrders(data);
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        toast.error('Siparişler yüklenirken bağlantı hatası oluştu.');
        setLoading(false);
      }
    };
    fetchOrders();
  }, [isLoggedIn, user, navigate]);

  const getStatusChip = (status) => {
    switch (status) {
      case 'pending':
        return <Chip label="Beklemede" color="warning" variant="outlined" size="small" />;
      case 'cooking':
        return <Chip label="Hazırlanıyor" color="info" variant="outlined" size="small" />;
      case 'on-the-way':
        return <Chip label="Yolda" color="primary" variant="outlined" size="small" />;
      case 'delivered':
        return <Chip label="Teslim Edildi" color="success" size="small" />;
      case 'cancelled':
        return <Chip label="İptal Edildi" color="error" size="small" />;
      default:
        return <Chip label={status} size="small" />;
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
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 4, color: 'secondary.main' }}>
        Siparişlerim
      </Typography>

      {orders.length === 0 ? (
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
            bgcolor: '#ffffff',
            borderRadius: 4,
            border: '1px solid #f1f5f9',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2
          }}
        >
          <ReceiptIcon sx={{ fontSize: 70, color: '#cbd5e1' }} />
          <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 600 }}>
            Henüz siparişiniz bulunmuyor.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Sipariş vermek ve harika yemekleri denemek için restoran listemize göz atın.
          </Typography>
          <Button component={Link} to="/restaurants" variant="contained" color="primary" sx={{ borderRadius: 3 }}>
            Sipariş Ver
          </Button>
        </Box>
      ) : (
        orders.map((order) => (
          <OrderCard key={order.id}>
            <CardContent sx={{ p: 3 }}>

              {/* Restoran Adı ve Durumu */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <RestaurantIcon color="primary" />
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {order.restaurantName}
                  </Typography>
                </Box>
                {getStatusChip(order.status)}
              </Box>

              {/* Sipariş Tarihi ve No */}
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
                Tarih: {new Date(order.date).toLocaleString('tr-TR')} • Sipariş No: #{order.id}
              </Typography>
              <Divider sx={{ mb: 2 }} />

              {/* Sipariş Edilen Yemekler */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
                {order.items.map((item, index) => (
                  <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {item.name} <strong>x {item.qty}</strong>
                      </Typography>
                      {item.selectedOptions && item.selectedOptions.length > 0 && (
                        <Typography variant="caption" color="primary" sx={{ display: 'block', fontStyle: 'italic', fontSize: '0.75rem' }}>
                          ({item.selectedOptions.join(', ')})
                        </Typography>
                      )}
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {item.price * item.qty} TL
                    </Typography>
                  </Box>
                ))}
              </Box>
              <Divider sx={{ mb: 2 }} />

              {/* Toplam Tutar ve Teslimat Adresi */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box sx={{ maxWidth: '70%' }}>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                    Teslimat Adresi:
                  </Typography>
                  <Typography variant="caption" color="text.primary" sx={{ fontWeight: 500 }}>
                    {order.address}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                    Ödenen Toplam:
                  </Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800, color: 'primary.main' }}>
                    {order.totalAmount} TL
                  </Typography>
                </Box>
              </Box>

            </CardContent>
          </OrderCard>
        ))
      )}
    </Container>
  );
};

export default Orders;
