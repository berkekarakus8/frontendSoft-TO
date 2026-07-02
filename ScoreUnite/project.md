# project.md

## Proje Adı

SofaScore Clone (Frontend)

## Amaç

**[Sofascore](https://www.sofascore.com?utm_source=chatgpt.com)** sitesinin frontend tarafını piksele yakın doğrulukta klonla.

Bu proje:

* Kullanıcı deneyimi
* Layout yapısı
* Component davranışları
* Görsel hiyerarşi
* Responsive yapı

açısından SofaScore ile neredeyse birebir olmalı.

## Kullanılacak Teknolojiler (KESİN)

Sadece şu seviyeye kadar kullanılabilir:

* React
* React Router DOM
* Redux Toolkit
* Tailwind CSS
* JSON Server (zorunlu)
* Axios
* LocalStorage

## Kullanılmayacaklar

* Next.js
* TypeScript
* Firebase
* Supabase
* Node backend
* GraphQL
* Framer Motion
* İleri seviye animasyon kütüphaneleri

## Ana Gereksinim

SofaScore’un frontend’inde görülen her özellik bulunmalı.

Bunlara dahil:

* Header
* Üst kayan skor ekranı
* Canlı maç kartları
* Match listesi
* Sol sidebar
* Lig tabloları
* Maç detay drawer
* İstatistikler
* Kadrolar
* Olay zaman çizelgesi
* Puan durumu
* Haber kartları
* Footer
* Search
* Favorites

---

# Sayfalar

## 1) Ana Sayfa

İçerik:

### Top Navigation

* SofaScore benzeri logo
* Search icon
* Login butonu
* Notification icon
* Settings icon
* Spor kategorileri

Spor sekmeleri:

* Futbol
* Basketbol
* Tenis
* Beyzbol
* Motorsport
* Cricket
* MMA
* Voleybol
* Hentbol

Mobilde horizontal scroll olmalı.

---

### Üst Canlı Ticker (ÇOK ÖNEMLİ)

Sitenin en üst kısmındaki yatay kayan skor alanı.

Her kartta:

* Takım 1 logosu
* Takım 2 logosu
* Skor
* Dakika
* Maç durumu
* Kırmızı kart göstergesi
* Live badge

Davranış:

* Auto scroll
* Sol/sağ buton
* Hover olunca durmalı
* Tıklanınca sağ drawer açılmalı

JSON örneği:

```json id="a1"
{
  "id": 1,
  "homeTeam": "Barcelona",
  "awayTeam": "Real Madrid",
  "score": "2-1",
  "minute": "76'",
  "live": true
}
```

---

## 2) Match Listing Bölümü

Maçlar şu yapıda gruplanmalı:

* Ülke
* Lig
* Tarih

Örnek:
İspanya

* La Liga
* Segunda Division

Lig satırında:

* Lig logosu
* Lig adı
* Favorite star
* Collapse button

Her maç satırında:

* Takımlar
* Takım logoları
* Güncel skor
* Match status
* Red cards
* Yellow cards
* TV icon
* Statistics shortcut

Maça tıklanınca:
Sağdan drawer açılmalı.

---

## 3) Sağ Match Detail Drawer

Drawer sağdan slide ile açılmalı.

Genişlik:

* Desktop: 500px
* Tablet: 100%
* Mobile: Fullscreen

Tablar:

* Overview
* Stats
* Lineups
* Standings
* H2H
* News

---

# Overview Tab

## Score Header

* Takım logoları
* Takım isimleri
* Skor
* Dakika
* Stadyum
* Hakem
* Seyirci
* Hava durumu

---

## Timeline

Olaylar:

* Gol
* Penaltı
* Sarı kart
* Kırmızı kart
* Oyuncu değişikliği
* VAR
* Sakatlık

Örnek:

```json id="a2"
{
  "minute": 67,
  "type": "goal",
  "player": "Lewandowski",
  "assist": "Pedri"
}
```

---

## Momentum Graph

SofaScore’daki saldırı momentum grafiği.

Gereken:

* Sol takım atakları
* Sağ takım atakları
* Animasyonlu barlar
* Dakika ekseni

CSS bar ile yapılabilir.

---

# Stats Tab

Gösterilecek:

* Possession
* Shots
* xG
* Passes
* Corners
* Fouls
* Saves
* Tackles
* Offsides

Her satır:

* Sol değer
* Progress bar
* Sağ değer

Örnek:
62% ███████░░ 38%

---

# Lineups Tab

Futbol sahası görünümü.

Dizilişler:

* 4-3-3
* 4-2-3-1
* 3-5-2

Her oyuncuda:

* Oyuncu resmi
* Rating
* İsim
* Pozisyon

Bench aşağıda.

---

# Standings Tab

Lig tablosu.

Kolonlar:

* Sıra
* Takım
* O
* G
* B
* M
* AV
* Puan

Highlight:

* Şampiyonlar Ligi
* Küme düşme

---

# H2H Tab

İki takımın geçmiş maçları.

* Tarih
* Turnuva
* Sonuç
* Kazanan

---

# News Tab

Kart yapısı:

* Thumbnail
* Başlık
* Tarih
* Kaynak

---

## 4) Sol Sidebar

İçerik:

* Favorites
* My Teams
* My Leagues
* Countries
* Pinned matches

Ülkeler:

* England
* Spain
* Germany
* Italy
* France
* Turkey

Country click → lig filtreleme.

---

## 5) Search

Search modal.

Aranabilir:

* Team
* Player
* League
* Match

Özellikler:

* Debounce
* Suggestions
* Recent searches

Endpoint:

```bash id="a3"
/search
```

---

## 6) Favorites Sistemi

Favoriye eklenebilir:

* Takım
* Maç
* Lig
* Oyuncu

Storage:

* Redux
* localStorage sync

---

## 7) Footer

SofaScore footer clone.

Bölümler:

* About
* Contact
* Careers
* Privacy
* Terms
* Mobile Apps
* Social

Alt:
copyright

---

# Responsive

Desktop:
1440+

Tablet:
768–1439

Mobile:
320–767

SofaScore davranışları:

* sticky header
* drawer transition
* horizontal scroll
* collapsible sections

---

# JSON Server Yapısı

db.json

```json id="a4"
{
  "matches": [],
  "teams": [],
  "players": [],
  "leagues": [],
  "news": [],
  "standings": [],
  "events": []
}
```

Endpointler:

* /matches
* /teams
* /players
* /leagues
* /news
* /standings
* /events

---

# Redux State

```js id="a5"
{
  matches: [],
  selectedMatch: null,
  favorites: [],
  searchResults: [],
  ui: {
    drawerOpen: false,
    activeTab: "overview"
  }
}
```

---

# Gerekli Componentler

* Header
* SportTabs
* LiveTicker
* Sidebar
* MatchGroup
* MatchCard
* MatchDrawer
* DrawerTabs
* StatsPanel
* Timeline
* LineupField
* StandingsTable
* SearchModal
* Footer

---

# Stil

Sadece Tailwind.

Tema:

* Dark
* Blue accent
* Gray surfaces
* Rounded cards
* Soft borders
* Hover transitions

Hedef:
Pixel-perfect SofaScore clone.


# PROJECT.md - SofaScore Klonu (Frontend Geliştirme)

## Proje Özeti
Bu proje, modern web geliştirme pratikleri kullanılarak **SofaScore** sitesinin arayüzünü, düzenini ve gerçek zamanlı veri görselleştirme özelliklerini en ince ayrıntısına kadar taklit eden yüksek sadakatli bir frontend klonudur.

Uygulama **React**, **Tailwind CSS** ve sahte (mock) veri tabanı olarak **JSON Server** kullanılarak çalışacaktır. **Bu aşamada Redux ile durum yönetimi (state management) kesinlikle yasaktır**; tüm state işlemleri yerel React hook'ları (`useState`, `useContext`, `useReducer`) ile çözülecektir.

---

## Temel Teknik Yığın ve Kısıtlamalar
* **Framework:** React (Vite tabanlı kurulum tercih edilir)
* **Tasarım/Stil:** Tailwind CSS (Tamamen responsive ve utility-first tasarım)
* **Durum Yönetimi:** Yalnızca yerel React Hook'ları (`useContext` ve `useReducer` dahil). **Redux Toolkit veya harici herhangi bir state yönetim kütüphanesi kullanılmayacaktır.**
* **Veri Katmanı:** JSON Server (Canlı skorları, detaylı istatistikleri ve tüm sekme içeriklerini simüle etmek için kullanılacaktır)
* **İkonlar:** Lucide-react / React-Icons

---

## Detaylı Özellik ve Bileşen (Component) Dağılımı

### 1. Genel Düzen ve Üst Menü (Header)
* **Üst Navigasyon Çubuğu:** Logo, global arama çubuğu (spor, lig, takım ve maç arama), karanlık/aydınlık mod anahtarı ve yerel saat dilimi/dil ayarları.
* **Spor Kategorileri Şeridi:** Yatay, ikon bazlı ve aktif durumları belirgin olan spor seçim menüsü (Futbol, Basketbol, Tenis, Voleybol, Motor Sporları vb.). Canlıda olan maç sayısını gösteren kırmızı bildirim rozetleri (badges).

### 2. Canlı Maçlar Yatay Kayan Şerit (Top Ticker)
* **Kayan Ekran / Carousel:** Ana başlığın hemen altında, günün öne çıkan veya o an canlı oynanan popüler maçlarını yatay bir şerit halinde gösteren kayan ekran yapısı.
* **Kart Durumları:** Maçın canlı dakikası (yanıp sönen kırmızı metin), mevcut skor, takım logoları ve oran önizlemeleri.

### 3. Ana Panel Düzeni (Üç Sütunlu Sistem)
Ana sayfa masaüstü görünümünde, her biri kendi içinde bağımsız kaydırılabilen (fixed-to-scroll) üç sütunlu bir yapıda olmalıdır:

#### A. Sol Sütun: Navigasyon ve Favori Ligler Hiyerarşisi
* **Sabitlenmiş Ligler / Favori Sistemi:** En popüler liglerin (Premier League, La Liga, Serie A, Şampiyonlar Ligi) listelendiği ve favoriye ekleme/çıkarma özelliğinin bulunduğu alan.
* **Ülkelere Göre Tüm Ligler:** Ülke isimlerine göre alfabetik olarak sıralanmış, açılır-kapanır (accordion) geçiş efektlerine sahip tüm liglerin listesi.

#### B. Orta Sütun: Maç Programı ve Skor Paneli
* **Tarih Seçici Çubuğu:** Kullanıcının günler arasında geçiş yapmasını sağlayan yatay takvim bileşeni (Dün, Bugün, Yarın veya takvimden seçilen spesifik bir gün).
* **Liglere Göre Gruplanmış Maç Listesi:** Ülke Adı + Lig Adı + Favori Yıldız İkonu içeren başlıklar altında maçların sıralanması.
* **Maç Satırı Bileşeni:** 
    * Zaman durumu (Başlamadı, Canlı, Bitti/MS, Ertelendi).
    * Takım isimleri ve logoları.
    * Canlı maç dakikası ve ilk yarı sonucu göstergeleri.
    * Mevcut maç skorları (canlı maçlarda kalın kırmızı metinle vurgulanmış).
    * Maçın ilerleme çubuğu (dakikaya göre dolan ince çizgi görseli).
    * Eğer maçta kırmızı kart varsa, takım isminin yanında küçük kırmızı kart ikonu.
    * Herhangi bir maç satırına tıklandığında, maç odaklanmalı ve Sağ Sütundaki Detay Ekranı açılmalıdır.

#### C. Sağ Sütun: Dinamik Maç Detay Paneli
Orta sütundan bir maça tıklandığında açılan, sekmeli ve tüm detayları içeren panel:
* **Maç Başlığı:** Skor, ilk yarı skorları, stadyum bilgisi, hakem detayları, seyirci sayısı, hava durumu ve maçın durumu.
* **Sekmeli Navigasyon Sistemi:**
    * **Bilgi (Info) Sekmesi:** Maç bilgileri, stadyum görseli yeri, bahis oranları piyasası (1X2, Alt/Üst, Karşılıklı Gol) ve maç öncesi oylama anketi ("Kimi kazanır? - Ev / Beraberlik / Deplasman") ve oyların yüzde barları.
    * **Canlı Anlatım Sekmesi:** Goller, kartlar, oyuncu değişiklikleri, VAR kararları ve tehlikeli atakları kronolojik dikey bir zaman çizelgesinde gösteren metin akışı.
    * **İstatistik Sekmesi:** Topla Oynama %, Toplam Şut, İsabetli Şut, İsabetsiz Şut, Engellenen Şut, Korner, Faul, Ofsayt, Pas Sayısı, Pas İsabet %'si ve "Net Fırsat Kaçırma" gibi detaylar için ilerleme çubuğu (progress bar) şeklinde görsel karşılaştırmalar.
    * **Kadro (Lineups) Sekmesi:** Takımların taktiksel dizilişlerini (4-3-3, 4-2-3-1 vb.) gösteren interaktif bir saha görseli. Saha üzerindeki oyuncu formalarında oyuncuların canlı performans reytingleri (örn: 7.4) yazmalı ve tıklanabilir olmalıdır. Oyuncuya tıklandığında ısı haritası (heatmap) ve kişisel istatistiklerini (şut, pas, ikili mücadele) içeren bir modal açılmalıdır. Sahanın altında yedek kulübesi, eksik/sakat oyuncular ve teknik direktör bilgileri yer almalıdır.
    * **Puan Durumu Sekmesi:** Canlı güncellenen lig tablosu; oynanan maçlar, galibiyet, beraberlik, mağlubiyet, averaj ve puan bilgisiyle birlikte oynayan iki takımın sırası vurgulanmış şekilde gösterilmelidir. Son 5 maçın form durumu (G/B/M ikonları) eklenmelidir.
    * **H2H (Head-to-Head) Sekmesi:** İki takım arasında daha önce oynanmış maçların geçmişi, eski skorlar, galibiyet/beraberlik oranları ve istatistiksel trendler (örn: % kaç 2.5 üst bittiği).
    * **Maçın Oyuncusu:** Maç bittiğinde en yüksek reytinge sahip oyuncuyu gösteren özel görsel kart tasarımı.

### 4. Küresel Alt Bilgi (Footer)
* Sayfanın en altında gizlilik politikaları, kullanım koşulları, sosyal medya ikonları ve mobil uygulama indirme bağlantılarını içeren çok sütunlu, temiz bir footer alanı.

---

## JSON Server Veri Yapısı (`db.json`)
Sahte veri tabanı, her maç detayını başarıyla render etmek için şu şemalara sahip olmalıdır:
* `leagues`: Id, isim, ülke, logo/bayrak ikonu.
* `matches`: Id, leagueId, durum (LIVE, FT, SCHEDULED, PP), zaman, dakika, evSahibi, deplasman, skorlar (ev/deplasman), istatistikler, dizilişler, kadrolar, headToHead, canlıAnlatım ve oyuncuReytingleri.

---

## Beklenen UX ve Etkileşim Davranışları
* **Responsive Tasarım:** 3 sütunlu yapı tabletlerde 2 sütuna (Orta + Sağ veya Sol + Orta), mobil cihazlarda ise tek bir sütuna (sadece odaklanılan ekran) sorunsuz şekilde daralmalıdır.
* **Canlı Güncelleme Simülasyonu:** Canlı maçların dakikalarının artması, skorların değişmesi, rastgele sarı/kırmızı kart düşmesi ve istatistiklerin dinamik olarak oynaması için JSON Server verilerini belirli aralıklarla (`setInterval`) çeken bir mekanizma kurularak canlılık hissi simüle edilmelidir.

