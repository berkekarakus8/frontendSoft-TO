import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, Bell, Settings, User } from 'lucide-react';
import { setSearchModalOpen, setSelectedSport } from '../../redux/slices/uiSlice';

const SPORTS = [
  { id: 'football', name: 'Futbol', count: 4, icon: '⚽' },
  { id: 'basketball', name: 'Basketbol', count: 0, icon: '🏀' },
  { id: 'tennis', name: 'Tenis', count: 0, icon: '🎾' },
  { id: 'volleyball', name: 'Voleybol', count: 0, icon: '🏐' },
  { id: 'motorsport', name: 'Motorsporları', count: 0, icon: '🏎️' },
  { id: 'handball', name: 'Hentbol', count: 0, icon: '🤾' },
  { id: 'mma', name: 'MMA', count: 0, icon: '🥊' },
];

export default function Header() {
  const dispatch = useDispatch();
  const selectedSport = useSelector((state) => state.ui.selectedSport);

  return (
    <header className="bg-sofa-dark-surface border-b border-sofa-dark-border sticky top-0 z-40 select-none">
      {/* Top Bar */}
      <div className="max-w-[1440px] mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="bg-sofa-blue text-white px-3 py-1.5 rounded font-black text-lg tracking-wider flex items-center shadow-lg">
            <span>SCORE</span>
            <span className="text-sofa-dark-bg bg-white px-1 ml-1 rounded text-sm">UNITE</span>
          </div>
        </div>

        {/* Center/Right Actions */}
        <div className="flex items-center space-x-3">
          {/* Search Button */}
          <button 
            onClick={() => dispatch(setSearchModalOpen(true))}
            className="flex items-center space-x-2 bg-sofa-dark-bg border border-sofa-dark-border hover:bg-sofa-dark-surfaceHover px-3 py-1.5 rounded-lg text-sofa-dark-textMuted hover:text-sofa-dark-text transition-all w-48 md:w-64 text-left text-sm"
          >
            <Search size={16} />
            <span>Takım, lig veya maç ara...</span>
          </button>

          {/* Icon Buttons */}
          <button className="p-2 hover:bg-sofa-dark-surfaceHover text-sofa-dark-textMuted hover:text-sofa-dark-text rounded-full transition">
            <Bell size={20} />
          </button>
          <button className="p-2 hover:bg-sofa-dark-surfaceHover text-sofa-dark-textMuted hover:text-sofa-dark-text rounded-full transition">
            <Settings size={20} />
          </button>
          
          <div className="w-px h-6 bg-sofa-dark-border hidden md:block" />

          {/* Login Button */}
          <button className="flex items-center space-x-1.5 bg-sofa-blue hover:bg-sofa-blue-dark text-white px-4 py-1.5 rounded-lg font-semibold text-sm transition shadow-sm">
            <User size={16} />
            <span className="hidden sm:inline">Giriş Yap</span>
          </button>
        </div>
      </div>

      {/* Sports Ribbon Bar */}
      <div className="bg-[#111622] border-t border-sofa-dark-border">
        <div className="max-w-[1440px] mx-auto px-4 flex items-center overflow-x-auto scrollbar-thin space-x-1 py-1">
          {SPORTS.map((sport) => {
            const isActive = selectedSport === sport.id;
            return (
              <button
                key={sport.id}
                onClick={() => dispatch(setSelectedSport(sport.id))}
                className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-sofa-blue text-white shadow-md'
                    : 'text-sofa-dark-textMuted hover:bg-sofa-dark-surfaceHover hover:text-sofa-dark-text'
                }`}
              >
                <span>{sport.icon}</span>
                <span>{sport.name}</span>
                {sport.count > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                    isActive ? 'bg-white text-sofa-blue' : 'bg-sofa-live text-white animate-pulse-live'
                  }`}>
                    {sport.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
