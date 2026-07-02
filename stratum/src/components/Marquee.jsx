import React from 'react';

/**
 * Marquee Component.
 * Implements a left-to-right infinite rolling banner with pausing on hover.
 */
export const Marquee = () => {
  return (
    <div className="nike-marquee-wrapper overflow-hidden d-flex align-items-center">
      <div className="nike-marquee-content d-flex white-space-nowrap">
        <span>Free Shipping on Orders Over $150</span>
        <span>Join Us and Get 15% Off Your First Purchase</span>
        <span>Premium Footwear Built For Champions</span>
      </div>
      {/* Duplicate content to create perfect infinite illusion */}
      <div className="nike-marquee-content d-flex white-space-nowrap" aria-hidden="true">
        <span>Free Shipping on Orders Over $150</span>
        <span>Join Us and Get 15% Off Your First Purchase</span>
        <span>Premium Footwear Built For Champions</span>
      </div>
      
      {/* Embed css rules for flex and wrap layout inside marquee */}
      <style>{`
        .white-space-nowrap {
          white-space: nowrap;
        }
      `}</style>
    </div>
  );
};

export default Marquee;
