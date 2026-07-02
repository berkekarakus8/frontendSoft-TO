import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Slider,
  Paper,
  Divider,
  IconButton,
  Button,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Star as StarIcon,
  LocalOffer as DiscountIcon,
} from '@mui/icons-material';
import toast from 'react-hot-toast';
import { toggleFavorite } from '../redux/slices/favoritesSlice';

// --- STYLED COMPONENTS ---

const SidebarPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 16,
  border: '1px solid #f1f5f9',
  boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
  position: 'sticky',
  top: 90,
}));

const BlinkingDiscount = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 'bold',
  fontSize: '0.8rem',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  animation: 'blink 1.2s infinite',
  '@keyframes blink': {
    '0%, 100%': { opacity: 1 },
    '50%': { opacity: 0.3 }
  }
}));

const ImageContainer = styled(Box)({
  position: 'relative',
  overflow: 'hidden',
  height: 160,
});

const ZoomImage = styled(CardMedia)({
  height: '100%',
  transition: 'transform 0.5s ease-in-out',
  '&:hover': {
    transform: 'scale(1.1)',
  },
});

const FavButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: 10,
  right: 10,
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  color: '#cbd5e1',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#ffffff',
    color: theme.palette.primary.main,
    transform: 'scale(1.1)',
  },
}));

const FilterTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: theme.spacing(1.5),
  marginTop: theme.spacing(2.5),
  color: theme.palette.secondary.main,
}));

const Restaurants = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const favorites = useSelector((state) => state.favorites.items || []);

  const [restaurants, setRestaurants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [maxMinOrder, setMaxMinOrder] = useState(300);
  const [freeDelivery, setFreeDelivery] = useState(false);
  const [onlyDiscounted, setOnlyDiscounted] = useState(false);
  const [onlyOpen, setOnlyOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [restRes, catRes] = await Promise.all([
          fetch('http://localhost:5000/restaurants'),
          fetch('http://localhost:5000/categories'),
        ]);
        const restData = await restRes.json();
        const catData = await catRes.json();
        setRestaurants(restData);
        setCategories(catData);
        setLoading(false);
      } catch (err) {
        console.error('Fetch error', err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCategoryChange = (categoryName) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((c) => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  const handleFavoriteToggle = (e, rest) => {
    e.stopPropagation();
    dispatch(toggleFavorite(rest));
    
    const isFav = favorites.some((item) => item.id === rest.id);
    if (isFav) {
      toast.success(`${rest.name} favorilerden çıkarıldı.`);
    } else {
      toast.success(`${rest.name} favorilere eklendi!`, { icon: '❤️' });
    }
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setMinRating(0);
    setMaxMinOrder(300);
    setFreeDelivery(false);
    setOnlyDiscounted(false);
    setOnlyOpen(false);
  };

  // Local Filtering logic
  const filteredRestaurants = restaurants.filter((rest) => {
    // Category check
    if (selectedCategories.length > 0 && !selectedCategories.includes(rest.category)) {
      return false;
    }
    // Rating check
    if (rest.rating < minRating) {
      return false;
    }
    // Minimum Order check
    if (rest.minimumOrder > maxMinOrder) {
      return false;
    }
    // Free Delivery check
    if (freeDelivery && rest.deliveryFee !== 0) {
      return false;
    }
    // Discount check
    if (onlyDiscounted && !rest.isDiscounted) {
      return false;
    }
    // Open check
    if (onlyOpen && !rest.isOpen) {
      return false;
    }
    return true;
  });

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 4, color: 'secondary.main' }}>
        Tüm Lezzetler
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} sm={4} md={3}>
          <SidebarPaper elevation={0} variant="outlined">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Filtreler
              </Typography>
              <Button size="small" onClick={resetFilters} sx={{ textTransform: 'none', fontWeight: 600 }}>
                Temizle
              </Button>
            </Box>
            <Divider />

            {/* Kategori Filtresi */}
            <FilterTitle variant="subtitle2">Kategoriler</FilterTitle>
            <FormGroup>
              {categories.map((cat) => (
                <FormControlLabel
                  key={cat.id}
                  control={
                    <Checkbox
                      checked={selectedCategories.includes(cat.name)}
                      onChange={() => handleCategoryChange(cat.name)}
                      color="primary"
                    />
                  }
                  label={cat.name}
                />
              ))}
            </FormGroup>

            {/* Puan Filtresi */}
            <FilterTitle variant="subtitle2">Minimum Puan: {minRating > 0 ? `${minRating}+` : 'Hepsi'}</FilterTitle>
            <Slider
              value={minRating}
              onChange={(e, val) => setMinRating(val)}
              min={0}
              max={5}
              step={0.1}
              marks={[
                { value: 0, label: '0' },
                { value: 3, label: '3' },
                { value: 4, label: '4' },
                { value: 5, label: '5' },
              ]}
              valueLabelDisplay="auto"
              color="primary"
            />

            {/* Minimum Sipariş Tutarı */}
            <FilterTitle variant="subtitle2">Maksimum Min. Sipariş: {maxMinOrder} TL</FilterTitle>
            <Slider
              value={maxMinOrder}
              onChange={(e, val) => setMaxMinOrder(val)}
              min={50}
              max={300}
              step={10}
              valueLabelDisplay="auto"
              color="primary"
            />

            {/* Diğer Kriterler */}
            <FilterTitle variant="subtitle2">Kriterler</FilterTitle>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={freeDelivery}
                    onChange={(e) => setFreeDelivery(e.target.checked)}
                    color="primary"
                  />
                }
                label="Ücretsiz Teslimat"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={onlyDiscounted}
                    onChange={(e) => setOnlyDiscounted(e.target.checked)}
                    color="primary"
                  />
                }
                label="İndirimli Restoranlar"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={onlyOpen}
                    onChange={(e) => setOnlyOpen(e.target.checked)}
                    color="primary"
                  />
                }
                label="Açık Restoranlar"
              />
            </FormGroup>
          </SidebarPaper>
        </Grid>

        <Grid item xs={12} sm={8} md={9}>
          {filteredRestaurants.length === 0 ? (
            <Box 
              sx={{ 
                textAlign: 'center', 
                py: 10, 
                bgcolor: '#ffffff', 
                borderRadius: 4, 
                border: '1px solid #f1f5f9',
                boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
              }}
            >
              <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 600 }}>
                Eşleşen restoran bulunamadı.
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Filtrelerinizi temizleyerek veya değiştirerek tekrar deneyebilirsiniz.
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {filteredRestaurants.map((rest) => {
                const isFav = favorites.some((item) => item.id === rest.id);
                return (
                  <Grid item xs={12} sm={6} key={rest.id}>
                    <Card 
                      onClick={() => navigate(`/restaurant/${rest.id}`)}
                      sx={{ height: '100%', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
                    >
                      <ImageContainer>
                        <ZoomImage
                          component="img"
                          image={rest.image}
                          alt={rest.name}
                        />
                        <FavButton onClick={(e) => handleFavoriteToggle(e, rest)}>
                          {isFav ? <FavoriteIcon sx={{ color: 'primary.main' }} /> : <FavoriteBorderIcon />}
                        </FavButton>
                      </ImageContainer>

                      <CardContent sx={{ flexGrow: 1, p: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                          {rest.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                          {rest.category}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2 }}>
                          <StarIcon sx={{ color: '#FFB703', fontSize: 18 }} />
                          <Typography variant="body2" sx={{ fontWeight: 700 }}>
                            {rest.rating}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                            • {rest.deliveryTime}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto', pt: 1 }}>
                          <Typography variant="caption" color="text.secondary">
                            Min: {rest.minimumOrder} TL
                          </Typography>
                          
                          {rest.isDiscounted ? (
                            <BlinkingDiscount>
                              <DiscountIcon fontSize="inherit" />
                              %{rest.discountRate} İndirim
                            </BlinkingDiscount>
                          ) : (
                            <Typography variant="caption" color="success.main" sx={{ fontWeight: 600 }}>
                              {rest.deliveryFee === 0 ? 'Ücretsiz Teslimat' : `${rest.deliveryFee} TL Teslimat`}
                            </Typography>
                          )}
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Restaurants;
