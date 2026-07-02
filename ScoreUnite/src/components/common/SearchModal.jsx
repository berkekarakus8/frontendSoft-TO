import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, X, Trophy, Shield, Calendar, Trash2 } from 'lucide-react';
import { setSearchModalOpen, setActiveTab, setDrawerOpen } from '../../redux/slices/uiSlice';
import { setQuery, searchAll, addToHistory, removeFromHistory, clearHistory, clearResults } from '../../redux/slices/searchSlice';
import { fetchMatchDetails } from '../../redux/slices/matchesSlice';

export default function SearchModal() {
  const dispatch = useDispatch();
  const searchModalOpen = useSelector((state) => state.ui.searchModalOpen);
  const query = useSelector((state) => state.search.query);
  const results = useSelector((state) => state.search.results);
  const loading = useSelector((state) => state.search.loading);
  const history = useSelector((state) => state.search.history);

  // Debouncing search queries
  useEffect(() => {
    if (!searchModalOpen) return;

    const delayDebounce = setTimeout(() => {
      if (query.trim()) {
        dispatch(searchAll(query));
      } else {
        dispatch(clearResults());
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(delayDebounce);
  }, [query, searchModalOpen, dispatch]);

  if (!searchModalOpen) return null;

  const handleMatchClick = (matchId) => {
    dispatch(fetchMatchDetails(matchId));
    dispatch(setActiveTab('overview'));
    dispatch(setDrawerOpen(true));
    dispatch(setSearchModalOpen(false));
    dispatch(addToHistory(query));
  };

  const handleHistoryItemClick = (historyQuery) => {
    dispatch(setQuery(historyQuery));
  };

  const handleClose = () => {
    dispatch(setSearchModalOpen(false));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 flex items-start justify-center p-4 pt-16 select-none">
      {/* Backdrop Close trigger */}
      <div className="absolute inset-0" onClick={handleClose}></div>

      {/* Search Content Card */}
      <div className="bg-sofa-dark-surface border border-sofa-dark-border w-full max-w-xl rounded-2xl shadow-2xl relative z-10 flex flex-col max-h-[70vh] overflow-hidden">
        {/* Search Header Input bar */}
        <div className="p-4 border-b border-sofa-dark-border flex items-center space-x-3 bg-[#111622]">
          <Search size={18} className="text-sofa-dark-textMuted" />
          <input
            type="text"
            value={query}
            onChange={(e) => dispatch(setQuery(e.target.value))}
            placeholder="Takım, lig veya maç ismi yazın..."
            autoFocus
            className="flex-1 bg-transparent text-sm text-sofa-dark-text outline-none placeholder-sofa-dark-textMuted"
          />
          {query && (
            <button 
              onClick={() => dispatch(clearResults())}
              className="text-sofa-dark-textMuted hover:text-sofa-dark-text transition p-1 hover:bg-sofa-dark-surfaceHover rounded-full"
            >
              <X size={14} />
            </button>
          )}
          <button 
            onClick={handleClose}
            className="text-xs bg-sofa-dark-bg border border-sofa-dark-border px-2.5 py-1 rounded text-sofa-dark-textMuted hover:text-sofa-dark-text transition font-bold"
          >
            Kapat
          </button>
        </div>

        {/* Search Results / History Body */}
        <div className="flex-1 overflow-y-auto p-4 scrollbar-thin space-y-4">
          {loading ? (
            <div className="flex flex-col justify-center items-center py-10 space-y-2 text-sofa-dark-textMuted">
              <div className="w-6 h-6 border-2 border-sofa-blue border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xs">Aranıyor...</p>
            </div>
          ) : !query.trim() ? (
            /* Search History */
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px] text-sofa-dark-textMuted uppercase font-bold tracking-wider px-1">
                <span>Son Aramalar</span>
                {history.length > 0 && (
                  <button 
                    onClick={() => dispatch(clearHistory())}
                    className="flex items-center space-x-1 hover:text-sofa-red transition font-bold"
                  >
                    <Trash2 size={10} />
                    <span>Geçmişi Temizle</span>
                  </button>
                )}
              </div>
              
              {history.length === 0 ? (
                <p className="text-xs text-sofa-dark-textMuted italic pl-1">Arama geçmişiniz boş.</p>
              ) : (
                <div className="space-y-1">
                  {history.map((h, i) => (
                    <div 
                      key={i}
                      className="flex items-center justify-between p-2 rounded-lg bg-sofa-dark-bg/40 border border-sofa-dark-border/20 hover:bg-sofa-dark-surfaceHover transition text-xs"
                    >
                      <button 
                        onClick={() => handleHistoryItemClick(h)}
                        className="flex-1 text-left text-sofa-dark-text font-medium"
                      >
                        {h}
                      </button>
                      <button 
                        onClick={() => dispatch(removeFromHistory(h))}
                        className="text-sofa-dark-textMuted hover:text-sofa-red transition p-1 rounded hover:bg-sofa-dark-bg"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Results listing */
            <div className="space-y-4">
              {results.matches?.length === 0 && results.teams?.length === 0 && results.leagues?.length === 0 ? (
                <div className="text-center py-8 text-sofa-dark-textMuted text-xs select-none">
                  Aramanızla eşleşen sonuç bulunamadı.
                </div>
              ) : (
                <>
                  {/* Matches Section */}
                  {results.matches?.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-[10px] text-sofa-dark-textMuted uppercase font-bold tracking-wider flex items-center space-x-1 pl-1">
                        <Calendar size={11} className="text-sofa-blue" />
                        <span>Maçlar</span>
                      </h4>
                      <div className="space-y-1">
                        {results.matches.map((match) => (
                          <div
                            key={match.id}
                            onClick={() => handleMatchClick(match.id)}
                            className="flex justify-between items-center p-2.5 rounded-xl bg-sofa-dark-bg/40 hover:bg-sofa-dark-surfaceHover transition border border-sofa-dark-border/30 cursor-pointer text-xs font-semibold"
                          >
                            <span className="text-sofa-dark-text">
                              {match.homeTeamId === 1 ? 'Barcelona' : match.homeTeamId === 3 ? 'Galatasaray' : match.homeTeamId === 5 ? 'Man City' : 'Ev'} vs{' '}
                              {match.awayTeamId === 2 ? 'Real Madrid' : match.awayTeamId === 4 ? 'Fenerbahçe' : match.awayTeamId === 6 ? 'Arsenal' : 'Deplasman'}
                            </span>
                            <span className="text-[10px] text-sofa-dark-textMuted bg-sofa-dark-bg px-1.5 py-0.5 rounded font-bold uppercase">
                              {match.status === 'LIVE' ? `${match.minute}' Canlı` : match.status === 'FT' ? 'Bitti' : 'Fikstür'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Teams Section */}
                  {results.teams?.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-[10px] text-sofa-dark-textMuted uppercase font-bold tracking-wider flex items-center space-x-1 pl-1">
                        <Shield size={11} className="text-sofa-blue" />
                        <span>Takımlar</span>
                      </h4>
                      <div className="space-y-1">
                        {results.teams.map((team) => (
                          <div
                            key={team.id}
                            className="flex items-center space-x-2.5 p-2 bg-sofa-dark-bg/40 hover:bg-sofa-dark-surfaceHover transition border border-sofa-dark-border/30 rounded-xl text-xs font-medium"
                          >
                            <img src={team.logo} alt="" className="w-5 h-5 object-contain" />
                            <span className="text-sofa-dark-text">{team.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Leagues Section */}
                  {results.leagues?.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-[10px] text-sofa-dark-textMuted uppercase font-bold tracking-wider flex items-center space-x-1 pl-1">
                        <Trophy size={11} className="text-sofa-blue" />
                        <span>Ligler</span>
                      </h4>
                      <div className="space-y-1">
                        {results.leagues.map((league) => (
                          <div
                            key={league.id}
                            className="flex items-center space-x-2.5 p-2 bg-sofa-dark-bg/40 hover:bg-sofa-dark-surfaceHover transition border border-sofa-dark-border/30 rounded-xl text-xs font-medium"
                          >
                            <img src={league.logo} alt="" className="w-5 h-5 object-contain" />
                            <span className="text-sofa-dark-text">{league.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
