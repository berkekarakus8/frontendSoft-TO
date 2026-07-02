import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from './Header';
import Footer from './Footer';
import LiveTicker from '../common/LiveTicker';
import LeagueSidebar from '../common/LeagueSidebar';
import MatchDashboard from '../match/MatchDashboard';
import MatchDetailPanel from '../match/MatchDetailPanel';
import { setDrawerOpen } from '../../redux/slices/uiSlice';

export default function MainLayout() {
  const dispatch = useDispatch();
  const drawerOpen = useSelector((state) => state.ui.drawerOpen);

  return (
    <div className="flex flex-col h-screen bg-sofa-dark-bg text-sofa-dark-text overflow-hidden select-none">
      {/* Header (Top Nav + Sports Ribbon) */}
      <Header />

      {/* Live Ticker Bar */}
      <LiveTicker />

      {/* Main Grid Content */}
      <main className="flex-1 grid grid-cols-1 md:grid-cols-4 xl:grid-cols-12 overflow-hidden relative">
        {/* Left Column (League Sidebar) - Hidden on mobile, takes 1/4 of tablet, 3/12 of desktop */}
        <section className="hidden md:block md:col-span-1 xl:col-span-3 overflow-y-auto border-r border-sofa-dark-border bg-sofa-dark-bg">
          <LeagueSidebar />
        </section>

        {/* Center Column (Matches List) - Full width on mobile, 3/4 on tablet, 6/12 on desktop (or 9/12 if drawer closed) */}
        <section className={`overflow-y-auto bg-sofa-dark-bg transition-all duration-300 ${
          drawerOpen 
            ? 'col-span-1 md:col-span-3 xl:col-span-6' 
            : 'col-span-1 md:col-span-3 xl:col-span-9'
        }`}>
          <MatchDashboard />
        </section>

        {/* Right Column (Match Details) - Sidebar on desktop, Slide-over on mobile & tablet */}
        {/* Desktop Sidebar view (xl:block) */}
        <section className={`hidden xl:block xl:col-span-3 overflow-y-auto border-l border-sofa-dark-border bg-sofa-dark-surface transition-all duration-300 ${
          drawerOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none w-0 xl:col-span-0'
        }`}>
          {drawerOpen && <MatchDetailPanel />}
        </section>

        {/* Mobile & Tablet Sliding Drawer Overlay */}
        <div className={`xl:hidden fixed inset-0 z-50 bg-black/60 transition-opacity duration-300 ${
          drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => dispatch(setDrawerOpen(false))}
        >
          <div 
            className={`absolute right-0 top-0 h-full w-[100%] max-w-[500px] bg-sofa-dark-surface shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
              drawerOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {drawerOpen && <MatchDetailPanel isDrawerMode={true} />}
          </div>
        </div>
      </main>

      {/* Footer (Rendered inside scroll area or globally? SofaScore usually has footer below everything on scrolling layout, but since we are h-screen with fixed height columns, we can render footer inside scrollable dashboard or as a footer at the bottom of the middle column! This is exactly how they do it: the footer sits at the end of matches list, not sticky at the very bottom of the screen. Let's place it at the bottom of the middle column, so it scrolls with matches. That is perfect!) */}
    </div>
  );
}
