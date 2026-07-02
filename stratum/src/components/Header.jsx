import React, { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { Search, Heart, ShoppingBag } from 'lucide-react';

/**
 * Header Component.
 * Implements sticky frosted glass effect, hover dimming for navigation items,
 * interactive expanding search box, heart favorite toggle, and shopping bag bounce.
 */
export const Header = () => {
  const { cartCount, openCart } = useCart();
  const [isHeartActive, setIsHeartActive] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const categories = ["New & Featured", "Men", "Women", "Kids", "Sale"];

  return (
    <>
      <header className="sticky-top bg-white bg-opacity-80 border-bottom border-light" 
              style={{ 
                height: '60px', 
                zIndex: 1050, 
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)'
              }}>
        <div className="container-nike h-100 d-flex align-items-center justify-content-between">
          
          {/* Left Side: Logo */}
          <div className="d-flex align-items-center">
            <a href="/" className="text-decoration-none text-black fw-bolder fs-4 text-uppercase tracking-tight" style={{ letterSpacing: '-0.08em' }}>
              STRATUM
            </a>
          </div>

          {/* Center Side: Navigation Categories */}
          <nav className="d-none d-md-flex align-items-center navbar-nav-nike h-100">
            {categories.map((cat, idx) => (
              <div key={idx} className="position-relative nike-nav-group h-100 d-flex align-items-center">
                <a href="#" className="nav-link-nike text-decoration-none text-dark fw-bold px-3 py-2 d-inline-block nike-transition" style={{ fontSize: '15px' }}>
                  {cat}
                </a>
              </div>
            ))}
          </nav>

          {/* Right Side: Search, Favorites, Cart */}
          <div className="d-flex align-items-center gap-3">
            
            {/* Expanding Search Engine */}
            <div className="position-relative d-none d-sm-block">
              <span className="position-absolute top-50 translate-middle-y ms-3 text-secondary" style={{ zIndex: 5, pointerEvents: 'none' }}>
                <Search size={18} />
              </span>
              <input 
                type="text" 
                className="search-input-nike nike-transition text-dark" 
                placeholder="Search" 
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </div>

            {/* Favorites (Heart) Icon with pop/rotation & react pulse */}
            <button 
              className="btn p-1 border-0 bg-transparent"
              onClick={() => setIsHeartActive(!isHeartActive)}
            >
              <Heart 
                size={22} 
                className={`icon-heart-nike nike-transition text-dark ${isHeartActive ? 'active' : ''}`}
                style={{ fill: 'transparent' }}
              />
            </button>

            {/* Shopping Bag Icon with micro-bounce & scale-in count badge */}
            <button 
              className="btn p-1 border-0 bg-transparent position-relative"
              onClick={openCart}
            >
              <ShoppingBag size={22} className="icon-bag-nike nike-transition text-dark" />
              {cartCount > 0 && (
                <span className="badge-bag-nike position-absolute top-0 start-100 translate-middle bg-danger border border-white rounded-circle d-flex align-items-center justify-content-center text-white font-weight-bold" 
                      style={{ 
                        width: '18px', 
                        height: '18px', 
                        fontSize: '10px',
                        padding: '0'
                      }}>
                  {cartCount}
                </span>
              )}
            </button>

          </div>

        </div>
      </header>

      {/* Dim overlay behind page when search input is focused */}
      <div className={`nike-overlay ${isSearchFocused ? 'show' : ''}`}></div>
    </>
  );
};

export default Header;
