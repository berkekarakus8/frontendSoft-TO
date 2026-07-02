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
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { Delete as DeleteIcon, Search as SearchIcon } from '@mui/icons-material';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

// [AdminUsers / Kullanıcı Yönetim Paneli]: Sistem yöneticilerinin (admin) tüm kullanıcıları ve yetkilerini listelediği ekran
const AdminUsers = () => {
  // Kullanıcılar listesi, yükleme ve arama kelimesi state tanımlamaları
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Tablolama (Pagination) sayfa ve satır sayısı verileri
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // [Kullanıcıları Çekme Fonksiyonu]: Backend veritabanından (localhost:5000) tüm kullanıcıları çeker
  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:5000/users');
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      toast.error('Kullanıcı listesi yüklenemedi.');
      setLoading(false);
    }
  };

  // Bileşen ilk kez yüklendiğinde kullanıcı listesini çekmeyi tetikler
  useEffect(() => {
    fetchUsers();
  }, []);

  // [Kullanıcı Silme İşlemi]: Swal uyarısıyla onay alır, onaylanırsa DELETE isteği gönderir ve tabloyu yeniler
  const handleDelete = async (id, name) => {
    Swal.fire({
      title: 'Emin misiniz?',
      text: `${name} isimli kullanıcı sistemden kalıcı olarak silinecektir!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#9B1C1C',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Evet, Sil!',
      cancelButtonText: 'İptal',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`http://localhost:5000/users/${id}`, {
            method: 'DELETE',
          });
          if (res.ok) {
            toast.success('Kullanıcı başarıyla silindi.');
            fetchUsers();
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

  // Arama metni değiştiğinde sayfa sayısını sıfırlayıp aramayı günceller
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(0);
  };

  // Sayfa değiştirme olaylarını yönetir
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Sayfa başına düşen satır limiti değiştiğinde çalışır
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // [Arama Filtreleme Mantığı]: Kullanıcının isminde, e-postasında veya kullanıcı adında eşleşme arar
  const filteredUsers = users.filter((user) => {
    const nameMatch = user.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const emailMatch = user.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const usernameMatch = user.username?.toLowerCase().includes(searchQuery.toLowerCase());
    return nameMatch || emailMatch || usernameMatch;
  });

  // [Rol Gösterim Chip'i]: Kullanıcının rolüne göre renkli MUI rozet (Chip) döndürür
  const getRoleChip = (role) => {
    switch (role) {
      case 'admin':
        return <Chip label="Admin" color="primary" size="small" />;
      case 'restaurant':
        return <Chip label="Restoran" color="warning" size="small" />;
      default:
        return <Chip label="Kullanıcı" color="default" size="small" />;
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 800 }}>
          Kullanıcı Yönetimi
        </Typography>
      </Box>

      {/* Arama Filtresi Girdi Kutusu */}
      <Paper sx={{ p: 2, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
        <SearchIcon color="action" />
        <TextField
          variant="standard"
          placeholder="İsim veya e-posta ile ara..."
          fullWidth
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{ disableUnderline: true }}
        />
      </Paper>

      {/* Kullanıcı Veri Tablosu */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Ad Soyad</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>E-posta / Kullanıcı Adı</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Telefon</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Rol</TableCell>
              <TableCell sx={{ fontWeight: 700, textAlign: 'right' }}>Aksiyonlar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Sayfalamaya göre filtrelenen kullanıcıları satır halinde listeler */}
            {filteredUsers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{row.name || 'Admin'}</TableCell>
                  <TableCell>{row.email || row.username}</TableCell>
                  <TableCell>{row.phone || '-'}</TableCell>
                  <TableCell>{getRoleChip(row.role)}</TableCell>
                  <TableCell align="right">
                    {/* Yöneticinin kendini silmesini önlemek için rol kontrolü yapılır */}
                    {row.role !== 'admin' && (
                      <IconButton color="error" onClick={() => handleDelete(row.id, row.name)}>
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            
            {/* Arama sonucu boş ise uyarı satırı gösterir */}
            {filteredUsers.length === 0 && !loading && (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 3, color: 'text.secondary' }}>
                  Kullanıcı bulunamadı.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        
        {/* Tablo Alt Sayfalama Kontrolleri */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Satır sayısı:"
        />
      </TableContainer>
    </Box>
  );
};

export default AdminUsers;
