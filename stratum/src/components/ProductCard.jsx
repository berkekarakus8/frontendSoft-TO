import React, { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

/**
 * ProductCard Component.
 * Implements hover dual-image cross-fade, slide-up Quick Add Size panel,
 * disabled diagonal slash lines for out-of-stock sizes, and click shake effects.
 *
 * @param {Object} props
 * @param {Object} props.product
 */
export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);
  const [shakingSize, setShakingSize] = useState(null);

  const handleSizeClick = (e, sizeObj) => {
    e.preventDefault(); // Prevent navigating to PDP when clicking size boxes
    e.stopPropagation();

    if (!sizeObj.available) {
      // Trigger error shake on this size box
      setShakingSize(sizeObj.size);
      setTimeout(() => setShakingSize(null), 400);
      return;
    }

    addToCart(product, sizeObj.size);
  };

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(prev => !prev);
  };

  return (
    <Link 
      to={`/product/${product.id}`} 
      className="text-decoration-none text-dark product-card-nike position-relative d-block h-100"
      style={{ cursor: 'pointer' }}
    >
      {/* Image Container with Hover Swap & Slide-up sizes */}
      <div className="card-image-container position-relative overflow-hidden w-100" style={{ aspectRatio: '1/1' }}>
        
        {/* Favorite overlay button */}
        <button 
          onClick={handleFavoriteClick}
          className="btn position-absolute top-0 end-0 m-3 border-0 bg-white bg-opacity-70 rounded-circle d-flex align-items-center justify-content-center p-2"
          style={{ zIndex: 12, width: '36px', height: '36px' }}
        >
          <Heart 
            size={18} 
            className={`icon-heart-nike text-dark ${isFavorite ? 'active' : ''}`}
            style={{ fill: 'transparent' }}
          />
        </button>

        {/* Primary Image */}
        <img 
          src={product.image} 
          alt={product.title} 
          className="card-img-primary w-100 h-100 position-absolute top-0 start-0"
        />

        {/* Secondary Hover Image */}
        <img 
          src={product.secondaryImage} 
          alt={product.title} 
          className="card-img-secondary w-100 h-100 position-absolute top-0 start-0"
        />

        {/* Quick Add Size Panel sliding up from bottom */}
        <div className="quick-add-pane">
          <p className="small text-muted fw-bold mb-2 text-uppercase" style={{ fontSize: '0.65rem', letterSpacing: '0.05em' }}>
            Quick Add
          </p>
          <div className="row g-1">
            {product.sizes.map((s, idx) => (
              <div key={idx} className="col-3">
                <div 
                  onClick={(e) => handleSizeClick(e, s)}
                  className={`size-box-nike text-center d-flex align-items-center justify-content-center nike-transition ${!s.available ? 'disabled' : ''} ${shakingSize === s.size ? 'shake-active' : ''}`}
                  style={{ fontSize: '13px', height: '36px' }}
                >
                  {s.size}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Info Meta */}
      <div className="pt-3">
        <h6 className="fw-bold text-dark mb-0 text-truncate">{product.title}</h6>
        <p className="text-secondary small mb-1">{product.category}</p>
        <p className="fw-bold text-dark mb-0">
          {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(product.price)}
        </p>
      </div>

      {/* Inline style for the active shake animation classes */}
      <style>{`
        .shake-active {
          animation: shakeError 400ms ease-in-out !important;
        }
      `}</style>
    </Link>
  );
};

export default ProductCard;
