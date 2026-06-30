import React from 'react';
import { Shield, Zap, Globe, Users } from 'lucide-react';

export default function About() {
  return (
    <div className="w-full flex flex-col gap-12 animate-fade-in p-4 md:p-8">
      
      {/* Hero Section */}
      <div className="relative bg-charcoal-deep text-surface-white rounded-3xl overflow-hidden shadow-2xl p-12 md:p-20 text-center flex flex-col items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-iris-periwinkle/30 to-charcoal-deep z-0"></div>
        <div className="relative z-10 max-w-3xl flex flex-col items-center gap-6">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            Dijital Sanatın <span className="text-iris-periwinkle">Geleceği</span>
          </h1>
          <p className="text-lg md:text-xl text-smoke-grey/90">
            Nexus, sanatçıları, koleksiyonerleri ve yaratıcı beyinleri tek bir çatı altında toplayan, merkeziyetsiz, güvenli ve şeffaf bir NFT pazar yeridir. Amacımız, dijital mülkiyeti herkes için erişilebilir kılmaktır.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-surface-white rounded-2xl p-8 text-center shadow-sm border border-border-platinum flex flex-col gap-2">
          <span className="text-4xl font-black text-charcoal-deep">250K+</span>
          <span className="text-smoke-grey font-medium uppercase tracking-wider text-sm">Aktif Kullanıcı</span>
        </div>
        <div className="bg-surface-white rounded-2xl p-8 text-center shadow-sm border border-border-platinum flex flex-col gap-2">
          <span className="text-4xl font-black text-charcoal-deep">1.2M+</span>
          <span className="text-smoke-grey font-medium uppercase tracking-wider text-sm">NFT Eseri</span>
        </div>
        <div className="bg-surface-white rounded-2xl p-8 text-center shadow-sm border border-border-platinum flex flex-col gap-2">
          <span className="text-4xl font-black text-charcoal-deep">$45M+</span>
          <span className="text-smoke-grey font-medium uppercase tracking-wider text-sm">İşlem Hacmi</span>
        </div>
        <div className="bg-surface-white rounded-2xl p-8 text-center shadow-sm border border-border-platinum flex flex-col gap-2">
          <span className="text-4xl font-black text-charcoal-deep">120+</span>
          <span className="text-smoke-grey font-medium uppercase tracking-wider text-sm">Ülke</span>
        </div>
      </div>

      {/* Values Section */}
      <div className="flex flex-col gap-8 my-8">
        <h2 className="text-3xl font-extrabold text-charcoal-deep text-center">Değerlerimiz</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="flex flex-col gap-4 items-center text-center p-6 bg-pearl-canvas rounded-2xl border border-border-platinum shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-iris-periwinkle/10 text-iris-periwinkle flex items-center justify-center rounded-2xl">
              <Shield className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-charcoal-deep">Güvenlik İlk Sırada</h3>
            <p className="text-smoke-grey text-sm">Tüm işlemlerimiz akıllı sözleşmeler ile güvence altındadır. Varlıklarınız her zaman sizin kontrolünüzdedir.</p>
          </div>

          <div className="flex flex-col gap-4 items-center text-center p-6 bg-pearl-canvas rounded-2xl border border-border-platinum shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 flex items-center justify-center rounded-2xl">
              <Zap className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-charcoal-deep">Sıfır Karbon Ayak İzi</h3>
            <p className="text-smoke-grey text-sm">Platformumuz, çevre dostu ve enerji verimliliği yüksek blockchain ağları üzerinde çalışır.</p>
          </div>

          <div className="flex flex-col gap-4 items-center text-center p-6 bg-pearl-canvas rounded-2xl border border-border-platinum shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-amber-100 text-amber-600 flex items-center justify-center rounded-2xl">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-charcoal-deep">Topluluk Odaklı</h3>
            <p className="text-smoke-grey text-sm">Sanatçıları destekliyor ve telif haklarının aracısız bir şekilde yaratıcılara ulaşmasını sağlıyoruz.</p>
          </div>

          <div className="flex flex-col gap-4 items-center text-center p-6 bg-pearl-canvas rounded-2xl border border-border-platinum shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-red-100 text-red-600 flex items-center justify-center rounded-2xl">
              <Globe className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-charcoal-deep">Küresel Erişim</h3>
            <p className="text-smoke-grey text-sm">Dünyanın neresinde olursanız olun, dijital ekonominin bir parçası olabilir ve sınırları aşabilirsiniz.</p>
          </div>

        </div>
      </div>

    </div>
  );
}
