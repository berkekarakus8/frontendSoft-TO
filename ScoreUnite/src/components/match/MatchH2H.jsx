import React from 'react';
import { Calendar, Award, Star } from 'lucide-react';

export default function MatchH2H({ homeTeamId, awayTeamId }) {
  // Let's mock a H2H statistics summary and list of past matches
  const pastMatches = [
    { id: 101, date: '2026-07-01', tournament: 'La Liga', homeTeam: 'Real Madrid', awayTeam: 'Barcelona', score: '1 - 3', winner: 'Barcelona' },
    { id: 102, date: '2026-03-02', tournament: 'Copa del Rey', homeTeam: 'Barcelona', awayTeam: 'Real Madrid', score: '2 - 0', winner: 'Barcelona' },
    { id: 103, date: '2025-10-26', tournament: 'La Liga', homeTeam: 'Barcelona', awayTeam: 'Real Madrid', score: '1 - 2', winner: 'Real Madrid' },
    { id: 104, date: '2025-04-21', tournament: 'La Liga', homeTeam: 'Real Madrid', awayTeam: 'Barcelona', score: '2 - 2', winner: 'Draw' }
  ];

  const total = pastMatches.length;
  const homeWins = pastMatches.filter(m => m.winner === 'Barcelona').length;
  const awayWins = pastMatches.filter(m => m.winner === 'Real Madrid').length;
  const draws = pastMatches.filter(m => m.winner === 'Draw').length;

  const homeWinPercent = Math.round((homeWins / total) * 100);
  const awayWinPercent = Math.round((awayWins / total) * 100);
  const drawPercent = Math.round((draws / total) * 100);

  return (
    <div className="space-y-5 p-1 select-none">
      {/* Aggregated Win Progress Bar */}
      <div className="bg-sofa-dark-surface/50 border border-sofa-dark-border/40 p-4 rounded-xl space-y-3">
        <h4 className="text-xs font-bold text-sofa-dark-textMuted uppercase tracking-wider text-center">Genel Galibiyet Dağılımı</h4>
        
        {/* Visual Bar */}
        <div className="h-4 w-full flex rounded-full overflow-hidden text-[9px] font-black text-white">
          <div className="bg-sofa-blue flex items-center justify-center transition-all" style={{ width: `${homeWinPercent}%` }}>
            {homeWinPercent}%
          </div>
          <div className="bg-sofa-dark-border flex items-center justify-center text-sofa-dark-textMuted transition-all" style={{ width: `${drawPercent}%` }}>
            {drawPercent}%
          </div>
          <div className="bg-sofa-live flex items-center justify-center transition-all" style={{ width: `${awayWinPercent}%` }}>
            {awayWinPercent}%
          </div>
        </div>

        {/* Legend */}
        <div className="flex justify-between items-center text-[10px] text-sofa-dark-textMuted px-1 font-bold">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 bg-sofa-blue rounded-full"></span>
            <span>Ev Sahibi ({homeWins})</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 bg-sofa-dark-border rounded-full"></span>
            <span>Beraberlik ({draws})</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 bg-sofa-live rounded-full"></span>
            <span>Deplasman ({awayWins})</span>
          </div>
        </div>
      </div>

      {/* Past Matches List */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold text-sofa-dark-textMuted uppercase tracking-wider pl-1">Son Karşılaşmalar</h4>

        <div className="space-y-2">
          {pastMatches.map((match) => (
            <div 
              key={match.id}
              className="flex items-center justify-between p-3 bg-sofa-dark-surface/30 border border-sofa-dark-border/40 hover:bg-sofa-dark-surfaceHover rounded-xl transition text-xs"
            >
              <div className="space-y-0.5">
                <span className="text-[10px] bg-sofa-dark-border/30 px-1.5 py-0.5 rounded text-sofa-dark-textMuted font-bold">
                  {match.tournament}
                </span>
                <p className="text-sofa-dark-textMuted mt-1 flex items-center space-x-1">
                  <Calendar size={10} />
                  <span>{match.date}</span>
                </p>
              </div>

              {/* Match Score */}
              <div className="flex items-center space-x-3">
                <span className={`font-semibold ${match.winner === 'Barcelona' ? 'text-sofa-dark-text font-bold' : 'text-sofa-dark-textMuted'}`}>
                  {match.homeTeam}
                </span>
                <span className="bg-sofa-dark-bg border border-sofa-dark-border px-2 py-1 rounded font-black text-sofa-blue">
                  {match.score}
                </span>
                <span className={`font-semibold ${match.winner === 'Real Madrid' ? 'text-sofa-dark-text font-bold' : 'text-sofa-dark-textMuted'}`}>
                  {match.awayTeam}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
