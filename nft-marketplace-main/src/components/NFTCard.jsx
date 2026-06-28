import React from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedNFT } from '../store/nftSlice';
import { ExternalLink } from 'lucide-react';
import { setActivePage as setAuthActivePage } from '../store/authSlice';

export default function NFTCard({ nft }) {
  const dispatch = useDispatch();

  const handleCardClick = () => {
    dispatch(setSelectedNFT(nft));
    dispatch(setAuthActivePage('nft-detail'));
  };

  return (
    <div className="nft-card" onClick={handleCardClick}>
      <div className="nft-image-wrapper">
        <img 
          src={nft.imageUrl} 
          alt={nft.title} 
          className="nft-image"
          loading="lazy"
        />
        {/* Status Badge */}
        <div className="nft-badge-wrapper">
          {nft.status === 'pending' && (
             <span className="nft-badge-pending">
               ONAY BEKLİYOR
             </span>
          )}
          {nft.status === 'owned' && (
             <span className="nft-badge-sold">
               SATILDI
             </span>
          )}
        </div>
      </div>
      
      <div className="nft-content">
        <div className="nft-header-row">
          <h3 className="nft-title" title={nft.title}>{nft.title}</h3>
          <span className="nft-category-tag">
            {nft.category}
          </span>
        </div>
        
        <p className="nft-description">
          {nft.description}
        </p>

        <div className="nft-price-block">
          <div className="nft-price-container">
            <span className="nft-price-label">Fiyat</span>
            <span className="crypto-value">{nft.price.toFixed(2)} ETH</span>
          </div>
          <button className="nft-action-btn">
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
