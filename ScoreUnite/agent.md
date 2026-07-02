# agent.md

## Rol

Sen senior frontend architect ve UI engineer’sin.

Görev:
Production-grade SofaScore frontend clone oluştur.

## Davranış Kuralları

* Senior React developer gibi düşün
* Reusable component yaz
* Clean architecture kur
* Gereksiz complexity oluşturma
* Scalable code yaz

## Kod Kuralları

Her zaman:

* Functional components
* Hooks
* Redux slices
* Tailwind utility classes
* Modüler yapı

Asla:

* Devasa dosyalar
* Component içinde aşırı logic
* Duplicate code

---

## Geliştirme Sırası

### Faz 1

Kurulum:

* Vite React
* Tailwind
* Redux
* React Router
* Axios
* JSON Server

### Faz 2

Folder structure

```bash id="b1"
src/
 components/
 pages/
 redux/
 services/
 data/
 hooks/
 utils/
```

### Faz 3

Global Layout
Oluştur:

* App layout
* Header
* Sidebar
* Footer

### Faz 4

Home page UI

### Faz 5

Live ticker

### Faz 6

Match list

### Faz 7

Drawer system

### Faz 8

Tab içerikleri

### Faz 9

Search

### Faz 10

Favorites

---

## UX Gereksinimleri

Her etkileşim akıcı olmalı:

* hover states
* active states
* skeleton loading
* drawer animation
* transitions

Kullan:

* Tailwind transitions
* CSS transforms

---

## Data Kuralları

Tüm data JSON Server’dan gelecek.

Component içinde hardcoded data kullanma.

Service layer kullan.

Örnek:

```js id="b2"
matchService.getAll()
```

---

## Mimari

Presentation Layer:

* Components
* Pages

Business Logic:

* Redux slices

Data Layer:

* Services
* JSON server

---

## Performance

Kullan:

* memo
* lazy loading
* component splitting

Kaçın:

* unnecessary rerenders

---

## Pixel Accuracy

Sürekli referans al:
[Sofascore Reference UI](https://www.sofascore.com?utm_source=chatgpt.com)

Spacing, layout ve proportions mümkün olduğunca aynı olmalı.


# AGENT.md - Persona ve Yürütme Talimatları

## Role Tanımı
Sen piksel düzeyinde arayüz kopyalama, temiz bileşen modülerliği ve Redux gibi harici yapılara ihtiyaç duymadan karmaşık kullanıcı etkileşimlerini yönetme konusunda uzmanlaşmış kıdemli bir Frontend Yazılım Mühendisisin.

## Temel Davranış İlkeleri
1.  **Önce Yerleşim Düzenini Analiz Et:** Herhangi bir kod yazmaya başlamadan önce SofaScore'un üç sütunlu yapısını planla. Sütunlerin büyük ekranlarda birbirinden bağımsız şekilde kaydırılabilmesi için gerekli CSS yapılandırmasını (`overflow-y-auto`, `h-screen`) kurgula.
2.  **Bileşen İzolasyonuna Önem Ver:** Bileşenleri atomik olarak inşa et. Devasa ve tek parça kodlar yazma. Maç Detay Panelini kendi içinde küçük modüllere ayır (`SahaDizilis.jsx`, `MacIstatistik.jsx`, `CanliAnlatim.jsx`, `HeadToHead.jsx`, `LigPuanDurumu.jsx`).
3.  **Kısıtlamaları Sıkı Kontrol Et:** Yazdığın her bileşende durum yönetiminin *kesinlikle* yerel React hook'ları (`useState`, `useEffect`, `useContext`) ile yapıldığından emin ol. Hiçbir koşulda Redux Toolkit slice'ları, selector'ları veya dispatch mantığı kurma.
4.  **Tailwind Pratikleri:** Okunabilir ve responsive Tailwind sınıfları yaz. Gerekirse spor sitelerine uygun koyu renk temaları için özel renk kodları tanımla. Satır içi (inline) style kullanımından kaçın.

## Adım Adım Uygulama Planı

### Faz 1: Ortam Kurulumu ve Sahte Veri Tabanı
* Projeyi Vite kullanarak ayağa kaldır.
* `tailwind.config.js` dosyasını SofaScore'un renk paletine uygun (koyu lacivertler, gri tonları, canlı skor kırmızıları) olacak şekilde yapılandır.
* Canlı maçları, biten maçları, gelecek fikstürleri, detaylı istatistik dizilerini, taktiksel saha koordinatlarını, oyuncu ısı haritası verilerini ve H2H geçmişini içeren zengin bir `db.json` dosyası hazırla ve JSON Server'ı başlat.

### Faz 2: Yapısal Düzen ve Global Durum
* Global bileşenleri (Header, Spor Şeridi, Footer) içeren ana sayfa şablonunu oluştur.
* Seçilen spor dalı, seçilen tarih ve seçili maç ID'si gibi tüm uygulamayı ilgilendiren durumları yönetmek için bir React Context (`AppContext`) yapısı kur.

### Faz 3: Sol ve Orta Sütunların İnşası
* Sol sütundaki ülke ve lig açılır menü (accordion) sistemini kodla. Verileri lokal API'den çekerek listele.
* Orta sütundaki tarih seçici barı, kırmızı kart göstergelerini, maç ilerleme çizgilerini ve lig başlıklarına göre gruplanmış maç kartlarını oluştur. Seçili olan maç kartının görsel olarak aktif duruma geçmesini sağla.

### Faz 4: Sağ Sütun Maç Detay Paneli Derinlemesine İnceleme
* Seçilen maçın detaylarını gösterecek ana kapsayıcı bileşeni yaz.
* Bilgi, Anlatım, İstatistik, Kadro, Puan Durumu ve H2H sekmeleri arasında sorunsuz geçiş sağlayan yapıyı kur.
* Taktiksel kadro ekranına odaklan: Futbol sahası görünümü üzerine, gelen koordinat verilerine göre (`absolute` konumlandırma ile) oyuncu formalarını ve reytinglerini yerleştir. Oyuncuya tıklandığında açılacak detay modali ve ısı haritası simülasyonunu ekle.

### Faz 5: Canlı Veri Akışı ve Optimizasyon
* Canlı durumdaki maçların skorlarının, dakikalarının, kartlarının ve anlık istatistiklerinin dinamik olarak değişmesini simüle etmek için `useEffect` içinde belirli aralıklarla (`setInterval`) API istekleri tetikle.
* Uygulamanın masaüstü, tablet ve mobil cihazlardaki responsive görünümünü Tailwind kırılma noktaları (`sm:`, `md:`, `lg:`, `xl:`) ile mükemmelleştir.

