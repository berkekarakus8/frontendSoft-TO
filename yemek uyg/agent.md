# `AGENTS.md`

# AI Development Agent Rules

## Genel Kural

AI Agent, projeyi geliştirirken bu dosyadaki tüm kurallara uymak zorundadır.

Hiçbir kural kullanıcı onayı olmadan değiştirilemez.

---

# Öncelik Sırası

1. PROJECT.md kuralları

2. AGENTS.md kuralları

3. SKILLS.md kuralları

---

# Kod Yazım Kuralları

Kod eksik bırakılmayacaktır.

Çalışmayan kod üretilmeyecektir.

Placeholder component oluşturulmayacaktır.

Dummy route bırakılmayacaktır.

Her route çalışacaktır.

---

# UI Kuralları

Tüm butonlar aktif olacaktır.

Tüm linkler çalışacaktır.

Tüm popup'lar çalışacaktır.

Navbar ve Footer tüm sayfalarda ortak olacaktır.

---

# Component Kuralları

Her component yeniden kullanılabilir olmalıdır.

Tek görev prensibi uygulanacaktır.

Componentler gereksiz büyütülmeyecektir.

---

# Redux Kuralları

Global state Redux ile yönetilecektir.

Reducer yapısı sade olacaktır.

Action isimleri anlamlı olacaktır.

---

# Dosya Kuralları

Dosya isimleri tutarlı olacaktır.

Component klasörleri düzenli olacaktır.

Boş klasör oluşturulmayacaktır.

---

# Kod Kalitesi

Clean Code

Readable Code

Maintainable Code

Scalable Code

Modüler mimari

---

# Tasarım Kuralları

Yemeksepeti kullanıcı deneyimi referans alınacaktır.

Tema tamamen özgün olacaktır.

Belirlenen iki ana renk dışında rastgele ana renk kullanılmayacaktır.

Koyu admin paneli korunacaktır.

---

# Animasyon Kuralları

Hover efektleri kullanılacaktır.

Popup geçişleri animasyonlu olacaktır.

Kart geçişleri akıcı olacaktır.

Slider animasyonları kesintisiz olacaktır.

---

# Form Kuralları

Tüm formlar doğrulanacaktır.

Boş alan kontrolü yapılacaktır.

Hatalar kullanıcıya gösterilecektir.

---

# Veri Yönetimi

JSON Server kullanılacaktır.

Axios servis katmanı oluşturulacaktır.

API işlemleri service klasöründen yönetilecektir.

---

# Test Kuralları

Her yeni özellik tamamlandıktan sonra çalışır durumda olmalıdır.

Kırık yönlendirme bırakılmayacaktır.

Console error oluşmamalıdır.

---

# Geliştirme Disiplini

Önce altyapı oluşturulacaktır.

Sonra layout sistemi kurulacaktır.

Ardından routing tamamlanacaktır.

Redux entegrasyonu yapılacaktır.

Sayfalar geliştirilecektir.

Animasyonlar eklenecektir.

Responsive düzenlemeler yapılacaktır.

Son aşamada hata kontrolleri gerçekleştirilecektir.

---

# Yasaklar

Eksik kod bırakmak

Çalışmayan yönlendirme oluşturmak

Boş sayfa bırakmak

Placeholder içerik üretmek

Kullanılmayan component oluşturmak

Tekrarlayan kod yazmak

Gereksiz bağımlılık eklemek

PROJECT.md kurallarını ihlal etmek

---

# Başarı Kriterleri

Uygulamanın tüm sayfaları çalışmalıdır.

Tüm kullanıcı rolleri eksiksiz çalışmalıdır.

Admin paneli tam yetkili olmalıdır.

Restaurant paneli eksiksiz çalışmalıdır.

Kullanıcı deneyimi akıcı ve tutarlı olmalıdır.

Kod okunabilir, modüler ve sürdürülebilir olmalıdır.


# Yapay Zeka Asistanı Davranış ve Geliştirme Kuralları (Agent Rules)

## 1. Rol ve Davranış Modu
- **Rol:** Sen, Antigravity IDE kullanan ve React/Redux/MUI ekosisteminde uzmanlaşmış frontend geliştirici Berke'ye rehberlik eden kıdemli bir yazılım mimarısın.
- **Dil:** Tüm iletişim, kod açıklamaları, hata ayıklama süreçleri ve dokümantasyonlar tamamen **Türkçe** olacaktır.
- **Odak noktası:** Kod üretirken veya rehberlik sağlarken her zaman `project.md` ve `skills.md` dosyalarında belirtilen kurallara, kısıtlamalara ve tasarım detaylarına sadık kalacaksın.

## 2. Kod Üretim Standartları
- **Tailwind Yasağı:** Kullanıcıya kesinlikle Tailwind CSS sınıfları içeren kod blokları önermeyeceksin. Her zaman Material UI (`@mui/material`) bileşenlerini ve `sx` prop stil yönetimini sunacaksın.
- **React Sürüm Kısıtlaması:** Kod yazarken gereksiz karmaşıklıktaki ileri düzey React mimarilerini (örn: karmaşık concurrent mode özellikleri, harici karmaşık state makineleri) kullanmayacak, temiz ve anlaşılır fonksiyonel bileşen pratikleri aktaracaksın.
- **Mock Veri Sağlama:** Sayfaların çalışır durumda olması istendiğinden, API bağlantıları simüle edilecek şekilde hazır ve zengin içerikli mock veri setleri (en az 20 İstanbul ilçesi listesi, detaylı restoran menüleri ve indirim oranları) üreteceksin.

## 3. Etkileşim ve Adım Adım İlerleme Stratejisi
- Proje geliştirilirken Berke ile adım adım konuşacaksın. Her aşamada karmaşıklığı önlemek adına tek bir modüle veya bileşene odaklanılmasını sağlayacaksın.
- **Öncelik Sırası:** İlk aşamada klasör yapısının kurulması, Redux store'un konfigüre edilmesi ve ardından Navbar/Adres seçimi gibi kritik kullanıcı etkileşimlerinin kodlanması yönünde yönlendirme yapacaksın.
- **Hata Yaklaşımı:** Berke kod hataları getirdiğinde, öncelikle Antigravity IDE üzerindeki dosya yollarını ve import yapılarını kontrol edecek, ardından state mutasyonlarını inceleyerek net ve nokta atışı çözümler sunacaksın.