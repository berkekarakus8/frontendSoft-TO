import { useState } from "react";

function UyeOl() {
  const [form, setForm] = useState({
    isim: "",
    soyisim: "",
    tel: "",
    mail: "",
    kvkk: false,
    ticari: false,
  });
  const [error, setError] = useState("");

  function handleSubmit() {
    if (!form.isim || !form.soyisim || !form.tel || !form.mail || !form.kvkk || !form.ticari) {
      setError("Lütfen tüm alanları doldurun ve onay kutularını işaretleyin.");
      return;
    }
    setError("");
    setForm({ isim: "", soyisim: "", tel: "", mail: "", kvkk: false, ticari: false });
    alert("Üyeliğiniz başarıyla oluşturuldu!");
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-16 px-4">
      <h2 className="brand-title text-3xl text-green-500 mb-2">PULSEFORGE</h2>
      <h3 className="section-title text-2xl mb-8">Üye Ol</h3>

      <div className="w-full max-w-md card">
        <input
          type="text"
          placeholder="İsim"
          value={form.isim}
          onChange={(e) => setForm({ ...form, isim: e.target.value })}
        />
        <input
          type="text"
          placeholder="Soyisim"
          value={form.soyisim}
          onChange={(e) => setForm({ ...form, soyisim: e.target.value })}
        />
        <input
          type="tel"
          placeholder="Telefon Numarası"
          value={form.tel}
          onChange={(e) => setForm({ ...form, tel: e.target.value })}
        />
        <input
          type="email"
          placeholder="E-Posta Adresi"
          value={form.mail}
          onChange={(e) => setForm({ ...form, mail: e.target.value })}
        />

        <label className="flex items-start gap-2 mb-3 cursor-pointer text-sm">
          <input
            type="checkbox"
            checked={form.kvkk}
            onChange={(e) => setForm({ ...form, kvkk: e.target.checked })}
            className="mt-1 accent-green-500"
          />
          <span>Açık Rıza Metni ve KVKK Onayı'nı okudum, kabul ediyorum.</span>
        </label>

        <label className="flex items-start gap-2 mb-4 cursor-pointer text-sm">
          <input
            type="checkbox"
            checked={form.ticari}
            onChange={(e) => setForm({ ...form, ticari: e.target.checked })}
            className="mt-1 accent-green-500"
          />
          <span>Mesaj ve elektronik ticari iletişim rızasını onaylıyorum.</span>
        </label>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button className="btn-green w-full" onClick={handleSubmit}>
          Üye Ol
        </button>
      </div>
    </div>
  );
}

export default UyeOl;
