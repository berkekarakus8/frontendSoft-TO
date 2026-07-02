import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext.jsx';

// Global Components
import UtilityBar from './components/UtilityBar.jsx';
import Header from './components/Header.jsx';
import Marquee from './components/Marquee.jsx';
import CartDrawer from './components/CartDrawer.jsx';

// Pages
import Homepage from './pages/Homepage.jsx';
import ProductListing from './pages/ProductListing.jsx';
import ProductDetail from './pages/ProductDetail.jsx';

/**
 * Minimalist Nike-style Footer.
 */
const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-4 mt-5" style={{ backgroundColor: '#111111' }}>
      <div className="container-nike">
        <div className="row g-4 row-cols-1 row-cols-sm-2 row-cols-md-4">
          
          <div className="col">
            <h6 className="fw-bold text-uppercase mb-3 small" style={{ letterSpacing: '0.1em' }}>Find a Store</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li><a href="#" className="text-decoration-none text-light opacity-75 hover-opacity-100">Sign Up for Email</a></li>
              <li><a href="#" className="text-decoration-none text-light opacity-75 hover-opacity-100">Become a Member</a></li>
              <li><a href="#" className="text-decoration-none text-light opacity-75 hover-opacity-100">Send Us Feedback</a></li>
            </ul>
          </div>

          <div className="col">
            <h6 className="fw-bold text-uppercase mb-3 small" style={{ letterSpacing: '0.1em' }}>Get Help</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li><a href="#" className="text-decoration-none text-light opacity-75 hover-opacity-100">Order Status</a></li>
              <li><a href="#" className="text-decoration-none text-light opacity-75 hover-opacity-100">Shipping & Delivery</a></li>
              <li><a href="#" className="text-decoration-none text-light opacity-75 hover-opacity-100">Returns</a></li>
              <li><a href="#" className="text-decoration-none text-light opacity-75 hover-opacity-100">Payment Options</a></li>
            </ul>
          </div>

          <div className="col">
            <h6 className="fw-bold text-uppercase mb-3 small" style={{ letterSpacing: '0.1em' }}>About Stratum</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li><a href="#" className="text-decoration-none text-light opacity-75 hover-opacity-100">News</a></li>
              <li><a href="#" className="text-decoration-none text-light opacity-75 hover-opacity-100">Careers</a></li>
              <li><a href="#" className="text-decoration-none text-light opacity-75 hover-opacity-100">Investors</a></li>
              <li><a href="#" className="text-decoration-none text-light opacity-75 hover-opacity-100">Sustainability</a></li>
            </ul>
          </div>

          <div className="col">
            <h6 className="fw-bold text-uppercase mb-3 small" style={{ letterSpacing: '0.1em' }}>Join Us</h6>
            <p className="small text-muted mb-0">
              STRATUM sitesi premium spor giyim deneyimini en üst seviyeye taşır.
            </p>
          </div>

        </div>

        <div className="border-top border-secondary pt-4 mt-4 d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3">
          <span className="small text-muted">
            © {new Date().getFullYear()} Stratum, Inc. All Rights Reserved
          </span>
          <div className="d-flex gap-3 small text-muted">
            <a href="#" className="text-decoration-none text-muted hover-text-white">Guides</a>
            <a href="#" className="text-decoration-none text-muted hover-text-white">Terms of Sale</a>
            <a href="#" className="text-decoration-none text-muted hover-text-white">Terms of Use</a>
            <a href="#" className="text-decoration-none text-muted hover-text-white">Privacy Policy</a>
          </div>
        </div>
      </div>

      <style>{`
        .hover-opacity-100:hover {
          opacity: 1 !important;
        }
        .hover-text-white:hover {
          color: #ffffff !important;
        }
      `}</style>
    </footer>
  );
};

/**
 * Main App Component.
 * Wraps routes inside CartProvider and configures Nike Clone structures.
 */
function App() {
  return (
    <CartProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100 bg-white">
          {/* Utility Top Bar */}
          <UtilityBar />
          
          {/* Sticky Header */}
          <Header />
          
          {/* Left-to-Right Scrolling Marquee */}
          <Marquee />

          {/* Page Routing */}
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/shop" element={<ProductListing />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Cart offcanvas slide-out drawer */}
          <CartDrawer />

          {/* Premium Footer */}
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
