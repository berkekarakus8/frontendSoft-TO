import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-sofa-dark-surface border-t border-sofa-dark-border text-sofa-dark-textMuted py-8 select-none">
      <div className="max-w-[1440px] mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
        {/* About Column */}
        <div>
          <h4 className="text-sofa-dark-text font-bold mb-3">ScoreUnite Hakkında</h4>
          <p className="text-xs leading-relaxed">
            ScoreUnite, dünyadaki tüm popüler spor liglerinden canlı skorları, istatistikleri, dizilişleri ve canlı anlatımları piksel hassasiyetinde sunan gelişmiş bir spor platformudur.
          </p>
        </div>

        {/* Links Column */}
        <div>
          <h4 className="text-sofa-dark-text font-bold mb-3">Hızlı Linkler</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#about" className="hover:text-sofa-blue transition">Hakkımızda</a></li>
            <li><a href="#contact" className="hover:text-sofa-blue transition">İletişim</a></li>
            <li><a href="#careers" className="hover:text-sofa-blue transition">Kariyer</a></li>
            <li><a href="#advertise" className="hover:text-sofa-blue transition">Reklam Verin</a></li>
          </ul>
        </div>

        {/* Legal Column */}
        <div>
          <h4 className="text-sofa-dark-text font-bold mb-3">Yasal</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#privacy" className="hover:text-sofa-blue transition">Gizlilik Politikası</a></li>
            <li><a href="#terms" className="hover:text-sofa-blue transition">Kullanım Koşulları</a></li>
            <li><a href="#cookies" className="hover:text-sofa-blue transition">Çerez Politikası</a></li>
            <li><a href="#gdpr" className="hover:text-sofa-blue transition">KVKK Aydınlatma Metni</a></li>
          </ul>
        </div>

        {/* Mobile App Column */}
        <div>
          <h4 className="text-sofa-dark-text font-bold mb-3">Mobil Uygulamalar</h4>
          <div className="flex flex-col space-y-2">
            <button className="bg-sofa-dark-bg hover:bg-sofa-dark-surfaceHover border border-sofa-dark-border px-3 py-1.5 rounded-lg flex items-center space-x-2 text-left text-xs transition">
              <span className="text-lg">🤖</span>
              <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase">Google Play</p>
                <p className="text-sofa-dark-text font-semibold">Hemen İndir</p>
              </div>
            </button>
            <button className="bg-sofa-dark-bg hover:bg-sofa-dark-surfaceHover border border-sofa-dark-border px-3 py-1.5 rounded-lg flex items-center space-x-2 text-left text-xs transition">
              <span className="text-lg">🍎</span>
              <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase">App Store</p>
                <p className="text-sofa-dark-text font-semibold">Hemen İndir</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 mt-8 pt-4 border-t border-sofa-dark-border flex flex-col md:flex-row items-center justify-between text-xs">
        <p>© 2026 ScoreUnite. Tüm Hakları Saklıdır.</p>
        <p className="mt-2 md:mt-0">SofaScore Premium Clone. Developed with ❤️</p>
      </div>
    </footer>
  );
}
