import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Button,
  Grid,
  Dialog,
  DialogContent,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Star as StarIcon,
  AccessTime as TimeIcon,
  DeliveryDining as DeliveryIcon,
  LocalOffer as DiscountIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { toggleFavorite } from '../redux/slices/favoritesSlice';

// --- STYLED COMPONENTS ---

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  marginBottom: theme.spacing(3),
  color: theme.palette.secondary.main,
  position: 'relative',
  display: 'inline-block',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -6,
    left: 0,
    width: '40px',
    height: '4px',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '2px',
  },
}));

// Blinking effect for flash discounts
const BlinkingDiscount = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 'bold',
  fontSize: '0.85rem',
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
  height: 180,
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

const InteractiveCampaignsContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#fef2f2',
  border: `1px dashed ${theme.palette.primary.main}`,
  borderRadius: 16,
  padding: theme.spacing(3),
  margin: theme.spacing(4, 0),
  overflow: 'hidden',
  position: 'relative',
  cursor: 'pointer',
}));

const CampaignMarquee = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: '30px',
  width: 'max-content',
  animationPlayState: 'paused',
  '&:hover': {
    animation: 'marqueeScroll 15s linear infinite',
    animationPlayState: 'running',
  },
  '@keyframes marqueeScroll': {
    '0%': { transform: 'translateX(0)' },
    '100%': { transform: 'translateX(-50%)' },
  },
}));

const WelcomeDialogContent = styled(DialogContent)({
  textAlign: 'center',
  padding: '40px 24px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '16px',
});

// Gradient/Fill hover button (flows left to right)
const GradientHoverButton = styled(Button)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  color: theme.palette.primary.main,
  border: `2px solid ${theme.palette.primary.main}`,
  backgroundColor: 'transparent',
  fontWeight: 'bold',
  padding: '10px 30px',
  zIndex: 1,
  transition: 'color 0.4s ease-in-out',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.primary.main,
    zIndex: -1,
    transform: 'scaleX(0)',
    transformOrigin: 'left',
    transition: 'transform 0.4s ease-in-out',
  },
  '&:hover': {
    color: '#ffffff',
    borderColor: theme.palette.primary.main,
    backgroundColor: 'transparent', // Override MUI default hover background
    '&::before': {
      transform: 'scaleX(1)',
    },
  },
}));

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const favorites = useSelector((state) => state.favorites.items || []);
  
  const [restaurants, setRestaurants] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Welcome Indirim Popup States
  const [welcomeOpen, setWelcomeOpen] = useState(false);
  const [selectedWelcomeRest, setSelectedWelcomeRest] = useState(null);

  // Auto Slider States (Recommended)
  const [sliderIndex, setSliderIndex] = useState(0);
  const autoSliderTimer = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [restRes, campRes] = await Promise.all([
          fetch('http://localhost:5000/restaurants'),
          fetch('http://localhost:5000/campaigns'),
        ]);
        const restData = await restRes.json();
        const campData = await campRes.json();

        setRestaurants(restData);
        setCampaigns(campData);
        setLoading(false);

        // Show welcome popup with a random restaurant
        if (restData.length > 0) {
          const randomIndex = Math.floor(Math.random() * restData.length);
          const chosenRest = restData[randomIndex];
          // Make sure it has a discount for maximum impact
          const discountedOnes = restData.filter(r => r.isDiscounted);
          const popupRest = discountedOnes.length > 0 
            ? discountedOnes[Math.floor(Math.random() * discountedOnes.length)]
            : chosenRest;
          
          setSelectedWelcomeRest(popupRest);
          setWelcomeOpen(true);
        }
      } catch (err) {
        console.error('Data fetch error', err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Recommended Restaurants Slider Timer (5 seconds)
  useEffect(() => {
    if (restaurants.length > 0) {
      autoSliderTimer.current = setInterval(() => {
        setSliderIndex((prev) => (prev + 1) % restaurants.length);
      }, 5000);
    }
    
    // Memory leak cleanup
    return () => {
      if (autoSliderTimer.current) {
        clearInterval(autoSliderTimer.current);
      }
    };
  }, [restaurants]);

  const handleFavoriteToggle = (e, rest) => {
    e.stopPropagation(); // Avoid card click navigation
    dispatch(toggleFavorite(rest));
    
    const isFav = favorites.some((item) => item.id === rest.id);
    if (isFav) {
      toast.success(`${rest.name} favorilerden çıkarıldı.`);
    } else {
      toast.success(`${rest.name} favorilere eklendi!`, {
        icon: '❤️',
      });
    }
  };

  const handleCardClick = (id) => {
    navigate(`/restaurant/${id}`);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  // Double campaigns list for seamless looping marquee on hover
  const doubledCampaigns = [...campaigns, ...campaigns];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      
      {/* 1. ÖNERİLEN RESTORANLAR (AUTO SLIDER) */}
      <Box sx={{ mb: 6 }}>
        <SectionTitle variant="h5">Önerilen Restoranlar</SectionTitle>
        <Box sx={{ position: 'relative', overflow: 'hidden', borderRadius: 4, height: 260 }}>
          <AnimatePresence mode="wait">
            {restaurants.length > 0 && (
              <motion.div
                key={sliderIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.6 }}
                style={{ width: '100%', height: '100%' }}
              >
                <Card 
                  onClick={() => handleCardClick(restaurants[sliderIndex].id)}
                  sx={{ 
                    display: 'flex', 
                    flexDirection: { xs: 'column', sm: 'row' }, 
                    height: '100%', 
                    cursor: 'pointer',
                    borderRadius: 4,
                    overflow: 'hidden'
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{ width: { xs: '100%', sm: '45%' }, height: { xs: 150, sm: '100%' } }}
                    image={restaurants[sliderIndex].image}
                    alt={restaurants[sliderIndex].name}
                  />
                  <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', p: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="h4" sx={{ fontWeight: 800 }}>
                        {restaurants[sliderIndex].name}
                      </Typography>
                      {restaurants[sliderIndex].isDiscounted && (
                        <BlinkingDiscount>
                          <DiscountIcon fontSize="small" />
                          %{restaurants[sliderIndex].discountRate} İndirim!
                        </BlinkingDiscount>
                      )}
                    </Box>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                      En sevilen {restaurants[sliderIndex].category} lezzetleri şimdi indirimli fiyatlarla kapınızda.
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <StarIcon sx={{ color: '#FFB703' }} />
                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                          {restaurants[sliderIndex].rating}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                        <TimeIcon fontSize="small" />
                        <Typography variant="body2">{restaurants[sliderIndex].deliveryTime}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                        <DeliveryIcon fontSize="small" />
                        <Typography variant="body2">
                          Min. Sipariş: {restaurants[sliderIndex].minimumOrder} TL
                        </Typography>
                      </Box>
                    </Box>
                    <Box>
                      <Button variant="contained" color="primary" endIcon={<ArrowForwardIcon />}>
                        Menüyü İncele
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
      </Box>

      {/* 2. İNTERAKTİF KAMPANYALAR (HOVER SLIDER) */}
      <InteractiveCampaignsContainer>
        <Typography variant="subtitle2" sx={{ color: 'primary.main', fontWeight: 800, mb: 1 }}>
          💡 Fırsatı Yakala! (Harekete geçirmek için fareyi üzerine getirin)
        </Typography>
        <CampaignMarquee>
          {doubledCampaigns.map((camp, idx) => (
            <Box 
              key={idx} 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1, 
                bgcolor: '#ffffff', 
                py: 1, 
                px: 2, 
                borderRadius: 2,
                border: '1px solid #fee2e2'
              }}
            >
              <DiscountIcon color="primary" />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {camp.title}:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {camp.text}
              </Typography>
            </Box>
          ))}
        </CampaignMarquee>
      </InteractiveCampaignsContainer>

      {/* 3. TÜM RESTORANLAR KART LISTESI */}
      <Box sx={{ mt: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <SectionTitle variant="h5">Tüm Restoranlar</SectionTitle>
          <Button onClick={() => navigate('/restaurants')} color="primary" sx={{ fontWeight: 700 }}>
            Hepsini Gör
          </Button>
        </Box>

        <Grid container spacing={3}>
          {restaurants.map((rest) => {
            const isFav = favorites.some((item) => item.id === rest.id);
            return (
              <Grid item xs={12} sm={6} md={3} key={rest.id}>
                <Card 
                  onClick={() => handleCardClick(rest.id)}
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

                  <CardContent sx={{ flexGrow: 1, p: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
                      {rest.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {rest.category}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                      <StarIcon sx={{ color: '#FFB703', fontSize: 18 }} />
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>
                        {rest.rating}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                        • {rest.deliveryTime}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
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
      </Box>

      {/* 4. HOŞ GELDİNİZ İNDİRİM POP-UP */}
      <Dialog
        open={welcomeOpen}
        onClose={() => setWelcomeOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: 6, overflow: 'hidden' } }}
      >
        {selectedWelcomeRest && (
          <WelcomeDialogContent>
            <Typography variant="h5" sx={{ fontWeight: 800, color: 'secondary.main' }}>
              Günün Flaş Fırsatı! 🍽️
            </Typography>
            <Box sx={{ width: '100%', height: 180, borderRadius: 3, overflow: 'hidden', my: 1 }}>
              <img 
                src={selectedWelcomeRest.image} 
                alt={selectedWelcomeRest.name} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {selectedWelcomeRest.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Bugün bu restorana özel kaçırılmayacak bir teklif var!
            </Typography>
            
            <Box 
              sx={{ 
                bgcolor: 'primary.main', 
                color: '#ffffff', 
                py: 1, 
                px: 3, 
                borderRadius: 2, 
                fontWeight: 800,
                fontSize: '1.2rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <DiscountIcon />
              %25 NET İNDİRİM
            </Box>

            <Box sx={{ width: '100%', display: 'flex', gap: 2, mt: 2 }}>
              <Button 
                variant="text" 
                onClick={() => setWelcomeOpen(false)} 
                fullWidth
                sx={{ color: 'text.secondary' }}
              >
                Kapat
              </Button>
              <GradientHoverButton 
                onClick={() => {
                  setWelcomeOpen(false);
                  handleCardClick(selectedWelcomeRest.id);
                }} 
                fullWidth
              >
                Fırsatı Yakala
              </GradientHoverButton>
            </Box>
          </WelcomeDialogContent>
        )}
      </Dialog>

    </Container>
  );
};

export default Home;
