# Geliştirici Kuralları ve Kodlama Standartları

Bu kılavuz, projenin geliştirilmesi sırasında uyulması gereken mimari kuralları ve standartları belirler. Yapay zeka asistanı kod yazarken bu kuralları esas alacaktır.

## 1. Dizin ve Dosya Yapısı

Proje dizin mimarisi modüler yapıda kurgulanacaktır:

- Arayüz bileşenleri src/components dizininde ortak ve sayfa bazlı olarak ayrılacaktır.
- Durum yönetimi (State) src/store dizininde konumlanacaktır.
- API servis istekleri src/services dizininde bulunacaktır.
- Stil özelleştirmeleri ve temalar src/theme altında tanımlanacaktır.

## 2. Durum Yönetimi Standartları (Redux Toolkit)

Uygulamanın durum yönetimi tamamen Redux Toolkit ile yapılacaktır:

- E-posta giriş, çıkış ve oturum durumu yönetimi için bir yetkilendirme (auth) slice dosyası tanımlanmalıdır.
- Müşteri listesi, ekleme, güncelleme ve silme durum yönetimi için bir müşteri (customer) slice dosyası tanımlanmalıdır.
- Tüm slice dosyaları src/store/slices dizini altında bulunmalı ve store.js dosyası üzerinden configureStore fonksiyonu ile merkezi olarak bağlanmalıdır.
- API veri akışları ve eşzamansız (async) veri işlemleri createAsyncThunk fonksiyonları kullanılarak yönetilecektir.

## 3. Arayüz ve Stil Kuralları (Material UI)

Arayüz bileşenleri Material UI kütüphanesi kullanılarak tasarlanacaktır:

- Stil tanımlamaları için satır içi CSS yazılmayacak; MUI sx özelliği ya da styled fonksiyonu tercih edilecektir.
- Responsive yerleşim için Grid ve Box bileşenleri ile esnek kutu modelleri kurulacaktır.
- Uygulamanın yazı tipleri, kenar yumuşatma oranları ve renk kartelaları createTheme ile tek bir yerde tanımlanacak ve ThemeProvider üzerinden en dış katmanda tüm uygulamaya dağıtılacaktır.

## 4. Servis Entegrasyon Standartları (json-server)

Uygulamanın veritabanı yerel db.json dosyasıdır. İstekler bu sunucuya yapılacaktır:

- API bağlantı işlemlerinde Axios istemcisi kullanılmalıdır.
- Axios istemcisine ait baseURL tanımlaması ve varsayılan headers ayarları src/services altında oluşturulacak servis dosyasında yapılmalıdır.
- Kayıt silme (DELETE) işlemleri tetiklendiğinde doğrudan silme işlemi yapılmamalı, öncesinde kullanıcıdan Material UI Dialog bileşeni ile onay alınmalıdır.
