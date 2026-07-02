import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  IconButton,
  TextField,
  Divider,
  CircularProgress,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  ShoppingCart as CartIcon,
  LocationOn as AddressIcon,
  Payment as PaymentIcon,
  CreditCard as CardBackIcon,
  DeliveryDining as DoorIcon,
} from '@mui/icons-material';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { incrementQty, decrementQty, removeFromCart, clearCart } from '../redux/slices/cartSlice';

// --- STYLED COMPONENTS ---

const CartPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 20,
  border: '1px solid #f1f5f9',
  boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
}));

const SummaryPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 20,
  backgroundColor: '#ffffff',
  border: '1px solid #f1f5f9',
  boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
}));

const QuantityBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  border: '1px solid #e2e8f0',
  borderRadius: 8,
  padding: '2px 8px',
}));

// --- İNTERAKTİF KREDİ KARTI STİLLERİ (AdminLTE & Premium Tasarım) ---

const CardContainer = styled(Box)({
  perspective: 1000,
  width: '100%',
  maxWidth: 340,
  height: 200,
  margin: '0 auto 24px auto',
});

const CardInner = styled(Box, { shouldForwardProp: (prop) => prop !== 'isflipped' })(({ isflipped }) => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  transition: 'transform 0.8s',
  transformStyle: 'preserve-3d',
  transform: isflipped ? 'rotateY(180deg)' : 'none',
}));

const CardFace = styled(Box)({
  position: 'absolute',
  width: '100%',
  height: '100%',
  backfaceVisibility: 'hidden',
  WebkitBackfaceVisibility: 'hidden',
  borderRadius: 16,
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
});

const CardFront = styled(CardFace)({
  background: 'linear-gradient(135deg, #9B1C1C 0%, #4a0a0a 100%)',
  color: '#ffffff',
  transform: 'rotateY(0deg)',
  WebkitTransform: 'rotateY(0deg)',
});

const CardBack = styled(CardFace)({
  background: 'linear-gradient(135deg, #370707 0%, #170202 100%)',
  color: '#ffffff',
  transform: 'rotateY(180deg)',
  WebkitTransform: 'rotateY(180deg)',
});

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  // Ödeme Yöntemi ve Kredi Kartı Bilgileri
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' veya 'door'
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    if (isLoggedIn && user) {
      setAddress(user.address || '');
      setPhone(user.phone || '');
    }
  }, [isLoggedIn, user]);

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      if (cart.restaurantId) {
        setLoading(true);
        try {
          const res = await fetch(`http://localhost:5000/restaurants/${cart.restaurantId}`);
          if (res.ok) {
            const data = await res.json();
            setRestaurant(data);
          }
          setLoading(false);
        } catch (err) {
          console.error(err);
          setLoading(false);
        }
      }
    };
    fetchRestaurantDetails();
  }, [cart.restaurantId]);

  const handleIncrement = (id) => {
    dispatch(incrementQty({ id }));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQty({ id }));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart({ id }));
    toast.success('Ürün sepetten çıkarıldı.');
  };

  // Kart Giriş Formatlayıcıları
  const handleCardNumberChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').substring(0, 16);
    const formatted = val.match(/.{1,4}/g)?.join(' ') || val;
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e) => {
    let val = e.target.value.replace(/\D/g, '').substring(0, 4);
    if (val.length >= 3) {
      val = val.substring(0, 2) + '/' + val.substring(2);
    }
    setCardExpiry(val);
  };

  const handleCvvChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').substring(0, 3);
    setCardCvv(val);
  };

  const handleCheckout = async () => {
    if (!isLoggedIn) {
      toast.error('Sipariş oluşturmak için giriş yapmalısınız.');
      navigate('/login');
      return;
    }

    if (!address || !phone) {
      toast.error('Lütfen teslimat adresi ve telefon numarasını doldurun.');
      return;
    }

    if (restaurant && cart.totalAmount < restaurant.minimumOrder) {
      toast.error(`Minimum sipariş tutarı olan ${restaurant.minimumOrder} TL limitini doldurmalısınız.`);
      return;
    }

    // Kredi kartı alanları doluluk ve format kontrolleri
    if (paymentMethod === 'card') {
      if (cardNumber.replace(/\s/g, '').length !== 16) {
        toast.error('Lütfen 16 haneli geçerli bir kart numarası girin.');
        return;
      }
      if (!cardName.trim()) {
        toast.error('Lütfen kart sahibinin adını ve soyadını girin.');
        return;
      }
      if (cardExpiry.length !== 5) {
        toast.error('Lütfen son kullanma tarihini AA/YY formatında girin.');
        return;
      }
      if (cardCvv.length !== 3) {
        toast.error('Lütfen 3 haneli CVV kodunu girin.');
        return;
      }
    }

    try {
      const deliveryFee = restaurant ? restaurant.deliveryFee : 0;
      const discountAmount = restaurant && restaurant.isDiscounted 
        ? Math.round(cart.totalAmount * (restaurant.discountRate / 100))
        : 0;
      const finalAmount = cart.totalAmount + deliveryFee - discountAmount;

      const newOrder = {
        userId: user.id,
        userName: user.name,
        restaurantId: cart.restaurantId,
        restaurantName: cart.restaurantName,
        items: cart.items,
        totalAmount: finalAmount,
        status: 'pending',
        date: new Date().toISOString(),
        address: address,
        phone: phone,
        paymentMethod: paymentMethod === 'card' ? 'Kredi Kartı' : 'Kapıda Ödeme',
      };

      const res = await fetch('http://localhost:5000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newOrder),
      });

      if (res.ok) {
        dispatch(clearCart());
        Swal.fire({
          title: 'Siparişiniz Alındı! 🎉',
          text: 'Restoran siparişinizi hazırlamaya başladı. 30-40 dakika içinde kapınızda!',
          icon: 'success',
          confirmButtonText: 'Siparişlerime Git',
          confirmButtonColor: '#9B1C1C',
        }).then(() => {
          navigate('/orders');
        });
      } else {
        toast.error('Sipariş oluşturulurken hata oluştu.');
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

  const deliveryFee = restaurant ? restaurant.deliveryFee : 0;
  const discountAmount = restaurant && restaurant.isDiscounted 
    ? Math.round(cart.totalAmount * (restaurant.discountRate / 100))
    : 0;
  const finalAmount = cart.totalAmount + deliveryFee - discountAmount;
  const isBelowMinLimit = restaurant ? cart.totalAmount < restaurant.minimumOrder : false;

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 4, color: 'secondary.main' }}>
        Sepetim ve Ödeme
      </Typography>

      {cart.items && cart.items.length > 0 ? (
        <Grid container spacing={4}>
          
          {/* SOL: ÜRÜN LİSTESİ, TESLİMAT BİLGİLERİ VE ÖDEME */}
          <Grid item xs={12} md={8} sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            
            {/* ÜRÜN LİSTESİ */}
            <CartPaper elevation={0} variant="outlined">
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                Restoran: {cart.restaurantName}
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {cart.items.map((item) => (
                  <Box 
                    key={item.id} 
                    sx={{ 
                      display: 'flex', 
                      flexDirection: { xs: 'column', sm: 'row' }, 
                      justifyContent: 'space-between', 
                      alignItems: { xs: 'flex-start', sm: 'center' },
                      gap: 2
                    }}
                  >
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 700 }}>
                        {item.name}
                      </Typography>
                      {item.selectedOptions && item.selectedOptions.length > 0 && (
                        <Typography variant="caption" color="primary" sx={{ display: 'block', fontStyle: 'italic', fontSize: '0.75rem' }}>
                          ({item.selectedOptions.join(', ')})
                        </Typography>
                      )}
                      <Typography variant="body2" color="text.secondary">
                        Birim Fiyat: {item.price} TL
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, width: { xs: '100%', sm: 'auto' }, justifyContent: 'space-between' }}>
                      <QuantityBox>
                        <IconButton size="small" onClick={() => handleDecrement(item.id)}>
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Typography variant="body2" sx={{ fontWeight: 700, minWidth: 30, textAlign: 'center' }}>
                          {item.qty}
                        </Typography>
                        <IconButton size="small" onClick={() => handleIncrement(item.id)}>
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </QuantityBox>

                      <Typography variant="subtitle1" sx={{ fontWeight: 800, minWidth: 80, textAlign: 'right' }}>
                        {item.price * item.qty} TL
                      </Typography>

                      <IconButton color="error" onClick={() => handleRemove(item.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                ))}
              </Box>
            </CartPaper>

            {/* TESLİMAT BİLGİLERİ */}
            <CartPaper elevation={0} variant="outlined">
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                <AddressIcon color="primary" /> Teslimat Bilgileri
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextField
                  label="Teslimat Adresi"
                  multiline
                  rows={3}
                  fullWidth
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Siparişinizin teslim edileceği açık adresi giriniz."
                />
                <TextField
                  label="İletişim Numarası"
                  fullWidth
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').substring(0, 10))}
                  placeholder="5XX XXX XX XX (10 Haneli)"
                  inputProps={{ maxLength: 10 }}
                />
              </Box>
            </CartPaper>

            {/* ÖDEME YÖNTEMİ SEÇİMİ (Ayrı Kutu) */}
            <CartPaper elevation={0} variant="outlined">
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                <PaymentIcon color="primary" /> Ödeme Yöntemi
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <ToggleButtonGroup
                  value={paymentMethod}
                  exclusive
                  onChange={(e, val) => val && setPaymentMethod(val)}
                  color="primary"
                >
                  <ToggleButton value="card" sx={{ px: 3, gap: 1 }}>
                    <CardBackIcon /> Kredi / Banka Kartı
                  </ToggleButton>
                  <ToggleButton value="door" sx={{ px: 3, gap: 1 }}>
                    <DoorIcon /> Kapıda Ödeme
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>
            </CartPaper>

            {/* KART ÖNİZLEME PANELİ (Ayrı Kutu) */}
            {paymentMethod === 'card' && (
              <CartPaper elevation={0} variant="outlined" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, alignSelf: 'flex-start' }}>
                  Kart Önizleme
                </Typography>
                <Divider sx={{ mb: 3, width: '100%' }} />
                
                <CardContainer sx={{ mb: 0 }}>
                  <CardInner isflipped={isFlipped ? 1 : 0}>
                    
                    {/* Kart Ön Yüzü */}
                    <CardFront>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ width: 45, height: 32, borderRadius: 1.5, background: 'linear-gradient(135deg, #e5c060 0%, #b08c2a 100%)', boxShadow: 'inset 0 1px 3px rgba(255,255,255,0.4)' }} />
                        <Typography variant="subtitle2" sx={{ fontWeight: 800, fontStyle: 'italic', opacity: 0.9 }}>
                          DELIVORA pay
                        </Typography>
                      </Box>
                      
                      <Typography variant="h5" sx={{ letterSpacing: '3px', textAlign: 'center', my: 2, fontFamily: 'monospace', fontWeight: 600 }}>
                        {cardNumber || '•••• •••• •••• ••••'}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <Box sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', maxWidth: '70%' }}>
                          <Typography variant="caption" sx={{ fontSize: '0.6rem', opacity: 0.6, display: 'block' }}>KART SAHİBİ</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px' }}>
                            {cardName || 'AD SOYAD'}
                          </Typography>
                        </Box>
                        <Box sx={{ textAlign: 'right' }}>
                          <Typography variant="caption" sx={{ fontSize: '0.6rem', opacity: 0.6, display: 'block' }}>SON KUL.</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '0.8rem' }}>
                            {cardExpiry || 'AA/YY'}
                          </Typography>
                        </Box>
                      </Box>
                    </CardFront>

                    {/* Kart Arka Yüzü */}
                    <CardBack>
                      <Box sx={{ width: 'calc(100% + 40px)', height: 35, bgcolor: '#111111', mx: -2.5, mt: 0.5 }} />
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, my: 1 }}>
                        <Box sx={{ flex: 1, height: 32, bgcolor: '#ffffff', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 1.5 }}>
                          <Typography sx={{ color: '#000000', fontStyle: 'italic', fontWeight: 700, fontFamily: 'monospace', letterSpacing: '2px', fontSize: '0.9rem' }}>
                            {cardCvv || '•••'}
                          </Typography>
                        </Box>
                        <Typography variant="caption" sx={{ fontSize: '0.65rem', opacity: 0.8, color: '#ffffff' }}>
                          CVV / CVC
                        </Typography>
                      </Box>
                      <Typography variant="caption" sx={{ fontSize: '0.55rem', opacity: 0.5, textAlign: 'center', display: 'block', mt: 1 }}>
                        Bu kart simülasyon amaçlıdır. Lütfen gerçek ödeme bilgilerinizi girmeyiniz.
                      </Typography>
                    </CardBack>

                  </CardInner>
                </CardContainer>
              </CartPaper>
            )}

            {/* KART GİRİŞ ALANLARI (Ayrı Kutu) */}
            {paymentMethod === 'card' && (
              <CartPaper elevation={0} variant="outlined">
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                  Kart Bilgileri Girişi
                </Typography>
                <Divider sx={{ mb: 3 }} />
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    label="Kart Numarası"
                    fullWidth
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="4352 •••• •••• ••••"
                    inputProps={{ maxLength: 19 }}
                  />
                  <TextField
                    label="Kart Sahibi"
                    fullWidth
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="AD SOYAD"
                  />
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        label="Son Kul. (AA/YY)"
                        fullWidth
                        value={cardExpiry}
                        onChange={handleExpiryChange}
                        placeholder="AA/YY"
                        inputProps={{ maxLength: 5 }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="CVV / CVC"
                        fullWidth
                        value={cardCvv}
                        onChange={handleCvvChange}
                        onFocus={() => setIsFlipped(true)}
                        onBlur={() => setIsFlipped(false)}
                        placeholder="•••"
                        inputProps={{ maxLength: 3 }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </CartPaper>
            )}

            {paymentMethod === 'door' && (
              <CartPaper elevation={0} variant="outlined">
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                  Kapıda Ödeme Detayı
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <Box sx={{ textAlign: 'center', py: 4, bgcolor: '#f8fafc', borderRadius: 3 }}>
                  <Typography variant="body1" sx={{ fontWeight: 600, color: 'secondary.main', mb: 1 }}>
                    Kapıda Ödeme Seçildi
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Sipariş tutarını teslimat sırasında kapıda nakit veya kredi kartı ile ödeyebilirsiniz.
                  </Typography>
                </Box>
              </CartPaper>
            )}

          </Grid>

          {/* SAĞ: SİPARİŞ ÖZETİ VE LİMİTLER */}
          <Grid item xs={12} md={4}>
            <SummaryPaper elevation={0} variant="outlined">
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <PaymentIcon color="primary" /> Sipariş Özeti
              </Typography>
              <Divider />

              {/* Sipariş Limit Uyarısı */}
              {isBelowMinLimit && restaurant && (
                <Box sx={{ bgcolor: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 2, p: 2, my: 3 }}>
                  <Typography variant="body2" color="error" sx={{ fontWeight: 700, textAlign: 'center' }}>
                    Sipariş Limiti Aşılmadı!
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mt: 0.5 }}>
                    Bu restorandan sipariş verebilmek için minimum sepet tutarı <strong>{restaurant.minimumOrder} TL</strong> olmalıdır. Eksik Tutar: <strong>{restaurant.minimumOrder - cart.totalAmount} TL</strong>
                  </Typography>
                </Box>
              )}

              <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">Sepet Toplamı</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>{cart.totalAmount} TL</Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">Gönderim Ücreti</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {deliveryFee === 0 ? 'Ücretsiz' : `${deliveryFee} TL`}
                  </Typography>
                </Box>

                {discountAmount > 0 && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', color: 'primary.main' }}>
                    <Typography variant="body2">Flaş İndirim (%{restaurant.discountRate})</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>-{discountAmount} TL</Typography>
                  </Box>
                )}

                <Divider sx={{ my: 1 }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Ödenecek Tutar</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: 'primary.main' }}>
                    {finalAmount} TL
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  onClick={handleCheckout}
                  disabled={isBelowMinLimit}
                  sx={{ py: 1.5, mt: 2, borderRadius: 3 }}
                >
                  Siparişi Tamamla
                </Button>
              </Box>
            </SummaryPaper>
          </Grid>
        </Grid>
      ) : (
        <Box 
          sx={{ 
            textAlign: 'center', 
            py: 10, 
            bgcolor: '#ffffff', 
            borderRadius: 4, 
            border: '1px solid #f1f5f9',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2
          }}
        >
          <CartIcon sx={{ fontSize: 80, color: '#cbd5e1' }} />
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Sepetiniz Boş
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 400, mb: 3 }}>
            Sepetinizde ürün bulunmamaktadır. Lezzetli menüleri keşfetmek için restoranlara göz atın.
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary" sx={{ borderRadius: 3 }}>
            Lezzetleri Keşfet
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Cart;
