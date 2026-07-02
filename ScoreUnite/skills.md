# skills.md

## Gerekli Frontend Yetkinlikleri

### React

Bilmen gerekenler:

* JSX
* Components
* Props
* State
* Hooks
* useEffect
* useMemo
* useCallback

---

### React Router

Route’lar:

```js id="c1"
/
 /match/:id
 /league/:id
 /search
```

---

### Redux Toolkit

Kullan:

* createSlice
* configureStore
* async thunks

Slice’lar:

* matchesSlice
* uiSlice
* favoritesSlice
* searchSlice

---

### Tailwind CSS

Kullanım:

* Layout
* Spacing
* Typography
* Colors
* Responsive
* Transitions

Bilmen gerekenler:

* flex
* grid
* gap
* breakpoints
* sticky
* fixed
* z-index
* overflow-x-auto
* transition-all

---

### JSON Server

Zorunlu backend simülasyonu.

Kurulum:

```bash id="c2"
npm install json-server
```

Çalıştır:

```bash id="c3"
npx json-server --watch db.json --port 3001
```

---

### Axios

API istekleri.

Örnek:

```js id="c4"
axios.get("http://localhost:3001/matches")
```

---

### Component Design

Componentler:

* reusable
* isolated
* readable

İyi örnek:

* MatchCard.jsx
* TeamBadge.jsx
* ScoreBox.jsx

Kötü:

* Monolithic components

---

### State Management

Global:
Redux

Local:
useState

Persistent:
localStorage

---

### UI Skill Gereksinimleri

Yapabilmelisin:

* sliding drawer
* scroll snapping
* sticky sections
* modal search
* tab switching
* collapsible panels
* progress bars
* football field layout
* timeline rendering

---

### API Simülasyonu

Relational mock data:

* match → league
* team → players
* standings → league
* events → match

Örnek:

```json id="c5"
{
  "matchId": 10
}
```

---

### Definition of Done

Proje ancak şu durumda biter:

* SofaScore homepage clone
* Match drawer çalışıyor
* Stats çalışıyor
* Search çalışıyor
* Favorites çalışıyor
* JSON server bağlı
* Responsive tamam
* Footer tamam
* Pixel accuracy yüksek


# SKILLS.md - Teknik Yetkinlikler ve Kodlama Standartları

## Gerekli Mühendislik Yetkinlikleri

### 1. Gelişmiş Modüler Bileşen Mimarisi
* Karmaşık, çok sekmeli ve çok detaylı arayüzleri birbirini etkilemeyecek şekilde izole bileşenlere bölebilme yeteneği.
* Orta sütun ile Sağ sütun arasındaki veri alışverişini, prop-drilling (derine prop aktarma) yapmadan, temiz bir şekilde React Context API (`createContext`, `useContext`) kullanarak yönetebilme.

### 2. İleri Düzey Tailwind CSS ve Layout Bilgisi
* Izgara (Grid) sistemlerine tam hakimiyet (`grid-cols-12`, `col-span-3`, `col-span-6`) ve responsive görünürlük yönetimi (`hidden md:block`).
* Sayfa kaydırma çubuklarını (scrollbar) özelleştirerek site estetiğine uygun, tarayıcı bağımsız tasarımlar yapabilme (`scrollbar-thin`).
* Dinamik sınıfları ve ilerleme çubuklarını (progress bar) yönetmek için koşullu CSS string yapılarını doğru kullanabilme.

### 3. Asenkron Veri Yönetimi ve Kısa Zamanlı İstekler (Polling)
* Standart tarayıcı `fetch` metodunu kullanarak JSON Server uç noktalarına (`http://localhost:3000/matches?...`) başarılı asenkron istekler atabilme.
* `useEffect` içinde açılan zamanlayıcıların (`setInterval`), bileşen kapandığında bellek sızıntısına (memory leak) yol açmaması için temizleme (`clearInterval`) işlemlerini eksiksiz yapabilme.

---

## Kodlama Standartları ve Örnek Yapılar

### Ana Izgara Şablonu Örneği:
```jsx
// 3 sütunlu ana yapıyı kuran örnek düzen bileşeni
export default function MainLayout() {
  return (
    <div className="flex flex-col h-screen bg-slate-900 text-white">
      <Header/>
      <SportsRibbon/>
      <main className="flex-1 grid grid-cols-1 md:grid-cols-4 xl:grid-cols-12 overflow-hidden">
        {/* Sol Sütun */}
        <section className="hidden md:block md:col-span-1 xl:col-span-3 overflow-y-auto border-r border-slate-800">
          <LeagueSidebar/>
        </section>
        
        {/* Orta Sütun */}
        <section className="col-span-1 md:col-span-3 xl:col-span-6 overflow-y-auto">
          <MatchDashboard/>
        </section>
        
        {/* Sağ Sütun */}
        <section className="hidden xl:block xl:col-span-3 overflow-y-auto border-l border-slate-800">
          <MatchDetailPanel/>
        </section>
      </main>
      <Footer/>
    </div>
  );
}

// Taktik diziliş haritasında oyuncuların konumlandırılma mantığı
export function PlayerIcon({ player, coordinates }) {
  return (
    <div 
      className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
      style={{ top: `${coordinates.y}%`, left: `${coordinates.x}%` }}
    >
      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold border-2 border-white">
        {player.shirtNumber}
      </div>
      <span className="text-[10px] font-semibold mt-1 bg-slate-900/80 px-1 rounded whitespace-nowrap">
        {player.shortName}
      </span>
      <span className="text-[9px] font-bold text-green-400 bg-slate-950 px-0.5 rounded">
        {player.rating}
      </span>
    </div>
  );
}
