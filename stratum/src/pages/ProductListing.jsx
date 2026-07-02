import React, { useState } from 'react';
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '../productsMock.js';
import ProductCard from '../components/ProductCard.jsx';

/**
 * ProductListing Page Component (PLP).
 * Features sticky filter sidebar, category matching, size filtering, and product sorting.
 */
export const ProductListing = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [sortOption, setSortOption] = useState("featured");

  const sizes = ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"];

  const handleSizeToggle = (size) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  // Filter & Sort Logic
  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    // 1. Category Filter
    const matchesCategory = selectedCategory === "All" || 
      product.category.toLowerCase().includes(selectedCategory.split("'s")[0].toLowerCase());

    // 2. Size Filter
    const matchesSizes = selectedSizes.length === 0 || 
      product.sizes.some(sizeObj => selectedSizes.includes(sizeObj.size) && sizeObj.available);

    return matchesCategory && matchesSizes;
  }).sort((a, b) => {
    // 3. Sorting
    if (sortOption === "priceLow") return a.price - b.price;
    if (sortOption === "priceHigh") return b.price - a.price;
    return 0; // Featured (original order)
  });

  return (
    <div className="container-nike py-4">
      {/* Top Bar showing count & sorting */}
      <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
        <div>
          <h4 className="fw-bold text-uppercase m-0">All Shoes ({filteredProducts.length})</h4>
        </div>
        <div className="d-flex align-items-center gap-2">
          <label className="text-secondary small fw-medium m-0 d-none d-sm-block">Sort By:</label>
          <select 
            className="form-select border-0 bg-transparent fw-semibold text-dark p-1"
            style={{ width: '160px', cursor: 'pointer', boxShadow: 'none' }}
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="featured">Featured</option>
            <option value="priceLow">Price: Low-High</option>
            <option value="priceHigh">Price: High-Low</option>
          </select>
        </div>
      </div>

      <div className="row g-4">
        {/* Left Sticky Sidebar Filter */}
        <aside className="col-12 col-md-3 d-none d-md-block">
          <div className="position-sticky" style={{ top: '80px', height: 'fit-content' }}>
            
            {/* Category Accordion */}
            <div className="mb-4">
              <h6 className="fw-bold text-uppercase mb-3">Categories</h6>
              <div className="d-flex flex-column gap-2">
                {MOCK_CATEGORIES.map((cat, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setSelectedCategory(cat)}
                    className="btn btn-link text-start p-0 text-decoration-none fw-medium text-dark small btn-nike-active"
                    style={{ 
                      color: selectedCategory === cat ? '#111111' : '#707072',
                      fontWeight: selectedCategory === cat ? 'bold' : 'normal'
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector Grid */}
            <div className="border-top pt-4">
              <h6 className="fw-bold text-uppercase mb-3">Filter By Size</h6>
              <div className="row g-2" style={{ maxWidth: '240px' }}>
                {sizes.map((sz, idx) => {
                  const isSelected = selectedSizes.includes(sz);
                  return (
                    <div key={idx} className="col-4">
                      <button 
                        onClick={() => handleSizeToggle(sz)}
                        className={`btn w-100 d-flex align-items-center justify-content-center border py-2 fw-medium btn-nike-active nike-transition ${isSelected ? 'border-dark bg-dark text-white' : 'border-light-gray bg-white text-dark'}`}
                        style={{ fontSize: '13px', borderRadius: '4px' }}
                      >
                        {sz}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </aside>

        {/* Right Product Grid */}
        <main className="col-12 col-md-9">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted">Arama kriterlerine uygun ürün bulunamadı.</p>
              <button 
                onClick={() => { setSelectedCategory("All"); setSelectedSizes([]); }}
                className="btn btn-nike-black bg-dark text-white rounded-pill px-4 py-2 mt-2"
              >
                Filtreleri Temizle
              </button>
            </div>
          ) : (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
              {filteredProducts.map((prod) => (
                <div key={prod.id} className="col">
                  <ProductCard product={prod} />
                </div>
              ))}
            </div>
          )}
        </main>

      </div>
    </div>
  );
};

export default ProductListing;
