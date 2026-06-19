import { useState } from "react"

export default function ProductReturns(){
  const [orderId,setOrderId]=useState('')
  const [email,setEmail]=useState('')
  const [reason,setReason]=useState('')
  const [description,setDescription]=useState('')
  const [isSubmitted,setIsSubmitted]=useState(false)
  const [error,setError]=useState('')

    const handleReturnSubmit = (e) => {
        e.preventDefault();
        if(orderId==="12345"){
            setIsSubmitted(true);
            setError('');
        }else{
            setIsSubmitted(false);
            setError('Siparis Bulunamadı!.(Ornek Siparis No:12345')
        }
    };

    return(
        <>

        <main className="tracking-container">
            {isSubmitted?(
                <div className="tracking-card">
                    <h2 className="form-title">Talebiniz Alındı</h2>
                    <p className="value-desc">İade Talebiniz basarıyla olusturulmustur</p>
                    <div className="return-success-box">
                        <span className="return-success-code">Kargo Kodu : N11-Retrun-987</span>
                    </div>
                    <p className="value-desc text-gray">
                        Lutfen bu kkodu en yakın kargo subesine giderek gorevliye iletiniz
                    </p>
                    <button className="form-submit mt-4" onClick={() => {
                        setIsSubmitted(false);
                        setOrderId("");
                        setEmail("");
                        setReason("");
                        setDescription("");
                    }}>
                        Yeni Talep Olustur
                    </button>
                </div>
            ) : (
            <div className="tracking-card">
                <h2 className="form-title">Kolay iade Talebi</h2>
                <form onSubmit={handleReturnSubmit}>
                    <div className="form-group">
                        <label className="form-label">Sipariş Numarası</label>
                        <input type="text" placeholder="Örn:12345"
                        className="form-input"
                        value={orderId}
                        onChange={(e)=>setOrderId(e.target.value)}
                        required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Eposta Adresi</label>
                        <input type="email" placeholder="ferhat@yilmaz.com"
                        className="form-input"
                        value={email}
                        required
                        onChange={(e)=>setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">İade Nedeni</label>
                        <select className="form-select"
                        value={reason}
                        required
                        onChange={(e)=>setReason(e.target.value)}
                        >
                            <option value="">Seçiniz</option>
                            <option value="damage">Arızalı Ürün</option>
                            <option value="size">beden/Boyut</option>
                            <option value="wrong">Yanlıs urun gonderildi</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="form-label">
                            Acıklama
                        </label>
                        <textarea placeholder="İade etmek istediginiz urunleri ve detayları belirtiniz..."
                        className="form-textarea"
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <button className="form-submit" type="submit">
                        İade Talebi Olustur
                    </button>
                </form>
            </div>
            )}
            <div className="tracking-card">
                <h3 className="value-title">Kolay İade Adımları</h3>
                <p className="calue-desc">
                    1. yukarıdaki formdan iade talebi olusturun
                </p>
                <p className="value-desc">
                    2. size verilecek kargo koduyla urunu paketleyin
                </p>
                <p className="value-desc">
                    3.En yakın kargo subesine giderek paketi ucretsiz teslim edin.
                </p>
            </div>
        </main>
        </>
    );
}