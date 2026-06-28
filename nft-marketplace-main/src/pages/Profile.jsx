import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { updateBalance, logout } from '../store/authSlice';
import { addNFT, updateNFTStatus, deleteNFT, updateNFTDetails, deleteUser, processTransaction, handleOfferResponse } from '../store/nftSlice';
import { showToast } from '../store/uiSlice';
import { Wallet, LogOut, Plus, DollarSign, Activity, User, Briefcase, CreditCard, ShieldCheck, CheckCircle2, XCircle, Trash2, Upload, Pencil, AlertTriangle, X, MessageCircle } from 'lucide-react';

export default function Profile() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.auth);
  const { nfts, users } = useSelector(state => state.nft);
  
  // Modals & Action States
  const [confirmAction, setConfirmAction] = useState({ isOpen: false, type: null, payload: null, title: '', message: '' });
  const [editingNft, setEditingNft] = useState(null);

  // Forms
  const { register: registerLoad, handleSubmit: handleLoadSubmit, formState: { errors: errorsLoad }, reset: resetLoad } = useForm();
  const { register: registerMint, handleSubmit: handleMintSubmit, reset: resetMint } = useForm();
  const { register: registerEdit, handleSubmit: handleEditSubmit } = useForm();

  if (!currentUser) return null;

  const isAdmin = currentUser.role === 'admin';
  const myNfts = nfts.filter(nft => nft.ownerId === currentUser.id);
  const pendingNfts = nfts.filter(nft => nft.status === 'pending');
  
  // Gelen Teklifleri (Pending Offers) Hesapla
  const incomingOffers = [];
  myNfts.forEach(nft => {
    if (nft.offers && nft.offers.length > 0) {
      nft.offers.forEach(offer => {
        if (offer.status === 'pending') {
          incomingOffers.push({ ...offer, nft });
        }
      });
    }
  });

  // --- Handlers ---
  const onBalanceSubmit = (data) => {
    const usd = parseFloat(data.amount);
    if (isNaN(usd) || usd <= 0) return;
    const eth = usd / 2500;
    dispatch(updateBalance({ eth, usd }));
    dispatch(showToast({ message: `${usd}$ yüklemesi başarıyla ${eth.toFixed(4)} ETH olarak cüzdanınıza aktarıldı!`, type: 'success' }));
    resetLoad();
  };

  const onMintSubmit = (data) => {
    const file = data.image[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newNft = {
          id: `nft_${Date.now()}`,
          title: data.title,
          description: data.description,
          price: parseFloat(data.price),
          category: data.category,
          imageUrl: reader.result,
          ownerId: currentUser.id,
          status: 'pending',
          offers: [],
          traits: [
            { type: "Oluşturan", value: currentUser.username },
            { type: "Tarih", value: new Date().toLocaleDateString() }
          ]
        };
        dispatch(addNFT(newNft));
        dispatch(showToast({ message: 'NFT başarıyla oluşturuldu ve onay sırasına alındı!', type: 'success' }));
        resetMint();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApprove = (id) => {
    dispatch(updateNFTStatus({ id, status: 'approved' }));
    dispatch(showToast({ message: 'NFT onaylandı ve vitrine eklendi.', type: 'success' }));
  };

  // --- Modal Helpers ---
  const requestDeleteNFT = (id) => {
    setConfirmAction({
      isOpen: true,
      type: 'DELETE_NFT',
      payload: id,
      title: 'NFT\'yi Sil',
      message: 'Bu NFT kalıcı olarak sistemden silinecektir. Bu işlem geri alınamaz. Devam etmek istiyor musunuz?'
    });
  };

  const requestDeleteUser = (id) => {
    setConfirmAction({
      isOpen: true,
      type: 'DELETE_USER',
      payload: id,
      title: 'Kullanıcıyı Sil',
      message: 'Bu kullanıcıyı silerseniz, kullanıcının sahip olduğu tüm NFT\'ler zincirleme olarak sistemden silinecektir. Kesinlikle emin misiniz?'
    });
  };

  const requestAcceptOffer = (offerItem) => {
    setConfirmAction({
      isOpen: true,
      type: 'ACCEPT_OFFER',
      payload: offerItem,
      title: 'Teklifi Kabul Et',
      message: `${offerItem.amount} ETH tutarındaki bu teklifi kabul etmek istediğinize emin misiniz? Kabul ederseniz NFT mülkiyeti alıcıya geçecek ve tutar cüzdanınıza eklenecektir.`
    });
  };

  const requestRejectOffer = (offerItem) => {
    setConfirmAction({
      isOpen: true,
      type: 'REJECT_OFFER',
      payload: offerItem,
      title: 'Teklifi Reddet',
      message: 'Bu teklifi reddetmek istediğinize emin misiniz?'
    });
  };

  const executeConfirmAction = () => {
    if (confirmAction.type === 'DELETE_NFT') {
      dispatch(deleteNFT(confirmAction.payload));
      dispatch(showToast({ message: 'NFT sistemden silindi.', type: 'error' }));
    } else if (confirmAction.type === 'DELETE_USER') {
      dispatch(deleteUser(confirmAction.payload));
      dispatch(showToast({ message: 'Kullanıcı ve tüm varlıkları sistemden silindi.', type: 'error' }));
    } else if (confirmAction.type === 'EDIT_NFT') {
      dispatch(updateNFTDetails(confirmAction.payload));
      dispatch(showToast({ message: 'NFT başarıyla güncellendi.', type: 'success' }));
      setEditingNft(null);
    } else if (confirmAction.type === 'ACCEPT_OFFER') {
      const offerItem = confirmAction.payload;
      dispatch(processTransaction({
        nftId: offerItem.nft.id,
        offerId: offerItem.id,
        sellerId: currentUser.id,
        buyerId: offerItem.buyerId,
        amount: offerItem.amount
      }));
      dispatch(updateBalance({ eth: offerItem.amount, usd: offerItem.amount * 2500 }));
      dispatch(showToast({ message: 'Teklif kabul edildi! Bakiye cüzdanınıza aktarıldı ve ürün satıldı.', type: 'success' }));
    } else if (confirmAction.type === 'REJECT_OFFER') {
      const offerItem = confirmAction.payload;
      dispatch(handleOfferResponse({ nftId: offerItem.nft.id, offerId: offerItem.id, responseStatus: 'rejected' }));
      dispatch(showToast({ message: 'Teklif reddedildi.', type: 'error' }));
    }
    setConfirmAction({ ...confirmAction, isOpen: false });
  };

  const openEditModal = (nft) => {
    setEditingNft(nft);
  };

  const onEditSubmit = (data) => {
    setConfirmAction({
      isOpen: true,
      type: 'EDIT_NFT',
      payload: {
        id: editingNft.id,
        title: data.title,
        description: data.description,
        price: parseFloat(data.price)
      },
      title: 'Değişiklikleri Kaydet',
      message: 'NFT üzerindeki değişiklikleri kaydetmek istediğinize emin misiniz?'
    });
  };

  return (
    <div className="profile-page-wrapper">
      
      {/* Onay Modalı (Custom Confirm Dialog) */}
      {confirmAction.isOpen && (
        <div className="modal-overlay-alert">
          <div className="modal-content-alert">
            <div className="modal-title-group-alert">
              <AlertTriangle className="w-8 h-8" />
              <h3 className="modal-title-alert">{confirmAction.title}</h3>
            </div>
            <p className="modal-message-alert">{confirmAction.message}</p>
            <div className="modal-footer-alert">
              <button onClick={() => setConfirmAction({ ...confirmAction, isOpen: false })} className="btn-ghost">
                İptal Et
              </button>
              <button onClick={executeConfirmAction} className={confirmAction.type === 'EDIT_NFT' ? 'btn-primary' : confirmAction.type === 'ACCEPT_OFFER' ? 'btn-success' : 'btn-danger px-6 py-2'}>
                {confirmAction.type === 'EDIT_NFT' ? 'Evet, Kaydet' : confirmAction.type === 'ACCEPT_OFFER' ? 'Evet, Kabul Et' : 'Evet, Onayla'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NFT Düzenleme Modalı */}
      {editingNft && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title-group">
                <Pencil className="w-5 h-5 text-iris-periwinkle" />
                <h3 className="modal-title">NFT'yi Düzenle</h3>
              </div>
              <button onClick={() => setEditingNft(null)} className="modal-close-btn">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleEditSubmit(onEditSubmit)} className="form-layout">
              <div className="form-group">
                <label className="form-label">Başlık</label>
                <input type="text" className="form-input" defaultValue={editingNft.title} {...registerEdit('title', { required: true })} />
              </div>
              <div className="form-group">
                <label className="form-label">Açıklama</label>
                <textarea className="form-input resize-none h-24" defaultValue={editingNft.description} {...registerEdit('description', { required: true })}></textarea>
              </div>
              <div className="form-group">
                <label className="form-label">Fiyat (ETH)</label>
                <input type="number" step="0.001" className="form-input font-mono font-bold" defaultValue={editingNft.price} {...registerEdit('price', { required: true, min: 0.001 })} />
              </div>
              <button type="submit" className="btn-primary w-full mt-2">
                Değişiklikleri Kaydet
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Üst Kısım: Kullanıcı Bilgileri & Cüzdan Özeti */}
      <div className="profile-hero-section">
        <div className="profile-user-card">
          <div className="profile-avatar-wrapper">
            <User className="profile-avatar-icon" />
          </div>
          <h1 className="heading-secondary text-2xl">@{currentUser.username}</h1>
          <span className="profile-email">{currentUser.email}</span>
          <span className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider
            ${isAdmin ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
            {isAdmin ? 'Sistem Yöneticisi' : 'Koleksiyoner'}
          </span>
          <button onClick={() => dispatch(logout())} className="profile-logout-btn">
            <LogOut className="w-4 h-4" /> Çıkış Yap
          </button>
        </div>

        <div className="profile-wallet-card">
          <div className="profile-wallet-bg-icon">
            <Wallet className="w-48 h-48" />
          </div>
          <div className="z-10">
            <span className="profile-wallet-label">Merkeziyetsiz Cüzdan</span>
            <span className="profile-wallet-address">
              {currentUser.walletAddress}
            </span>
          </div>
          <div className="profile-balance-container">
            <span className="profile-balance-label">Toplam Varlık</span>
            <div className="profile-balance-row">
              <span className="profile-balance-eth">{currentUser.ethBalance.toFixed(4)} ETH</span>
              <span className="profile-balance-usd">≈ ${(currentUser.ethBalance * 2500).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* KULLANICI MODU (HERKES İÇİN ORTAK: BAKİYE & MİNT & ENVANTER) */}
      <div className="profile-forms-section">
        <div className="profile-forms-row">
          
          {/* Bakiye Yükle Formu */}
          <div className="profile-half-panel">
            <div className="profile-panel-header">
              <DollarSign className="w-5 h-5 text-emerald-500" />
              <h2 className="profile-panel-title">Bakiye Yükle (USD)</h2>
            </div>
            <form onSubmit={handleLoadSubmit(onBalanceSubmit)} className="form-layout">
              <div className="alert-box-success">
                <p className="alert-text-success">Güncel Kur: 1 ETH = $2500</p>
              </div>
              
              <div className="form-group">
                <label className="form-label">Yüklenecek Tutar ($)</label>
                <div className="relative">
                  <input type="number" placeholder="Örn: 5000" className={`form-input-large ${errorsLoad.amount ? 'border-red-500' : ''}`}
                    {...registerLoad('amount', { required: 'Zorunlu', min: { value: 10, message: 'En az $10' } })} />
                </div>
                {errorsLoad.amount && <span className="form-error-text">⚠ {errorsLoad.amount.message}</span>}
              </div>

              <div className="form-divider">
                <div className="form-section-title">
                  <CreditCard className="w-4 h-4 text-iris-periwinkle" />
                  <span className="form-section-title-text">Kredi Kartı Bilgileri</span>
                </div>
                <div className="flex flex-col gap-3">
                  <div>
                    <input type="text" className={`form-input text-sm ${errorsLoad.cardName ? 'border-red-500' : ''}`} placeholder="Kart Üzerindeki İsim" 
                      {...registerLoad('cardName', { required: 'İsim zorunlu', pattern: { value: /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/, message: 'Sadece harf' } })} />
                    {errorsLoad.cardName && <span className="form-error-text">⚠ {errorsLoad.cardName.message}</span>}
                  </div>
                  <div>
                    <input type="text" className={`form-input text-sm ${errorsLoad.cardNumber ? 'border-red-500' : ''}`} placeholder="Kart Numarası" maxLength="19" 
                      {...registerLoad('cardNumber', { required: 'Kart no zorunlu', pattern: { value: /^[\d\s]{16,19}$/, message: 'Geçerli kart no' } })} />
                    {errorsLoad.cardNumber && <span className="form-error-text">⚠ {errorsLoad.cardNumber.message}</span>}
                  </div>
                  <div className="form-grid-2">
                    <div>
                      <input type="text" className={`form-input text-sm ${errorsLoad.expiryDate ? 'border-red-500' : ''}`} placeholder="AA/YY" maxLength="5" 
                        {...registerLoad('expiryDate', { required: 'Zorunlu', pattern: { value: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/, message: 'Geçersiz' } })} />
                        {errorsLoad.expiryDate && <span className="form-error-text">⚠ {errorsLoad.expiryDate.message}</span>}
                    </div>
                    <div>
                      <input type="text" className={`form-input text-sm ${errorsLoad.cvc ? 'border-red-500' : ''}`} placeholder="CVC" maxLength="3" 
                        {...registerLoad('cvc', { required: 'Zorunlu', pattern: { value: /^[0-9]{3}$/, message: '3 hane' } })} />
                      {errorsLoad.cvc && <span className="form-error-text">⚠ {errorsLoad.cvc.message}</span>}
                    </div>
                  </div>
                </div>
              </div>

              <div className="secure-badge">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="secure-badge-text">256-bit SSL Güvenli Ödeme</span>
              </div>
              <button type="submit" className="btn-primary w-full mt-2">
                <Plus className="w-5 h-5" /> Güvenli Ödeme Yap
              </button>
            </form>
          </div>

          {/* Mint Formu */}
          <div className="profile-half-panel">
            <div className="profile-panel-header">
              <Upload className="w-5 h-5 text-iris-periwinkle" />
              <h2 className="profile-panel-title">Yeni NFT Üret (Mint)</h2>
            </div>
            <form onSubmit={handleMintSubmit(onMintSubmit)} className="form-layout">
              <div className="form-group">
                <label className="form-label">Başlık</label>
                <input type="text" className="form-input" placeholder="NFT Adı" {...registerMint('title', { required: true })} />
              </div>
              
              <div className="form-group">
                <label className="form-label">Açıklama</label>
                <textarea className="form-input resize-none h-24" placeholder="NFT Hikayesi..." {...registerMint('description', { required: true })}></textarea>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Fiyat (ETH)</label>
                  <input type="number" step="0.001" className="form-input font-mono font-bold" placeholder="0.5" {...registerMint('price', { required: true, min: 0.001 })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Kategori</label>
                  <select className="form-input" {...registerMint('category', { required: true })}>
                    <option value="Sanat">Sanat</option>
                    <option value="Oyun">Oyun</option>
                    <option value="Müzik">Müzik</option>
                    <option value="Fotoğrafçılık">Fotoğrafçılık</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Görsel Yükle</label>
                <input type="file" accept="image/*" className="form-file-input" {...registerMint('image', { required: true })} />
              </div>

              <button type="submit" className="btn-dark w-full mt-2">
                Ağa Gönder (Mint)
              </button>
              <p className="form-helper-text">Mintlenen ürünler sistem yöneticisi (Admin) onayından geçtikten sonra vitrinde listelenir.</p>
            </form>
          </div>
        </div>

        {/* Gelen Teklifler Özeti */}
        {incomingOffers.length > 0 && (
          <div className="table-panel-highlight">
            <div className="table-header-highlight">
              <MessageCircle className="w-5 h-5" />
              <h2>Gelen Teklifler ({incomingOffers.length})</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr className="table-header-row">
                    <th className="table-cell font-bold">Ürün</th>
                    <th className="table-cell font-bold">Teklif Eden</th>
                    <th className="table-cell font-bold">Teklif Tutarı</th>
                    <th className="table-cell font-bold">Tarih</th>
                    <th className="table-cell font-bold">İşlem</th>
                  </tr>
                </thead>
                <tbody>
                  {incomingOffers.map((offerItem, idx) => (
                    <tr key={idx} className="table-row">
                      <td className="table-cell">
                        <div className="table-nft-info">
                          <img src={offerItem.nft.imageUrl} alt={offerItem.nft.title} className="table-nft-img" />
                          <span className="table-nft-title">{offerItem.nft.title}</span>
                        </div>
                      </td>
                      <td className="table-cell table-buyer-name">@{offerItem.buyerName}</td>
                      <td className="table-cell table-offer-amount">{offerItem.amount} ETH</td>
                      <td className="table-cell table-date">{new Date(offerItem.timestamp).toLocaleDateString()}</td>
                      <td className="table-cell">
                        <div className="table-actions">
                          <button onClick={() => requestAcceptOffer(offerItem)} className="icon-btn-success px-4 py-1.5 font-bold text-sm">
                            Kabul Et
                          </button>
                          <button onClick={() => requestRejectOffer(offerItem)} className="icon-btn-danger px-4 py-1.5 font-bold text-sm">
                            Reddet
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Varlıklarım Özeti */}
        <div className="panel-container w-full">
          <div className="profile-panel-header">
            <Briefcase className="w-5 h-5 text-iris-periwinkle" />
            <h2 className="profile-panel-title">Portföyüm ({myNfts.length} NFT)</h2>
          </div>
          {myNfts.length === 0 ? (
            <div className="empty-state-container">
              <Activity className="empty-state-icon" />
              <p className="empty-state-text">Henüz portföyünüzde NFT bulunmuyor.</p>
            </div>
          ) : (
            <div className="portfolio-grid">
              {myNfts.map(nft => (
                <div key={nft.id} className="portfolio-mini-card group">
                  <img src={nft.imageUrl} className="portfolio-mini-img" alt={nft.title} />
                  <div className="portfolio-mini-info">
                    <span className="portfolio-mini-title">{nft.title}</span>
                    <span className="portfolio-mini-price">{nft.price} ETH</span>
                  </div>
                  {nft.status === 'pending' && <span className="portfolio-mini-badge">ONAY BEKLİYOR</span>}
                  <div className="portfolio-mini-actions">
                    <button onClick={() => openEditModal(nft)} className="icon-btn-primary p-1.5">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => requestDeleteNFT(nft.id)} className="icon-btn-danger p-1.5">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {isAdmin && (
        /* ADMİN MODU KÜRESEL TABLOLAR */
        <div className="admin-section-wrapper">
          <div className="admin-header">
            <h2 className="admin-title">Yönetim Konsolu</h2>
            <p className="admin-subtitle">Platformdaki tüm işlemleri ve müşterileri buradan denetleyebilirsiniz.</p>
          </div>
          {/* Onay Bekleyenler Tablosu */}
          <div className="panel-container">
            <h2 className="admin-table-title">
              <Activity className="w-5 h-5 text-amber-500" /> Onay Bekleyen NFT'ler ({pendingNfts.length})
            </h2>
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr className="table-header-row">
                    <th className="table-cell font-bold">Görsel</th>
                    <th className="table-cell font-bold">Başlık</th>
                    <th className="table-cell font-bold">Fiyat (ETH)</th>
                    <th className="table-cell font-bold">Kategori</th>
                    <th className="table-cell font-bold">Sahibi</th>
                    <th className="table-cell font-bold">İşlem</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingNfts.length === 0 ? (
                    <tr><td colSpan="6" className="table-cell admin-empty-row">Onay bekleyen NFT bulunmuyor.</td></tr>
                  ) : (
                    pendingNfts.map(nft => {
                      const owner = users.find(u => u.id === nft.ownerId);
                      return (
                        <tr key={nft.id} className="table-row">
                          <td className="table-cell"><img src={nft.imageUrl} alt={nft.title} className="admin-nft-img" /></td>
                          <td className="table-cell font-medium">{nft.title}</td>
                          <td className="table-cell admin-table-price">{nft.price}</td>
                          <td className="table-cell text-sm">{nft.category}</td>
                          <td className="table-cell text-sm">@{owner ? owner.username : 'Bilinmiyor'}</td>
                          <td className="table-cell flex gap-2">
                            <button onClick={() => handleApprove(nft.id)} className="icon-btn-success" title="Onayla"><CheckCircle2 className="w-5 h-5"/></button>
                            <button onClick={() => requestDeleteNFT(nft.id)} className="icon-btn-danger" title="Reddet"><XCircle className="w-5 h-5"/></button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Müşteri Listesi Tablosu */}
          <div className="panel-container">
            <h2 className="admin-table-title">
              <User className="w-5 h-5 text-iris-periwinkle" /> Sistemdeki Müşteriler ({users.length})
            </h2>
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr className="table-header-row">
                    <th className="table-cell font-bold">Kullanıcı Adı</th>
                    <th className="table-cell font-bold">E-posta</th>
                    <th className="table-cell font-bold">Rol</th>
                    <th className="table-cell font-bold">Bakiye (ETH)</th>
                    <th className="table-cell font-bold">İşlem</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id} className="table-row">
                      <td className="table-cell font-medium">@{u.username}</td>
                      <td className="table-cell text-sm text-smoke-grey">{u.email}</td>
                      <td className="table-cell"><span className={`admin-table-role ${u.role === 'admin' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>{u.role.toUpperCase()}</span></td>
                      <td className="table-cell admin-table-balance">{u.ethBalance.toFixed(4)}</td>
                      <td className="table-cell flex gap-2">
                         {u.role !== 'admin' && (
                           <button onClick={() => requestDeleteUser(u.id)} className="icon-btn-danger" title="Kullanıcıyı Sil">
                             <Trash2 className="w-5 h-5"/>
                           </button>
                         )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Küresel NFT Denetimi Tablosu */}
          <div className="panel-container">
            <h2 className="admin-table-title">
              <Briefcase className="w-5 h-5 text-charcoal-deep" /> Küresel NFT Denetimi ({nfts.length})
            </h2>
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr className="table-header-row">
                    <th className="table-cell font-bold">Görsel</th>
                    <th className="table-cell font-bold">Başlık / Kategori</th>
                    <th className="table-cell font-bold">Fiyat (ETH)</th>
                    <th className="table-cell font-bold">Durum</th>
                    <th className="table-cell font-bold">İşlem</th>
                  </tr>
                </thead>
                <tbody>
                  {nfts.map(nft => (
                    <tr key={nft.id} className="table-row">
                      <td className="table-cell"><img src={nft.imageUrl} alt={nft.title} className="admin-nft-img" /></td>
                      <td className="table-cell">
                        <div className="font-medium">{nft.title}</div>
                        <div className="text-xs text-smoke-grey">{nft.category}</div>
                      </td>
                      <td className="table-cell admin-table-price">{nft.price}</td>
                      <td className="table-cell text-sm">
                        <span className={`badge-${nft.status === 'approved' ? 'success' : nft.status === 'pending' ? 'warning' : 'info'}`}>
                          {nft.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="table-cell flex gap-2">
                        <button onClick={() => openEditModal(nft)} className="icon-btn-primary" title="Düzenle">
                          <Pencil className="w-5 h-5"/>
                        </button>
                        <button onClick={() => requestDeleteNFT(nft.id)} className="icon-btn-danger" title="Sistemden Sil">
                          <Trash2 className="w-5 h-5"/>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
