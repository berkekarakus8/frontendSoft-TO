import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Star, ChevronDown, ChevronRight, Trophy } from 'lucide-react';
import api from '../../services/api';
import { toggleFavoriteLeague } from '../../redux/slices/favoritesSlice';

export default function LeagueSidebar() {
  const dispatch = useDispatch();
  const favoriteLeagues = useSelector((state) => state.favorites.leagues);
  
  const [leagues, setLeagues] = useState([]);
  const [expandedCountries, setExpandedCountries] = useState({});

  useEffect(() => {
    // Fetch leagues from JSON Server
    api.get('/leagues')
      .then(res => {
        setLeagues(res.data || []);
        // Expand all by default initially
        const initialExpand = {};
        res.data.forEach(l => {
          initialExpand[l.country] = true;
        });
        setExpandedCountries(initialExpand);
      })
      .catch(err => console.error("Failed to fetch leagues in sidebar", err));
  }, []);

  // Group leagues by country
  const groupedLeagues = leagues.reduce((acc, league) => {
    if (!acc[league.country]) {
      acc[league.country] = {
        flag: league.flag,
        list: []
      };
    }
    acc[league.country].list.push(league);
    return acc;
  }, {});

  const toggleCountry = (country) => {
    setExpandedCountries(prev => ({
      ...prev,
      [country]: !prev[country]
    }));
  };

  // Filter favorite leagues
  const favLeaguesList = leagues.filter(l => favoriteLeagues.includes(l.id));

  return (
    <div className="p-3 space-y-5 text-sm select-none h-full overflow-y-auto scrollbar-thin">
      {/* Pinned Leagues / Favorites Section */}
      <div>
        <div className="flex items-center space-x-1.5 text-sofa-dark-textMuted font-bold text-[11px] uppercase tracking-wider mb-2">
          <Star size={12} className="text-yellow-500 fill-yellow-500" />
          <span>Favori Liglerim</span>
        </div>
        
        {favLeaguesList.length === 0 ? (
          <p className="text-xs text-sofa-dark-textMuted italic pl-2">Henüz favori lig eklemediniz.</p>
        ) : (
          <div className="space-y-1">
            {favLeaguesList.map((league) => (
              <div 
                key={league.id}
                className="flex items-center justify-between p-2 rounded-lg bg-sofa-dark-surface/50 border border-sofa-dark-border/40 hover:bg-sofa-dark-surfaceHover transition"
              >
                <div className="flex items-center space-x-2 truncate">
                  <img src={league.logo} alt="" className="w-5 h-5 object-contain rounded" />
                  <span className="text-xs font-semibold truncate text-sofa-dark-text">{league.name}</span>
                </div>
                <button 
                  onClick={() => dispatch(toggleFavoriteLeague(league.id))}
                  className="text-yellow-500 hover:text-sofa-dark-textMuted transition"
                >
                  <Star size={14} className="fill-yellow-500" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <hr className="border-sofa-dark-border" />

      {/* Countries and Leagues List */}
      <div>
        <div className="flex items-center space-x-1.5 text-sofa-dark-textMuted font-bold text-[11px] uppercase tracking-wider mb-2">
          <Trophy size={12} className="text-sofa-blue" />
          <span>Tüm Ligler</span>
        </div>

        <div className="space-y-2">
          {Object.entries(groupedLeagues).map(([country, data]) => {
            const isExpanded = expandedCountries[country];
            return (
              <div key={country} className="border border-sofa-dark-border/40 rounded-lg overflow-hidden bg-sofa-dark-surface/20">
                {/* Country Header Button */}
                <button
                  onClick={() => toggleCountry(country)}
                  className="w-full flex items-center justify-between p-2 bg-sofa-dark-surface/40 hover:bg-sofa-dark-surfaceHover transition text-left"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-base">{data.flag}</span>
                    <span className="text-xs font-bold text-sofa-dark-text">{country}</span>
                  </div>
                  {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </button>

                {/* Leagues in country */}
                {isExpanded && (
                  <div className="bg-sofa-dark-surface/10 divide-y divide-sofa-dark-border/20 px-1 py-0.5">
                    {data.list.map((league) => {
                      const isFav = favoriteLeagues.includes(league.id);
                      return (
                        <div
                          key={league.id}
                          className="flex items-center justify-between py-1.5 px-2 hover:bg-sofa-dark-surfaceHover rounded transition cursor-pointer"
                        >
                          <div className="flex items-center space-x-2 truncate">
                            <img src={league.logo} alt="" className="w-4.5 h-4.5 object-contain" />
                            <span className="text-xs font-medium truncate text-sofa-dark-textMuted hover:text-sofa-dark-text">{league.name}</span>
                          </div>
                          
                          {/* Star toggle Button */}
                          <button
                            onClick={() => dispatch(toggleFavoriteLeague(league.id))}
                            className={`transition ${isFav ? 'text-yellow-500 hover:text-sofa-dark-textMuted' : 'text-sofa-dark-textMuted hover:text-yellow-500'}`}
                          >
                            <Star size={13} className={isFav ? 'fill-yellow-500' : ''} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
