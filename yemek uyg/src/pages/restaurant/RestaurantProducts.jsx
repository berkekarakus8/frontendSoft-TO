import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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

// [RestaurantProducts / Restoran Ürün Yönetimi]: Restoran sahiplerinin kendi menülerine ürün ekleyip güncelledikleri ekran
const RestaurantProducts = () => {
  const navigate = useNavigate();
  // Giriş yapan kullanıcının yetki bilgileri ve restoran ID'si alınır
  const { isLoggedIn, user, role } = useSelector((state) => state.auth);

  // Menüdeki yemekler listesi, yüklenme durumu ve arama kelimesi state tanımları
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Dialog (Modal) açılış durumları, edit modu ve seçilen yemek ID'si
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // Form girdileri için veri alanları
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');

  // Tablolama (Pagination) sayfa ve satır sayısı verileri
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // [Menü Ürünlerini Çekme Fonksiyonu]: Sadece bu restorana ait ürünleri (restaurantId parametresiyle) backend'den çeker
  const fetchProducts = async () => {
    if (user?.restaurantId) {
      try {
        const res = await fetch(`http://localhost:5000/products?restaurantId=${user.restaurantId}`);
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        toast.error('Menü listesi yüklenemedi.');
        setLoading(false);
      }
    }
  };

  // Yetki kontrolü yapar, yetkisizse ana sayfaya atar, yetkiliyse ürünleri yükler
  useEffect(() => {
    if (!isLoggedIn || (role !== 'restaurant' && role !== 'admin')) {
      navigate('/');
      return;
    }
    fetchProducts();
  }, [isLoggedIn, user, role, navigate]);

  // [Yeni Yemek Ekleme Dialogunu Aç]: Form girdilerini sıfırlayarak boş bir modal açar
  const handleOpenAdd = () => {
    setEditMode(false);
    setSelectedId(null);
    setName('');
    setPrice(0);
    setDescription('');
    setCategory('Burger');
    setImage('/assets/food_burger.png');
    setDialogOpen(true);
  };

  // [Yemek Düzenleme Dialogunu Aç]: Seçilen yemeğin mevcut verilerini form girdilerine aktarır
  const handleOpenEdit = (prod) => {
    setEditMode(true);
    setSelectedId(prod.id);
    setName(prod.name);
    setPrice(prod.price);
    setDescription(prod.description);
    setCategory(prod.category);
    setImage(prod.image);
    setDialogOpen(true);
  };

  // [Kaydetme / Güncelleme Eylemi]: POST veya PUT istekleriyle veritabanındaki menüyü günceller
  const handleSave = async (e) => {
    e.preventDefault();
    if (!name || !price || !category || !image) {
      toast.error('Lütfen tüm gerekli alanları doldurun.');
      return;
    }

    const productData = {
      restaurantId: user.restaurantId,
      name,
      price: parseFloat(price),
      description,
      category,
      image,
    };

    try {
      let res;
      if (editMode) {
        res = await fetch(`http://localhost:5000/products/${selectedId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData),
        });
      } else {
        res = await fetch('http://localhost:5000/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData),
        });
      }

      if (res.ok) {
        toast.success(editMode ? 'Menü ürünü güncellendi.' : 'Menüye yeni ürün eklendi.');
        setDialogOpen(false);
        fetchProducts();
      } else {
        toast.error('Kayıt başarısız.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Bağlantı hatası.');
    }
  };

  // [Menüden Ürün Kaldırma]: Swal uyarısıyla onay alır, onaylanırsa DELETE isteği atar
  const handleDelete = async (id, prodName) => {
    Swal.fire({
      title: 'Emin misiniz?',
      text: `"${prodName}" isimli ürünü menüden kaldırmak istiyor musunuz?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#9B1C1C',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Evet, Sil!',
      cancelButtonText: 'İptal',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`http://localhost:5000/products/${id}`, {
            method: 'DELETE',
          });
          if (res.ok) {
            toast.success('Ürün menüden kaldırıldı.');
            fetchProducts();
          } else {
            toast.error('Silme işlemi başarısız.');
          }
        } catch (err) {
          console.error(err);
          toast.error('Bağlantı hatası.');
        }
      }
    });
  };

  // Arama girdisine göre gerçek zamanlı ürün listesi süzme filtresi
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 800 }}>
          Menü / Ürün Yönetimi
        </Typography>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleOpenAdd}>
          Menüye Yeni Ürün Ekle
        </Button>
      </Box>

      {/* Ürün Arama Filtresi */}
      <Paper sx={{ p: 2, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
        <SearchIcon color="action" />
        <TextField
          variant="standard"
          placeholder="Yemek ismi ile ara..."
          fullWidth
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setPage(0);
          }}
          InputProps={{ disableUnderline: true }}
        />
      </Paper>

      {/* Menü Yemekleri Tablosu */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Resim</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Ürün Adı</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Kategori</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Fiyat</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Açıklama</TableCell>
              <TableCell sx={{ fontWeight: 700, textAlign: 'right' }}>Aksiyonlar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>
                    {/* Yemek Görsel Önizlemesi */}
                    <img 
                      src={row.image} 
                      alt={row.name} 
                      style={{ width: 50, height: 40, objectFit: 'cover', borderRadius: 4 }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{row.name}</TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>{row.price} TL</TableCell>
                  <TableCell sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {row.description}
                  </TableCell>
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
            {/* Boş Sonuç Uyarısı */}
            {filteredProducts.length === 0 && !loading && (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 3, color: 'text.secondary' }}>
                  Menüde ürün bulunamadı.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        
        {/* Sayfa Alt Tablo Sayfalama Kontrolleri */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredProducts.length}
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

      {/* [Ekleme/Düzenleme Form Modali (Dialog)] */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>
          {editMode ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle'}
        </DialogTitle>
        <form onSubmit={handleSave}>
          <DialogContent>
            <Grid container spacing={2}>
              {/* Yemek Adı Girdi Alanı */}
              <Grid item xs={12}>
                <TextField
                  label="Yemek / Ürün Adı"
                  fullWidth
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>

              {/* Fiyat Girdi Alanı */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Fiyat (TL)"
                  type="number"
                  fullWidth
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Grid>

              {/* Kategori Seçim Alanı */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Kategori"
                  fullWidth
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </Grid>

              {/* Resim Adresi Girdi Alanı */}
              <Grid item xs={12}>
                <TextField
                  label="Resim URL"
                  fullWidth
                  required
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </Grid>

              {/* Açıklama Metni Girdi Alanı */}
              <Grid item xs={12}>
                <TextField
                  label="Ürün Açıklaması"
                  multiline
                  rows={2}
                  fullWidth
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>
            </Grid>
          </DialogContent>
          
          {/* Modal Buton Eylemleri */}
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

export default RestaurantProducts;
