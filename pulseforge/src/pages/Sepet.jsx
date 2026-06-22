import { useState } from "react";

function Sepet() {
  const [kart, setKart] = useState({
    isim: "",
    numara: "",
    ay: "",
    yil: "",
    cvv: "",
  });
  const [error, setError] = useState("");

  function handleOde() {
    if (!kart.isim || !kart.numara || !kart.ay || !kart.yil || !kart.cvv) {
      setError("Lütfen tüm kart bilgilerini doldurun.");
      return;
    }
    setError("");
    setKart({ isim: "", numara: "", ay: "", yil: "", cvv: "" });
    alert("Ödemeniz başarıyla alındı!");
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-16 px-4">
      <h2 className="brand-title text-3xl text-green-500 mb-2">PULSEFORGE</h2>
      <h3 className="section-title text-2xl mb-8">Sepet & Ödeme</h3>

      <div className="w-full max-w-md card">
        <h4 className="font-bold text-lg mb-4 text-green-500">Kart Bilgileri</h4>
        <input
          type="text"
          placeholder="Kart Üzerindeki İsim"
          value={kart.isim}
          onChange={(e) => setKart({ ...kart, isim: e.target.value })}
        />
        <input
          type="text"
          placeholder="Kart Numarası"
          maxLength={19}
          value={kart.numara}
          onChange={(e) => setKart({ ...kart, numara: e.target.value })}
        />
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Ay (MM)"
            maxLength={2}
            value={kart.ay}
            onChange={(e) => setKart({ ...kart, ay: e.target.value })}
          />
          <input
            type="text"
            placeholder="Yıl (YY)"
            maxLength={2}
            value={kart.yil}
            onChange={(e) => setKart({ ...kart, yil: e.target.value })}
          />
          <input
            type="text"
            placeholder="CVV"
            maxLength={3}
            value={kart.cvv}
            onChange={(e) => setKart({ ...kart, cvv: e.target.value })}
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <button className="btn-green w-full mt-2" onClick={handleOde}>
          Ödemeyi Tamamla
        </button>
      </div>
    </div>
  );
}

export default Sepet;
