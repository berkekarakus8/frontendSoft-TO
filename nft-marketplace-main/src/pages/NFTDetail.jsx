import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { setActivePage } from '../store/authSlice';
import { addToCart } from '../store/cartSlice';
import { showToast } from '../store/uiSlice';
import { deleteNFT, addOffer } from '../store/nftSlice';
import { ArrowLeft, ShieldCheck, Clock, Wallet, AlertTriangle, X } from 'lucide-react';

export default function NFTDetail() {
  const dispatch = useDispatch();
  
  const [showConfirm, setShowConfirm] = useState(false);
  const [showOfferModal, setShowOfferModal] = useState(false);
  
  const { register: registerOffer, handleSubmit: handleOfferSubmit, reset: resetOffer, formState: { errors: offerErrors } } = useForm();

  const { selectedNFT: selectedNFTState, collections, users, nfts } = useSelector(state => state.nft);
  const { currentUser } = useSelector(state => state.auth);
  
  const selectedNFT = nfts.find(n => n.id === selectedNFTState?.id) || selectedNFTState;

  if (!selectedNFT) {
    return (
      <div className="detail-empty-state">
        <p className="detail-empty-text">Lütfen vitrinden bir NFT seçin.</p>
        <button onClick={() => dispatch(setActivePage('explore'))} className="detail-empty-link">Keşfet'e Dön</button>
      </div>
    );
  }

  const collection = collections.find(c => c.id === selectedNFT.collectionId) || { name: 'Bilinmeyen Koleksiyon' };
  const owner = users.find(u => u.id === selectedNFT.ownerId) || { username: 'Bilinmiyor' };

  // Asimetrik Kontroller
  const isLoggedIn = !!currentUser;
  const isOwner = isLoggedIn && currentUser.id === selectedNFT.ownerId;
  const isAdmin = isLoggedIn && currentUser.role === 'admin';

  const handleBuy = () => {
    dispatch(addToCart(selectedNFT));
    dispatch(showToast({ message: 'Sepete eklendi! Ödemeye yönlendiriliyorsunuz.', type: 'success' }));
    dispatch(setActivePage('cart'));
  };

  const handleOffer = () => {
    setShowOfferModal(true);
  };

  const onOfferSubmit = (data) => {
    const amount = parseFloat(data.amount);
    
    if (amount > currentUser.ethBalance) {
      dispatch(showToast({ message: 'Yetersiz bakiye. Lütfen bakiyenizi kontrol edin.', type: 'error' }));
      return;
    }
    
    const newOffer = {
      id: `offer_${Date.now()}`,
      buyerId: currentUser.id,
      buyerName: currentUser.username,
      amount: amount,
      status: 'pending',
      timestamp: new Date().toISOString()
    };
    
    dispatch(addOffer({ nftId: selectedNFT.id, offer: newOffer }));
    dispatch(showToast({ message: 'Teklifiniz başarıyla iletildi!', type: 'success' }));
    resetOffer();
    setShowOfferModal(false);
  };

  const handleUpdatePrice = () => {
    dispatch(showToast({ message: 'Fiyat güncelleme işlemlerini profilinizden yapabilirsiniz.', type: 'info' }));
  };

  const executeAdminDelete = () => {
    dispatch(deleteNFT(selectedNFT.id));
    dispatch(showToast({ message: 'NFT sistemden başarıyla silindi.', type: 'error' }));
    dispatch(setActivePage('explore'));
  };

  return (
    <div className="detail-page-wrapper">
      
      {/* Onay Modalı (Custom Confirm Dialog) */}
      {showConfirm && (
        <div className="modal-overlay-alert">
          <div className="modal-content-alert">
            <div className="flex items-center gap-3 text-red-600">
              <AlertTriangle className="w-8 h-8" />
              <h3 className="text-xl font-bold">NFT'yi Sil</h3>
            </div>
            <p className="text-smoke-grey text-sm font-medium">Bu NFT kalıcı olarak sistemden silinecektir. Bu işlem geri alınamaz. Devam etmek istiyor musunuz?</p>
            <div className="flex items-center justify-end gap-3 mt-4">
              <button onClick={() => setShowConfirm(false)} className="px-4 py-2 rounded-lg font-bold text-smoke-grey hover:bg-pearl-canvas transition-colors cursor-pointer">
                İptal Et
              </button>
              <button onClick={executeAdminDelete} className="px-6 py-2 rounded-lg font-bold bg-red-600 text-surface-white hover:bg-red-700 transition-colors shadow-sm cursor-pointer">
                Evet, Sil
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Teklif Modalı */}
      {showOfferModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-iris-periwinkle" />
                <h3 className="text-xl font-bold text-charcoal-deep">Teklif Ver</h3>
              </div>
              <button onClick={() => setShowOfferModal(false)} className="modal-close-btn">
                <X className="w-6 h-6" />
              </button>
            </div>
            <p className="text-sm text-smoke-grey mb-2">Bu ürün için teklifinizi ETH cinsinden giriniz. Cüzdan bakiyeniz ({currentUser?.ethBalance.toFixed(4)} ETH) yetersizse teklifiniz reddedilir.</p>
            <form onSubmit={handleOfferSubmit(onOfferSubmit)} className="flex flex-col gap-4">
              <div className="form-group">
                <label className="text-xs font-mono font-semibold text-smoke-grey mb-1">Teklif Tutarı (ETH)</label>
                <input 
                  type="number" 
                  step="0.0001" 
                  className={`form-input-large ${offerErrors.amount ? 'border-red-500' : ''}`} 
                  placeholder="0.05" 
                  {...registerOffer('amount', { required: 'Tutar girmelisiniz', min: { value: 0.0001, message: 'Geçersiz tutar' } })} 
                />
                {offerErrors.amount && <span className="text-xs text-red-500 font-medium mt-1">⚠ {offerErrors.amount.message}</span>}
              </div>
              <button type="submit" className="btn-primary w-full py-3">
                Teklifi İlet
              </button>
            </form>
          </div>
        </div>
      )}

      <button 
        onClick={() => dispatch(setActivePage('explore'))}
        className="detail-back-btn"
      >
        <ArrowLeft className="w-5 h-5" /> Geri Dön
      </button>

      <div className="detail-layout-card">
        
        {/* Sol Panel: Görsel */}
        <div className="detail-image-panel">
          <img 
            src={selectedNFT.imageUrl} 
            alt={selectedNFT.title} 
            className="detail-image"
          />
        </div>

        {/* Sağ Panel: Detaylar */}
        <div className="detail-info-panel">
          <div className="detail-header-group">
            <div className="detail-header-row">
              <span className="detail-collection-name">{collection.name}</span>
              <div className="detail-trust-badge">
                <ShieldCheck className="w-4 h-4" /> Onaylı Kontrat
              </div>
            </div>
            <h1 className="detail-title">
              {selectedNFT.title}
            </h1>
            <p className="detail-owner-info">
              Sahibi: <span className="detail-owner-name">@{owner.username}</span>
            </p>
          </div>

          <p className="detail-description-box">
            {selectedNFT.description}
          </p>

          {/* Traits (Özellikler) Alanı */}
          {selectedNFT.traits && selectedNFT.traits.length > 0 && (
            <div className="detail-traits-wrapper">
              <span className="detail-section-title">Özellikler (Traits)</span>
              <div className="detail-traits-grid">
                {selectedNFT.traits.map((trait, idx) => (
                  <div key={idx} className="detail-trait-card">
                    <span className="detail-trait-type">{trait.type}</span>
                    <span className="detail-trait-value">{trait.value}</span>
                    <span className="detail-trait-rarity">{trait.rarity} Nadirlik</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="detail-price-wrapper">
            <span className="detail-section-title">Geçerli Fiyat</span>
            <div className="detail-price-row">
              <span className="detail-price-eth">{selectedNFT.price.toFixed(2)} ETH</span>
              <span className="detail-price-usd">($ {(selectedNFT.price * 2500).toLocaleString('tr-TR')})</span>
            </div>
          </div>

          {/* Asimetrik Buton Grubu */}
          <div className="detail-action-group">
            {!isLoggedIn ? (
              <button 
                onClick={() => dispatch(setActivePage('auth'))}
                className="detail-btn-login"
              >
                Satın Almak İçin Giriş Yap
              </button>
            ) : isOwner ? (
              <>
                <button 
                  onClick={handleUpdatePrice}
                  className="detail-btn-update"
                >
                  Fiyatı Güncelle
                </button>
                <button 
                  onClick={() => dispatch(showToast({message: 'Satıştan kaldırma işlemi simüle edildi.', type:'success'}))}
                  className="detail-btn-delist"
                >
                  Satıştan Kaldır
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={handleBuy}
                  className="detail-btn-buy"
                >
                  <Wallet className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Hemen Al
                </button>
                <button 
                  onClick={handleOffer}
                  className="detail-btn-offer"
                >
                  <Clock className="w-5 h-5" />
                  Teklif Ver
                </button>
              </>
            )}
            
            {isAdmin && !isOwner && (
               <button 
                 onClick={() => setShowConfirm(true)}
                 className="detail-btn-admin-del"
               >
                 Sil (Admin)
               </button>
            )}
          </div>
          
          {/* Gelen Teklifler (Geçmiş ve Aktif) */}
          {selectedNFT.offers && selectedNFT.offers.length > 0 && (
            <div className="detail-offers-wrapper">
              <span className="detail-section-title">Güncel Teklifler</span>
              <div className="detail-offers-list">
                {/* Son teklif en üstte */}
                {selectedNFT.offers.slice().reverse().map((offer, idx) => (
                  <div key={idx} className="detail-offer-row">
                    <div className="detail-offer-info">
                      <span className="detail-offer-buyer">@{offer.buyerName}</span>
                      <span className="detail-offer-date">{new Date(offer.timestamp).toLocaleDateString()}</span>
                    </div>
                    <div className="detail-offer-amount-col">
                      <span className="detail-offer-amount">{offer.amount} ETH</span>
                      <span className={`detail-offer-badge-${offer.status}`}>
                        {offer.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}
