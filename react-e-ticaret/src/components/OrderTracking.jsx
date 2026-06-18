export default function OrderTracking(){
    return(
        <>
        <main className="tracking-container">
            <div className="tracking-card">
                <h2 className="form-title">Siparis takibi</h2>
                <form>
                    <div className="form-group">
                        <label className="form-label">Siparis Numarası</label>
                        <input
                            className="form-input"
                            type="text"
                            placeholder="Orn:12345"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Eposta adresi</label>
                        <input
                            className="form-input"
                            type="email"
                            placeholder="ferhat@yilmaz.com"
                        />
                    </div>
                    <button className="form-submit" type="submit">
                        Siparisi Sorgula
                    </button>
                </form>
            </div>

            <div className="tracking-card">
                <h3 className="value-title">Siparis Durumu: Hazırlanıyor</h3>
                <div className="timeline">
                    <div className="timeline-stop">
                        <div className="timeline-icon timeline-icon-active"></div>
                        <span className="timeline-label timeline label-active">
                            Hazırlanıor
                        </span>
                    </div>
                    <div className="timeline-step">
                        <div className="timeline-icon">3</div>
                        <span className="timeline-label">Kargoya verildi</span>
                    </div>
                    <div className="timeline-step">
                        <div className="timeline-icon">4</div>
                        <span className="timeline-label">Teslim Edildi</span>
                    </div>
                </div>
            </div>
        </main>
        </>
    );
}