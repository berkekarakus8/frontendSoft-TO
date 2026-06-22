import { useState } from "react";

function BMI() {
  const [kilo, setKilo] = useState("");
  const [boy, setBoy] = useState("");
  const [sonuc, setSonuc] = useState(null);

  function hesapla() {
    const k = parseFloat(kilo);
    const b = parseFloat(boy) / 100;
    if (!k || !b) return;
    const bmi = (k / (b * b)).toFixed(1);
    let yorum = "";
    if (bmi < 18.5) yorum = "Zayıf";
    else if (bmi < 25) yorum = "Normal";
    else if (bmi < 30) yorum = "Fazla Kilolu";
    else yorum = "Obez";
    setSonuc({ bmi, yorum });
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-20 px-4">
      <h2 className="section-title text-green-500 mb-8">BMI Hesabı</h2>
      <div className="w-full max-w-sm card">
        <input type="text" placeholder="Kilo (kg)" value={kilo} onChange={(e) => setKilo(e.target.value)} />
        <input type="text" placeholder="Boy (cm)" value={boy} onChange={(e) => setBoy(e.target.value)} />
        <button className="btn-green w-full" onClick={hesapla}>Hesapla</button>
        {sonuc && (
          <div className="mt-4 text-center">
            <p className="text-2xl font-bold text-green-500">BMI: {sonuc.bmi}</p>
            <p className="section-desc mt-1">{sonuc.yorum}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BMI;
