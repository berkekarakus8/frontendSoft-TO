---
name: mini-crm-helper
description: React, Redux, MUI ve json-server ile Mini CRM geliştirmek için rehberlik sağlar.
---

# Mini CRM Geliştirme Yönergeleri

Bu yetenek, React, Redux Toolkit, Material UI ve json-server kullanan Mini CRM projelerinde sayfa tasarımı ve veri yönetimi için pratik uygulama şablonları sunar.

## 1. Giriş Sayfası (Login Page)

Giriş sayfasında kullanıcı e-posta ve şifre bilgileri doğrulaması yapılır.

- Kimlik doğrulama işlemi için asenkron bir thunk eylemi tanımlanmalıdır.
- Thunk eylemi json-server'dan kullanıcı listesini çekmeli ve kullanıcının girdiği e-posta ve şifre eşleşmesini kontrol etmelidir.
- Oturum durumunu (authSlice) yönetmek için auth adında bir slice tanımlanmalıdır. Bu slice durum nesnesinde kullanıcı bilgisi (user), yüklenme durumu (loading) ve hata mesajı (error) alanlarını barındırmalıdır.
- Çıkış yapıldığında (logout eylemi) kullanıcı durum bilgisi null değerine çekilmeli ve hata mesajları temizlenmelidir.

## 2. Müşteri CRUD İşlemleri (Customer CRUD)

Müşteri yönetimi listeleme, ekleme, güncelleme ve silme işlemlerini kapsar.

- Tüm müşteri kayıtlarının json-server'dan GET metodu ile çekilmesi için fetchCustomers asenkron eylemi oluşturulmalıdır.
- Yeni müşteri kaydının POST metodu ile json-server'a iletilmesi ve Redux state listesine eklenmesi için addCustomer asenkron eylemi oluşturulmalıdır.
- Mevcut bir müşterinin bilgilerinin PUT metodu ile sunucuda güncellenmesi ve yerel state dizisinde güncel nesnenin yerine yazılması için updateCustomer asenkron eylemi oluşturulmalıdır.
- Müşterinin silinmesi için DELETE metodu ile sunucuya istek atan ve yerel listeden o müşteriyi filtreleyerek kaldıran deleteCustomer asenkron eylemi oluşturulmalıdır.
- Tüm bu durumlar customers adındaki slice dosyasında yönetilmeli; items dizisi, loading durumu ve error durumları kontrol edilmelidir.

## 3. Raporlama Sayfası (Reports Page)

Raporlama ekranında müşterilerin bakiyeleri, aktiflik durumları ve faaliyetleri analiz edilerek MUI kartları ile gösterilir.

- Müşterilerin bakiye alanındaki sayısal değerler azaltma (reduce) metodu ile toplanarak toplam bakiye metriği elde edilmelidir.
- Aktif ve pasif müşterilerin sayılarını bulmak için filtreleme (filter) metodu uygulanarak aktiflik oranları bulunmalıdır.
- Ortalama bakiye miktarını hesaplamak için toplam bakiye tutarı müşteri sayısına bölünmelidir.
