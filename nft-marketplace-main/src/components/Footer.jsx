import React from 'react';
import { useDispatch } from 'react-redux';
import { setActivePage } from '../store/authSlice';

export default function Footer() {
  const dispatch = useDispatch();
  return (
    <footer className="footer-container">
      <div className="footer-logo-area">
        <div className="footer-logo">
          NEXUS<span className="footer-logo-dot">.NFT</span>
        </div>
        <p className="footer-subtitle">
          Dijital sanatın ve fütüristik varlıkların merkezi.
        </p>
      </div>
      
      <div className="footer-links">
        <button onClick={() => dispatch(setActivePage('about'))} className="footer-link">Hakkımızda</button>
        <button onClick={() => dispatch(setActivePage('contact'))} className="footer-link">İletişim</button>
      </div>
      
      <div className="footer-copyright">
        &copy; {new Date().getFullYear()} Nexus NFT. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}
