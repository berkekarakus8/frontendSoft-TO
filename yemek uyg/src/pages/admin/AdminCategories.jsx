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
  IconButton,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

// [AdminCategories / Kategori Yönetim Paneli]: Sistem yöneticilerinin yemek kategorilerini (Pizza, Kebap, Tatlı vb.) tanımladığı ekran
const AdminCategories = () => {
  // Kategoriler listesi, yüklenme durumu ve ekleme dialogu state tanımları
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newCatName, setNewCatName] = useState('');

  // [Kategorileri Çekme Fonksiyonu]: Backend API üzerinden güncel kategorileri alır
  const fetchCategories = async () => {
    try {
      const res = await fetch('http://localhost:5000/categories');
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      toast.error('Kategoriler yüklenemedi.');
      setLoading(false);
    }
  };

  // Bileşen ilk kez render edildiğinde kategorileri listeler
  useEffect(() => {
    fetchCategories();
  }, []);

  // [Kategori Kaydetme]: Yeni kategori adını alarak API'ye POST isteği atar
  const handleSave = async (e) => {
    e.preventDefault();
    if (!newCatName) {
      toast.error('Lütfen kategori adını girin.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCatName }),
      });

      if (res.ok) {
        toast.success('Kategori eklendi.');
        setNewCatName('');
        setDialogOpen(false);
        fetchCategories();
      } else {
        toast.error('Ekleme başarısız.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Bağlantı hatası.');
    }
  };

  // [Kategori Silme]: Swal onayı aldıktan sonra kategoriyi veritabanından kalıcı olarak temizler
  const handleDelete = async (id, catName) => {
    Swal.fire({
      title: 'Kategoriyi Silmek İstiyor musunuz?',
      text: `${catName} kategorisi silinecektir.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#9B1C1C',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Evet, Sil!',
      cancelButtonText: 'İptal',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`http://localhost:5000/categories/${id}`, {
            method: 'DELETE',
          });
          if (res.ok) {
            toast.success('Kategori silindi.');
            fetchCategories();
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

  return (
    <Box sx={{ maxWidth: 600 }}>
      {/* Üst Bar: Başlık ve Ekle Butonu */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 800 }}>
          Kategori Yönetimi
        </Typography>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => setDialogOpen(true)}>
          Yeni Kategori Ekle
        </Button>
      </Box>

      {/* Kategoriler Tablosu */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Kategori Adı</TableCell>
              <TableCell sx={{ fontWeight: 700, textAlign: 'right' }}>Aksiyonlar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>{row.name}</TableCell>
                <TableCell align="right">
                  <IconButton color="error" onClick={() => handleDelete(row.id, row.name)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {/* Boş Liste Uyarısı */}
            {categories.length === 0 && !loading && (
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{ py: 3, color: 'text.secondary' }}>
                  Kategori bulunamadı.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* [Yeni Kategori Ekleme Modali (Dialog)] */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>Yeni Kategori Ekle</DialogTitle>
        <form onSubmit={handleSave}>
          <DialogContent>
            <TextField
              label="Kategori Adı"
              fullWidth
              required
              autoFocus
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
            />
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setDialogOpen(false)}>İptal</Button>
            <Button type="submit" variant="contained" color="primary">
              Kaydet
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default AdminCategories;
