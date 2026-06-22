function Footer({ setPage }) {
  return (
    <footer className="footer">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Hesaplama Araçları */}
        <div>
          <div className="footer-title">Hesaplama Araçları</div>
          <span className="footer-link" onClick={() => setPage("bmi")}>BMI Hesabı</span>
          <span className="footer-link" onClick={() => setPage("idealkilo")}>İdeal Kilo Hesaplama</span>
          <span className="footer-link" onClick={() => setPage("su")}>Günlük Su İhtiyacı</span>
          <span className="footer-link" onClick={() => setPage("vucut")}>Vücut Tipi Hesaplaması</span>
          <span className="footer-link" onClick={() => setPage("kalp")}>Max Kalp Hızı</span>
        </div>

        {/* Hakkımızda */}
        <div>
          <div className="footer-title">Hakkımızda</div>
          <span className="footer-link" onClick={() => setPage("vizyon")}>Vizyonumuz</span>
          <span className="footer-link" onClick={() => setPage("misyon")}>Misyonumuz</span>
        </div>

        {/* İletişim + Sosyal */}
        <div>
          <div className="footer-title">İletişim</div>
          <span className="footer-link">info@pulseforge.com.tr</span>
          <span className="footer-link">0850 123 45 67</span>

          <div className="mt-6">
            <div className="footer-title">Bizi Takip Edin</div>
            <div className="flex gap-4 mt-1">
              <span
                className="footer-link text-2xl cursor-default"
                title="YouTube"
              >
                ▶
              </span>
              <span
                className="footer-link text-2xl cursor-default"
                title="Instagram"
              >
                📷
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-gray-600 mt-8">
        © 2025 PulseForge. Tüm Hakları Saklıdır.
      </div>
    </footer>
  );
}

export default Footer;
