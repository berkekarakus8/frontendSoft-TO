# Proje Belgesi: Mini CRM Uygulaması

Bu doküman, React, Vite, Material UI, Redux Toolkit ve json-server teknolojileri kullanılarak geliştirilecek olan Mini CRM projesinin teknik mimarisini ve gereksinimlerini tanımlar.

## 1. Proje Dizin Yapısı

```text
mini-crm/
├── public/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   ├── Navbar.jsx
│   │   └── Layout.jsx
│   ├── features/
│   │   ├── auth/
│   │   │   └── Login.jsx
│   │   ├── dashboard/
│   │   │   └── Dashboard.jsx
│   │   ├── customers/
│   │   │   ├── CustomerList.jsx
│   │   │   └── CustomerFormDialog.jsx
│   │   └── reports/
│   │       └── Reports.jsx
│   ├── services/
│   │   └── api.js
│   ├── store/
│   │   ├── slices/
│   │   │   ├── authSlice.js
│   │   │   └── customerSlice.js
│   │   └── store.js
│   ├── theme/
│   │   └── theme.js
│   ├── App.jsx
│   └── main.jsx
├── db.json
├── package.json
└── vite.config.js
```

## 2. Tasarım ve Renk Paleti

Uygulamanın görsel kimliği Material UI tema motoru kullanılarak aşağıdaki renk paletiyle oluşturulacaktır:

- **Primary (Ana Renk):** #1e3a8a (Koyu Gece Mavisi) - Navigasyon çubuklarında, kart başlıklarında, birincil butonlarda ve ana yapısal elemanlarda kullanılacaktır.
- **Secondary (İkincil Renk):** #0ea5e9 (Gökyüzü Mavisi) - Formlardaki odaklanma çerçevelerinde, bağlantılarda, aktiflik rozetlerinde ve bilgi çiplerinde kullanılacaktır.
- **Background (Arka Plan):** #f8fafc (Açık Gri/Mavi) - Sayfaların genel gövde arka planı olarak ayarlanacaktır.
- **Surface (Yüzey Arka Planı):** #ffffff (Düz Beyaz) - Kartların, tabloların, diyalog pencerelerinin ve girdi formlarının arka plan rengi olacaktır.
- **Success (Başarı Rengi):** #10b981 (Zümrüt Yeşili) - Aktif müşteri durumlarında ve işlem onay bildirimlerinde kullanılacaktır.
- **Error (Hata Rengi):** #ef4444 (Kırmızı) - Pasif müşteri durumlarında, silme işlemlerinde ve form uyarılarında kullanılacaktır.

## 3. Veritabanı Şeması (`db.json`)

json-server üzerinde tutulacak olan koleksiyonlar ve alanları şu şekildedir:

### Users (Kullanıcılar) Koleksiyonu
- **id:** Benzersiz kimlik numarası (Metin)
- **email:** Giriş e-posta adresi (Metin)
- **password:** Giriş şifresi (Metin)
- **name:** Kullanıcının adı soyadı (Metin)

### Customers (Müşteriler) Koleksiyonu
- **id:** Benzersiz kimlik numarası (Metin)
- **name:** Müşteri adı soyadı (Metin)
- **company:** Müşterinin çalıştığı firma adı (Metin)
- **email:** Müşteri iletişim e-postası (Metin)
- **phone:** Müşteri telefon numarası (Metin)
- **status:** Müşteri durumu (Metin: 'active' veya 'passive')
- **balance:** Müşterinin bakiye tutarı (Sayısal)
- **createdAt:** Oluşturulma tarihi (Zaman damgası)

### Activities (Aktiviteler) Koleksiyonu
- **id:** Benzersiz kimlik numarası (Metin)
- **customerId:** İlişkili müşteri kimliği (Metin)
- **type:** Aktivite türü (Metin: 'call', 'meeting', 'email')
- **note:** Aktiviteye ait not (Metin)
- **date:** Aktivite tarihi (Zaman damgası)

## 4. Sayfa Gereksinimleri

### 4.1. Giriş Sayfası (Login)
- E-posta ve şifre giriş alanları (Material UI TextField bileşenleri ile).
- Form doğrulama kontrolleri (e-posta format kontrolü ve alanların zorunluluğu).
- Giriş başarısız olduğunda Material UI Alert bileşeni ile hata mesajı gösterimi.
- Giriş onaylandığında kullanıcının ana sayfaya (Dashboard) yönlendirilmesi.

### 4.2. Kontrol Paneli (Dashboard)
- Toplam kayıtlı müşteri sayısı, havuzdaki toplam bakiye tutarı ve aktif müşteri sayısını gösteren özet kartları.
- Son eklenen müşterileri listeleyen sade bir veri tablosu.
- Müşterilere yönelik yapılan son aktivitelerin listelendiği aktivite geçmişi alanı.

### 4.3. Müşteri Yönetimi (Customer CRUD)
- Müşterileri listeleyen ve sütun bazlı sıralanabilen Material UI Table bileşeni.
- Arama kutusu aracılığıyla müşteri ismi ve şirketine göre filtreleme yapısı.
- Müşteri ekleme ve düzenleme formlarını barındıran Material UI Dialog bileşeni.
- Müşteri kartında isim, e-posta, telefon, şirket, durum ve bakiye alanlarının güncellenebilmesi.
- Müşteri silme butonuna tıklandığında açılan onay kutusu (MUI Dialog).

### 4.4. Raporlar Sayfası (Reports)
- Toplam bakiye hacmini ve müşteri başına düşen ortalama bakiye oranlarını gösteren metrik alanları.
- Aktif ve pasif müşterilerin oransal dağılımını gösteren görsel Material UI LinearProgress barları.
- Belirli bir limitin üzerindeki yüksek bakiye sahibi müşterilerin filtrelenerek gösterildiği bir rapor listesi.

## 5. Durum Yönetimi (Redux Toolkit)

Uygulamanın durumu merkezi bir store dosyası üzerinde yönetilecektir. Bu store dosyası iki adet ana slice yapısını bir araya getirecektir:

- **Auth Slice:** Kullanıcı giriş, çıkış ve mevcut oturum durumunu yöneten slice.
- **Customer Slice:** Müşterilerin listelenmesi, yeni eklenmesi, güncellenmesi ve silinmesi durumlarını yöneten slice.
