import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  Button,
  Grid,
  Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Delete as RemoveIcon,
  Restaurant as OrderIcon,
  ArrowForward as ArrowIcon,
} from '@mui/icons-material';
import toast from 'react-hot-toast';
import { toggleFavorite } from '../redux/slices/favoritesSlice';

const FavoriteCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  borderRadius: 16,
  border: '1px solid #f1f5f9',
  boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
  overflow: 'hidden',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
  },
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}));

// Hover goes red button for removal
const RemoveBtn = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  borderColor: '#cbd5e1',
  color: '#64748b',
  borderRadius: 8,
  '&:hover': {
    backgroundColor: '#fef2f2',
    color: '#dc2626',
    borderColor: '#fca5a5',
  },
}));

// Instant transition button (starts red, goes white on hover)
const InstantOrderBtn = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  backgroundColor: '#9B1C1C',
  color: '#ffffff',
  borderRadius: 8,
  transition: 'none', // Instant transition color/background change
  '&:hover': {
    backgroundColor: '#ffffff',
    color: '#9B1C1C',
    border: '1px solid #9B1C1C',
  },
}));

const Favorites = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favorites = useSelector((state) => state.favorites.items || []);

  const handleRemove = (rest) => {
    dispatch(toggleFavorite(rest));
    toast.success(`${rest.name} favorilerden çıkarıldı.`);
  };

  const handleOrder = (id) => {
    navigate(`/restaurant/${id}`);
  };

  return (
    <Container maxWidth="md" sx={{ py: 6, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 4, color: 'secondary.main' }}>
        Favori Restoranlarım
      </Typography>

      {favorites.length === 0 ? (
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
          <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 600 }}>
            Henüz favori restoranınız bulunmuyor.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 400, mb: 2 }}>
            Sipariş vermekten keyif aldığınız restoranları favorilerinize ekleyerek burada hızlıca listeleyebilirsiniz.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {favorites.map((rest) => (
            <Grid item xs={12} key={rest.id}>
              <FavoriteCard>
                <CardMedia
                  component="img"
                  sx={{ width: { xs: '100%', sm: 180 }, height: 140, objectFit: 'cover' }}
                  image={rest.image}
                  alt={rest.name}
                />
                
                <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 3 }}>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {rest.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Kategori: {rest.category} • Puan: {rest.rating}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2 }}>
                    <RemoveBtn 
                      variant="outlined" 
                      startIcon={<RemoveIcon />}
                      onClick={() => handleRemove(rest)}
                    >
                      Favorilerden Çıkar
                    </RemoveBtn>
                    <InstantOrderBtn 
                      variant="contained" 
                      startIcon={<OrderIcon />}
                      onClick={() => handleOrder(rest.id)}
                    >
                      Sipariş Ver
                    </InstantOrderBtn>
                  </Box>
                </CardContent>
              </FavoriteCard>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Alt Gezinti Butonu (Restoranlara Göz At) */}
      <Box sx={{ mt: 'auto', pt: 6, display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          endIcon={<ArrowIcon />}
          onClick={() => navigate('/restaurants')}
          sx={{ 
            width: { xs: '100%', sm: '50%', md: '33%' }, 
            py: 1.5, 
            fontWeight: 700,
            borderRadius: 3
          }}
        >
          Restoranlara Göz At
        </Button>
      </Box>
    </Container>
  );
};

export default Favorites;
