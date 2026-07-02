# Skills: Advanced Micro-Interactions & CSS Recipes (Bootstrap 5 Context)

This file contains the precise engineering specifications for animations, transitions, and hover behaviors required for the project. These configurations must be copy-pasted or strictly mimicked inside the custom styling system.

## 🎞️ 1. Global Timing & Easing Physics
All transitions must avoid the generic linear or standard ease curves. Use the elite premium cinematic curve:

```css
.nike-transition {
  transition: all 300ms cubic-bezier(0.25, 1, 0.5, 1) !important;
}

/* Active Click Shrink Effect */
.btn-nike-active:active {
  transform: scale(0.97) !important;
  transition: transform 100ms ease !important;
}
```

## 📍 CSS Recipes & Code Blocks

### 1. Global Utility Styles
📍 Uygulanacağı Dosya: src/styles/global.css
```css
.nike-transition {
  transition: all 300ms cubic-bezier(0.25, 1, 0.5, 1) !important;
}

/* Active Click Shrink Effect */
.btn-nike-active:active {
  transform: scale(0.97) !important;
  transition: transform 100ms ease !important;
}
```

### 2. Header & Navigation Underlines
📍 Uygulanacağı Dosya: src/components/Header.jsx (JSX Yapısı)
```jsx
<div className="position-relative nike-nav-group">
  <a href="#" className="nav-link-nike text-decoration-none text-dark fw-medium px-3 py-2 d-inline-block">
    Men
  </a>
</div>
```

📍 Uygulanacağı Dosya: src/styles/components.css (CSS Yapısı)
```css
.nike-nav-group {
  display: inline-block;
}

.nav-link-nike {
  color: #111111;
  position: relative;
}

.nav-link-nike::after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: -2px;
  left: 0;
  background-color: #111111;
  transform-origin: bottom left;
  transition: transform 300ms cubic-bezier(0.25, 1, 0.5, 1);
}

.nike-nav-group:hover .nav-link-nike::after {
  transform: scaleX(1);
}

/* Dimming sibling links on hover */
.navbar-nav-nike:hover .nike-nav-group:not(:hover) {
  opacity: 0.5;
  transition: opacity 300ms cubic-bezier(0.25, 1, 0.5, 1);
}
```

### 3. Arama Kutusu, Kalp ve Çanta Animasyonları
📍 Uygulanacağı Dosya: src/styles/components.css
```css
/* A. Search Input Expansion Engine */
.search-input-nike {
  width: 180px;
  background-color: #F5F5F5;
  border: none;
  padding: 8px 16px 8px 40px;
  border-radius: 50px;
  transition: width 350ms cubic-bezier(0.25, 1, 0.5, 1), background-color 350ms ease;
}

.search-input-nike:focus {
  width: 280px;
  background-color: #E5E5E5;
  outline: none;
  box-shadow: none;
}

/* B. Favorites Heart Pop & Rotation Effect */
.icon-heart-nike {
  transition: transform 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
}

.icon-heart-nike:hover {
  transform: scale(1.15) rotate(4deg);
}

/* Active Heart Pop Simulation triggered via React state */
.icon-heart-nike.active {
  fill: #D3122A !important;
  stroke: #D3122A !important;
  animation: heartPulse 400ms cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

@keyframes heartPulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.4); }
  100% { transform: scale(1); }
}

/* C. Shopping Bag Micro-Bounce Engine */
.icon-bag-nike:hover {
  animation: bagBounce 500ms cubic-bezier(0.25, 1, 0.5, 1) ease-in-out;
}

@keyframes bagBounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}

/* Red Dot Count Notification Drop-In */
.badge-bag-nike {
  animation: badgeScaleIn 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

@keyframes badgeScaleIn {
  from { transform: scale(0); }
  to { transform: scale(1); }
}
```

### 4. Sonsuz Dönen Kampanya Bandı (Marquee)
📍 Uygulanacağı Dosya: src/components/Marquee.jsx (JSX Dosyası)
```jsx
import React from 'react';

const Marquee = () => {
  return (
    <div className="nike-marquee-wrapper overflow-hidden d-flex align-items-center">
      <div className="nike-marquee-content d-flex white-space-nowrap">
        <span>Free Shipping on Orders Over $150</span>
        <span>Join Us and Get 15% Off Your First Purchase</span>
        <span>Premium Footwear Built For Champions</span>
      </div>
      {/* Duplicate content to create perfect infinite illusion */}
      <div className="nike-marquee-content d-flex white-space-nowrap" aria-hidden="true">
        <span>Free Shipping on Orders Over $150</span>
        <span>Join Us and Get 15% Off Your First Purchase</span>
        <span>Premium Footwear Built For Champions</span>
      </div>
    </div>
  );
};

export default Marquee;
```

📍 Uygulanacağı Dosya: src/styles/components.css (CSS Dosyası)
```css
.nike-marquee-wrapper {
  background-color: #F5F5F5;
  height: 50px;
  width: 100%;
}

.nike-marquee-content {
  flex-shrink: 0;
  display: flex;
  justify-content: space-around;
  min-width: 100%;
  gap: 4rem;
  /* Animating Left to Right direction */
  animation: marqueeLeftToRight 25s linear infinite;
}

.nike-marquee-content span {
  font-size: 13px;
  font-weight: 500;
  color: #111111;
  text-transform: uppercase;
}

.nike-marquee-wrapper:hover .nike-marquee-content {
  animation-play-state: paused;
}

@keyframes marqueeLeftToRight {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0%);
  }
}
```

### 5. Ürün Kartları Görsel Geçişi ve Beden Paneli
📍 Uygulanacağı Dosya: src/styles/components.css
```css
/* A. Dual Image Cross-Fade Engine */
.card-image-container {
  position: relative;
  overflow: hidden;
  background-color: #F5F5F5;
}

.card-img-primary {
  transition: opacity 400ms cubic-bezier(0.25, 1, 0.5, 1), transform 400ms cubic-bezier(0.25, 1, 0.5, 1);
  opacity: 1;
}

.card-img-secondary {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 400ms cubic-bezier(0.25, 1, 0.5, 1), transform 400ms cubic-bezier(0.25, 1, 0.5, 1);
  opacity: 0;
}

.product-card-nike:hover .card-img-primary {
  opacity: 0;
  transform: scale(1.03);
}

.product-card-nike:hover .card-img-secondary {
  opacity: 1;
  transform: scale(1.03);
}

/* B. Quick Add Size Panel Slide-Up */
.quick-add-pane {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
  transform: translateY(100%);
  opacity: 0;
  transition: transform 300ms cubic-bezier(0.25, 1, 0.5, 1), opacity 300ms cubic-bezier(0.25, 1, 0.5, 1);
  padding: 15px;
}

.product-card-nike:hover .quick-add-pane {
  transform: translateY(0);
  opacity: 1;
}
```

### 6. Beden Matrisi ve Stokta Olmayan Beden Hata Sallanması
📍 Uygulanacağı Dosya: src/styles/components.css
```css
.size-box-nike {
  border: 1px solid #E5E5E5;
  background: #FFFFFF;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  cursor: pointer;
  transition: border-color 200ms ease;
}

.size-box-nike:hover:not(.disabled) {
  border-color: #111111;
}

.size-box-nike.selected {
  box-shadow: 0 0 0 2px #FFFFFF, 0 0 0 4px #111111;
}

/* Out of Stock Diagonal Slash Line Configuration */
.size-box-nike.disabled {
  background-color: #FAFADA;
  color: #CCCCCC;
  cursor: not-allowed;
  position: relative;
  overflow: hidden;
  opacity: 0.6;
}

.size-box-nike.disabled::after {
  content: "";
  position: absolute;
  width: 150%;
  height: 1px;
  background-color: #CCCCCC;
  transform: rotate(45deg);
  transform-origin: center;
}

.size-box-nike.disabled:hover {
  animation: shakeError 400ms ease-in-out;
}

@keyframes shakeError {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}
```
