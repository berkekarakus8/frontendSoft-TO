import React from 'react';
import { Star, Shield, ArrowRightLeft, AlertTriangle } from 'lucide-react';

export default function MatchTimeline({ timeline }) {
  if (!timeline || timeline.length === 0) {
    return (
      <div className="text-center py-8 text-sofa-dark-textMuted text-xs italic bg-sofa-dark-bg/20 rounded-xl">
        Kronolojik olay akışı bulunmamaktadır.
      </div>
    );
  }

  // Sort timeline chronologically (ascending by minute)
  const sortedEvents = [...timeline].sort((a, b) => a.minute - b.minute);

  return (
    <div className="relative py-4 select-none">
      {/* Center Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-sofa-dark-border -translate-x-1/2"></div>

      <div className="space-y-6 relative">
        {sortedEvents.map((event, index) => {
          const isHome = event.team === 'home';
          
          return (
            <div key={index} className="flex items-center w-full">
              {/* Left Side (Home Team Events) */}
              <div className="w-1/2 pr-4 text-right flex justify-end">
                {isHome && (
                  <div className="flex flex-col items-end max-w-[85%]">
                    <div className="flex items-center space-x-1.5 justify-end">
                      <span className="text-xs font-bold text-sofa-dark-text">{event.player}</span>
                      <EventIcon type={event.type} />
                    </div>
                    {event.assist && (
                      <span className="text-[10px] text-sofa-dark-textMuted">Asist: {event.assist}</span>
                    )}
                    {event.playerIn && (
                      <span className="text-[10px] text-green-400">⚡ Giren: {event.playerIn}</span>
                    )}
                    {event.playerOut && (
                      <span className="text-[10px] text-red-400">⚡ Çıkan: {event.playerOut}</span>
                    )}
                    {event.detail && (
                      <span className="text-[9px] bg-sofa-dark-bg px-1.5 py-0.5 rounded text-sofa-dark-textMuted mt-0.5">{event.detail}</span>
                    )}
                  </div>
                )}
              </div>

              {/* Middle Minute Bubble */}
              <div className="z-10 flex-shrink-0 w-8 h-8 rounded-full bg-sofa-dark-surface border-2 border-sofa-dark-border flex items-center justify-center text-xs font-black text-sofa-blue shadow">
                {event.minute}'
              </div>

              {/* Right Side (Away Team Events) */}
              <div className="w-1/2 pl-4 text-left flex justify-start">
                {!isHome && (
                  <div className="flex flex-col items-start max-w-[85%]">
                    <div className="flex items-center space-x-1.5 justify-start">
                      <EventIcon type={event.type} />
                      <span className="text-xs font-bold text-sofa-dark-text">{event.player}</span>
                    </div>
                    {event.assist && (
                      <span className="text-[10px] text-sofa-dark-textMuted">Asist: {event.assist}</span>
                    )}
                    {event.playerIn && (
                      <span className="text-[10px] text-green-400">⚡ Giren: {event.playerIn}</span>
                    )}
                    {event.playerOut && (
                      <span className="text-[10px] text-red-400">⚡ Çıkan: {event.playerOut}</span>
                    )}
                    {event.detail && (
                      <span className="text-[9px] bg-sofa-dark-bg px-1.5 py-0.5 rounded text-sofa-dark-textMuted mt-0.5">{event.detail}</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function EventIcon({ type }) {
  switch (type) {
    case 'goal':
      return <span className="text-sm">⚽</span>;
    case 'yellow_card':
      return <div className="w-2.5 h-3.5 bg-yellow-500 rounded shadow-sm border border-yellow-600"></div>;
    case 'red_card':
      return <div className="w-2.5 h-3.5 bg-red-600 rounded shadow-sm border border-red-700"></div>;
    case 'substitution':
      return <ArrowRightLeft size={12} className="text-green-400" />;
    default:
      return <Shield size={12} className="text-sofa-dark-textMuted" />;
  }
}
