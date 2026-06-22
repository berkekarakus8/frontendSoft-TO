import { useState } from "react";

function IdealKilo() {
  const [boy, setBoy] = useState("");
  const [cinsiyet, setCinsiyet] = useState("erkek");
  const [sonuc, setSonuc] = useState(null);

  function hesapla() {
    const b = parseFloat(boy);
    if (!b) return;
    let idealKilo;
    if (cinsiyet === "erkek") {
      idealKilo = b - 100;
    } else {
      idealKilo = b - 100;
    }
    setSonuc(idealKilo);
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-20 px-4">
      <h2 className="section-title text-green-500 mb-8">İdeal Kilo Hesaplama</h2>
      <div className="w-full max-w-sm card">
        <input type="text" placeholder="Boy (cm)" value={boy} onChange={(e) => setBoy(e.target.value)} />
        <div className="flex gap-4 mb-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" value="erkek" checked={cinsiyet === "erkek"} onChange={() => setCinsiyet("erkek")} className="accent-green-500" />
            Erkek
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" value="kadin" checked={cinsiyet === "kadin"} onChange={() => setCinsiyet("kadin")} className="accent-green-500" />
            Kadın
          </label>
        </div>
        <button className="btn-green w-full" onClick={hesapla}>Hesapla</button>
        {sonuc !== null && (
          <div className="mt-4 text-center">
            <p className="text-2xl font-bold text-green-500">İdeal Kilo: {sonuc} kg</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default IdealKilo;
