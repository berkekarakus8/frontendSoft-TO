# Nexus NFT Marketplace - Teknik Dokümantasyon

## Genel Bakış
Nexus NFT Marketplace, modern web teknolojileri ile geliştirilmiş, minimalist ve yüksek performans odaklı bir Single Page Application (SPA) projesidir. Sistem mimarisi, üçüncü parti bağımlılıkları (third-party dependencies) en aza indirecek şekilde yapılandırılmış olup, durum (state) ve stil (CSS) yönetimi üzerinde tam kontrol sağlamayı hedefler.

Projenin temel felsefesi, karmaşık konfigürasyonlardan kaçınarak saf JavaScript (ES6+), merkezi durum yönetimi (Redux Toolkit) ve bileşen (component) bazlı özel Tailwind CSS v4 yapısı ile sürdürülebilir bir ekosistem yaratmaktır.

## 1. Mimari Kararlar ve Desenler (Architectural Patterns)

### 1.1. Merkezi ve Bileşen Bazlı Stil Yönetimi (CSS-in-CSS Mimarisi)
Proje, kullanıcı arayüzü geliştirmesinde standart "utility-first" yaklaşımını yapısal bir düzene sokmak amacıyla bileşen bazlı ve merkezi bir CSS hiyerarşisi uygular.

- **Merkezi Stil Yönetimi (`index.css`):** Yapısal ve tipografik tüm tasarım kuralları `index.css` dosyasında merkezileştirilmiştir. Tailwind v4'ün `@apply` direktifi sayesinde, `.profile-wallet-card` veya `.modal-overlay` gibi tamamen projeye özgü semantik sınıflar oluşturulmuştur.
- **Temiz JSX Yapısı:** Bileşenlerin (Component) içindeki HTML etiketleri, karmaşık satır içi (inline) utility sınıflarından (örn: `flex items-center text-sm p-4 rounded-lg...`) tamamen arındırılmıştır. Bu yaklaşım, React bileşenlerinin sadece iş mantığına (business logic) ve iskelete odaklanmasını sağlar.
- **Duyarlı (Responsive) ve Pseudo Sınıflar:** `hover:`, `md:`, `focus:` gibi davranışsal sınıflar doğrudan `index.css` içindeki `@apply` bildirimlerinde kapsüllenerek (encapsulation) yönetilir.
- **Dinamik Sınıf Yönetimi:** JSX içerisinde satır içi sınıf kullanımına yalnızca, bileşenin durumuna bağlı dinamik değişiklikler gerektiğinde başvurulur (Örn: ``className={`admin-table-role ${u.role === 'admin' ? 'bg-amber-100' : 'bg-emerald-100'}`}``).

### 1.2. State Tabanlı Kütüphanesiz Yönlendirme (Zero-Dependency Routing)
Uygulama içi navigasyon (routing), harici kütüphanelere ihtiyaç duyulmadan tamamen global durum yönetimi üzerinden tasarlanmıştır.

- **Uygulama Mantığı:** Navigasyon akışı, Redux `authSlice` içindeki `activePage` durumu ile yönetilir.
- **Görünüm (View) Çözümleme:** Kök bileşen olan `App.jsx`, `state.auth.activePage` değerini dinler ve standart bir JavaScript `switch/case` akışı ile doğru ekranı render eder. Sayfa geçişleri, global bir Redux eylemi olan `dispatch(setActivePage('hedef_sayfa'))` ile tetiklenir.

### 1.3. Senkron Veri Akışı
Redux Toolkit entegrasyonu, öngörülebilir ve izlenebilir bir veri akışı sağlamak amacıyla tasarlanmıştır. Karmaşıklığı artıran asenkron katmanlar yerine, doğrudan React bileşenleri ile reducer'lar arasında senkron bir veri iletişim hattı (pipeline) kurulmuştur.

## 2. Küresel Veri Tanımları (Redux Slices)

Projedeki veri yapısı üç ana alan altında normalize edilmiştir:

- **authSlice:** 
  - Kullanıcı oturumu ve yetkilendirme süreçlerini kontrol eder (`isAuthenticated`, `currentUser`).
  - Yönlendirme (routing) durumunu tutar (`activePage`).
  - Sistem içi bakiye mutasyonlarını (ETH ve USD) yönetir (`updateBalance`).

- **nftSlice:**
  - Sistemdeki NFT'lerin küresel veritabanını oluşturur (`nfts`).
  - Belirli görünümlere (view) özel alt veri havuzlarını tutar (Örn: Portföy için `myNfts`, Admin onayı için `pendingNfts`).
  - Kullanıcının etkileşimde olduğu anlık ürün verisini (Detay görünümü için `selectedNFT`) sağlar.

- **cartSlice:**
  - E-ticaret akışını, sepete eklenen ürünlerin durumunu ve checkout (ödeme) öncesi tutar hesaplamalarını yönetir.

## 3. Dosya ve Dizin Hiyerarşisi

```text
nft-marketplace/
├── src/
│   ├── components/         
│   │   ├── Navbar.jsx      # Üst navigasyon ve anlık bakiye paneli
│   │   ├── Footer.jsx      # Alt bilgi ve bağlantılar
│   │   ├── NFTCard.jsx     # Modüler NFT vitrin kartı
│   │   └── Toast.jsx       # Küresel bildirim (Alert) sistemi
│   │
│   ├── pages/              
│   │   ├── Home.jsx        # Karşılama ekranı ve öne çıkan koleksiyonlar
│   │   ├── Profile.jsx     # Detaylı kullanıcı paneli, portföy ve yönetim (Admin) konsolu
│   │   ├── Explore.jsx     # Gelişmiş NFT keşif altyapısı
│   │   ├── Cart.jsx        # Sepet ve ödeme akışı
│   │   └── NFTDetail.jsx   # Tekil ürün sayfası ve teklif mekanizması
│   │
│   ├── store/              
│   │   ├── store.js        # Redux store konfigürasyonu
│   │   ├── authSlice.js    
│   │   ├── nftSlice.js     
│   │   └── cartSlice.js    
│   │
│   ├── index.css           # Tasarım sisteminin tekil doğru kaynağı (Single Source of Truth)
│   ├── App.jsx             # State-tabanlı router'ın merkezi denetleyicisi
│   └── main.jsx            # Uygulama kök render noktası (React & Redux Provider)
│
└── vite.config.js          # Vite derleyici (Bundler) yapılandırması
```

## 4. Geliştirme Ortamı ve Kurulum

Proje, Vite altyapısında anında güncellemeler (HMR) ile çalışacak şekilde optimize edilmiştir.

**Kurulum Adımları:**
1. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```
2. Geliştirme (development) sunucusunu başlatın:
   ```bash
   npm run dev
   ```
3. Uygulamayı tarayıcınızda açın: Genellikle `http://localhost:5173`

> **Önemli Geliştirici Notu:** Sisteme eklenecek yeni UI bileşenlerinin `index.css` dosyasındaki merkezi CSS yapısına (CSS-in-CSS) uyması beklenmektedir. Tailwind v4 mimarisi gereği, `@apply` direktifleri içerisinde sadece saf Tailwind utility sınıfları kullanılmalıdır.
