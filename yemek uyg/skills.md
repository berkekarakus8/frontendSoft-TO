# `SKILLS.md`

# Project Development Skills

## Kod Kalitesi

* Clean Code
* SOLID mantığına yakın yapı
* DRY
* Reusable Component
* Atomic düşünce yapısı

---

## React Kuralları

Her component tek göreve sahip olmalıdır.

Component dosyaları küçük tutulmalıdır.

Props karmaşası oluşturulmamalıdır.

State yönetimi minimum tutulmalıdır.

---

## Redux Kuralları

Her veri Redux üzerinden yönetilecektir.

Local state sadece UI işlemleri için kullanılacaktır.

Store yapısı sade olacaktır.

Slice isimleri anlamlı olacaktır.

---

## UI Kuralları

Modern görünüm

Minimal tasarım

Tutarlı spacing

Tutarlı radius

Tutarlı shadow

Hover efektleri

Loading animasyonları

Skeleton ekranları

Smooth transition

---

## UX Kuralları

Hiçbir işlem aniden gerçekleşmeyecek.

Her önemli işlemde animasyon olacaktır.

Loading ekranları olacaktır.

Toast mesajları kullanılacaktır.

Popup geçişleri akıcı olacaktır.

---

## Animasyon Kuralları

Hover

Scale

Fade

Slide

Rotate

Opacity

Framer Motion tercih edilecektir.

Animasyonlar kısa olacaktır.

---

## CSS Kuralları

BEM veya modüler yapı

Magic number kullanılmayacak

Renkler değişkenlerden yönetilecek

Tekrarlayan kod olmayacak

Responsive öncelikli yazılacak

---

## Responsive Kuralları

320px

375px

768px

1024px

1440px

tam desteklenecektir.

---

## Dosya Yapısı

components/

pages/

layouts/

redux/

services/

hooks/

assets/

styles/

utils/

constants/

routes/

data/

---

## İsimlendirme

Component

PascalCase

Fonksiyon

camelCase

Dosya

PascalCase

Redux Slice

camelCase

SCSS

kebab-case

---

## Git Kuralları

Anlamlı commit

Küçük commitler

Feature bazlı geliştirme

---

## Performans

Gereksiz render olmayacak

Lazy Loading uygulanacak

Memoization gerektiğinde kullanılacak

Optimize edilmiş component yapısı kurulacak

---

## Erişilebilirlik

Semantic HTML

ARIA gerekli yerlerde kullanılacak

Keyboard navigation desteklenecek

Kontrast oranları korunacak

---

## Hata Yönetimi

404

Error Boundary

Boş veri ekranları

Loading ekranları

Toast bildirimleri

Her hata kullanıcı dostu mesajlarla gösterilecektir.

# Geliştirici Yetkinlik ve Teknik Uygulama Kuralları (Skills Rules)

## 1. Mimari Tasarım ve Temiz Kod Kuralları
- **Bileşen Bölümlemesi (Component Atomicity):** Projedeki arayüzler olabildiğince yeniden kullanılabilir (reusable) parçalara ayrılacaktır. Navbar, Footer, RestoranKart, Popup ve LoadingBileşeni gibi yapılar kendi klasörlerinde izole edilmelidir.
- **Props Doğrulaması:** Bileşenler arası veri aktarımında props yapıları net ve okunabilir olmalıdır. Gerekli yerlerde varsayılan değerler (defaultProps) tanımlanmalıdır.

## 2. State Yönetimi (Redux Toolkit) Standartları
- **Global State Yapısı:** Aşağıdaki durumlar kesinlikle Redux store üzerinde merkezi olarak yönetilecektir:
  - Kullanıcı oturum durumu (Giriş yapan rol: admin, kullanıcı, restoran ve auth token simülasyonu).
  - Sepet içeriği (Ürün ekleme, çıkarma, adet güncelleme, toplam tutar hesabı).
  - Favori restoran listesi (Listeye ekleme, listeden çıkarma).
  - Seçilen aktif konum/ilçe bilgisi.
- **Slice Yapısı:** `authSlice.js`, `cartSlice.js`, `favoritesSlice.js` ve `restaurantSlice.js` gibi modüler parçalar halinde clean-code prensibine uygun yazılmalıdır.

## 3. CSS ve Stil Yönetimi (Material UI)
- **Tema Sağlayıcı (ThemeProvider):** Uygulamanın en dış katmanında MUI `ThemeProvider` tanımlanmalı, belirlenen iki ana renk (`#9B1C1C` ve `#111827`) theme konfigürasyonuna eklenmelidir.
- **sx Özelliği ve Stil CSS Kısıtlaması:** Stil işlemleri için harici CSS veya Tailwind CSS kullanılmayacaktır. Tüm dinamik ve statik görsel ayarlamalar MUI'ın `sx` prop'u veya `styled` bileşen mimarisiyle çözülecektir.
- **Efekt ve Animasyon Kodlaması:**
  - *Hover Geçişleri:* Renk değişimleri ve yakınlaşma efektlerinde `transition: "all 0.3s ease-in-out"` gibi akıcı animasyonlar kullanılacaktır.
  - *Soldan Sağa Akma Efekti:* Pop-up butonundaki soldan sağa akma efekti için CSS `background-size` ve `background-position` geçişleri ya da pseudo-element (`::before`) animasyonları MUI sx yapısıyla kurgulanacaktır.
  - *Flaş İndirim Animasyonu:* Kırmızı yazının yanıp sönmesi için `@keyframes blink` animasyon tanımı MUI ana temasına veya ilgili bileşenin `sx` özelliğine gömülecektir.

## 4. Zamanlayıcılar (Timers) ve Döngüler
- **setInterval ve setTimeout Yönetimi:**
  - 5 saniyede bir dönen Önerilen Restoranlar bandı için `setInterval` kullanılacaktır.
  - İlçe seçimindeki 3 saniyelik yükleme ekranı için `setTimeout` kurgulanacaktır.
- **Bellek Sızıntısı (Memory Leak) Önlemi:** Açılan tüm zamanlayıcılar ve döngüler, ilgili bileşenin kapanması (`componentWillUnmount` aşaması / `useEffect` return fonksiyonu) durumunda `clearInterval` ve `clearTimeout` ile temizlenmelidir.