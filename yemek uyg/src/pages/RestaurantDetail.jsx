import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Button,
  Divider,
  Paper,
  IconButton,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Star as StarIcon,
  AccessTime as TimeIcon,
  DeliveryDining as DeliveryIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  ShoppingCartCheckout as CheckoutIcon,
} from '@mui/icons-material';
import toast from 'react-hot-toast';
import { addToCart, incrementQty, decrementQty, removeFromCart } from '../redux/slices/cartSlice';

// --- STYLED COMPONENTS ---

const RestaurantHeader = styled(Paper)(({ theme }) => ({
  borderRadius: 24,
  overflow: 'hidden',
  marginBottom: theme.spacing(4),
  border: '1px solid #f1f5f9',
  boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
}));

const MenuCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  borderRadius: 16,
  border: '1px solid #f1f5f9',
  boxShadow: 'none',
  transition: 'all 0.3s ease',
  overflow: 'hidden',
  '&:hover': {
    boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
    transform: 'translateY(-2px)',
  },
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}));

const CartSidebar = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 16,
  border: '1px solid #f1f5f9',
  boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
  position: 'sticky',
  top: 90,
}));

const RestaurantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const [restaurant, setRestaurant] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Customization Dialog States
  const [customOpen, setCustomOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);
  const [checkedOptions, setCheckedOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [restRes, prodRes] = await Promise.all([
          fetch(`http://localhost:5000/restaurants/${id}`),
          fetch(`http://localhost:5000/products?restaurantId=${id}`),
        ]);
        
        if (!restRes.ok) {
          toast.error('Restoran bulunamadı.');
          navigate('/');
          return;
        }

        const restData = await restRes.json();
        const prodData = await prodRes.json();

        setRestaurant(restData);
        setProducts(prodData);
        setLoading(false);
      } catch (err) {
        console.error('Fetch detail error', err);
        setLoading(false);
      }
    };
    fetchData();
  }, [id, navigate]);

  const handleAddToCart = (product) => {
    // Check if adding from different restaurant to trigger custom toast info
    if (cart.restaurantId && cart.restaurantId !== id) {
      toast((t) => (
        <span>
          Sepetinizdeki diğer restoran ürünleri silinerek <b>{restaurant.name}</b> ürünleri eklendi.
        </span>
      ), { icon: 'ℹ️', duration: 4000 });
    } else {
      toast.success(`${product.name} sepete eklendi.`);
    }

    dispatch(addToCart({
      item: product,
      restaurantId: id,
      restaurantName: restaurant.name,
    }));
  };

  const handleOpenCustomization = (product) => {
    setActiveProduct(product);
    setCheckedOptions([]);
    setCustomOpen(true);
  };

  const handleIncrement = (itemId) => {
    dispatch(incrementQty({ id: itemId }));
  };

  const handleDecrement = (itemId) => {
    dispatch(decrementQty({ id: itemId }));
  };

  const handleRemove = (itemId) => {
    dispatch(removeFromCart({ id: itemId }));
    toast.success('Ürün sepetten çıkarıldı.');
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      
      {/* RESTORAN BANNER & DETAYLAR */}
      {restaurant && (
        <RestaurantHeader elevation={0}>
          <Grid container>
            <Grid item xs={12} md={5}>
              <Box sx={{ height: { xs: 220, md: '100%' }, minHeight: 220 }}>
                <img 
                  src={restaurant.image} 
                  alt={restaurant.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Box>
            </Grid>
            
            <Grid item xs={12} md={7} sx={{ p: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4" sx={{ fontWeight: 800 }}>
                  {restaurant.name}
                </Typography>
                {restaurant.isDiscounted && (
                  <Box sx={{ bgcolor: 'primary.main', color: '#ffffff', py: 0.5, px: 2, borderRadius: 2, fontWeight: 700, fontSize: '0.85rem' }}>
                    %{restaurant.discountRate} İndirim
                  </Box>
                )}
              </Box>

              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Kategori: <strong>{restaurant.category}</strong>
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={6} sm={4}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <StarIcon sx={{ color: '#FFB703' }} />
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                        {restaurant.rating} / 5.0
                      </Typography>
                      <Typography variant="caption" color="text.secondary">Puan</Typography>
                    </Box>
                  </Box>
                </Grid>
                
                <Grid item xs={6} sm={4}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <TimeIcon sx={{ color: 'primary.main' }} />
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                        {restaurant.deliveryTime}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">Teslimat Süresi</Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={6} sm={4}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <DeliveryIcon sx={{ color: 'success.main' }} />
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                        {restaurant.minimumOrder} TL
                      </Typography>
                      <Typography variant="caption" color="text.secondary">Min. Sipariş</Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </RestaurantHeader>
      )}

      {/* MENÜ LİSTESİ VE SEPET SİDEBAR */}
      <Grid container spacing={4}>
        {/* MENÜ (SOL) */}
        <Grid item xs={12} md={8}>
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, color: 'secondary.main' }}>
            Menü / Yemekler
          </Typography>

          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item xs={12} key={product.id}>
                <MenuCard>
                  <CardMedia
                    component="img"
                    sx={{ width: { xs: '100%', sm: 160 }, height: 130, objectFit: 'cover' }}
                    image={product.image}
                    alt={product.name}
                  />
                  <CardContent sx={{ flex: 1, p: 3, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 0.5 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                          {product.name}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: 'primary.main' }}>
                          {product.price} TL
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {product.description}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                      <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<AddIcon />}
                        size="small"
                        onClick={() => handleOpenCustomization(product)}
                        sx={{ borderRadius: 2 }}
                      >
                        Sepete Ekle
                      </Button>
                    </Box>
                  </CardContent>
                </MenuCard>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* SEPET SİDEBAR (SAĞ) */}
        <Grid item xs={12} md={4}>
          <CartSidebar elevation={0} variant="outlined">
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <CheckoutIcon color="primary" /> Sepetim
            </Typography>
            <Divider />

            {cart.items && cart.items.length > 0 ? (
              <Box sx={{ mt: 2 }}>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
                  Sipariş Verilen Restoran: <strong>{cart.restaurantName}</strong>
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxHeight: 300, overflowY: 'auto', pr: 1 }}>
                  {cart.items.map((item) => (
                    <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ maxWidth: '60%' }}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {item.name}
                        </Typography>
                        {item.selectedOptions && item.selectedOptions.length > 0 && (
                          <Typography variant="caption" color="primary" sx={{ display: 'block', fontStyle: 'italic', fontSize: '0.75rem' }}>
                            ({item.selectedOptions.join(', ')})
                          </Typography>
                        )}
                        <Typography variant="caption" color="text.secondary">
                          {item.price} TL x {item.qty}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <IconButton size="small" onClick={() => handleDecrement(item.id)}>
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Typography variant="body2" sx={{ fontWeight: 700, minWidth: 20, textAlign: 'center' }}>
                          {item.qty}
                        </Typography>
                        <IconButton size="small" onClick={() => handleIncrement(item.id)}>
                          <AddIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" color="error" onClick={() => handleRemove(item.id)}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  ))}
                </Box>

                <Divider sx={{ my: 3 }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    Toplam Tutar:
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: 'primary.main' }}>
                    {cart.totalAmount} TL
                  </Typography>
                </Box>

                <Button
                  component={Link}
                  to="/cart"
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  sx={{ py: 1.5, borderRadius: 3 }}
                >
                  Sepete Git ve Onayla
                </Button>
              </Box>
            ) : (
              <Box sx={{ textAlign: 'center', py: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  Sepetiniz şu anda boş.
                </Typography>
              </Box>
            )}
          </CartSidebar>
        </Grid>
      </Grid>

      {/* ÜRÜN ÖZELLEŞTİRME DIALOGU */}
      <Dialog 
        open={customOpen} 
        onClose={() => setCustomOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: 4 } }}
      >
        {activeProduct && (
          <>
            <DialogTitle sx={{ fontWeight: 800 }}>
              {activeProduct.name} Özelleştir
            </DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="body2" color="text.secondary">
                {activeProduct.description}
              </Typography>
              
              <Box sx={{ width: '100%', height: 160, borderRadius: 2, overflow: 'hidden' }}>
                <img 
                  src={activeProduct.image} 
                  alt={activeProduct.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Box>

              <Divider />
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                Ekstra Malzemeler / Seçenekler
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {activeProduct.options && activeProduct.options.map((opt, idx) => {
                  const isChecked = checkedOptions.some(o => o.name === opt.name);
                  return (
                    <FormControlLabel
                      key={idx}
                      control={
                        <Checkbox
                          checked={isChecked}
                          color="primary"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setCheckedOptions(prev => [...prev, opt]);
                            } else {
                              setCheckedOptions(prev => prev.filter(o => o.name !== opt.name));
                            }
                          }}
                        />
                      }
                      label={opt.name}
                    />
                  );
                })}
              </Box>
            </DialogContent>
            
            <DialogActions sx={{ p: 3, pt: 0 }}>
              <Button onClick={() => setCustomOpen(false)}>Vazgeç</Button>
              <Button 
                variant="contained" 
                color="primary"
                onClick={() => {
                  const optionPriceSum = checkedOptions.reduce((acc, o) => acc + o.price, 0);
                  const finalPrice = activeProduct.price + optionPriceSum;
                  const selectedNames = checkedOptions.map(o => o.name);

                  // Unique cart ID based on options selected
                  const uniqueCartId = activeProduct.id + (selectedNames.length > 0 ? '-' + selectedNames.sort().join('-') : '');

                  const customizedProduct = {
                    ...activeProduct,
                    id: uniqueCartId,
                    price: finalPrice,
                    selectedOptions: selectedNames
                  };

                  handleAddToCart(customizedProduct);
                  setCustomOpen(false);
                }}
                sx={{ borderRadius: 2 }}
              >
                Sepete Ekle ({activeProduct.price + checkedOptions.reduce((acc, o) => acc + o.price, 0)} TL)
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

    </Container>
  );
};

export default RestaurantDetail;
