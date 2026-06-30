import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActivePage } from '../store/authSlice';
import NFTCard from '../components/NFTCard';
import { ArrowLeft, Activity, Tag, BarChart3, Image as ImageIcon } from 'lucide-react';

export default function CollectionDetail() {
  const dispatch = useDispatch();
  const selectedCollection = useSelector(state => state.nft.selectedCollection);
  const nfts = useSelector(state => state.nft.nfts);

  if (!selectedCollection) {
    return (
      <div className="w-full flex flex-col items-center justify-center p-32 gap-4 bg-surface-white rounded-2xl border border-border-platinum shadow-sm animate-fade-in">
        <p className="text-smoke-grey text-xl font-medium">Lütfen vitrinden bir koleksiyon seçin.</p>
        <button onClick={() => dispatch(setActivePage('collections'))} className="text-iris-periwinkle font-bold hover:underline cursor-pointer text-lg">Koleksiyonlara Dön</button>
      </div>
    );
  }

  const collectionNfts = useMemo(() => {
    return nfts.filter(n => n.collectionId === selectedCollection.id && n.status === 'approved');
  }, [nfts, selectedCollection.id]);

  const collectionStats = useMemo(() => {
    if (collectionNfts.length === 0) return { volume: 0, floorPrice: 0 };
    const floorPrice = Math.min(...collectionNfts.map(n => n.price)).toFixed(2);
    const volume = collectionNfts.reduce((acc, curr) => acc + curr.price, 0).toFixed(2);
    return { floorPrice, volume };
  }, [collectionNfts]);

  const coverImage = collectionNfts.length > 0 ? collectionNfts[0].imageUrl : 'https://placehold.co/1200x400/F4F6F9/5C67DE?text=No+Cover';

  return (
    <div className="flex flex-col gap-8 w-full animate-fade-in">
      
      {/* Geri Dön Butonu */}
      <button 
        onClick={() => dispatch(setActivePage('collections'))}
        className="flex items-center gap-2 text-smoke-grey hover:text-charcoal-deep transition-colors w-fit font-medium cursor-pointer"
      >
        <ArrowLeft className="w-5 h-5" /> Koleksiyonlara Dön
      </button>

      {/* Koleksiyon Bilgileri */}
      <div className="bg-surface-white rounded-2xl border border-border-platinum shadow-sm flex flex-col md:flex-row items-center md:items-start p-6 md:p-8 gap-6 md:gap-8">
        
        {/* Koleksiyon Görseli */}
        <div className="w-40 h-40 md:w-48 md:h-48 shrink-0 rounded-2xl overflow-hidden border-4 border-pearl-canvas shadow-md">
          <img 
            src={coverImage} 
            alt={selectedCollection.name} 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
        
        {/* Koleksiyon Detayları */}
        <div className="flex flex-col justify-center w-full pt-2">
          <h1 className="text-3xl md:text-4xl font-black text-charcoal-deep text-center md:text-left">
            {selectedCollection.name}
          </h1>
          <p className="text-smoke-grey mt-2 text-center md:text-left max-w-2xl">
            Bu koleksiyonda yer alan eşsiz dijital eserleri keşfedin ve portföyünüze ekleyin.
          </p>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6">
            <div className="flex flex-col items-center md:items-start p-3 bg-pearl-canvas rounded-xl border border-border-platinum/50 min-w-[100px]">
              <span className="text-[11px] uppercase font-bold text-smoke-grey flex items-center gap-1 mb-1">
                <Activity className="w-3.5 h-3.5" /> Hacim
              </span>
              <span className="font-mono font-bold text-lg text-charcoal-deep">{collectionStats.volume} ETH</span>
            </div>
            
            <div className="flex flex-col items-center md:items-start p-3 bg-pearl-canvas rounded-xl border border-border-platinum/50 min-w-[100px]">
              <span className="text-[11px] uppercase font-bold text-smoke-grey flex items-center gap-1 mb-1">
                <Tag className="w-3.5 h-3.5" /> Taban
              </span>
              <span className="font-mono font-bold text-lg text-charcoal-deep">{collectionStats.floorPrice} ETH</span>
            </div>
            
            <div className="flex flex-col items-center md:items-start p-3 bg-pearl-canvas rounded-xl border border-border-platinum/50 min-w-[100px]">
              <span className="text-[11px] uppercase font-bold text-smoke-grey flex items-center gap-1 mb-1">
                <BarChart3 className="w-3.5 h-3.5" /> Eser
              </span>
              <span className="font-mono font-bold text-lg text-charcoal-deep">{collectionNfts.length} Adet</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Listesi */}
      <div>
        <h2 className="text-2xl font-bold text-charcoal-deep mb-6 flex items-center gap-2">
          <ImageIcon className="w-6 h-6 text-iris-periwinkle" /> 
          Koleksiyondaki Eserler
        </h2>
        
        {collectionNfts.length === 0 ? (
           <div className="w-full p-20 flex flex-col items-center justify-center border border-dashed border-border-platinum rounded-xl text-smoke-grey bg-surface-white shadow-sm">
             <ImageIcon className="w-12 h-12 mb-4 opacity-30" />
             <p className="text-lg font-medium text-charcoal-deep">Bu koleksiyonda henüz onaylanmış bir eser bulunmuyor.</p>
           </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {collectionNfts.map(nft => (
              <NFTCard key={nft.id} nft={nft} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
