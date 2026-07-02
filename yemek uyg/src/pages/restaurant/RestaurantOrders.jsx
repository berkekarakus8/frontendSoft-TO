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
  Select,
  MenuItem,
  FormControl,
  Card,
  CardContent,
} from '@mui/material';
import toast from 'react-hot-toast';

// [RestaurantOrders / Restoran Sipariş Paneli]: Restoran sahibinin kendi dükkanına gelen siparişleri görüp yönettiği ekran
const RestaurantOrders = () => {
  const navigate = useNavigate();
  // Giriş durumları ve restoran sahibinin ID bilgisi alınır
  const { isLoggedIn, user, role } = useSelector((state) => state.auth);

  // Bu restorana gelen siparişler ve yüklenme state tanımları
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Tablolama (Pagination) sayfa ve satır sayısı verileri
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // [Siparişleri Çekme Fonksiyonu]: Sadece bu restorana ait siparişleri en yeniden eskiye date sıralı çeker
  const fetchOrders = async () => {
    if (user?.restaurantId) {
      try {
        const res = await fetch(`http://localhost:5000/orders?restaurantId=${user.restaurantId}&_sort=date&_order=desc`);
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
    }
  };

  // Yetki doğrulama yapar, yetkisizse ana sayfaya atar, yetkiliyse siparişleri yükler
  useEffect(() => {
    if (!isLoggedIn || (role !== 'restaurant' && role !== 'admin')) {
      navigate('/');
      return;
    }
    fetchOrders();
  }, [isLoggedIn, user, role, navigate]);

  // [Sipariş Durumu Değiştirme]: Gelen siparişin durumunu (Hazırlanıyor, Yolda vb.) seçilen değere göre PUT isteğiyle günceller
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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 4 }}>
        Gelen Siparişler
      </Typography>

      {/* Sipariş Listesi Veri Tablosu */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Müşteri Adı</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Ürünler</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Toplam Tutar</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Tarih</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Sipariş Durumu</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Sayfalamaya göre siparişleri listeler */}
            {orders
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id}>
                  <TableCell>#{row.id}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{row.userName}</TableCell>
                  <TableCell>
                    {/* Siparişteki her bir yemeği ve adedini listeler */}
                    {row.items.map((item, idx) => (
                      <div key={idx} style={{ fontSize: '0.85rem' }}>
                        {item.name} <strong>x {item.qty}</strong>
                      </div>
                    ))}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, color: 'primary.main' }}>
                    {row.totalAmount} TL
                  </TableCell>
                  <TableCell>{new Date(row.date).toLocaleString('tr-TR')}</TableCell>
                  <TableCell>
                    {/* Sipariş Durumu Seçici Dropdown */}
                    <FormControl size="small" sx={{ minWidth: 140 }}>
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
                </TableRow>
              ))}
            {/* Boş Sipariş Uyarısı */}
            {orders.length === 0 && !loading && (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 3, color: 'text.secondary' }}>
                  Henüz gelen sipariş bulunmuyor.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        
        {/* Sayfa Alt Sayfalama Butonları */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={orders.length}
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

export default RestaurantOrders;
