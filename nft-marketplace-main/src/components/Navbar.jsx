import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActivePage } from '../store/authSlice';
import { Wallet, LogIn, ShoppingCart, User } from 'lucide-react';

export default function Navbar() {
  const dispatch = useDispatch();
  const { activePage, currentUser, isAuthenticated } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);

  const navLinks = [
    { id: 'home', label: 'Anasayfa' },
    { id: 'explore', label: 'Keşfet' },
    { id: 'collections', label: 'Koleksiyonlar' },
  ];

  return (
    <nav className="nav-container">
      {/* LOGO */}
      <div 
        className="nav-logo"
        onClick={() => dispatch(setActivePage('home'))}
      >
        NEXUS<span className="nav-logo-dot">.NFT</span>
      </div>

      {/* MIDDLE LINKS */}
      <div className="nav-links-container">
        {navLinks.map(link => (
          <button
            key={link.id}
            onClick={() => dispatch(setActivePage(link.id))}
            className={`nav-link ${activePage === link.id ? 'nav-link-active' : ''}`}
          >
            {link.label}
          </button>
        ))}
      </div>

      {/* RIGHT SIDE: CART & AUTH/WALLET */}
      <div className="nav-actions">
        {/* Cart Icon */}
        <button 
          onClick={() => dispatch(setActivePage('cart'))}
          className="nav-cart-btn"
        >
          <ShoppingCart className="w-5 h-5" />
          {cartItems.length > 0 && (
            <span className="nav-cart-badge">
              {cartItems.length}
            </span>
          )}
        </button>

        {isAuthenticated && currentUser ? (
          <div className="nav-user-container">
            <div className="nav-user-info">
              <span className="nav-username">{currentUser.username}</span>
              <span className="nav-balance">
                {currentUser.ethBalance.toFixed(2)} ETH
              </span>
            </div>
            <button 
              onClick={() => dispatch(setActivePage('profile'))}
              className="nav-profile-btn"
            >
              <User className="w-4 h-4 text-charcoal-deep" />
            </button>
          </div>
        ) : (
          <button 
            onClick={() => dispatch(setActivePage('auth'))}
            className="btn-primary nav-login-btn"
          >
            <LogIn className="w-4 h-4" /> Giriş Yap
          </button>
        )}
      </div>
    </nav>
  );
}
