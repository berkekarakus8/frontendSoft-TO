import { useState } from "react"

export default function ProductReturns(){
  const [orderId,setOrderId]=useState('')
  const [email,setEmail]=useState('')
  const [reason,setReason]=useState('')
  const [description,setDescription]=useState('')
  const [isSubmitted,setIsSubmitted]=useState(false)
  const [error,setError]=useState('')
    return(
        <>

        <main className="tracking-container">
            <div className="tracking-card">
                <h2 className="form-title">Kolay iade Talebi</h2>
                <form>
                    <div className="form-group">
                        <label className="form-label">Sipariş Numarası</label>
                        <input type="text" placeholder="Örn:12345"
                        className="form-input"/>
                    </div>
                    <div className="form-group">
                        <label className="form-label">İade Nedeni</label>
                        <select className="form-select">
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
                        ></textarea>
                    </div>
                    <button className="form-submit" type="submit">
                        İade Talebi Olustur
                    </button>
                </form>
            </div>
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