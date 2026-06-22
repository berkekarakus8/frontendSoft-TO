import { useState } from "react";

function KalpHizi() {
  const [yas, setYas] = useState("");
  const [sonuc, setSonuc] = useState(null);

  function hesapla() {
    const y = parseInt(yas);
    if (!y) return;
    setSonuc(220 - y);
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-20 px-4">
      <h2 className="section-title text-green-500 mb-8">Max Kalp Hızı Hesaplama</h2>
      <div className="w-full max-w-sm card">
        <input type="text" placeholder="Yaşınız" value={yas} onChange={(e) => setYas(e.target.value)} />
        <button className="btn-green w-full" onClick={hesapla}>Hesapla</button>
        {sonuc && (
          <div className="mt-4 text-center">
            <p className="text-2xl font-bold text-green-500">Max Kalp Hızı: {sonuc} bpm</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default KalpHizi;
