import { useState } from "react";

function GirisYap() {
  const [tel, setTel] = useState("");
  const [error, setError] = useState("");

  function handleGiris() {
    if (!tel) {
      setError("Telefon numarası zorunludur.");
      return;
    }
    setError("");
    setTel("");
    alert("Giriş yapıldı!");
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-16 px-4">
      <h2 className="brand-title text-3xl text-green-500 mb-2">PULSEFORGE</h2>
      <h3 className="section-title text-2xl mb-8">Giriş Yap</h3>

      <div className="w-full max-w-sm card">
        <input
          type="tel"
          placeholder="Telefon Numarası"
          value={tel}
          onChange={(e) => setTel(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <button className="btn-green w-full" onClick={handleGiris}>
          Giriş Yap
        </button>
      </div>
    </div>
  );
}

export default GirisYap;
