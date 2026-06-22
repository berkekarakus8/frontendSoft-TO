import { useState } from "react";

function SuIhtiyaci() {
  const [kilo, setKilo] = useState("");
  const [sonuc, setSonuc] = useState(null);

  function hesapla() {
    const k = parseFloat(kilo);
    if (!k) return;
    setSonuc((k * 0.033).toFixed(2));
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-20 px-4">
      <h2 className="section-title text-green-500 mb-8">Günlük Su İhtiyacı</h2>
      <div className="w-full max-w-sm card">
        <input type="text" placeholder="Kilo (kg)" value={kilo} onChange={(e) => setKilo(e.target.value)} />
        <button className="btn-green w-full" onClick={hesapla}>Hesapla</button>
        {sonuc && (
          <div className="mt-4 text-center">
            <p className="text-2xl font-bold text-green-500">{sonuc} Litre / Gün</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SuIhtiyaci;
