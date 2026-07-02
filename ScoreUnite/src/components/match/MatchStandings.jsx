import React, { useEffect, useState } from 'react';
import api from '../../services/api';

export default function MatchStandings({ leagueId, homeTeamId, awayTeamId }) {
  const [standings, setStandings] = useState(null);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    // Fetch standings for this league
    api.get(`/standings?leagueId=${leagueId}`)
      .then(res => {
        if (res.data && res.data.length > 0) {
          setStandings(res.data[0]);
        }
      })
      .catch(err => console.error(err));

    // Fetch teams info to resolve names and logos
    api.get('/teams')
      .then(res => setTeams(res.data || []))
      .catch(err => console.error(err));
  }, [leagueId]);

  if (!standings || !standings.table || standings.table.length === 0) {
    return (
      <div className="text-center py-8 text-sofa-dark-textMuted text-xs italic bg-sofa-dark-bg/20 rounded-xl select-none">
        Bu lig için puan durumu bulunmamaktadır.
      </div>
    );
  }

  const getTeamName = (id) => {
    const t = teams.find(team => team.id === id);
    return t ? t.name : `Takım ${id}`;
  };

  const getTeamLogo = (id) => {
    const t = teams.find(team => team.id === id);
    return t ? t.logo : `https://media.api-sports.io/football/teams/${id}.png`;
  };

  return (
    <div className="p-1 select-none">
      <div className="overflow-x-auto rounded-xl border border-sofa-dark-border/40">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#141b25] text-sofa-dark-textMuted font-bold border-b border-sofa-dark-border text-[10px]">
              <th className="py-2 px-2.5 w-8 text-center">#</th>
              <th className="py-2 px-2">Takım</th>
              <th className="py-2 px-2 w-8 text-center">O</th>
              <th className="py-2 px-2 w-8 text-center">G</th>
              <th className="py-2 px-2 w-8 text-center">B</th>
              <th className="py-2 px-2 w-8 text-center">M</th>
              <th className="py-2 px-2 w-10 text-center">AV</th>
              <th className="py-2 px-2 w-10 text-center">P</th>
              <th className="py-2 px-2 w-28 text-center hidden sm:table-cell">Form</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sofa-dark-border/40">
            {standings.table.map((row) => {
              const isHome = row.teamId === homeTeamId;
              const isAway = row.teamId === awayTeamId;
              const isParticipant = isHome || isAway;

              // Color zones (e.g. position 1 is Champions League green, etc.)
              let zoneClass = 'border-l-2 border-transparent';
              if (row.position === 1) zoneClass = 'border-l-2 border-emerald-500 bg-emerald-500/5';
              if (row.position === 2) zoneClass = 'border-l-2 border-blue-500 bg-blue-500/5';

              return (
                <tr 
                  key={row.position} 
                  className={`transition hover:bg-sofa-dark-surfaceHover ${
                    isParticipant ? 'bg-sofa-blue/10 font-bold' : ''
                  }`}
                >
                  <td className={`py-3 px-2 text-center text-sofa-dark-textMuted font-semibold ${zoneClass}`}>
                    {row.position}
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex items-center space-x-2">
                      <img src={getTeamLogo(row.teamId)} alt="" className="w-5 h-5 object-contain" />
                      <span className={isParticipant ? 'text-sofa-dark-text' : 'text-sofa-dark-textMuted hover:text-sofa-dark-text'}>
                        {getTeamName(row.teamId)}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-center text-sofa-dark-text">{row.played}</td>
                  <td className="py-3 px-2 text-center text-sofa-dark-text">{row.won}</td>
                  <td className="py-3 px-2 text-center text-sofa-dark-text">{row.draw}</td>
                  <td className="py-3 px-2 text-center text-sofa-dark-text">{row.lost}</td>
                  <td className="py-3 px-2 text-center text-sofa-dark-textMuted font-medium">{row.goalsFor - row.goalsAgainst}</td>
                  <td className="py-3 px-2 text-center text-sofa-blue font-black">{row.points}</td>
                  <td className="py-3 px-2 hidden sm:table-cell">
                    <div className="flex items-center justify-center space-x-1">
                      {row.form?.map((f, i) => {
                        let bubbleClass = 'bg-gray-500';
                        if (f === 'W') bubbleClass = 'bg-emerald-600';
                        if (f === 'D') bubbleClass = 'bg-sofa-orange';
                        if (f === 'L') bubbleClass = 'bg-sofa-red';
                        return (
                          <span 
                            key={i} 
                            className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black text-white ${bubbleClass} shadow-sm`}
                            title={f === 'W' ? 'Galibiyet' : f === 'D' ? 'Beraberlik' : 'Mağlubiyet'}
                          >
                            {f}
                          </span>
                        );
                      })}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {/* Zone legends */}
      <div className="mt-3 flex items-center space-x-4 text-[10px] text-sofa-dark-textMuted px-1">
        <div className="flex items-center space-x-1">
          <span className="w-2.5 h-2.5 bg-emerald-500 rounded-sm"></span>
          <span>Şampiyonlar Ligi</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="w-2.5 h-2.5 bg-blue-500 rounded-sm"></span>
          <span>Avrupa Ligi</span>
        </div>
      </div>
    </div>
  );
}
