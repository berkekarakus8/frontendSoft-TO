import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../store/cartSlice';
import { setActivePage, updateBalance } from '../store/authSlice';
import { updateNFTStatus, transferOwnership } from '../store/nftSlice';
import { showToast } from '../store/uiSlice';
import { Trash2, ShoppingBag, ArrowRight, Wallet } from 'lucide-react';

export default function Cart() {
  const dispatch = useDispatch();
  const { items } = useSelector(state => state.cart);
  const { currentUser } = useSelector(state => state.auth);

  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const gasFee = items.length > 0 ? 0.05 : 0;
  const total = subtotal + gasFee;

  const handleCheckout = () => {
    if (items.length === 0) return;

    if (!currentUser) {
      dispatch(showToast({ message: 'Ödeme yapmak için lütfen önce giriş yapın.', type: 'warning' }));
      dispatch(setActivePage('auth'));
      return;
    }
    
    // Bakiye Kontrolü
    if (currentUser.ethBalance < total) {
      dispatch(showToast({ message: 'Yetersiz Bakiye! Lütfen cüzdanınıza bakiye yükleyin.', type: 'error' }));
      dispatch(setActivePage('profile'));
      return;
    }

    // 1. Bakiyeden Düş
    dispatch(updateBalance({ eth: -total, usd: 0 }));

    // 2. Sahiplikleri Aktar (NFT'leri kullanıcıya geçir)
    items.forEach(item => {
      dispatch(transferOwnership({ nftId: item.id, newOwnerId: currentUser.id }));
    });
    
    // 3. Sepeti Temizle ve Başarıya Git
    dispatch(clearCart());
    dispatch(setActivePage('success'));
  };

  return (
    <div className="w-full flex flex-col lg:flex-row gap-8 animate-fade-in">
      
      {/* Sol Panel: Sepet ve Form */}
      <div className="w-full lg:w-8/12 flex flex-col gap-8">
        
        {/* Sepet Ürünleri */}
        <div className="panel-container">
          <div className="flex items-center gap-3 mb-6 border-b border-border-platinum pb-4">
            <ShoppingBag className="w-6 h-6 text-iris-periwinkle" />
            <h2 className="heading-secondary text-2xl">Sepetim ({items.length})</h2>
          </div>

          {items.length === 0 ? (
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-pearl-canvas rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="w-10 h-10 text-smoke-grey opacity-50" />
              </div>
              <p className="text-lg font-medium text-charcoal-deep mb-2">Sepetiniz şu an boş.</p>
              <p className="text-smoke-grey text-sm mb-6">Harika NFT'leri keşfetmek için mağazaya göz atın.</p>
              <button 
                onClick={() => dispatch(setActivePage('explore'))}
                className="btn-primary"
              >
                Keşfet'e Git
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map(item => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-surface-white border border-border-platinum rounded-xl shadow-sm hover:border-iris-periwinkle transition-colors">
                  <div className="flex items-center gap-4">
                    <img src={item.imageUrl} alt={item.title} className="w-16 h-16 rounded-lg object-cover shadow-sm" />
                    <div className="flex flex-col">
                      <span className="font-bold text-charcoal-deep text-lg">{item.title}</span>
                      <span className="text-xs text-smoke-grey">{item.category}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <span className="crypto-value">{item.price} ETH</span>
                    <button 
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="Sepetten Çıkar"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Uyarı Mesajı */}
        {items.length > 0 && currentUser && currentUser.ethBalance < total && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-sm text-red-700 font-medium">
              Cüzdanınızdaki bakiye ({currentUser.ethBalance.toFixed(2)} ETH) bu işlem için yetersiz. Lütfen profilinizden bakiye yükleyin.
            </p>
          </div>
        )}
      </div>

      {/* Sağ Panel: Sipariş Özeti */}
      <div className="w-full lg:w-4/12">
        <div className="panel-container sticky top-28 shadow-md">
          <h2 className="heading-secondary text-xl border-b border-border-platinum pb-4 mb-4">Sipariş Özeti</h2>
          
          <div className="flex flex-col gap-3 text-sm mb-6">
            <div className="flex justify-between items-center text-charcoal-deep font-medium">
              <span>Ara Toplam</span>
              <span>{subtotal.toFixed(2)} ETH</span>
            </div>
            <div className="flex justify-between items-center text-smoke-grey">
              <span>Ağ Ücreti (Gas Fee)</span>
              <span>{gasFee.toFixed(2)} ETH</span>
            </div>
            <hr className="border-border-platinum my-2" />
            <div className="flex justify-between items-center text-lg font-black text-charcoal-deep">
              <span>Genel Toplam</span>
              <span className="text-iris-periwinkle font-mono">{total.toFixed(2)} ETH</span>
            </div>
          </div>

          <button 
            onClick={handleCheckout}
            disabled={items.length === 0}
            className={`w-full py-4 flex items-center justify-center gap-2 rounded-xl font-bold text-lg transition-all shadow-md cursor-pointer
              ${items.length === 0 
                ? 'bg-pearl-canvas text-smoke-grey cursor-not-allowed shadow-none' 
                : 'bg-iris-periwinkle text-surface-white hover:bg-charcoal-deep hover:shadow-lg'
              }`}
          >
            <Wallet className="w-5 h-5" /> Siparişi Tamamla
          </button>
        </div>
      </div>

    </div>
  );
}
