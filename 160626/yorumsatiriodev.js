
1. REACT LIFECYCLE (BİLEŞEN YAŞAM DÖNGÜSÜ) NEDİR?

// react’te her component’in bir yaşam süreci var aslında, onu anlatıyor burada
// ekrana gelir, değişir, sonra da silinir bir noktada
// yani insanlar gibi doğma-güncellenme-ölme mantığı var biraz

Bir React bileşeninin tarayıcıda doğması, güncellenmesi ve yok olması aşamalarının tamamına "Lifecycle" denir.

3 ana aşamadan oluşur:

- Mount (Doğma/Yüklenme)
// component ilk kez ekrana basıldığı an burası
// ilk render da denebilir buna

- Update (Güncellenme)
// state veya props değişince tekrar çalışıyor component
// buna re-render diyoruz

- Unmount (Yok Olma/Ölüm)
// component ekrandan kaldırılıyor burada
// hafızadan da temizlenmesi gerekiyor bazı şeylerin


2. USEEFFECT HOOK'UNUN TEMEL YAPISI VE SÖZDİZİMİ

// useeffect biraz dış dünya ile iletişim kurmak gibi
// api çağırmak, timer başlatmak gibi işler burada yapılıyor genelde
// jsx içinde direkt bu tarz işler yapmak doğru değil çünkü

React dış dünyayla etkileşime girmek için "side effect" mekanizması olarak useEffect Hook'unu kullanır.

useEffect(() => {
    // Çalıştırılacak yan etkiler

    return () => {
        // Temizleme işlemi
    };
}, [bagimlilikDizisi]);

// return kısmı her zaman olmak zorunda değil
// ama cleanup gerekiyorsa baya önemli oluyor


3. BAĞIMLILIK DİZİSİ (DEPENDENCY ARRAY) KURALLARI

// useeffect’in ne zaman çalışacağını bu array belirliyor
// en kritik kısım bence burasıydı

- Boş Dizi [] (Mounting)

// boş array varsa sadece 1 kere çalışıyor
// component ilk açılınca yani

useEffect(() => {
   console.log("İlk yüklenmede çalıştı.");
}, []);


// genelde api’den veri çekmede kullanılıyor bunu


- Bağımlılık Dizisi Olmadan (Her Render)

// ikinci parametre yoksa her render sonrası çalışıyor
// çok dikkat etmek lazım burada sonsuz döngüye girebilir

useEffect(() => {
   console.log("Her render sonrası çalışır.");
});


// performans açısından çok iyi değil çoğu durumda


- Belirli Bağımlılıklar [state, prop]

// array içine ne yazarsam o değişince effect tekrar çalışıyor

useEffect(() => {
   console.log("Sayac güncellendi.");
}, [sayac]);


// mesela sayac değişmeden bu tekrar çalışmaz


4. CLEANUP (TEMİZLEME) FONKSİYONU NEDİR?

// cleanup unutulursa memory leak oluşabiliyor
// yani arkada boşuna çalışan işlemler kalıyor

useEffect içinden dönen fonksiyona cleanup denir.

Bileşen kaldırılmadan hemen önce veya useEffect tekrar çalışmadan önce çalışır.

// özellikle timer ve event listener’da önemli baya

Aşağıdaki durumlarda cleanup gerekir:

- setInterval / setTimeout temizleme
// interval durmazsa arka planda çalışmaya devam eder

- addEventListener temizleme
// yoksa event listener birikir

- WebSocket abonelikleri
// bağlantıyı kapatmak gerekiyor

- API istek iptali
// race condition önlemek için lazım olabiliyor



=========================================
ÖĞLEDEN SONRA BÖLÜMÜ
=========================================

1. FETCH API VE ASENKRON VERİ YÖNETİMİ

// api’den veri çekmek senkron değil
// cevap gelene kadar bekliyoruz çünkü

React’te veri çekmek için fetch kullanılır.

3 temel state yönetilir:

- data
// gelen asıl veri burada tutuluyor

- loading
// veri gelirken kullanıcı boş ekran görmesin diye

- error
// hata olursa bunu göstermek için


const [veri, setVeri] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

// loading başlangıçta true çünkü veri daha gelmedi


useEffect(() => {
    fetch("https://api.example.com/data")
        .then(res => {
            if(!res.ok) throw new Error("Ağ hatası");
            return res.json();
        })
        .then(data => {
            setVeri(data);
            setLoading(false);
        })
        .catch(err => {
            setError(err.message);
            setLoading(false);
        });
}, []);


// başarılıysa veri setleniyor
// başarısızsa error doluyor


2. KOŞULLU RENDERING

// kullanıcıya duruma göre farklı ekran göstermek
// reactte çok kullanılan bir mantık

- Loading ekranı
// veri gelene kadar spinner olabilir

- Hata ekranı
// kullanıcı neden çalışmadığını anlar

- Boş liste
// api boş döndüyse bunu göstermek mantıklı

- Veri listeleme
// veri varsa asıl ekran burada açılıyor


3. RACE CONDITION NEDİR?

// bu kısım biraz önemliydi
// birden fazla istek aynı anda gidince karışıklık olabiliyor

Kullanıcı hızlı filtre değiştirirse eski istek geç gelebilir.

Bu durumda yanlış veri ekrana basılabilir.

// yeni isteğin değil de eski isteğin sonucu görünür
// bug gibi duruyor dışarıdan

Çözüm:

useEffect(() => {
    let active = true;

    fetch(`/api/data?query=${query}`)
        .then(res => res.json())
        .then(data => {
            if(active) setVeri(data);
        });

    return () => {
        active = false;
    };
}, [query]);


// active false olunca eski istek state güncelleyemiyor
// böylece yanlış veri basılmıyor



=========================================
TRENDSTORE PROJESİ
=========================================

1. MOUNTING

// app ilk açıldığında ürünleri çekiyor
// yani mount anında api çağrısı var

App bileşeni ilk açıldığında useEffect ile ürünleri yükler.

Baslik bileşeni ekran boyutunu dinler.

// resize event’i burada devreye giriyor

KampanyaBanner geri sayım başlatır.

// timer kuruluyor burada


2. UPDATING

// kullanıcı bir şey yaptıkça state değişiyor
// state değişince ui de değişiyor

Arama çubuğunda yazıldığında ürünler filtrelenir.

Kategori seçilince ürünler yeniden süzülür.

Sepete ürün eklenirse sepet state değişir.

// state değişince render da yeniden oluyor


3. CLEANUP

// cleanup kullanılmazsa arkada gereksiz şeyler kalabilir

Sayaç temizliği:

// clearInterval ile durduruluyor

Ekran dinleyici temizliği:

// removeEventListener şart burada


4. ASENKRON VERİ YÜKLEME

// kullanıcı boş beyaz ekran görmesin diye loading kullanılıyor

Ürün verileri fetch ile çekilir.

Loading sırasında skeleton gösterilir.

Hata olursa error ekranı açılır.


5. RACE CONDITION ENGELLEME

// bu projede çok büyük sorun olmamış
// çünkü veriler tek sefer çekilmiş

ignore / active gibi teknikler kullanılabilir.


6. DERIVED STATE

// derived state = başka state’lerden hesaplanan veri

Sepet Toplamı:

// ayrı state yerine hesaplanabiliyor

Kargo Kampanyası:

// toplam fiyat üzerinden dinamik hesaplanıyor

Vitrin Stok Yönetimi:

// stok - sepetteki adet şeklinde düşünülmüş


7. STABLE CALLBACKS

// burada usecallback devreye giriyor
// fonksiyonların referansı değişmesin diye

App.jsx içindeki fonksiyonlar useCallback ile sarılmış.

// gereksiz render azaltılmış oluyor



=========================================
HOOK'LAR
=========================================

useState:

// en temel hook bence
// değişen veriyi tutuyor

State değişirse component tekrar render olur.


useEffect:

// side effect yönetimi için
// api, timer, event listener burada

Cleanup desteği var.


useMemo:

// pahalı hesaplamaları tekrar tekrar yapmıyor
// cache mantığı gibi

Sadece dependency değişirse yeniden hesaplar.


useCallback:

// fonksiyonun referansını sabit tutuyor
// child component’ler boşuna render olmasın diye