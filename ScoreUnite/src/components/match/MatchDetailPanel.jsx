import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X, MapPin, User, CloudSun, BarChart, Info, Calendar, Newspaper, ArrowLeftRight, TrendingUp } from 'lucide-react';
import { setDrawerOpen, setActiveTab } from '../../redux/slices/uiSlice';
import MatchTimeline from './MatchTimeline';
import MatchStats from './MatchStats';
import MatchLineups from './MatchLineups';
import MatchStandings from './MatchStandings';
import MatchH2H from './MatchH2H';
import MatchNews from './MatchNews';

export default function MatchDetailPanel({ isDrawerMode = false }) {
  const dispatch = useDispatch();
  const match = useSelector((state) => state.matches.selectedMatch);
  const loading = useSelector((state) => state.matches.detailsLoading);
  const activeTab = useSelector((state) => state.ui.activeTab);

  // Poll vote local state simulation
  const [hasVoted, setHasVoted] = useState(false);
  const [votes, setVotes] = useState({ home: 65, draw: 15, away: 20 });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-sofa-dark-textMuted select-none">
        <div className="w-8 h-8 border-2 border-sofa-blue border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs mt-2">Maç detayları yükleniyor...</p>
      </div>
    );
  }

  if (!match) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-sofa-dark-textMuted p-4 text-center select-none">
        <span className="text-3xl mb-2">📊</span>
        <p className="font-semibold text-xs text-sofa-dark-text">Detayları görmek için bir maça tıklayın.</p>
      </div>
    );
  }

  const isLive = match.status === 'LIVE';
  const isFinished = match.status === 'FT';

  const handleVote = (side) => {
    if (hasVoted) return;
    setVotes(prev => {
      const next = { ...prev };
      next[side] = next[side] + 1;
      return next;
    });
    setHasVoted(true);
  };

  const totalVotes = votes.home + votes.draw + votes.away;
  const homeVotePct = Math.round((votes.home / totalVotes) * 100);
  const drawVotePct = Math.round((votes.draw / totalVotes) * 100);
  const awayVotePct = Math.round((votes.away / totalVotes) * 100);

  // Attack momentum mock bars (12 columns representing timeline chunks)
  const momentumBars = [
    { min: '0-15', home: 45, away: 20 },
    { min: '15-30', home: 30, away: 55 },
    { min: '30-45', home: 65, away: 40 },
    { min: '45-60', home: 20, away: 70 },
    { min: '60-75', home: 80, away: 15 },
    { min: '75-90', home: 55, away: 30 }
  ];

  return (
    <div className="flex flex-col h-full bg-sofa-dark-surface border-l border-sofa-dark-border select-none relative">
      {/* Score Header */}
      <div className="bg-[#141b25] border-b border-sofa-dark-border p-4 relative">
        {/* Drawer Mode Back button */}
        {isDrawerMode && (
          <button
            onClick={() => dispatch(setDrawerOpen(false))}
            className="absolute left-3 top-3 text-sofa-dark-textMuted hover:text-sofa-dark-text p-1 hover:bg-sofa-dark-surfaceHover rounded-full transition"
          >
            <X size={20} />
          </button>
        )}

        {/* Close Button (always visible on desktop) */}
        {!isDrawerMode && (
          <button
            onClick={() => dispatch(setDrawerOpen(false))}
            className="absolute right-3 top-3 text-sofa-dark-textMuted hover:text-sofa-dark-text p-1 hover:bg-sofa-dark-surfaceHover rounded-full transition"
          >
            <X size={18} />
          </button>
        )}

        {/* Score Area */}
        <div className="flex items-center justify-between mt-3 text-center px-4">
          {/* Home Team */}
          <div className="w-1/3 flex flex-col items-center">
            <img
              src={`https://media.api-sports.io/football/teams/${match.homeTeamId}.png`}
              alt=""
              className="w-12 h-12 object-contain filter drop-shadow-md"
              onError={(e) => { e.target.src = 'https://media.api-sports.io/football/teams/529.png'; }}
            />
            <span className="text-xs font-bold text-sofa-dark-text mt-2 block truncate w-full">
              {match.homeTeamId === 1 ? 'Barcelona' : match.homeTeamId === 3 ? 'Galatasaray' : match.homeTeamId === 5 ? 'Man City' : 'Ev Sahibi'}
            </span>
          </div>

          {/* Score & Min */}
          <div className="w-1/3 flex flex-col items-center justify-center">
            <div className="flex items-center space-x-3">
              <span className={`text-3xl font-black ${isLive ? 'text-sofa-live' : 'text-sofa-dark-text'}`}>
                {match.homeScore}
              </span>
              <span className="text-xl text-sofa-dark-textMuted font-bold">-</span>
              <span className={`text-3xl font-black ${isLive ? 'text-sofa-live' : 'text-sofa-dark-text'}`}>
                {match.awayScore}
              </span>
            </div>
            
            {isLive ? (
              <span className="text-[10px] text-sofa-live font-black bg-sofa-live/15 px-2 py-0.5 rounded-full mt-2 animate-pulse-live uppercase">
                Canlı - {match.minute}'
              </span>
            ) : isFinished ? (
              <span className="text-[10px] text-sofa-dark-textMuted font-bold bg-sofa-dark-bg border border-sofa-dark-border px-2 py-0.5 rounded-full mt-2 uppercase">
                Maç Sonucu
              </span>
            ) : (
              <span className="text-[10px] text-sofa-dark-textMuted font-bold bg-sofa-dark-bg border border-sofa-dark-border px-2 py-0.5 rounded-full mt-2 uppercase">
                Başlamadı
              </span>
            )}
            
            {match.halfTimeScore && (
              <span className="text-[9px] text-sofa-dark-textMuted mt-1">İY: {match.halfTimeScore}</span>
            )}
          </div>

          {/* Away Team */}
          <div className="w-1/3 flex flex-col items-center">
            <img
              src={`https://media.api-sports.io/football/teams/${match.awayTeamId}.png`}
              alt=""
              className="w-12 h-12 object-contain filter drop-shadow-md"
              onError={(e) => { e.target.src = 'https://media.api-sports.io/football/teams/541.png'; }}
            />
            <span className="text-xs font-bold text-sofa-dark-text mt-2 block truncate w-full">
              {match.awayTeamId === 2 ? 'Real Madrid' : match.awayTeamId === 4 ? 'Fenerbahçe' : match.awayTeamId === 6 ? 'Arsenal' : 'Deplasman'}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs Header Navigation */}
      <div className="flex border-b border-sofa-dark-border bg-[#10141c] overflow-x-auto scrollbar-thin text-xs font-semibold py-1 px-2 space-x-1">
        {[
          { id: 'overview', label: 'Bilgi', icon: <Info size={13} /> },
          { id: 'stats', label: 'İstatistik', icon: <BarChart size={13} /> },
          { id: 'lineups', label: 'Kadro', icon: <ArrowLeftRight size={13} /> },
          { id: 'standings', label: 'Puan Durumu', icon: <Info size={13} /> },
          { id: 'h2h', label: 'H2H', icon: <Calendar size={13} /> },
          { id: 'news', label: 'Haberler', icon: <Newspaper size={13} /> }
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => dispatch(setActiveTab(tab.id))}
              className={`flex items-center space-x-1 px-3.5 py-2.5 rounded-lg whitespace-nowrap transition ${
                isActive 
                  ? 'bg-sofa-blue/15 text-sofa-blue font-bold border border-sofa-blue/30' 
                  : 'text-sofa-dark-textMuted hover:bg-sofa-dark-surfaceHover hover:text-sofa-dark-text'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panel Content */}
      <div className="flex-1 overflow-y-auto p-4 scrollbar-thin space-y-4">
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            {/* Match info list */}
            <div className="bg-sofa-dark-bg/40 border border-sofa-dark-border/40 p-3 rounded-xl space-y-2.5 text-xs text-sofa-dark-textMuted font-medium">
              <div className="flex items-center space-x-2">
                <MapPin size={13} className="text-sofa-blue" />
                <span>Stadyum: <strong className="text-sofa-dark-text">{match.stadium}</strong></span>
              </div>
              <div className="flex items-center space-x-2">
                <User size={13} className="text-sofa-blue" />
                <span>Hakem: <strong className="text-sofa-dark-text">{match.referee}</strong></span>
              </div>
              {match.spectators > 0 && (
                <div className="flex items-center space-x-2">
                  <User size={13} className="text-sofa-blue" />
                  <span>Seyirci: <strong className="text-sofa-dark-text">{match.spectators.toLocaleString()}</strong></span>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <CloudSun size={13} className="text-sofa-blue" />
                <span>Hava Durumu: <strong className="text-sofa-dark-text">{match.weather}</strong></span>
              </div>
            </div>

            {/* Attack Momentum (Live Graph Simulation) */}
            {isLive && (
              <div className="bg-sofa-dark-bg/40 border border-sofa-dark-border/40 p-3.5 rounded-xl space-y-3">
                <h4 className="text-[10px] font-bold text-sofa-dark-textMuted uppercase tracking-wider flex items-center space-x-1.5">
                  <TrendingUp size={12} className="text-sofa-blue" />
                  <span>Saldırı Momentum Grafiği</span>
                </h4>
                
                {/* Simulated CSS Graph bars */}
                <div className="flex justify-between items-end h-20 px-2 border-b border-sofa-dark-border relative pt-2">
                  {momentumBars.map((bar, i) => (
                    <div key={i} className="flex flex-col items-center w-1/6 h-full justify-center relative">
                      {/* Home Attack Bar (Upwards) */}
                      <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 w-3 rounded-t-sm bg-sofa-blue transition-all" style={{ height: `${bar.home / 2}%` }}></div>
                      
                      {/* Away Attack Bar (Downwards) */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-3 rounded-b-sm bg-sofa-live transition-all" style={{ height: `${bar.away / 2}%` }}></div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between text-[8px] text-sofa-dark-textMuted px-1 font-semibold">
                  <span>0'</span>
                  <span>15'</span>
                  <span>30'</span>
                  <span>45'</span>
                  <span>60'</span>
                  <span>75'</span>
                  <span>90'</span>
                </div>
              </div>
            )}

            {/* Vote/Prediction Poll Anketi */}
            {!isFinished && (
              <div className="bg-sofa-dark-bg/40 border border-sofa-dark-border/40 p-4 rounded-xl space-y-3">
                <h4 className="text-[10px] font-bold text-sofa-dark-textMuted uppercase tracking-wider text-center">Bu maçı kim kazanır?</h4>
                
                {!hasVoted ? (
                  <div className="grid grid-cols-3 gap-2">
                    <button 
                      onClick={() => handleVote('home')}
                      className="bg-sofa-dark-surface border border-sofa-dark-border hover:bg-sofa-blue hover:border-sofa-blue hover:text-white py-2 rounded-lg font-bold text-xs transition"
                    >
                      Ev Sahibi
                    </button>
                    <button 
                      onClick={() => handleVote('draw')}
                      className="bg-sofa-dark-surface border border-sofa-dark-border hover:bg-sofa-dark-border/60 py-2 rounded-lg font-bold text-xs transition"
                    >
                      Beraberlik
                    </button>
                    <button 
                      onClick={() => handleVote('away')}
                      className="bg-sofa-dark-surface border border-sofa-dark-border hover:bg-sofa-live hover:border-sofa-live hover:text-white py-2 rounded-lg font-bold text-xs transition"
                    >
                      Deplasman
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {/* Home bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-bold">
                        <span>Ev Sahibi</span>
                        <span>{homeVotePct}%</span>
                      </div>
                      <div className="h-2 w-full bg-sofa-dark-border rounded-full overflow-hidden">
                        <div className="h-full bg-sofa-blue rounded-full transition-all" style={{ width: `${homeVotePct}%` }}></div>
                      </div>
                    </div>

                    {/* Draw bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-bold">
                        <span>Beraberlik</span>
                        <span>{drawVotePct}%</span>
                      </div>
                      <div className="h-2 w-full bg-sofa-dark-border rounded-full overflow-hidden">
                        <div className="h-full bg-sofa-dark-textMuted/45 rounded-full transition-all" style={{ width: `${drawVotePct}%` }}></div>
                      </div>
                    </div>

                    {/* Away bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-bold">
                        <span>Deplasman</span>
                        <span>{awayVotePct}%</span>
                      </div>
                      <div className="h-2 w-full bg-sofa-dark-border rounded-full overflow-hidden">
                        <div className="h-full bg-sofa-live rounded-full transition-all" style={{ width: `${awayVotePct}%` }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Timeline */}
            <div>
              <h4 className="text-[10px] font-bold text-sofa-dark-textMuted uppercase tracking-wider mb-2 pl-1">Önemli Olaylar</h4>
              <MatchTimeline timeline={match.timeline} />
            </div>
          </div>
        )}

        {/* STATS TAB */}
        {activeTab === 'stats' && <MatchStats stats={match.stats} />}

        {/* LINEUPS TAB */}
        {activeTab === 'lineups' && <MatchLineups lineups={match.lineups} />}

        {/* STANDINGS TAB */}
        {activeTab === 'standings' && (
          <MatchStandings 
            leagueId={match.leagueId} 
            homeTeamId={match.homeTeamId} 
            awayTeamId={match.awayTeamId} 
          />
        )}

        {/* H2H TAB */}
        {activeTab === 'h2h' && (
          <MatchH2H 
            homeTeamId={match.homeTeamId} 
            awayTeamId={match.awayTeamId} 
          />
        )}

        {/* NEWS TAB */}
        {activeTab === 'news' && <MatchNews />}
      </div>
    </div>
  );
}
