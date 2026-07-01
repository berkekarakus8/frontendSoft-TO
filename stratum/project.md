# Project: STRATUM - Premium E-Commerce (Nike Clone)

## 📌 Project Overview
This project is a high-end, pixel-perfect clone of the official Nike website (`nike.com`). It adopts Nike's minimalist design system, premium user experience (UX), and smooth micro-interactions. The core goal is to build a fully responsive e-commerce front-end where only the brand name and logo differ from the original Nike experience.

## 🛠️ Tech Stack
- **Framework:** React (Vite)
- **Styling:** Bootstrap 5 (via npm) & Custom CSS/SCSS
- **Icons:** Lucide React
- **Animation Support:** CSS3 Keyframes & Transitions (Custom cubic-bezier curves specified in skills.md)

---

## 🎨 Design System & Tokens

### Color Palette (Strict Nike Compliance)
| Token Name | Hex Code | Usage |
| :--- | :--- | :--- |
| `bg-base-white` | `#FFFFFF` | Main backgrounds, clean spaces |
| `bg-light-gray` | `#F5F5F5` | Product cards background, utility bar, secondary blocks |
| `text-primary-black`| `#111111` | Primary typography, active buttons, solid icons |
| `text-secondary-gray`| `#707072` | Product categories, descriptions, subtitles |
| `accent-red` | `#D3122A` | "Member Exclusive" labels, error states, specific badges |

### Typography
- **Headings (H1, H2, H3):** Uppercase, extra-bold, tight tracking (`font-weight: 800; text-transform: uppercase; letter-spacing: -0.05em;`).
- **Body Text:** Clean sans-serif (Helvetica Neue, Inter, or system-ui), regular weight (`font-weight: 400; font-size: 16px; line-height: 1.6;`).

### Layout Constraints
- Max width container for desktop viewports: `max-width: 1440px;` centered with `margin: 0 auto; px-4 px-lg-5`.

---

## 🧭 Global Components Structure

### 1. Utility Bar (Top Strip)
- **Height:** `36px` | **Background:** `#F5F5F5`
- **Left:** Sub-brand or sister community minimalist SVG icon.
- **Right:** Navigation links: "Find a Store" | "Help" | "Join Us" | "Sign In". Font size: `12px`, Color: `#111111`. Hover state: opacity drops to 70%.

### 2. Main Navigation Header
- **Height:** `60px` | **Behavior:** `position: sticky; top: 0; z-index: 1050;` with a frosted glass effect (`background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(10px);`).
- **Left:** Minimalist `STRATUM` SVG Logo (`height: 24px`, solid black).
- **Center:** Main categories: "New & Featured", "Men", "Women", "Kids", "Sale". (Triggers Mega Menu opacity overlay).
- **Right:** 
  - **Search Bar:** Pill-shaped input box (`border-radius: 50px; background: #F5F5F5;`). Fully interactive.
  - **Favorites:** Heart icon.
  - **Cart:** Shopping bag icon with a small notification circle badge showing active item count.

### 3. Infinite Rolling Banner (Marquee)
- **Position:** Right below the Main Header. **Height:** `50px` | **Background:** `#F5F5F5`.
- **Behavior:** Smooth, continuous **LEFT-TO-RIGHT** infinite scrolling loop containing dynamic promotional text or partner logos. Must pause completely when a user hovers over it (`animation-play-state: paused;`).

---

## 📄 Page Architecture & Features

### 🏠 Page 1: Homepage (Home)
1. **Hero Component:** Full-width high-impact sports/product imagery. Massive bold typography overlayed with a pill-shaped "Shop Now" button (`background: #111111; color: #fff; border-radius: 50px; border: none;`).
2. **Trending Slider (Product Carousel):** Left-aligned uppercase title. Top-right navigation arrow buttons (perfect circles with light gray backgrounds). Contains swipeable product cards.
3. **Category Pillars:** 3-column Bootstrap grid (`row-cols-1 row-cols-md-3 g-3`). Images with absolute-positioned white pill buttons in the bottom-left corner ("Men's", "Women's", "Accessories").

### 🛍️ Page 2: Product Listing Page (PLP)
1. **Layout:** Left sticky sidebar (`width: 260px; position: sticky; top: 80px;`) for advanced filters (Size Grid, Color Blobs, Category Accordions). Right grid for products (`row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4`).
2. **Interactive Cards:** Displays the main product image. Triggers instant seamless image swap on hover. Shows Title, Category, and Price on base state.

### 👟 Page 3: Product Detail Page (PDP)
1. **Layout:** Split layout (`row`). Left column contains a vertical multi-image static grid layout. Right column acts as a sticky checkout pane (`position: sticky; top: 80px;`).
2. **Size Selection Grid:** 5-column grid layout of square buttons. Out-of-stock items display a 45-degree diagonal line striking through them and inherit a disabled state.
3. **Action Buttons:** Large full-width pill buttons. Primary: Add to Bag (Solid Black). Secondary: Favorite (White background, thin gray border, heart icon inside).

### 🛒 Page 4: Slide-Out Cart Drawer
- Offcanvas style component opening smoothly from the right side (`position: fixed; right: 0; top: 0; height: 100vh; width: 450px;`). Applies a deep dark overlay (`rgba(0,0,0,0.4)`) on the background. Contains summary item lists, size modification controls, and a prominent checkout CTA.

---

## 📂 Proje Klasör Yapısı ve Kullanılması Gereken Dosyalar (File Mapping)
Yapay zekanın projeyi oluştururken kodları hangi dosya isimleri ve dizinler altında yapılandırması gerektiği aşağıda belirtilmiştir. Tüm bileşenler ve stiller bu mimariye sadık kalınarak üretilmelidir:

```text
stratum/
├── public/
│   └── assets/               # Statik logolar ve vektörler (SVG)
├── src/
│   ├── components/           # Küresel ve Ortak Bileşenler
│   │   ├── UtilityBar.jsx    # En üstteki ince gri bilgilendirme barı
│   │   ├── Header.jsx        # Sticky/Buzlu cam efektli ana navigasyon barı
│   │   ├── Marquee.jsx       # Soldan sağa sonsuz akan kampanya bandı
│   │   ├── ProductCard.jsx   # Çift görsel geçişli ve alt panel açılır ürün kartı
│   │   └── CartDrawer.jsx    # Sağdan açılan Offcanvas sepet çekmecesi
│   ├── pages/                # Sayfa Seviyesindeki Görünümler
│   │   ├── Homepage.jsx      # Hero alanı ve kategori blokları içeren ana sayfa
│   │   ├── ProductListing.jsx# Sticky filtre panelli ürün listeleme (PLP)
│   │   └── ProductDetail.jsx # İki sütunlu ve dinamik beden matrisli detay (PDP)
│   ├── context/
│   │   └── CartContext.jsx   # Sepet ve Drawer durum yönetimi (State)
│   ├── styles/               # Özelleştirilmiş Stil Katmanları
│   │   ├── global.css        # Tasarım tokenları ve tipografi ayarları
│   │   └── components.css    # Mikro etkileşimler ve animasyon kodları (skills.md içeriği)
│   ├── App.jsx               # Sayfa yönlendirmeleri ve context sağlayıcı
│   └── main.jsx              # Giriş noktası (Vite & Bootstrap entegrasyonu)
├── package.json
└── vite.config.js
```
