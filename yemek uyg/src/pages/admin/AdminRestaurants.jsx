import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Checkbox,
  Grid,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

// [AdminRestaurants / Restoran Yönetim Paneli]: Sistem yöneticilerinin sisteme yeni restoran eklediği, güncellediği veya sildiği sayfa
const AdminRestaurants = () => {
  // Restoran listesi, yüklenme ve arama metni state tanımları
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Dialog (Modal) açılış durumları, edit modu ve seçilen restoran ID'si
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // Yeni/Düzenlenecek restoran form veri state alanları
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [rating, setRating] = useState(4.5);
  const [minimumOrder, setMinimumOrder] = useState(100);
  const [deliveryTime, setDeliveryTime] = useState('30-40 dk');
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [isDiscounted, setIsDiscounted] = useState(false);
  const [discountRate, setDiscountRate] = useState(0);
  const [isOpen, setIsOpen] = useState(true);

  // Tablolama (Pagination) sayfa ve satır sayısı verileri
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // [Restoranları Çekme Fonksiyonu]: Backend veritabanından güncel restoran listesini alır
  const fetchRestaurants = async () => {
    try {
      const res = await fetch('http://localhost:5000/restaurants');
      if (res.ok) {
        const data = await res.json();
        setRestaurants(data);
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      toast.error('Restoran listesi yüklenemedi.');
      setLoading(false);
    }
  };

  // Sayfa yüklendiğinde restoranları getirir
  useEffect(() => {
    fetchRestaurants();
  }, []);

  // [Ekleme Dialogunu Açma]: Form alanlarını başlangıç değerleriyle sıfırlayarak boş bir modal açar
  const handleOpenAdd = () => {
    setEditMode(false);
    setSelectedId(null);
    setName('');
    setCategory('Burger');
    setImage('/assets/food_burger.png');
    setRating(4.5);
    setMinimumOrder(100);
    setDeliveryTime('30-40 dk');
    setDeliveryFee(0);
    setIsDiscounted(false);
    setDiscountRate(0);
    setIsOpen(true);
    setDialogOpen(true);
  };

  // [Düzenleme Dialogunu Açma]: Seçilen restoranın mevcut verilerini form alanlarına doldurur
  const handleOpenEdit = (rest) => {
    setEditMode(true);
    setSelectedId(rest.id);
    setName(rest.name);
    setCategory(rest.category);
    setImage(rest.image);
    setRating(rest.rating);
    setMinimumOrder(rest.minimumOrder);
    setDeliveryTime(rest.deliveryTime);
    setDeliveryFee(rest.deliveryFee);
    setIsDiscounted(rest.isDiscounted);
    setDiscountRate(rest.discountRate);
    setIsOpen(rest.isOpen);
    setDialogOpen(true);
  };

  // [Kaydetme / Güncelleme Eylemi]: EditModuna göre PUT veya POST isteği gönderir ve verileri günceller
  const handleSave = async (e) => {
    e.preventDefault();
    if (!name || !category || !image || !deliveryTime) {
      toast.error('Lütfen gerekli alanları doldurun.');
      return;
    }

    const restaurantData = {
      name,
      category,
      image,
      rating: parseFloat(rating),
      minimumOrder: parseInt(minimumOrder),
      deliveryTime,
      deliveryFee: parseInt(deliveryFee),
      isDiscounted,
      discountRate: isDiscounted ? parseInt(discountRate) : 0,
      isOpen,
    };

    try {
      let res;
      if (editMode) {
        res = await fetch(`http://localhost:5000/restaurants/${selectedId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(restaurantData),
        });
      } else {
        res = await fetch('http://localhost:5000/restaurants', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(restaurantData),
        });
      }

      if (res.ok) {
        toast.success(editMode ? 'Restoran güncellendi.' : 'Restoran eklendi.');
        setDialogOpen(false);
        fetchRestaurants();
      } else {
        toast.error('Kayıt işlemi başarısız.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Bağlantı hatası.');
    }
  };

  // [Restoran Silme]: Swal onayı alarak veritabanından restoran kaydını kalıcı olarak kaldırır
  const handleDelete = async (id, restName) => {
    Swal.fire({
      title: 'Emin misiniz?',
      text: `${restName} restoranı ve ona ait veriler silinecektir!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#9B1C1C',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Evet, Sil!',
      cancelButtonText: 'İptal',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`http://localhost:5000/restaurants/${id}`, {
            method: 'DELETE',
          });
          if (res.ok) {
            toast.success('Restoran silindi.');
            fetchRestaurants();
          } else {
            toast.error('Silme başarısız.');
          }
        } catch (err) {
          console.error(err);
          toast.error('Bağlantı hatası.');
        }
      }
    });
  };

  // Restoran ismine göre arama filtresi süzgeci
  const filteredRestaurants = restaurants.filter((rest) =>
    rest.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 800 }}>
          Restoran Yönetimi
        </Typography>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleOpenAdd}>
          Yeni Restoran Ekle
        </Button>
      </Box>

      {/* Arama Filtresi */}
      <Paper sx={{ p: 2, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
        <SearchIcon color="action" />
        <TextField
          variant="standard"
          placeholder="Restoran ismi ile ara..."
          fullWidth
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setPage(0);
          }}
          InputProps={{ disableUnderline: true }}
        />
      </Paper>

      {/* Restoran Listesi Tablosu */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Restoran Adı</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Kategori</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Puan</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Min. Sipariş</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>İndirim</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Durum</TableCell>
              <TableCell sx={{ fontWeight: 700, align: 'right' }}>Aksiyonlar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRestaurants
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{row.name}</TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>{row.rating}</TableCell>
                  <TableCell>{row.minimumOrder} TL</TableCell>
                  <TableCell>{row.isDiscounted ? `%${row.discountRate}` : '-'}</TableCell>
                  <TableCell>{row.isOpen ? 'Açık' : 'Kapalı'}</TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => handleOpenEdit(row)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(row.id, row.name)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            {filteredRestaurants.length === 0 && !loading && (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ py: 3, color: 'text.secondary' }}>
                  Restoran bulunamadı.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredRestaurants.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          labelRowsPerPage="Satır sayısı:"
        />
      </TableContainer>

      {/* Restoran Ekleme/Düzenleme Dialogu */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>
          {editMode ? 'Restoran Bilgilerini Düzenle' : 'Yeni Restoran Ekle'}
        </DialogTitle>
        <form onSubmit={handleSave}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Restoran Adı"
                  fullWidth
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Kategori"
                  fullWidth
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Resim URL"
                  fullWidth
                  required
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Puan"
                  type="number"
                  inputProps={{ step: 0.1, min: 0, max: 5 }}
                  fullWidth
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Minimum Sipariş Limiti (TL)"
                  type="number"
                  fullWidth
                  value={minimumOrder}
                  onChange={(e) => setMinimumOrder(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Teslimat Süresi"
                  fullWidth
                  value={deliveryTime}
                  onChange={(e) => setDeliveryTime(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Teslimat Ücreti (TL)"
                  type="number"
                  fullWidth
                  value={deliveryFee}
                  onChange={(e) => setDeliveryFee(e.target.value)}
                />
              </Grid>

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

              {isDiscounted && (
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="İndirim Oranı (%)"
                    type="number"
                    fullWidth
                    value={discountRate}
                    onChange={(e) => setDiscountRate(e.target.value)}
                  />
                </Grid>
              )}

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
          </DialogContent>
          
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setDialogOpen(false)}>İptal</Button>
            <Button type="submit" variant="contained" color="primary">
              {editMode ? 'Güncelle' : 'Kaydet'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default AdminRestaurants;
