const subeler = [
  {
    isim: "PULSEFORGE 1453",
    adres: "Sarıyer / İstanbul",
    imkanlar: ["Basic Fitness Area", "Kardiyo Zone", "Grup Dersleri", "Functional Training"],
  },
  {
    isim: "PULSEFORGE LEVENT",
    adres: "Kağıthane / İstanbul",
    imkanlar: ["Basic Fitness Area", "Modern Ekipmanlar", "PT Alanı", "Stretching Zone"],
  },
  {
    isim: "PULSEFORGE SUADİYE",
    adres: "Kadıköy / İstanbul",
    imkanlar: ["Basic Fitness Area", "Yoga & Pilates Studio", "Kardiyo Zone", "Grup Dersleri"],
  },
  {
    isim: "PULSEFORGE TEMAWORLD",
    adres: "Esenyurt / İstanbul",
    imkanlar: ["Basic Fitness Area", "Crossfit Zone", "Kardiyo Alanı", "Grup Ders Stüdyosu"],
  },
  {
    isim: "PULSEFORGE DTM",
    adres: "Bakırköy / İstanbul",
    imkanlar: ["Basic Fitness Area", "Kurumsal Fitness Alanı", "Kardiyo Zone", "Hızlı Antrenman Alanı"],
  },
  {
    isim: "PULSEFORGE ÇENGELKÖY",
    adres: "Üsküdar / İstanbul",
    imkanlar: ["Basic Fitness Area", "Açık Alan Training", "Grup Dersleri", "Kardiyo Zone"],
  },
  {
    isim: "PULSEFORGE ATAŞEHİR",
    adres: "Ataşehir / İstanbul",
    imkanlar: ["Basic Fitness Area", "PT Studio", "Kardiyo Zone", "Grup Dersleri"],
  },
  {
    isim: "PULSEFORGE MALTEPE PİAZZA",
    adres: "Maltepe / İstanbul",
    imkanlar: ["Basic Fitness Area", "Kardiyo Zone", "Grup Dersleri", "PT Hizmeti"],
  },
  {
    isim: "PULSEFORGE LEVENT (BEŞİKTAŞ)",
    adres: "Beşiktaş / Levent",
    imkanlar: ["Basic Fitness Area", "Yüzme Havuzu", "Sauna & Spa", "PT Studio", "Protein Bar"],
  },
  {
    isim: "PULSEFORGE CITY'S",
    adres: "Nişantaşı / Şişli",
    imkanlar: ["Basic Fitness Area", "Yüzme Havuzu", "Sauna", "VIP PT Studio", "Lounge Area"],
  },
  {
    isim: "PULSEFORGE GÖKTÜRK",
    adres: "Göktürk / Eyüpsultan",
    imkanlar: ["Basic Fitness Area", "Büyük Yüzme Havuzu", "Sauna & Spa", "Yoga & Wellness Zone", "Personal Training Studio"],
  },
  {
    isim: "PULSEFORGE A+",
    adres: "Ataşehir Finans Merkezi",
    imkanlar: ["Basic Fitness Area", "Yüzme Havuzu", "Sauna", "VIP PT Studio", "Recovery & Wellness Zone"],
  },
  {
    isim: "PULSEFORGE AKARETLER",
    adres: "Beşiktaş / Akaretler",
    imkanlar: ["Basic Fitness Area (Premium Ekipman)", "Büyük Yüzme Havuzu", "Sauna & Spa", "Lounge & Café", "Elite PT Studio"],
  },
  {
    isim: "PULSEFORGE VIAPORT ASIA TUZLA",
    adres: "Tuzla / Viaport Asia",
    imkanlar: ["Mega Basic Fitness Area", "Olympic Yüzme Havuzu", "Sauna & Spa", "Crossfit Arena", "Fitness Café", "Grup + VIP Training"],
  },
];

function Subeler() {
  return (
    <div className="min-h-screen py-16 px-4">
      <h2 className="section-title text-center text-green-500 mb-12">Şubeler</h2>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {subeler.map((s, i) => (
          <div key={i} className="card">
            <h3 className="section-title text-lg text-green-500 mb-1">{s.isim}</h3>
            <p className="section-desc text-sm text-gray-400 mb-3">📍 {s.adres}</p>
            <ul className="list-none">
              {s.imkanlar.map((im, j) => (
                <li key={j} className="section-desc text-sm flex items-center gap-2 mb-1">
                  <span className="text-green-500">✓</span> {im}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Subeler;
