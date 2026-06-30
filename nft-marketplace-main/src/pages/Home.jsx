import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActivePage } from '../store/authSlice';
import { setExploreCategory } from '../store/uiSlice';
import NFTCard from '../components/NFTCard';
import { Sparkles, TrendingUp, Paintbrush, Gamepad2, Music, Camera } from 'lucide-react';

export default function Home() {
  const dispatch = useDispatch();
  const nfts = useSelector(state => state.nft.nfts);
  
  // Sadece onaylı olan ilk 4 NFT'yi gösterelim
  const featuredNfts = nfts.filter(nft => nft.status === 'approved').slice(0, 4);

  const categories = [
    { name: 'Sanat', icon: <Paintbrush className="w-5 h-5 mb-2" /> },
    { name: 'Oyun', icon: <Gamepad2 className="w-5 h-5 mb-2" /> },
    { name: 'Müzik', icon: <Music className="w-5 h-5 mb-2" /> },
    { name: 'Fotoğrafçılık', icon: <Camera className="w-5 h-5 mb-2" /> }
  ];

  return (
    <div className="home-page-wrapper">
      {/* Hero Section */}
      <section className="home-hero-section">
        <div className="home-hero-bg-effect bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]"></div>
        <div className="home-hero-content">
          <Sparkles className="w-12 h-12 text-pearl-canvas mb-6 opacity-80" />
          <h1 className="home-hero-title">
            Dijital Sanatın Geleceğini Keşfedin
          </h1>
          <p className="home-hero-subtitle">
            Nexus.NFT ile fütüristik dünyalara ait benzersiz eserleri bulun, toplayın ve sergileyin. Gelecek, koleksiyonerlerin ellerinde şekilleniyor.
          </p>
          <div className="flex gap-4">
            <button 
              onClick={() => dispatch(setActivePage('explore'))}
              className="home-hero-btn"
            >
              Hemen Keşfet
            </button>
          </div>
        </div>
      </section>

      {/* Popüler Kategoriler */}
      <section className="home-section-wrapper">
        <div className="home-section-header">
          <TrendingUp className="w-6 h-6 text-iris-periwinkle" />
          <h2 className="heading-secondary">Popüler Kategoriler</h2>
        </div>
        <div className="home-categories-grid">
          {categories.map((cat, idx) => (
            <div 
              key={idx} 
              onClick={() => {
                dispatch(setExploreCategory(cat.name));
                dispatch(setActivePage('explore'));
              }}
              className="home-category-card group"
            >
              <div className="home-category-icon group-hover:text-iris-periwinkle">
                {cat.icon}
              </div>
              <span className="home-category-name">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Öne Çıkan NFT'ler */}
      <section className="home-section-wrapper">
        <div className="home-section-header-split">
          <h2 className="heading-secondary">Öne Çıkan NFT'ler</h2>
          <button 
            onClick={() => dispatch(setActivePage('explore'))}
            className="home-link-btn"
          >
            Tümünü Gör &rarr;
          </button>
        </div>
        
        <div className="home-nft-grid">
          {featuredNfts.map(nft => (
            <NFTCard key={nft.id} nft={nft} />
          ))}
        </div>
        
        {featuredNfts.length === 0 && (
          <div className="home-empty-state">
            Vitrin için onaylanmış NFT bulunamadı.
          </div>
        )}
      </section>
    </div>
  );
}
