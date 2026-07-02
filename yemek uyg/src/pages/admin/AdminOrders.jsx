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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

// [AdminOrders / Sipariş Yönetim Paneli]: Sistem yöneticilerinin tüm sipariş geçmişini, tutarlarını ve anlık durumlarını yönettiği ekran
const AdminOrders = () => {
  // Sipariş listesi, yüklenme ve filtre durum state tanımları
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');

  // Tablolama (Pagination) sayfa ve satır sayısı verileri
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // [Siparişleri Çekme Fonksiyonu]: Sipariş verilerini en yeni tarihten en eskiye doğru sıralanmış şekilde API'den alır
  const fetchOrders = async () => {
    try {
      const res = await fetch('http://localhost:5000/orders?_sort=date&_order=desc');
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      toast.error('Siparişler yüklenemedi.');
      setLoading(false);
    }
  };

  // Sayfa ilk yüklendiğinde siparişleri çağırır
  useEffect(() => {
    fetchOrders();
  }, []);

  // [Sipariş Durumu Değiştirme]: Dropdown seçimlerine göre sipariş durumunu (beklemede, hazırlanıyor vb.) PUT isteğiyle günceller
  const handleStatusChange = async (id, newStatus) => {
    try {
      const orderToUpdate = orders.find((o) => o.id === id);
      const updatedOrder = { ...orderToUpdate, status: newStatus };

      const res = await fetch(`http://localhost:5000/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedOrder),
      });

      if (res.ok) {
        toast.success('Sipariş durumu güncellendi.');
        fetchOrders();
      } else {
        toast.error('Güncelleme başarısız.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Bağlantı hatası.');
    }
  };

  // [Sipariş Silme]: Swal ile onay alarak siparişi sistem geçmişinden siler
  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Siparişi Silmek İstiyor musunuz?',
      text: 'Bu işlem sipariş geçmişini kalıcı olarak temizler!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#9B1C1C',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Evet, Sil!',
      cancelButtonText: 'İptal',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`http://localhost:5000/orders/${id}`, {
            method: 'DELETE',
          });
          if (res.ok) {
            toast.success('Sipariş silindi.');
            fetchOrders();
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

  // [Durum Filtreleme Süzgeci]: Seçilen durum filtresine göre (Tümü veya belirli durumlar) siparişleri listeler
  const filteredOrders = orders.filter((order) => {
    if (statusFilter === 'all') return true;
    return order.status === statusFilter;
  });

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 800 }}>
          Sipariş Yönetimi
        </Typography>
        
        {/* Durum Seçici Filtre Kutusu */}
        <FormControl sx={{ minWidth: 160 }} size="small">
          <InputLabel>Durum Filtresi</InputLabel>
          <Select
            value={statusFilter}
            label="Durum Filtresi"
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(0);
            }}
          >
            <MenuItem value="all">Tümü</MenuItem>
            <MenuItem value="pending">Beklemede</MenuItem>
            <MenuItem value="cooking">Hazırlanıyor</MenuItem>
            <MenuItem value="on-the-way">Yolda</MenuItem>
            <MenuItem value="delivered">Teslim Edildi</MenuItem>
            <MenuItem value="cancelled">İptal Edildi</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Sipariş Geçmişi Tablosu */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Müşteri</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Restoran</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Tutar</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Tarih</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Durum Güncelle</TableCell>
              <TableCell sx={{ fontWeight: 700, textAlign: 'right' }}>Aksiyonlar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Sayfalamaya göre sipariş satırlarını haritalar */}
            {filteredOrders
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id}>
                  <TableCell>#{row.id}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{row.userName}</TableCell>
                  <TableCell>{row.restaurantName}</TableCell>
                  <TableCell>{row.totalAmount} TL</TableCell>
                  <TableCell>{new Date(row.date).toLocaleString('tr-TR')}</TableCell>
                  <TableCell>
                    {/* Durum Seçici Dropdown */}
                    <FormControl size="small" fullWidth sx={{ minWidth: 130 }}>
                      <Select
                        value={row.status}
                        onChange={(e) => handleStatusChange(row.id, e.target.value)}
                      >
                        <MenuItem value="pending">Beklemede</MenuItem>
                        <MenuItem value="cooking">Hazırlanıyor</MenuItem>
                        <MenuItem value="on-the-way">Yolda</MenuItem>
                        <MenuItem value="delivered">Teslim Edildi</MenuItem>
                        <MenuItem value="cancelled">İptal Edildi</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton color="error" onClick={() => handleDelete(row.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            {/* Boş Sonuç Uyarısı */}
            {filteredOrders.length === 0 && !loading && (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 3, color: 'text.secondary' }}>
                  Sipariş bulunamadı.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        
        {/* Sayfa Alt Sayfalama Kontrolleri */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredOrders.length}
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
    </Box>
  );
};

export default AdminOrders;
