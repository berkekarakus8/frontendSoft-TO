import { createTheme } from '@mui/material/styles';

// Keyframes for custom animations can be injected as global styles
const theme = createTheme({
  palette: {
    primary: {
      main: '#9B1C1C', // Koyu Bordo / Sıcak Tuğla Kırmızısı
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#111827', // Gece Mavisi / Koyu Kömür
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8fafc', // Açık Gri/Mavi (Gövde arka planı)
      paper: '#ffffff', // Kartlar, diyaloglar vb.
    },
    success: {
      main: '#22C55E', // Zümrüt Yeşili
    },
    warning: {
      main: '#FACC15', // Altın Sarısı
    },
    error: {
      main: '#DC2626', // Hata / Pasif rengi
    },
    text: {
      primary: '#111827',
      secondary: '#6b7280',
    },
  },
  typography: {
    fontFamily: '"Outfit", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12, // Modern yumuşak kenarlar
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          transition: 'all 0.3s ease-in-out',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 4px 12px rgba(155, 28, 28, 0.2)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
  },
});

// Blink keyframes for flash discount
export const blinkKeyframes = `
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }
`;

export default theme;
