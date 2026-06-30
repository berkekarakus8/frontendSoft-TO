import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setExploreCategory } from '../store/uiSlice';
import { Search, Filter, SlidersHorizontal, X } from 'lucide-react';
import NFTCard from '../components/NFTCard';

export default function Explore() {
  const dispatch = useDispatch();
  const nfts = useSelector(state => state.nft.nfts);
  const selectedCategory = useSelector(state => state.ui.exploreCategory);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('newest'); 

  const categories = ['Tümü', 'Sanat', 'Oyun', 'Müzik', 'Fotoğrafçılık'];

  const approvedNfts = nfts.filter(n => n.status === 'approved');

  const filteredAndSortedNfts = useMemo(() => {
    let result = [...approvedNfts];

    if (searchTerm) {
      result = result.filter(nft => nft.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    if (selectedCategory !== 'Tümü') {
      result = result.filter(nft => nft.category === selectedCategory);
    }

    if (sortOrder === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else {
      // 'newest' (En Yeni) sıralaması: ID numarasına göre büyükten küçüğe
      result.sort((a, b) => {
        const idA = parseInt(a.id.split('_')[1]) || 0;
        const idB = parseInt(b.id.split('_')[1]) || 0;
        return idB - idA;
      });
    }

    return result;
  }, [approvedNfts, searchTerm, selectedCategory, sortOrder]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full animate-fade-in">
      
      {/* Sol Panel: Filtreler */}
      <aside className="w-full lg:w-1/4 flex flex-col gap-6">
        <div className="panel-container sticky top-28">
          <div className="flex items-center gap-2 mb-6 border-b border-border-platinum pb-4">
            <SlidersHorizontal className="w-5 h-5 text-iris-periwinkle" />
            <h2 className="heading-secondary text-xl">Filtreler</h2>
          </div>

          <div className="flex flex-col gap-4">
            <div className="form-group">
              <label className="form-label">Kategoriler</label>
              <div className="flex flex-col gap-2 mt-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => dispatch(setExploreCategory(cat))}
                    className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${selectedCategory === cat ? 'bg-iris-periwinkle text-surface-white' : 'hover:bg-pearl-canvas text-charcoal-deep'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Sağ Panel: İçerik */}
      <div className="w-full lg:w-3/4 flex flex-col gap-6">
        
        {/* Arama ve Sıralama Barı */}
        <div className="panel-container py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-1/2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-smoke-grey" />
            <input 
              type="text" 
              placeholder="NFT Ara..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-pearl-canvas border border-border-platinum rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-iris-periwinkle transition-colors"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-smoke-grey hover:text-charcoal-deep cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter className="w-4 h-4 text-smoke-grey" />
            <select 
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="bg-transparent text-sm font-medium text-charcoal-deep outline-none cursor-pointer"
            >
              <option value="newest">En Yeni</option>
              <option value="price-asc">Fiyat: Düşükten Yükseğe</option>
              <option value="price-desc">Fiyat: Yüksekten Düşüğe</option>
            </select>
          </div>
        </div>

        {/* Grid Listesi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAndSortedNfts.map(nft => (
            <NFTCard key={nft.id} nft={nft} />
          ))}
        </div>

        {filteredAndSortedNfts.length === 0 && (
          <div className="w-full p-20 flex flex-col items-center justify-center border border-dashed border-border-platinum rounded-xl text-smoke-grey bg-surface-white">
            <Search className="w-10 h-10 mb-4 opacity-50" />
            <p className="text-lg font-medium">Aramanıza uygun NFT bulunamadı.</p>
            <button onClick={() => {setSearchTerm(''); dispatch(setExploreCategory('Tümü'));}} className="mt-4 text-iris-periwinkle hover:underline cursor-pointer">Filtreleri Temizle</button>
          </div>
        )}
      </div>
    </div>
  );
}
