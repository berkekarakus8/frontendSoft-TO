import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Star, ChevronDown, ChevronUp, Calendar, Volume2, Award } from 'lucide-react';
import { fetchMatches, fetchMatchDetails, setSelectedMatch } from '../../redux/slices/matchesSlice';
import { setSelectedDate, setDrawerOpen, setActiveTab } from '../../redux/slices/uiSlice';
import { toggleFavoriteMatch } from '../../redux/slices/favoritesSlice';
import api from '../../services/api';
import Footer from '../layout/Footer';

const DATES = [
  { label: 'Dün', value: '2026-07-01' },
  { label: 'Bugün', value: '2026-07-02' },
  { label: 'Yarın', value: '2026-07-03' }
];

export default function MatchDashboard() {
  const dispatch = useDispatch();
  const matches = useSelector((state) => state.matches.list);
  const loading = useSelector((state) => state.matches.loading);
  const selectedDate = useSelector((state) => state.ui.selectedDate);
  const favoriteMatches = useSelector((state) => state.favorites.matches);
  const selectedMatch = useSelector((state) => state.matches.selectedMatch);

  const [leagues, setLeagues] = useState([]);
  const [collapsedLeagues, setCollapsedLeagues] = useState({});

  useEffect(() => {
    // Initial fetch of matches
    dispatch(fetchMatches());
    // Fetch leagues info to display headers
    api.get('/leagues')
      .then(res => setLeagues(res.data || []))
      .catch(err => console.error(err));
  }, [dispatch]);

  // Filter matches by date
  const filteredMatches = matches.filter(match => match.date === selectedDate);

  // Group matches by leagueId
  const groupedMatches = filteredMatches.reduce((acc, match) => {
    if (!acc[match.leagueId]) {
      acc[match.leagueId] = [];
    }
    acc[match.leagueId].push(match);
    return acc;
  }, {});

  const toggleLeagueCollapse = (leagueId) => {
    setCollapsedLeagues(prev => ({
      ...prev,
      [leagueId]: !prev[leagueId]
    }));
  };

  const handleMatchClick = (matchId) => {
    dispatch(fetchMatchDetails(matchId));
    dispatch(setActiveTab('overview'));
    dispatch(setDrawerOpen(true));
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto scrollbar-thin select-none">
      {/* Date Picker Bar */}
      <div className="bg-sofa-dark-surface border-b border-sofa-dark-border p-2 sticky top-0 z-10 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {DATES.map((d) => {
            const isActive = selectedDate === d.value;
            return (
              <button
                key={d.value}
                onClick={() => dispatch(setSelectedDate(d.value))}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isActive 
                    ? 'bg-sofa-blue text-white shadow-md' 
                    : 'bg-sofa-dark-bg text-sofa-dark-textMuted hover:bg-sofa-dark-surfaceHover hover:text-sofa-dark-text'
                }`}
              >
                {d.label}
              </button>
            );
          })}
        </div>
        
        {/* Calendar Picker Icon button */}
        <button className="p-2 hover:bg-sofa-dark-surfaceHover text-sofa-dark-textMuted hover:text-sofa-dark-text rounded-lg transition flex items-center space-x-1.5 text-xs font-semibold">
          <Calendar size={14} />
          <span className="hidden sm:inline">Takvim</span>
        </button>
      </div>

      {/* Matches List Dashboard */}
      <div className="flex-1 p-3 space-y-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-10 space-y-2 text-sofa-dark-textMuted">
            <div className="w-8 h-8 border-2 border-sofa-blue border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs">Maçlar yükleniyor...</p>
          </div>
        ) : filteredMatches.length === 0 ? (
          <div className="text-center py-12 bg-sofa-dark-surface rounded-xl border border-sofa-dark-border/40 text-sofa-dark-textMuted p-6">
            <span className="text-3xl">⚽</span>
            <p className="font-semibold mt-2 text-sm text-sofa-dark-text">Seçilen tarihte maç bulunmamaktadır.</p>
            <p className="text-xs mt-1">Lütfen diğer günleri kontrol edin.</p>
          </div>
        ) : (
          Object.entries(groupedMatches).map(([leagueId, list]) => {
            const league = leagues.find(l => l.id === parseInt(leagueId));
            const isCollapsed = collapsedLeagues[leagueId];
            if (!league) return null;

            return (
              <div key={leagueId} className="bg-sofa-dark-surface border border-sofa-dark-border/60 rounded-xl overflow-hidden shadow-sofa">
                {/* League Header */}
                <div 
                  className="flex items-center justify-between px-3 py-2.5 bg-[#141b25] border-b border-sofa-dark-border cursor-pointer select-none"
                  onClick={() => toggleLeagueCollapse(leagueId)}
                >
                  <div className="flex items-center space-x-2">
                    <img src={league.logo} alt="" className="w-5 h-5 object-contain rounded" />
                    <div className="flex flex-col">
                      <span className="text-[11px] font-bold text-sofa-dark-textMuted uppercase tracking-wider">{league.country}</span>
                      <span className="text-xs font-bold text-sofa-dark-text">{league.name}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-sofa-dark-textMuted">
                    {isCollapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                  </div>
                </div>

                {/* Matches Rows */}
                {!isCollapsed && (
                  <div className="divide-y divide-sofa-dark-border/50">
                    {list.map((match) => {
                      const isSelected = selectedMatch?.id === match.id;
                      const isFav = favoriteMatches.includes(match.id);
                      const isLive = match.status === 'LIVE';
                      const isFinished = match.status === 'FT';

                      // Find red cards
                      const homeRedCards = match.timeline?.filter(e => e.type === 'red_card' && e.team === 'home').length || 0;
                      const awayRedCards = match.timeline?.filter(e => e.type === 'red_card' && e.team === 'away').length || 0;

                      return (
                        <div
                          key={match.id}
                          onClick={() => handleMatchClick(match.id)}
                          className={`flex items-center justify-between p-3.5 hover:bg-sofa-dark-surfaceHover cursor-pointer transition select-none ${
                            isSelected ? 'bg-sofa-blue/10 border-l-4 border-sofa-blue' : ''
                          }`}
                        >
                          {/* Time / State column */}
                          <div className="w-16 flex flex-col justify-center text-center text-xs font-semibold select-none pr-2">
                            {isLive ? (
                              <>
                                <span className="text-sofa-live font-black animate-pulse-live">{match.minute}'</span>
                                <span className="text-[9px] text-sofa-live font-bold bg-sofa-live/10 px-1 rounded mx-auto mt-0.5">CANLI</span>
                              </>
                            ) : isFinished ? (
                              <span className="text-sofa-dark-textMuted font-bold">MS</span>
                            ) : (
                              <span className="text-sofa-dark-textMuted">20:00</span> // Scheduled dummy time
                            )}
                          </div>

                          {/* Teams & Logos Column */}
                          <div className="flex-1 space-y-2 px-2 border-l border-sofa-dark-border/40">
                            {/* Home Team */}
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center space-x-2.5">
                                <img
                                  src={`https://media.api-sports.io/football/teams/${match.homeTeamId}.png`}
                                  alt=""
                                  className="w-5 h-5 object-contain"
                                  onError={(e) => { e.target.src = 'https://media.api-sports.io/football/teams/529.png'; }}
                                />
                                <span className={`font-semibold ${isFinished && match.homeScore < match.awayScore ? 'text-sofa-dark-textMuted' : 'text-sofa-dark-text'}`}>
                                  {match.homeTeamId === 1 ? 'Barcelona' : match.homeTeamId === 3 ? 'Galatasaray' : match.homeTeamId === 5 ? 'Manchester City' : 'Ev Sahibi'}
                                </span>
                                {homeRedCards > 0 && (
                                  <span className="w-3.5 h-4.5 bg-red-600 rounded flex items-center justify-center text-[10px] font-black text-white px-1 shadow-sm">R</span>
                                )}
                              </div>
                              {(isLive || isFinished) && (
                                <span className={`font-black text-sm ${isLive ? 'text-sofa-live' : 'text-sofa-dark-text'}`}>
                                  {match.homeScore}
                                </span>
                              )}
                            </div>

                            {/* Away Team */}
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center space-x-2.5">
                                <img
                                  src={`https://media.api-sports.io/football/teams/${match.awayTeamId}.png`}
                                  alt=""
                                  className="w-5 h-5 object-contain"
                                  onError={(e) => { e.target.src = 'https://media.api-sports.io/football/teams/541.png'; }}
                                />
                                <span className={`font-semibold ${isFinished && match.awayScore < match.homeScore ? 'text-sofa-dark-textMuted' : 'text-sofa-dark-text'}`}>
                                  {match.awayTeamId === 2 ? 'Real Madrid' : match.awayTeamId === 4 ? 'Fenerbahçe' : match.awayTeamId === 6 ? 'Arsenal' : 'Deplasman'}
                                </span>
                                {awayRedCards > 0 && (
                                  <span className="w-3.5 h-4.5 bg-red-600 rounded flex items-center justify-center text-[10px] font-black text-white px-1 shadow-sm">R</span>
                                )}
                              </div>
                              {(isLive || isFinished) && (
                                <span className={`font-black text-sm ${isLive ? 'text-sofa-live' : 'text-sofa-dark-text'}`}>
                                  {match.awayScore}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Favorite Star action */}
                          <div className="pl-3" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => dispatch(toggleFavoriteMatch(match.id))}
                              className={`p-1.5 rounded-lg hover:bg-sofa-dark-surfaceHover transition ${
                                isFav ? 'text-yellow-500 hover:text-sofa-dark-textMuted' : 'text-sofa-dark-textMuted hover:text-yellow-500'
                              }`}
                            >
                              <Star size={16} className={isFav ? 'fill-yellow-500' : ''} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      <Footer />
    </div>
  );
}
