import React, { useState } from 'react';
import { X, TrendingUp, Award, Activity } from 'lucide-react';

export default function MatchLineups({ lineups }) {
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  if (!lineups || !lineups.home || !lineups.away) {
    return (
      <div className="text-center py-8 text-sofa-dark-textMuted text-xs italic bg-sofa-dark-bg/20 rounded-xl select-none">
        Bu maç için kadro bilgisi bulunmamaktadır.
      </div>
    );
  }

  // Get color by rating
  const getRatingColorClass = (rating) => {
    if (rating >= 7.5) return 'bg-emerald-600 text-white';
    if (rating >= 7.0) return 'bg-green-600 text-white';
    if (rating >= 6.0) return 'bg-sofa-orange text-white';
    return 'bg-sofa-red text-white';
  };

  const handlePlayerClick = (player, teamName) => {
    setSelectedPlayer({ ...player, teamName });
  };

  return (
    <div className="space-y-6 select-none p-1 pb-6">
      {/* Formation Indicators */}
      <div className="flex justify-between items-center text-xs font-bold px-3 py-1 bg-sofa-dark-bg/40 rounded-lg">
        <span className="text-sofa-dark-text">{lineups.home.formation}</span>
        <span className="text-sofa-dark-textMuted uppercase text-[10px]">Taktik Dizilişler</span>
        <span className="text-sofa-dark-text">{lineups.away.formation}</span>
      </div>

      {/* Vertical Football Pitch Area */}
      <div className="football-field rounded-2xl w-full h-[520px] overflow-hidden shadow-2xl relative">
        {/* Pitch Markings */}
        {/* Center Line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/20 -translate-y-1/2"></div>
        {/* Center Circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full border-2 border-white/20"></div>
        {/* Penalty Area Top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-20 border-b-2 border-x-2 border-white/20"></div>
        {/* Goal Area Top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-7 border-b border-x border-white/10"></div>
        {/* Penalty Area Bottom */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-20 border-t-2 border-x-2 border-white/20"></div>
        {/* Goal Area Bottom */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-7 border-t border-x border-white/10"></div>

        {/* Home Players (Bottom) */}
        {lineups.home.starting?.map((player) => (
          <div
            key={player.id}
            onClick={() => handlePlayerClick(player, 'home')}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group z-20"
            style={{ top: `${player.coordinates.y}%`, left: `${player.coordinates.x}%` }}
          >
            <div className="w-8 h-8 rounded-full bg-sofa-blue border-2 border-white flex items-center justify-center text-xs font-bold text-white shadow-lg group-hover:scale-110 transition">
              {player.shirtNumber}
            </div>
            <span className="text-[10px] font-semibold mt-1 bg-sofa-dark-bg/90 text-white px-1.5 py-0.5 rounded whitespace-nowrap shadow">
              {player.shortName}
            </span>
            <span className={`text-[8px] font-bold px-1 rounded shadow-sm scale-90 ${getRatingColorClass(player.rating)}`}>
              {player.rating}
            </span>
          </div>
        ))}

        {/* Away Players (Top) */}
        {lineups.away.starting?.map((player) => (
          <div
            key={player.id}
            onClick={() => handlePlayerClick(player, 'away')}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group z-20"
            style={{ top: `${player.coordinates.y}%`, left: `${player.coordinates.x}%` }}
          >
            <div className="w-8 h-8 rounded-full bg-white border-2 border-sofa-blue flex items-center justify-center text-xs font-bold text-sofa-blue shadow-lg group-hover:scale-110 transition">
              {player.shirtNumber}
            </div>
            <span className="text-[10px] font-semibold mt-1 bg-sofa-dark-bg/90 text-white px-1.5 py-0.5 rounded whitespace-nowrap shadow">
              {player.shortName}
            </span>
            <span className={`text-[8px] font-bold px-1 rounded shadow-sm scale-90 ${getRatingColorClass(player.rating)}`}>
              {player.rating}
            </span>
          </div>
        ))}
      </div>

      {/* Bench List / Yedek Kulübesi */}
      <div className="grid grid-cols-2 gap-4 text-xs select-none">
        {/* Home Bench */}
        <div className="space-y-1.5 bg-sofa-dark-surface/50 border border-sofa-dark-border/40 p-2.5 rounded-xl">
          <h4 className="font-bold text-sofa-dark-text mb-1 border-b border-sofa-dark-border/60 pb-1">Yedekler (Ev)</h4>
          <div className="space-y-1">
            {lineups.home.bench?.map((player) => (
              <div 
                key={player.id} 
                onClick={() => handlePlayerClick(player, 'home')}
                className="flex items-center justify-between p-1 hover:bg-sofa-dark-surfaceHover rounded transition cursor-pointer"
              >
                <div className="flex items-center space-x-1.5">
                  <span className="text-[10px] w-4 text-sofa-dark-textMuted font-bold">{player.shirtNumber}</span>
                  <span className="text-sofa-dark-text">{player.shortName}</span>
                </div>
                {player.rating > 0 && (
                  <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${getRatingColorClass(player.rating)}`}>
                    {player.rating}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Away Bench */}
        <div className="space-y-1.5 bg-sofa-dark-surface/50 border border-sofa-dark-border/40 p-2.5 rounded-xl">
          <h4 className="font-bold text-sofa-dark-text mb-1 border-b border-sofa-dark-border/60 pb-1">Yedekler (Depl.)</h4>
          <div className="space-y-1">
            {lineups.away.bench?.map((player) => (
              <div 
                key={player.id} 
                onClick={() => handlePlayerClick(player, 'away')}
                className="flex items-center justify-between p-1 hover:bg-sofa-dark-surfaceHover rounded transition cursor-pointer"
              >
                <div className="flex items-center space-x-1.5">
                  <span className="text-[10px] w-4 text-sofa-dark-textMuted font-bold">{player.shirtNumber}</span>
                  <span className="text-sofa-dark-text">{player.shortName}</span>
                </div>
                {player.rating > 0 && (
                  <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${getRatingColorClass(player.rating)}`}>
                    {player.rating}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Managers */}
      <div className="flex justify-between items-center text-xs p-2.5 bg-sofa-dark-surface/30 border border-sofa-dark-border/30 rounded-xl font-medium">
        <span className="text-sofa-dark-textMuted">T. Direktör: <strong className="text-sofa-dark-text">{lineups.home.manager}</strong></span>
        <span className="text-sofa-dark-textMuted">T. Direktör: <strong className="text-sofa-dark-text">{lineups.away.manager}</strong></span>
      </div>

      {/* Player Detail & Heatmap Simulation Modal */}
      {selectedPlayer && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-sofa-dark-surface border border-sofa-dark-border rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl relative select-none">
            {/* Close Button */}
            <button
              onClick={() => setSelectedPlayer(null)}
              className="absolute right-3 top-3 text-sofa-dark-textMuted hover:text-sofa-dark-text p-1 hover:bg-sofa-dark-surfaceHover rounded-full transition"
            >
              <X size={18} />
            </button>

            {/* Header info */}
            <div className="bg-sofa-blue p-4 text-white flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-white/20 border border-white/20 flex items-center justify-center font-bold text-lg">
                {selectedPlayer.shirtNumber}
              </div>
              <div>
                <h3 className="font-bold text-base leading-tight">{selectedPlayer.shortName}</h3>
                <p className="text-[10px] text-white/80 uppercase font-semibold">Oyuncu Detayı</p>
              </div>
            </div>

            {/* Content body */}
            <div className="p-4 space-y-4">
              {/* Rating Section */}
              <div className="flex items-center justify-between border-b border-sofa-dark-border/60 pb-3">
                <span className="text-xs text-sofa-dark-textMuted flex items-center space-x-1">
                  <Award size={14} className="text-yellow-500" />
                  <span>Maç Puanı</span>
                </span>
                <span className={`text-sm font-black px-2 py-0.5 rounded ${getRatingColorClass(selectedPlayer.rating)}`}>
                  {selectedPlayer.rating || 'N/A'}
                </span>
              </div>

              {/* Statistics simulation */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-sofa-dark-bg/60 p-2 rounded-lg border border-sofa-dark-border/40">
                  <p className="text-sofa-dark-textMuted text-[10px]">Pas İsabeti</p>
                  <p className="font-bold text-sm mt-0.5 text-sofa-dark-text">24/29 (82%)</p>
                </div>
                <div className="bg-sofa-dark-bg/60 p-2 rounded-lg border border-sofa-dark-border/40">
                  <p className="text-sofa-dark-textMuted text-[10px]">İkili Mücadele</p>
                  <p className="font-bold text-sm mt-0.5 text-sofa-dark-text">6/9 (66%)</p>
                </div>
                <div className="bg-sofa-dark-bg/60 p-2 rounded-lg border border-sofa-dark-border/40">
                  <p className="text-sofa-dark-textMuted text-[10px]">Top Çalma</p>
                  <p className="font-bold text-sm mt-0.5 text-sofa-dark-text">3</p>
                </div>
                <div className="bg-sofa-dark-bg/60 p-2 rounded-lg border border-sofa-dark-border/40">
                  <p className="text-sofa-dark-textMuted text-[10px]">Şut</p>
                  <p className="font-bold text-sm mt-0.5 text-sofa-dark-text">2 (1 İsabetli)</p>
                </div>
              </div>

              {/* Heatmap simulation */}
              <div>
                <p className="text-[10px] text-sofa-dark-textMuted uppercase font-bold mb-1.5 flex items-center space-x-1">
                  <Activity size={12} className="text-orange-500" />
                  <span>Isı Haritası (Heatmap)</span>
                </p>
                
                {/* Simulated field with glowing gradients */}
                <div className="football-field w-full h-36 rounded-lg opacity-85 overflow-hidden">
                  {/* Glowing hot spots */}
                  {selectedPlayer.coordinates.x !== 0 && (
                    <>
                      {/* Prime spot */}
                      <div 
                        className="absolute w-12 h-12 bg-red-500 rounded-full blur-xl opacity-60 transform -translate-x-1/2 -translate-y-1/2 animate-pulse"
                        style={{ top: `${selectedPlayer.coordinates.y}%`, left: `${selectedPlayer.coordinates.x}%` }}
                      ></div>
                      {/* Secondary spots */}
                      <div 
                        className="absolute w-8 h-8 bg-yellow-500 rounded-full blur-lg opacity-40 transform -translate-x-1/2 -translate-y-1/2"
                        style={{ top: `${selectedPlayer.coordinates.y - 10}%`, left: `${selectedPlayer.coordinates.x - 5}%` }}
                      ></div>
                      <div 
                        className="absolute w-10 h-10 bg-green-500 rounded-full blur-md opacity-30 transform -translate-x-1/2 -translate-y-1/2"
                        style={{ top: `${selectedPlayer.coordinates.y + 8}%`, left: `${selectedPlayer.coordinates.x + 10}%` }}
                      ></div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
