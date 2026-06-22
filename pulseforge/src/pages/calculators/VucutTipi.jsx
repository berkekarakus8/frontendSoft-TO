import { useState } from "react";

function VucutTipi() {
  const [bel, setBel] = useState("");
  const [boy, setBoy] = useState("");
  const [sonuc, setSonuc] = useState(null);

  function hesapla() {
    const b = parseFloat(bel);
    const h = parseFloat(boy);
    if (!b || !h) return;
    const oran = (b / h).toFixed(2);
    let yorum = "";
    if (oran < 0.46) yorum = "Armut Tipi";
    else if (oran < 0.53) yorum = "Kum Saati Tipi";
    else if (oran < 0.58) yorum = "Muz Tipi";
    else yorum = "Elma Tipi";
    setSonuc({ oran, yorum });
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-20 px-4">
      <h2 className="section-title text-green-500 mb-8">Vücut Tipi Hesaplama</h2>
      <div className="w-full max-w-sm card">
        <input type="text" placeholder="Bel Çevresi (cm)" value={bel} onChange={(e) => setBel(e.target.value)} />
        <input type="text" placeholder="Boy (cm)" value={boy} onChange={(e) => setBoy(e.target.value)} />
        <button className="btn-green w-full" onClick={hesapla}>Hesapla</button>
        {sonuc && (
          <div className="mt-4 text-center">
            <p className="text-2xl font-bold text-green-500">{sonuc.yorum}</p>
            <p className="section-desc mt-1">Bel/Boy Oranı: {sonuc.oran}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default VucutTipi;
