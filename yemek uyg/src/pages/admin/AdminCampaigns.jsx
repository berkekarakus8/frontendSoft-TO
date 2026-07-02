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

// [AdminCampaigns / Kampanya Yönetim Paneli]: Sistem yöneticilerinin akan duyuru bandındaki ve ana sayfadaki kampanyaları yönettiği ekran
const AdminCampaigns = () => {
  // Kampanyalar, yüklenme durumu ve form modali açılma durumları
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Yeni kampanya formu veri alanları
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  // [Kampanyaları Çekme Fonksiyonu]: DB üzerinden güncel kampanyalar dizisini alır
  const fetchCampaigns = async () => {
    try {
      const res = await fetch('http://localhost:5000/campaigns');
      if (res.ok) {
        const data = await res.json();
        setCampaigns(data);
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      toast.error('Kampanyalar yüklenemedi.');
      setLoading(false);
    }
  };

  // Sayfa açıldığında kampanya listesini çağırır
  useEffect(() => {
    fetchCampaigns();
  }, []);

  // [Kampanya Ekleme/Kaydetme Eylemi]: Yeni kampanyayı veritabanına yazar ve listeyi yeniler
  const handleSave = async (e) => {
    e.preventDefault();
    if (!title || !text) {
      toast.error('Lütfen tüm alanları doldurun.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, text }),
      });

      if (res.ok) {
        toast.success('Kampanya eklendi.');
        setTitle('');
        setText('');
        setDialogOpen(false);
        fetchCampaigns();
      } else {
        toast.error('Ekleme başarısız.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Bağlantı hatası.');
    }
  };

  // [Kampanya Silme İşlemi]: Swal onay kutusundan geçerek kampanyayı veritabanından kalıcı olarak kaldırır
  const handleDelete = async (id, campTitle) => {
    Swal.fire({
      title: 'Kampanyayı Silmek İstiyor musunuz?',
      text: `"${campTitle}" başlıklı kampanya kaldırılacaktır.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#9B1C1C',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Evet, Sil!',
      cancelButtonText: 'İptal',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`http://localhost:5000/campaigns/${id}`, {
            method: 'DELETE',
          });
          if (res.ok) {
            toast.success('Kampanya silindi.');
            fetchCampaigns();
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
    <Box sx={{ maxWidth: 800 }}>
      {/* Üst Bar: Başlık ve Ekleme Butonu */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 800 }}>
          Kampanya Yönetimi
        </Typography>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => setDialogOpen(true)}>
          Yeni Kampanya Ekle
        </Button>
      </Box>

      {/* Kampanyalar Tablo Listesi */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Kampanya Başlığı</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Açıklama / Metin</TableCell>
              <TableCell sx={{ fontWeight: 700, textAlign: 'right' }}>Aksiyonlar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {campaigns.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>{row.title}</TableCell>
                <TableCell>{row.text}</TableCell>
                <TableCell align="right">
                  <IconButton color="error" onClick={() => handleDelete(row.id, row.title)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {/* Boş Kampanya Uyarısı */}
            {campaigns.length === 0 && !loading && (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 3, color: 'text.secondary' }}>
                  Kampanya bulunamadı.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* [Kampanya Ekleme Modali (Dialog)]: Form alanları ve kaydetme butonunu barındıran pencere */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>Yeni Kampanya Ekle</DialogTitle>
        <form onSubmit={handleSave}>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Kampanya Başlığı"
              fullWidth
              required
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              label="Açıklama Metni (Akan bantta gösterilir)"
              fullWidth
              required
              multiline
              rows={2}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </DialogContent>
          {/* Modal alt eylemleri */}
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

export default AdminCampaigns;
