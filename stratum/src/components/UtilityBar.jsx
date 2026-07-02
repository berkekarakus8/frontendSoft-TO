import React from 'react';
import { Footprints } from 'lucide-react';

/**
 * UtilityBar component representing the thin top bar of the Nike site.
 */
export const UtilityBar = () => {
  return (
    <div className="bg-light-gray d-flex align-items-center justify-content-between px-4 px-lg-5" style={{ height: '36px', fontSize: '12px', backgroundColor: '#F5F5F5' }}>
      {/* Left side: sub-brand icon */}
      <div className="d-flex align-items-center text-dark">
        <Footprints size={16} className="me-2" style={{ transform: 'rotate(-30deg)' }} />
        <span className="fw-semibold text-uppercase" style={{ letterSpacing: '0.1em' }}>Stratum Lab</span>
      </div>

      {/* Right side: quick utility links */}
      <div className="d-flex align-items-center gap-3">
        <a href="#" className="text-decoration-none text-dark fw-medium utility-link">Find a Store</a>
        <span className="text-muted">|</span>
        <a href="#" className="text-decoration-none text-dark fw-medium utility-link">Help</a>
        <span className="text-muted">|</span>
        <a href="#" className="text-decoration-none text-dark fw-medium utility-link">Join Us</a>
        <span className="text-muted">|</span>
        <a href="#" className="text-decoration-none text-dark fw-medium utility-link">Sign In</a>
      </div>

      {/* Embedded inline hover opacity modifier for utility links */}
      <style>{`
        .utility-link {
          transition: opacity 150ms ease;
        }
        .utility-link:hover {
          opacity: 0.7;
        }
      `}</style>
    </div>
  );
};

export default UtilityBar;
