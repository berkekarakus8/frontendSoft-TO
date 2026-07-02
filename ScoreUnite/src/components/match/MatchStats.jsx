import React from 'react';

const STATS_MAP = [
  { key: 'possession', label: 'Topla Oynama %', isPercentage: true },
  { key: 'xg', label: 'Beklenen Gol (xG)', isPercentage: false },
  { key: 'shots', label: 'Toplam Şut', isPercentage: false },
  { key: 'shotsOnTarget', label: 'İsabetli Şut', isPercentage: false },
  { key: 'shotsOffTarget', label: 'İsabetsiz Şut', isPercentage: false },
  { key: 'blockedShots', label: 'Engellenen Şut', isPercentage: false },
  { key: 'passes', label: 'Toplam Pas', isPercentage: false },
  { key: 'passAccuracy', label: 'Pas İsabeti %', isPercentage: true },
  { key: 'corners', label: 'Korner', isPercentage: false },
  { key: 'fouls', label: 'Faul', isPercentage: false },
  { key: 'offsides', label: 'Ofsayt', isPercentage: false },
  { key: 'saves', label: 'Kaleci Kurtarışı', isPercentage: false },
];

export default function MatchStats({ stats }) {
  if (!stats || Object.keys(stats).length === 0) {
    return (
      <div className="text-center py-8 text-sofa-dark-textMuted text-xs italic bg-sofa-dark-bg/20 rounded-xl select-none">
        Bu maç için detaylı istatistik bulunmamaktadır.
      </div>
    );
  }

  return (
    <div className="space-y-4 p-2 select-none">
      {STATS_MAP.map((item) => {
        const data = stats[item.key];
        if (!data) return null;

        const homeVal = parseFloat(data.home || 0);
        const awayVal = parseFloat(data.away || 0);
        const total = homeVal + awayVal || 1; // avoid division by zero

        const homePercent = (homeVal / total) * 100;
        const awayPercent = (awayVal / total) * 100;

        // Is home higher?
        const isHomeHigher = homeVal > awayVal;
        const isAwayHigher = awayVal > homeVal;

        return (
          <div key={item.key} className="space-y-1">
            {/* Values & Label */}
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className={`w-12 text-left ${isHomeHigher ? 'text-sofa-blue font-bold text-sm' : 'text-sofa-dark-text'}`}>
                {homeVal}{item.isPercentage && '%'}
              </span>
              <span className="text-sofa-dark-textMuted text-[11px] font-bold uppercase">{item.label}</span>
              <span className={`w-12 text-right ${isAwayHigher ? 'text-sofa-blue font-bold text-sm' : 'text-sofa-dark-text'}`}>
                {awayVal}{item.isPercentage && '%'}
              </span>
            </div>

            {/* Split Progress Bar */}
            <div className="h-2 w-full flex bg-sofa-dark-border rounded-full overflow-hidden">
              {/* Home Side Progress */}
              <div className="w-1/2 flex justify-end">
                <div 
                  className={`h-full rounded-l-full transition-all duration-500 ${
                    isHomeHigher ? 'bg-sofa-blue shadow-lg shadow-sofa-blue/50' : 'bg-sofa-dark-textMuted/40'
                  }`}
                  style={{ width: `${homePercent}%` }}
                ></div>
              </div>

              {/* Central Divider */}
              <div className="w-0.5 bg-sofa-dark-bg z-10"></div>

              {/* Away Side Progress */}
              <div className="w-1/2 flex justify-start">
                <div 
                  className={`h-full rounded-r-full transition-all duration-500 ${
                    isAwayHigher ? 'bg-sofa-blue shadow-lg shadow-sofa-blue/50' : 'bg-sofa-dark-textMuted/40'
                  }`}
                  style={{ width: `${awayPercent}%` }}
                ></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
