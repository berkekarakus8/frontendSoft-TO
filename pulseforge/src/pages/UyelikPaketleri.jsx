const paketler = [
  {
    isim: "Classic",
    ozellikler: [
      "Ortak alana Sınırsız Erişim",
      "Hesaplama Araçları Kullanımı",
      "Üyelik Dondurma",
      "Ölçüm ve Program Desteği",
      "Vitamin Bar %5 İndirim",
    ],
  },
  {
    isim: "Premium",
    ozellikler: [
      "Ortak alana Sınırsız Erişim",
      "PT Desteğiyle Hesaplama Araçları",
      "Üyelik Dondurma",
      "Kişiye Özel Ölçüm ve Program Desteği",
      "Vitamin Bar %20 İndirim",
      "Haftada 2 Gün Yüzme ve Sauna Erişimi",
      "Grup Dersleri Katılım Hakkı",
    ],
  },
  {
    isim: "VIP",
    ozellikler: [
      "Ortak alana Sınırsız Erişim",
      "PT Desteğiyle Hesaplama Araçları",
      "Üyelik Dondurma ve İptal Hakkı",
      "Kişiye Özel Ölçüm ve Program Desteği",
      "Vitamin Bar %45 İndirim",
      "Sınırsız Yüzme ve Sauna Erişimi",
      "Sınırsız PT Erişim Hakkı",
      "PT WhatsApp İletişim Desteği",
      "Grup Derslerine Katılım Hakkı",
      "Grup Dersi Oluşturabilme Hakkı",
    ],
  },
];

function UyelikPaketleri({ setPage, isLoggedIn }) {
  function handleSec() {
    if (!isLoggedIn) {
      setPage("uyeol");
    } else {
      setPage("sepet");
    }
  }

  return (
    <div className="min-h-screen py-16 px-4">
      <h2 className="section-title text-center text-green-500 mb-12">
        Üyelik Paketleri
      </h2>
      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        {paketler.map((p, i) => (
          <div key={i} className="card flex flex-col">
            <h3 className="section-title text-2xl text-green-500 mb-4 text-center">
              {p.isim}
            </h3>
            <ul className="mb-6">
              {p.ozellikler.map((o, j) => (
                <li key={j} className="section-desc flex items-center gap-2 mb-2">
                  <span className="text-green-500">✓</span> {o}
                </li>
              ))}
            </ul>
            <div className="text-center mt-auto">
              <button className="btn-green px-10" onClick={handleSec}>
                Seç
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UyelikPaketleri;
