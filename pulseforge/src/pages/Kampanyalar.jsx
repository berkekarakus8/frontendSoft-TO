const kampanyalar = [
  {
    emoji: "🎉",
    baslik: "Yeni Üyelere %20 İndirim",
    aciklama:
      "PulseForge yeni üye olan kullanıcılar, ilk üyelik paketlerinde %20 indirim avantajından yararlanabilir. Kampanya sınırlı süre için geçerlidir.",
  },
  {
    emoji: "🎁",
    baslik: "5+1 Üyelik",
    aciklama:
      "5 aylık peşin üyelik satın al, 1 ayı bizden hediye! Kampanya sınırlı süreyle geçerlidir.",
  },
  {
    emoji: "🆓",
    baslik: "7 Gün Ücretsiz Deneme",
    aciklama:
      "PulseForge yeni kullanıcılarına 7 gün boyunca ücretsiz deneme imkânı sunar. Tüm tesis olanaklarına erişim sağlanır.",
  },
  {
    emoji: "👥",
    baslik: "Grup Üyelik Avantajı – Ne Kadar Kalabalık, O Kadar İndirim!",
    aciklama:
      "Paket Detayları:\n• 2 Kişilik Paket → %10 indirim\n• 3–4 Kişilik Paket → %15 indirim\n• 5+ Kişilik Paket → %20 indirim",
  },
];

function Kampanyalar() {
  return (
    <div className="min-h-screen py-16 px-4">
      <h2 className="section-title text-center text-green-500 mb-12">
        Kampanyalar
      </h2>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {kampanyalar.map((k, i) => (
          <div key={i} className="card flex flex-col items-center text-center">
            <div className="text-6xl mb-5">{k.emoji}</div>
            <h3 className="section-title text-lg mb-3">{k.baslik}</h3>
            <p className="section-desc whitespace-pre-line">{k.aciklama}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Kampanyalar;
