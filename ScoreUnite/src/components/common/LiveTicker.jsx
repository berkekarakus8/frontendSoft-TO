import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronLeft, ChevronRight, Tv } from 'lucide-react';
import { fetchMatchDetails } from '../../redux/slices/matchesSlice';
import { setDrawerOpen, setActiveTab } from '../../redux/slices/uiSlice';

export default function LiveTicker() {
  const dispatch = useDispatch();
  const matches = useSelector((state) => state.matches.list);
  const selectedDate = useSelector((state) => state.ui.selectedDate);
  
  const scrollContainerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Filter matches for the selected date
  const filteredMatches = matches.filter(match => match.date === selectedDate);

  // Auto-scroll logic
  useEffect(() => {
    if (isHovered || !scrollContainerRef.current) return;

    const interval = setInterval(() => {
      const container = scrollContainerRef.current;
      if (container) {
        // If we reached the end, scroll back to 0, else scroll by 150px
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 5) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: 240, behavior: 'smooth' });
        }
      }
    }, 4000); // Scroll every 4 seconds

    return () => clearInterval(interval);
  }, [isHovered, filteredMatches]);

  const handleScrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -240, behavior: 'smooth' });
  };

  const handleScrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 240, behavior: 'smooth' });
  };

  const handleMatchClick = (matchId) => {
    dispatch(fetchMatchDetails(matchId));
    dispatch(setActiveTab('overview'));
    dispatch(setDrawerOpen(true));
  };

  if (filteredMatches.length === 0) return null;

  return (
    <div className="bg-[#111622] border-b border-sofa-dark-border py-2 relative group select-none">
      <div className="max-w-[1440px] mx-auto px-10 relative">
        {/* Left Scroll Button */}
        <button
          onClick={handleScrollLeft}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-sofa-dark-surface border border-sofa-dark-border text-sofa-dark-textMuted hover:text-sofa-dark-text p-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition z-10"
        >
          <ChevronLeft size={16} />
        </button>

        {/* Scroll Container */}
        <div
          ref={scrollContainerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex space-x-3 overflow-x-auto scrollbar-none py-1 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {filteredMatches.map((match) => {
            const isLive = match.status === 'LIVE';
            const isFinished = match.status === 'FT';
            
            // Check for red cards in timeline
            const homeRedCards = match.timeline?.filter(e => e.type === 'red_card' && e.team === 'home').length || 0;
            const awayRedCards = match.timeline?.filter(e => e.type === 'red_card' && e.team === 'away').length || 0;

            return (
              <div
                key={match.id}
                onClick={() => handleMatchClick(match.id)}
                className="flex-shrink-0 w-60 bg-sofa-dark-surface border border-sofa-dark-border hover:border-sofa-blue/50 p-3 rounded-lg cursor-pointer transition hover:bg-sofa-dark-surfaceHover select-none"
              >
                {/* Header info (League or Live State) */}
                <div className="flex items-center justify-between text-[10px] mb-2 font-semibold">
                  {isLive ? (
                    <span className="flex items-center text-sofa-live font-bold animate-pulse-live">
                      <span className="w-1.5 h-1.5 bg-sofa-live rounded-full mr-1"></span>
                      CANLI - {match.minute}'
                    </span>
                  ) : isFinished ? (
                    <span className="text-sofa-dark-textMuted uppercase font-bold">Bitti / MS</span>
                  ) : (
                    <span className="text-sofa-dark-textMuted uppercase font-bold">Fikstür - {match.minute === 0 ? 'Bugün' : match.minute}</span>
                  )}
                  
                  {isLive && (
                    <span className="text-sofa-blue flex items-center space-x-0.5 bg-sofa-blue/10 px-1 rounded">
                      <Tv size={10} />
                      <span className="font-bold text-[9px]">TV</span>
                    </span>
                  )}
                </div>

                {/* Teams & Scores */}
                <div className="space-y-1.5">
                  {/* Home Team */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 truncate">
                      <img
                        src={`https://media.api-sports.io/football/teams/${match.homeTeamId}.png`}
                        alt=""
                        className="w-4 h-4 object-contain"
                        onError={(e) => {
                          e.target.src = 'https://media.api-sports.io/football/teams/529.png'; // fallback
                        }}
                      />
                      <span className={`text-xs font-medium truncate ${isFinished && match.homeScore < match.awayScore ? 'text-sofa-dark-textMuted' : 'text-sofa-dark-text'}`}>
                        {match.homeTeamId === 1 ? 'Barcelona' : match.homeTeamId === 3 ? 'Galatasaray' : match.homeTeamId === 5 ? 'Man City' : 'Ev Sahibi'}
                      </span>
                      {homeRedCards > 0 && (
                        <span className="w-2.5 h-3.5 bg-red-600 rounded flex items-center justify-center text-[8px] font-black text-white px-0.5">R</span>
                      )}
                    </div>
                    {(isLive || isFinished) && (
                      <span className={`text-xs font-black ${isLive ? 'text-sofa-live' : 'text-sofa-dark-text'}`}>
                        {match.homeScore}
                      </span>
                    )}
                  </div>

                  {/* Away Team */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 truncate">
                      <img
                        src={`https://media.api-sports.io/football/teams/${match.awayTeamId}.png`}
                        alt=""
                        className="w-4 h-4 object-contain"
                        onError={(e) => {
                          e.target.src = 'https://media.api-sports.io/football/teams/541.png'; // fallback
                        }}
                      />
                      <span className={`text-xs font-medium truncate ${isFinished && match.awayScore < match.homeScore ? 'text-sofa-dark-textMuted' : 'text-sofa-dark-text'}`}>
                        {match.awayTeamId === 2 ? 'Real Madrid' : match.awayTeamId === 4 ? 'Fenerbahçe' : match.awayTeamId === 6 ? 'Arsenal' : 'Deplasman'}
                      </span>
                      {awayRedCards > 0 && (
                        <span className="w-2.5 h-3.5 bg-red-600 rounded flex items-center justify-center text-[8px] font-black text-white px-0.5">R</span>
                      )}
                    </div>
                    {(isLive || isFinished) && (
                      <span className={`text-xs font-black ${isLive ? 'text-sofa-live' : 'text-sofa-dark-text'}`}>
                        {match.awayScore}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Scroll Button */}
        <button
          onClick={handleScrollRight}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-sofa-dark-surface border border-sofa-dark-border text-sofa-dark-textMuted hover:text-sofa-dark-text p-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition z-10"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
