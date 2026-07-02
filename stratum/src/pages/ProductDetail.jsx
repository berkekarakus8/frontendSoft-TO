import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../productsMock.js';
import { useCart } from '../context/CartContext.jsx';
import { Heart, ArrowLeft, AlertCircle } from 'lucide-react';

/**
 * ProductDetail Component (PDP).
 * Features split detail layout, vertical static multi-image grid,
 * interactive 5-column size selection matrix with slash lines on out-of-stock sizes,
 * error shake animation on choosing disabled sizes, and Add to Bag / Favorite actions.
 */
export const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [shakingSize, setShakingSize] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [activeImage, setActiveImage] = useState('');

  const product = MOCK_PRODUCTS.find(p => p.id === id);

  useEffect(() => {
    if (product) {
      setActiveImage(product.image);
      setSelectedSize(null);
      setErrorMsg('');
    }
  }, [product]);

  if (!product) {
    return (
      <div className="container-nike py-5 text-center">
        <AlertCircle size={48} className="text-danger mb-3" />
        <h4 className="fw-bold">Product Not Found</h4>
        <p className="text-secondary small mb-4">Aradığınız ürün bulunamadı ya da silinmiş olabilir.</p>
        <Link to="/shop" className="btn btn-nike-black bg-dark text-white rounded-pill px-4 py-2">
          Geri Dön
        </Link>
      </div>
    );
  }

  const handleSizeSelect = (sizeObj) => {
    if (!sizeObj.available) {
      setShakingSize(sizeObj.size);
      setTimeout(() => setShakingSize(null), 400);
      setErrorMsg('Bu beden şu an stokta bulunmamaktadır.');
      return;
    }
    setErrorMsg('');
    setSelectedSize(sizeObj.size);
  };

  const handleAddToBag = () => {
    if (!selectedSize) {
      setErrorMsg('Lütfen devam etmek için bir beden seçiniz.');
      // Shake the whole size container to draw attention
      setShakingSize('all');
      setTimeout(() => setShakingSize(null), 400);
      return;
    }
    addToCart(product, selectedSize);
  };

  // Generate list of detailed images for the grid using main and secondary
  const productImages = [product.image, product.secondaryImage, product.image, product.secondaryImage];

  return (
    <div className="container-nike py-5">
      
      {/* Breadcrumb / Back Navigation */}
      <div className="mb-4">
        <Link to="/shop" className="text-decoration-none text-dark d-inline-flex align-items-center gap-1.5 fw-semibold small btn-nike-active">
          <ArrowLeft size={16} /> All Shoes
        </Link>
      </div>

      <div className="row g-5">
        
        {/* Left Column: Multi-Image static grid layout */}
        <div className="col-12 col-lg-7">
          <div className="row g-2">
            
            {/* Left Thumbnails (Vertical Grid for Desktop) */}
            <div className="col-2 d-none d-md-flex flex-column gap-2">
              {productImages.map((img, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setActiveImage(img)}
                  className="overflow-hidden border bg-light-gray rounded" 
                  style={{ 
                    cursor: 'pointer', 
                    aspectRatio: '1/1',
                    borderColor: activeImage === img ? '#111111' : '#E5E5E5',
                    borderWidth: activeImage === img ? '2px' : '1px'
                  }}
                >
                  <img src={img} alt="" className="w-100 h-100" style={{ objectFit: 'cover' }} />
                </div>
              ))}
            </div>

            {/* Active Canvas Image */}
            <div className="col-10 col-md-10 col-12">
              <div className="overflow-hidden bg-light-gray rounded w-100" style={{ aspectRatio: '1/1' }}>
                <img 
                  src={activeImage} 
                  alt={product.title} 
                  className="w-100 h-100 nike-transition" 
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Sticky checkout pane */}
        <div className="col-12 col-lg-5">
          <div className="position-sticky" style={{ top: '80px', height: 'fit-content' }}>
            
            {/* Meta */}
            <span className="text-danger small fw-bold text-uppercase tracking-wider d-block mb-1" style={{ letterSpacing: '0.05em' }}>
              Member Exclusive
            </span>
            <h3 className="fw-bold text-uppercase mb-1" style={{ fontSize: '2rem' }}>{product.title}</h3>
            <p className="text-secondary fw-semibold mb-3">{product.category}</p>
            <h4 className="fw-bold text-dark mb-4">
              {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(product.price)}
            </h4>

            {/* Description */}
            <p className="text-secondary small mb-4 lh-lg">
              {product.description}
            </p>

            {/* Size Selector Grid (5-columns) */}
            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="fw-bold text-uppercase m-0">Select Size</h6>
                <a href="#" className="text-secondary small fw-medium text-decoration-underline">Size Guide</a>
              </div>

              {errorMsg && (
                <div className="alert alert-danger border-0 bg-danger bg-opacity-10 text-danger rounded-3 py-2 px-3 small fw-semibold mb-3 d-flex align-items-center gap-1.5 animate-fadeIn">
                  <AlertCircle size={16} /> {errorMsg}
                </div>
              )}

              <div className={`row g-2 row-cols-5 ${shakingSize === 'all' ? 'shake-active' : ''}`}>
                {product.sizes.map((s, idx) => {
                  const isSelected = selectedSize === s.size;
                  return (
                    <div key={idx} className="col">
                      <div 
                        onClick={() => handleSizeSelect(s)}
                        className={`size-box-nike text-center d-flex align-items-center justify-content-center nike-transition ${!s.available ? 'disabled' : ''} ${isSelected ? 'selected' : ''} ${shakingSize === s.size ? 'shake-active' : ''}`}
                        style={{ fontSize: '14px' }}
                      >
                        {s.size}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Checkout CTA Buttons */}
            <div className="d-flex flex-column gap-2 pt-2">
              <button 
                onClick={handleAddToBag}
                className="btn-nike-black btn-nike-active w-100 py-3.5 fw-bold d-flex align-items-center justify-content-center"
              >
                Add to Bag
              </button>
              
              <button 
                onClick={() => setIsFavorite(prev => !prev)}
                className="btn-nike-outline btn-nike-active w-100 py-3.5 fw-bold d-flex align-items-center justify-content-center gap-2"
              >
                <Heart 
                  size={18} 
                  className={`icon-heart-nike ${isFavorite ? 'active' : ''}`}
                  style={{ fill: 'transparent' }}
                /> 
                Favorite
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Inline styles for local fade and shake animations */}
      <style>{`
        .shake-active {
          animation: shakeError 400ms ease-in-out !important;
        }
        .animate-fadeIn {
          animation: fadeIn 300ms ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default ProductDetail;
