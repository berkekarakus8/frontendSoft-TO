# `PROJECT.md`

# 🍽️ Food Ordering Platform (Yemeksepeti Clone) - Project Rules

## Proje Amacı

Bu proje, **Yemeksepeti benzeri** çalışan ancak tamamen farklı tema ve tasarım diline sahip bir yemek sipariş platformudur.

Amaç;

* Gerçek hayata yakın kullanıcı deneyimi oluşturmak
* Çok kullanıcılı sistem geliştirmek
* React + Redux mimarisini kullanmak
* Admin Paneli geliştirmek
* Restaurant Paneli geliştirmek
* Responsive ve modern arayüz oluşturmak
* Baştan sona çalışan bir Full Frontend uygulaması geliştirmek

---

# Kullanılacak Teknolojiler

* React
* React Router DOM
* Redux Toolkit
* React Redux
* Axios
* SCSS veya CSS Modules
* React Icons
* Framer Motion (animasyonlar)
* React Hot Toast
* React Data Table Component (Admin)
* SweetAlert2
* LocalStorage
* JSON Server (Fake Backend)

---

# Kullanılmayacak Teknolojiler

Projede özellikle kullanılmayacaktır.

* Context API
* React Query
* Next.js
* TypeScript
* Zustand
* Tailwind
* Firebase
* React Server Components

---

# React Seviyesi

Orta seviye React kullanılacaktır.

Kullanılabilecek yapılar

* useState
* useEffect
* useMemo
* useCallback
* Redux
* React Router
* Custom Hooks

İleri React yapıları kullanılmayacaktır.

---

# Tema

Yemek uygulamasına uygun iki ana renk kullanılacaktır.

## Primary Color

#E63946

Canlı Kırmızı

---

## Secondary Color

#FFB703

Sıcak Turuncu / Altın Sarısı

---

## Yardımcı Renkler

Dark

#1E1E1E

Gray

#F5F5F5

White

#FFFFFF

Success

#22C55E

Warning

#FACC15

Danger

#DC2626

---

# Kullanıcı Rolleri

Sistemde 3 farklı kullanıcı olacaktır.

## 1)

Admin

Tam Yetki

---

## 2)

Kullanıcı

Sipariş verebilir

Favori ekleyebilir

Sepet oluşturabilir

Adres seçebilir

---

## 3)

Restaurant Sahibi

Sadece kendi restoranını yönetebilir.

---

# Sayfa Yapısı

Her sayfa çalışacaktır.

Boş route olmayacaktır.

404 sayfası olacaktır.

Her route erişilebilir olacaktır.

---

# Navbar

Her sayfada aynı navbar kullanılacaktır.

Navbar içerisinde;

* Logo
* Adres Seç
* Giriş Yap
* Oturum Aç
* Favoriler
* Sepet

bulunacaktır.

---

# Logo

Hover efekti olacaktır.

Tıklanınca

Ana Sayfa yenilenecektir.

---

# Kampanya Alanı

Sayfanın en üstünde bulunacaktır.

Soldan sağa kayan yazılar olacaktır.

Hover olunca duracaktır.

Mouse ayrılınca devam edecektir.

---

# Adres Seç

Adres seç butonu olacaktır.

Hover olunca arkaplan rengi değişecektir.

Tıklanınca animasyonlu popup açılacaktır.

Popup içerisinde

20 farklı İstanbul ilçesi bulunacaktır.

İlçe seçildiğinde;

Loading Popup açılacaktır.

3 saniye beklenecektir.

Popup otomatik kapanacaktır.

Buton içerisinde seçilen ilçe adı kalın yazıyla gösterilecektir.

---

# Authentication

İlk açılışta Login ekranı gelmeyecektir.

Ana sayfa açılacaktır.

Kullanıcı

"Giriş Yap"

veya

"Oturum Aç"

butonuna basınca

Authentication sayfasına yönlenecektir.

---

# Kullanıcı Login

Email

Şifre

---

# Admin Login

Kullanıcı Adı

Şifre

---

# Restaurant Login

Yemeksepeti Restaurant mantığında olacaktır.

---

# Footer

Her sayfada olacaktır.

Sağ alt köşede

"Yetkili"

yazacaktır.

---

# Yetkili Alanı

Yetkili yazısına tıklanınca

Admin Login Popup açılacaktır.

Popup içerisinde

Kullanıcı Adı

Şifre

alanları olacaktır.

Popup sağ altında

"Yetkili Birime Bağlan"

bulunacaktır.

Basıldığında popup çıkacaktır.

Mesaj:

"5-15 dakika içerisinde tarafınıza dönüş yapılacaktır."

---

# Admin Paneli

Koyu tema kullanılacaktır.

Minimal tasarım olacaktır.

Tüm sistemi yönetebilir.

Yetkileri

Restaurant Yönetimi

Kategori Yönetimi

Kullanıcı Yönetimi

Sipariş Yönetimi

Kampanya Yönetimi

İstatistikler

Favoriler

Sepetler

Adresler

Silme

Düzenleme

Ekleme

Tam Yetki

---

# Admin DataTable

Tüm listeler

React Data Table

ile hazırlanacaktır.

Arama

Filtre

Pagination

Sorting

bulunacaktır.

---

# Admin Logout

Panel içerisinden çıkış yapılacaktır.

---

# Kullanıcı Tarafı

Yemeksepeti mantığında olacaktır.

---

# Anasayfa

Navbar

↓

Önerilen Restaurantlar

↓

İnteraktif Kampanyalar

↓

Restaurant Listesi

↓

Footer

---

# Önerilen Restaurantlar

Otomatik slider olacaktır.

Her

5 saniyede

1 kart sola kayacaktır.

---

# Kampanyalar

Normalde sabit olacaktır.

Mouse üzerine gelince

kaymaya başlayacaktır.

---

# Restaurant Kartı

Hover olunca

Resim Zoom olacaktır.

---

Kart Sağ Üst

Favori ikonu

Hover

Kırmızı olacaktır.

---

Kart Altı

Minimum Sipariş

Teslimat

Puan

Teslim Süresi

---

En Alt

Flash İndirim

Kırmızı

Yanıp sönen animasyon

---

# Popup

Sayfa her yenilendiğinde

İndirim Popup gelecektir.

Popup içerisinde

Restaurant

Resim

Flash İndirim

Buton

bulunacaktır.

---

Popup Butonu

Hover

Soldan sağa dolan kırmızı animasyon olacaktır.

---

# Favoriler

Ayrı sayfa olacaktır.

Favoriler alt alta sıralanacaktır.

Her kartta

Favorilerden Çıkar

Hover

Kırmızı

---

Yanında

Sipariş Ver

Normal

Kırmızı

Hover

Beyaz olacaktır.

---

Kart Altı

Restaurantlara Göz At

Butonu olacaktır.

Tıklanınca

Restaurant Listesine gidecektir.

---

# Restaurant Listesi

Sol

Filtreler

Sağ

Restaurant Kartları

---

# Filtreler

Kategori

Puan

Teslimat Süresi

Minimum Sipariş

Ücretsiz Teslimat

İndirimli

Açık Restaurantlar

---

# Sepet

Tam çalışacaktır.

---

# Sipariş

Tam çalışacaktır.

---

# Favoriler

Tam çalışacaktır.

---

# Local Storage

Adres

Favoriler

Sepet

Kullanıcı

Theme

saklanacaktır.

---

# Redux Store

Slices

authSlice

userSlice

restaurantSlice

favoriteSlice

cartSlice

addressSlice

campaignSlice

categorySlice

adminSlice

orderSlice

---

# Route Yapısı

/

login

register

restaurants

restaurant/:id

favorites

cart

orders

profile

admin

admin/users

admin/restaurants

admin/orders

admin/categories

admin/campaigns

restaurant-panel

restaurant/orders

restaurant/products

restaurant/profile

404

---

# Responsive

Mobile

Tablet

Desktop

tam uyumlu olacaktır.

---

# Kod Standartları

Component bazlı geliştirme

Tek sorumluluk prensibi

Tekrar eden kod yazılmayacak

Props düzenli kullanılacak

Redux merkezi yönetim sağlayacak

Tüm yönlendirmeler çalışacak

Boş sayfa olmayacak

Eksik link olmayacak

Çalışmayan buton olmayacak

Placeholder sayfa olmayacak

Her özellik çalışacaktır.

# Proje Dokümantasyonu: Yemeksepeti Klonu (Özel Tema ve Fonksiyonlar)

## 1. Proje Genel Tanımı
Bu proje, popüler yemek siparişi platformu Yemeksepeti'nin temel işlevlerini ve akışlarını temel alan, ancak kendine has özel UI/UX etkileşimleri, animasyonları, pop-up mekanizmaları ve 3 farklı kullanıcı rolü barındıran kapsamlı bir web uygulamasıdır. Proje geliştirme sürecinde **Antigravity IDE** kullanılacak, durum yönetimi için **React Redux** (Redux Toolkit) tercih edilecektir.

## 2. Teknoloji Yığını ve Kısıtlamalar
- **Frontend Kütüphanesi:** React (Fonksiyonel bileşenler ve temel kancalar: `useState`, `useEffect`, `useRef`, `useNavigate`, `useSelector`, `useDispatch`).
- **Gelişmiş React Kısıtlaması:** React'ın çok ileri düzey optimizasyon veya deneysel özellikleri kullanılmayacak, temiz ve sürdürülebilir temel mimariye odaklanılacaktır.
- **Durum Yönetimi:** React Redux (Redux Toolkit) tüm sepet, favoriler, kullanıcı oturumları ve restoran listeleri için merkezi state yönetimini üstlenecektir.
- **UI Bileşen Kütüphanesi:** Projede **Material UI (MUI)** kullanılacaktır (Tailwind CSS kesinlikle kullanılmayacaktır). Admin panelindeki veri listelemelerinde MUI `DataGrid` veya `Table` bileşenleri tercih edilecektir.

## 3. Renk Paleti ve Tema Seçimi
Uygulama genelinde gıda sektörünün enerjisini ve profesyonelliği yansıtan iki ana renk belirlenmiştir:
- **Ana Renk (Primary):** Koyu Bordo / Sıcak Tuğla Kırmızısı (`#9B1C1C`) – İştah açıcı, dinamik ve dikkat çekici aksiyonlar, butonlar ve vurgular için kullanılacaktır.
- **İkinci Renk (Secondary):** Gece Mavisi / Koyu Kömür (`#111827`) – Özellikle Admin panelinde dikkati dağıtmayan, kullanıcı arayüzünde ise profesyonel ve okunaklı bir arka plan/metin kontrastı sağlayan koyu ton.

## 4. Kullanıcı Rolleri ve Yetki Matrisi
Uygulama 3 ana giriş kapısına ve role sahip olacaktır:
1. **Müşteri (Kullanıcı):** Standart yemek siparişi, filtreleme, sepet, favori yönetimi ve özel kampanyaları deneyimleme.
2. **Restoran Sahibi:** Kendine ait restoranın menüsünü, siparişlerini ve gelen talepleri Yemeksepeti yapısında yönetme.
3. **Admin (Sistem Yöneticisi):** Tüm sistemi kapsayan tam erişim yetkisi. Veri tabloları (Data Tables) üzerinden tüm kullanıcıları, restoranları ve siparişleri ekleme, silme, düzenleme yetkisi.

---

## 5. Detaylı Sayfa ve UI/UX Fonksiyon Listesi

### 5.1. Ortak Bileşenler (Tüm Sayfalar)
- **Üst Menü (Navbar):** Her sayfanın en üstünde yer alır. Sol tarafta özgün logo bulunur. Logoya gelindiğinde imleç değişir ve tıklandığında ana sayfa yenilenir.
- **Alt Bilgi (Footer):** Her sayfanın en altında yer alır. Sağ en alt köşesinde sadece yetkili personelin fark edebileceği küçük bir **"Yetkili"** yazısı/butonu bulunur.

### 5.2. Müşteri (Kullanıcı) Arayüzü Detayları

#### 5.2.1. Üst Alan ve Navbar Fonksiyonları
- **Akan Kampanya Bandı:** Navbar'ın en üstünde yan yana akan metinlerden oluşan kampanya şeridi bulunur. Fare imleci (hover) bu bandın üzerine geldiğinde akış animasyonu durur; imleç çekildiğinde akış devam eder.
- **Konum/İlçe Seçimi Butonu:** Navbar içinde logonun sağında "Adresinizi Seçin" butonu yer alır.
  - *Hover Efekti:* Butonun üzerine gelindiğinde kutunun arka plan veya kenarlık rengi yumuşak bir geçişle değişir.
  - *Seçim Mekanizması:* Butona tıklandığında açılır menü/modal içinde efektli bir şekilde İstanbul'un 20 farklı ilçesi listelenir.
  - *Yükleme Ekranı (Loading Pop-up):* Bir ilçe seçildiğinde ekrana anında bir loading pop-up'ı gelir. Bu pop-up tam 3 saniye boyunca ekranda kalır ve süre bitiminde kendiliğinden kapanır.
  - *Durum Güncellemesi:* Pop-up kapandıktan sonra seçilen ilçenin ismi "Adresinizi Seçin" butonunun içerisine **daha kalın (bold) bir yazı tipiyle** kalıcı olarak yazılır.
- **Giriş ve Oturum Yönetimi:**
  - Site ilk açıldığında doğrudan ana sayfa içeriği yüklenir; Giriş Yap veya Kayıt Ol ekranları otomatik olarak gelmez.
  - Kullanıcı Navbar'daki "Giriş Yap" veya "Oturum Aç" butonlarına tıkladığında ilgili giriş sayfalarına aktarılır. Kullanıcıdan oturum açarken **Email ve Şifre** talep edilir.
- **Kullanıcı Sağ İkonları:** Navbar'ın en sağında Favoriler ve Sepet ikonları yer alır.

#### 5.2.2. Ana Sayfa Dinamik İçerikleri
- **Hoş Geldiniz İndirim Pop-up'ı:** Ana sayfa her yenilendiğinde (`window.location.reload` veya logo tıklamasıyla) ekrana anında bir indirim pop-up'ı gelir. Pop-up içerisinde:
  - Rastgele veya öne çıkan bir restoranın ismi ve resmi bulunur.
  - Dikkat çekici bir **Flaş İndirim Yüzdesi** yer alır.
  - Altında bulunan aksiyon butonunun üzerine gelindiğinde, buton rengi **soldan sağa doğru akan (gradient/fill transition) bir efektle kırmızıya boyanır**.
- **Önerilen Restoranlar Bandı:** Navbar'ın hemen altında konumlanır. Restoran kartları soldan sağa doğru dizilidir ve **her 5 saniyede bir** otomatik olarak birer restoran sola doğru kayarak döngü oluşturur.
- **İnteraktif Kampanyalar Bandı:** Önerilen restoranların altında yer alır. Bu alanın en büyük özelliği, fare imleci üzerine gelmediği sürece kampanyaların kaymamasıdır. **Yalnızca imleç üzerindeyken (hover)** kampanyalar soldan sağa doğru hareket eder.
- **Restoran Kartları ve Listeleme:**
  - *Resim Yakınlaştırma (Zoom Effect):* Restoran kutularının üzerindeki resimlere hover yapıldığında resim hafifçe büyüyerek yaklaşma efekti sunar.
  - *Hızlı Favori İkonu:* Her restoran resminin sağ üst köşesinde bir favori ikonu yer alır. Üzerine gelindiğinde içi kırmızıya boyanan bir efekte sahiptir.
  - *Flaş İndirim Bölümü:* Kartların altında standart minimum sipariş tutarı, teslimat süresi gibi bilgilerin yanı sıra **kırmızı renkte sürekli yanıp sönen (blinking) bir flaş indirim yüzdesi** bulunur.

#### 5.2.3. Favorilerim Sayfası
- Navbar'daki favoriler ikonuna tıklandığında açılır.
- Eklenen tüm favori restoranlar alt alta temiz bir liste halinde sıralanır.
- **Kart İçi Aksiyonlar:**
  - Her favori restoran kutusunun sol altında **"Favorilerden Çıkar"** butonu bulunur. Butonun üzerine gelindiğinde rengi kırmızıya döner.
  - Bu butonun hemen sağında **"Sipariş Ver"** butonu yer alır. Bu buton başlangıçta kırmızı renkteyken, hover anında bir anda beyaza döner (anlık renk değişimi).
- **Alt Gezinti Butonu:** Tüm favori kutularının en altında, ana kutunun çeyreği veya yarısı büyüklüğünde, üzerinde **"Restoranlara Göz At"** yazan özel bir buton yer alır. Bu butona tıklandığında kullanıcı, sol tarafında gelişmiş filtreleme paneli, sağ tarafında ise tüm restoranların alt alta listelendiği ana arama/katalog sayfasına yönlendirilir.

### 5.3. Admin (Sistem Yöneticisi) Paneli Detayları
- **Erişim Yolu:** Footer'ın sağ en altındaki "Yetkili" yazısına tıklandığında özel bir admin giriş sayfasına yönlendirme yapılır.
- **Giriş Bilgileri:** Standart kullanıcıların aksine, adminden giriş yaparken **Kullanıcı Adı ve Şifre** istenir (Email istenmez).
- **Yetkili Birim Pop-up'ı:** Admin giriş ekranının sağ alt köşesinde "Yetkili Birime Bağlan" linki/butonu bulunur. Tıklandığında ekrana bir pop-up açılır ve içerisinde *"5-15 dakika içerisinde tarafınıza dönüş yapılacaktır"* ibaresi yer alır.
- **Tema Tasarımı:** Admin paneli tamamen koyu renkli (Dark Mode), gözü yormayan ve yöneticinin dikkatini dağıtmayacak şekilde Material UI koyu teması (`#111827` ve tonları) ile tasarlanacaktır.
- **Yönetim Fonksiyonları:** Panel içinde kullanıcılar, restoranlar ve siparişler için MUI tabanlı gelişmiş veri tabloları (Data Tables) bulunmalıdır. Admin, satır içi veya harici butonlarla tüm sisteme ait verileri silme (Delete) ve düzenleme (Edit) yetkisine tam olarak sahiptir. Çıkış işlemi panel içindeki güvenli bir "Çıkış Yap" butonu ile sağlanır.

### 5.4. Restoran Sahibi Arayüzü
- Giriş yapısı ve restoran yönetim modülleri Yemeksepeti'nin orijinal iş akışıyla (Menü yönetimi, sipariş onay/red süreçleri, ürün ekleme) birebir klonlanacaktır.

## 6. Genel Navigasyon Kuralları
- Projedeki tüm yönlendirmeler (`Link` veya `useNavigate` ile) eksiksiz çalışmalıdır.
- Kırık link, boş yönlendirme veya çalışmayan mock bir sayfa kesinlikle bulunmayacaktır; her sayfa kendi içinde fonksiyonel bir yapıya sahip olacaktır.