import { useState } from "react";

const faqData = [
  {
    q: "Üyelik nasıl başlatılır?",
    a: "Web sitemiz üzerinden istediğiniz üyelik paketini (Classic, Premium veya VIP) seçerek kolayca kayıt olabilirsiniz. Dilerseniz şubelerimizden birine giderek de üyelik başlatabilirsiniz.",
  },
  {
    q: "Üyeliğimi dondurabilir miyim?",
    a: "Evet, üyeliğinizi yılda belirli bir süre boyunca dondurma hakkınız vardır. Dondurma işlemi şube resepsiyonu veya mobil uygulama üzerinden yapılabilir.",
  },
  {
    q: "VIP üyelikte hangi ayrıcalıklar var?",
    a: "VIP üyelerimiz tüm fitness alanlarına ek olarak yüzme havuzu ve sauna kullanımına sahip olur. Ayrıca kişisel antrenör desteği ve özel çalışma alanlarından yararlanabilir.",
  },
  {
    q: "Deneme üyeliği var mı?",
    a: "Evet, yeni kullanıcılar için 7 gün ücretsiz deneme hakkı sunulmaktadır. Bu süre boyunca tüm temel alanlara erişim sağlanır.",
  },
];

function Home({ setPage }) {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <h1 className="brand-title text-5xl md:text-7xl text-green-500 mb-4">
          PULSEFORGE
        </h1>
        <p className="text-xl md:text-2xl font-light text-gray-500 mb-10 tracking-widest">
          No Limits. Just Strength.
        </p>
        <div className="flex gap-4">
          <button className="btn-green" onClick={() => setPage("uyeol")}>
            Üye Ol
          </button>
          <button
            className="btn-green"
            style={{ background: "transparent", border: "2px solid #22c55e", color: "#22c55e" }}
            onClick={() => setPage("giris")}
          >
            Giriş Yap
          </button>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-2xl mx-auto px-4 pb-20">
        <h2 className="section-title text-center mb-8 text-green-500">
          Sıkça Sorulan Sorular
        </h2>
        {faqData.map((item, i) => (
          <div key={i} className="faq-item">
            <button
              className="faq-question"
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
            >
              <span>{item.q}</span>
              <span>{openFaq === i ? "▲" : "▼"}</span>
            </button>
            {openFaq === i && (
              <div className="faq-answer">{item.a}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
