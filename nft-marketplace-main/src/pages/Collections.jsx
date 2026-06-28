import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActivePage } from '../store/authSlice';
import { setSelectedCollection } from '../store/nftSlice';
import { Layers, Activity, Tag, BarChart3 } from 'lucide-react';

export default function Collections() {
  const dispatch = useDispatch();
  const collections = useSelector(state => state.nft.collections);
  const nfts = useSelector(state => state.nft.nfts);

  const getCollectionPreview = (colId) => {
    const item = nfts.find(n => n.collectionId === colId);
    return item ? item.imageUrl : 'https://placehold.co/400x300/F4F6F9/5C67DE?text=No+Image';
  };

  const getCollectionStats = (colId) => {
    const colNfts = nfts.filter(n => n.collectionId === colId && n.status === 'approved');
    if (colNfts.length === 0) return { volume: 0, floorPrice: 0, items: 0 };
    
    const items = colNfts.length;
    const floorPrice = Math.min(...colNfts.map(n => n.price)).toFixed(2);
    const volume = colNfts.reduce((acc, curr) => acc + curr.price, 0).toFixed(2);
    
    return { volume, floorPrice, items };
  };

  return (
    <div className="flex flex-col gap-8 w-full animate-fade-in">
      <div className="flex items-center gap-3 border-b border-border-platinum pb-6">
        <Layers className="w-8 h-8 text-iris-periwinkle" />
        <div>
          <h1 className="text-3xl font-extrabold text-charcoal-deep">Koleksiyonlar</h1>
          <p className="text-smoke-grey mt-1">Platformdaki tüm özel koleksiyonları inceleyin</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map(col => {
          const stats = getCollectionStats(col.id);
          return (
            <div 
              key={col.id}
              onClick={() => {
                dispatch(setSelectedCollection(col));
                dispatch(setActivePage('collection-detail'));
              }}
              className="flex flex-col bg-surface-white border border-border-platinum rounded-2xl overflow-hidden hover:border-iris-periwinkle transition-all cursor-pointer group shadow-sm hover:shadow-lg"
            >
              <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-charcoal-deep/20 group-hover:bg-transparent transition-colors z-10"></div>
                <img 
                  src={getCollectionPreview(col.id)} 
                  alt={col.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <div className="p-6 flex flex-col gap-4">
                <h3 className="text-xl font-bold text-charcoal-deep group-hover:text-iris-periwinkle transition-colors">
                  {col.name}
                </h3>
                
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex flex-col p-3 bg-pearl-canvas rounded-xl border border-border-platinum/50">
                    <span className="text-[10px] uppercase font-bold text-smoke-grey flex items-center gap-1 mb-1">
                      <Activity className="w-3 h-3" /> Hacim
                    </span>
                    <span className="crypto-value text-sm">{stats.volume} ETH</span>
                  </div>
                  
                  <div className="flex flex-col p-3 bg-pearl-canvas rounded-xl border border-border-platinum/50">
                    <span className="text-[10px] uppercase font-bold text-smoke-grey flex items-center gap-1 mb-1">
                      <Tag className="w-3 h-3" /> Taban
                    </span>
                    <span className="crypto-value text-sm">{stats.floorPrice} ETH</span>
                  </div>
                  
                  <div className="flex flex-col p-3 bg-pearl-canvas rounded-xl border border-border-platinum/50">
                    <span className="text-[10px] uppercase font-bold text-smoke-grey flex items-center gap-1 mb-1">
                      <BarChart3 className="w-3 h-3" /> Ürün
                    </span>
                    <span className="font-mono font-bold text-charcoal-deep text-sm">{stats.items}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {collections.length === 0 && (
         <div className="w-full p-20 flex items-center justify-center border border-dashed border-border-platinum rounded-xl text-smoke-grey">
           Koleksiyon bulunamadı.
         </div>
      )}
    </div>
  );
}
