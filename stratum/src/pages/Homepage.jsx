import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../productsMock.js';
import ProductCard from '../components/ProductCard.jsx';
import { ArrowLeft, ArrowRight } from 'lucide-react';

/**
 * Homepage component.
 * Displays Hero banner, horizontal product carousel slider with ref-scrolling buttons,
 * and 3-column Category pillars.
 */
export const Homepage = () => {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <div>
      {/* 1. Hero Component */}
      <section className="position-relative w-100 mb-5 overflow-hidden" style={{ height: '70vh', minHeight: '450px', backgroundColor: '#F5F5F5' }}>
        <img 
          src="https://images.unsplash.com/photo-1502904585520-fa451489be1f?w=1600&auto=format&fit=crop" 
          alt="Stratum Running" 
          className="position-absolute top-0 start-0 w-100 h-100" 
          style={{ objectFit: 'cover', objectPosition: 'center 35%' }}
        />
        {/* Dark overlay for text readability */}
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.5))' }}></div>
        
        {/* Text content overlay */}
        <div className="position-absolute bottom-0 start-0 w-100 p-4 p-md-5 text-white">
          <div className="container-nike px-0">
            <span className="fw-bold text-uppercase tracking-wider small d-block mb-2" style={{ letterSpacing: '0.15em' }}>
              Stratum Athletic Gear
            </span>
            <h1 className="fw-extrabold text-uppercase text-white mb-3" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900 }}>
              Win The Day
            </h1>
            <p className="lead mb-4 text-light max-w-md d-none d-sm-block" style={{ fontSize: '18px', maxWidth: '500px' }}>
              Gelişmiş mühendislik ve kusursuz yastıklama ile sınırları zorlamaya hazır ol. Yeni sezon ayakkabılar şimdi vitrinde.
            </p>
            <Link to="/shop" className="btn btn-nike-black btn-nike-active bg-white text-dark px-4 py-3 fw-bold d-inline-block text-decoration-none">
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Trending Slider (Product Carousel) */}
      <section className="container-nike mb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold text-uppercase m-0" style={{ letterSpacing: '-0.03em' }}>Trending Now</h4>
          <div className="d-flex gap-2">
            <button 
              onClick={scrollLeft}
              className="btn btn-light rounded-circle border-0 d-flex align-items-center justify-content-center p-2.5 btn-nike-active"
              style={{ width: '44px', height: '44px', backgroundColor: '#E5E5E5' }}
            >
              <ArrowLeft size={20} className="text-dark" />
            </button>
            <button 
              onClick={scrollRight}
              className="btn btn-light rounded-circle border-0 d-flex align-items-center justify-content-center p-2.5 btn-nike-active"
              style={{ width: '44px', height: '44px', backgroundColor: '#E5E5E5' }}
            >
              <ArrowRight size={20} className="text-dark" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div 
          ref={sliderRef}
          className="d-flex overflow-auto gap-4 pb-3 scrollbar-hidden"
          style={{ 
            scrollSnapType: 'x mandatory',
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {MOCK_PRODUCTS.map((prod) => (
            <div 
              key={prod.id} 
              className="flex-shrink-0" 
              style={{ 
                width: '320px', 
                scrollSnapAlign: 'start'
              }}
            >
              <ProductCard product={prod} />
            </div>
          ))}
        </div>
      </section>

      {/* 3. Category Pillars */}
      <section className="container-nike mb-5">
        <h4 className="fw-bold text-uppercase mb-4" style={{ letterSpacing: '-0.03em' }}>Shop By Category</h4>
        <div className="row g-3 row-cols-1 row-cols-md-3">
          
          {/* Men's */}
          <div className="col">
            <div className="position-relative overflow-hidden w-100" style={{ aspectRatio: '4/5' }}>
              <img 
                src="https://images.unsplash.com/photo-1483721310020-03333e577078?w=600&auto=format&fit=crop" 
                alt="Men's" 
                className="w-100 h-100" 
                style={{ objectFit: 'cover' }}
              />
              <div className="position-absolute bottom-0 start-0 m-4">
                <Link to="/shop?cat=men" className="btn btn-nike-black bg-white text-dark fw-bold px-4 py-2 text-decoration-none">
                  Men's
                </Link>
              </div>
            </div>
          </div>

          {/* Women's */}
          <div className="col">
            <div className="position-relative overflow-hidden w-100" style={{ aspectRatio: '4/5' }}>
              <img 
                src="https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=600&auto=format&fit=crop" 
                alt="Women's" 
                className="w-100 h-100" 
                style={{ objectFit: 'cover' }}
              />
              <div className="position-absolute bottom-0 start-0 m-4">
                <Link to="/shop?cat=women" className="btn btn-nike-black bg-white text-dark fw-bold px-4 py-2 text-decoration-none">
                  Women's
                </Link>
              </div>
            </div>
          </div>

          {/* Accessories */}
          <div className="col">
            <div className="position-relative overflow-hidden w-100" style={{ aspectRatio: '4/5' }}>
              <img 
                src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop" 
                alt="Accessories" 
                className="w-100 h-100" 
                style={{ objectFit: 'cover' }}
              />
              <div className="position-absolute bottom-0 start-0 m-4">
                <Link to="/shop?cat=acc" className="btn btn-nike-black bg-white text-dark fw-bold px-4 py-2 text-decoration-none">
                  Accessories
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Styles to hide standard scrollbar in carousel slider */}
      <style>{`
        .scrollbar-hidden::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hidden {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </div>
  );
};

export default Homepage;
