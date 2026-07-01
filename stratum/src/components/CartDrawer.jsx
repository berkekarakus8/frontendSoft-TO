import React from 'react';
import { useCart } from '../context/CartContext.jsx';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';

/**
 * CartDrawer Component.
 * Slide-out Offcanvas panel displaying cart summary, quantity adjustments,
 * and a prominent checkout button.
 */
export const CartDrawer = () => {
  const { 
    cartItems, 
    isCartOpen, 
    closeCart, 
    updateQuantity, 
    removeFromCart, 
    cartTotal 
  } = useCart();

  return (
    <>
      {/* Dark backdrop overlay with fade transition */}
      <div 
        onClick={closeCart}
        className={`position-fixed top-0 start-0 w-100 h-100 bg-black transition-opacity`}
        style={{ 
          zIndex: 1060, 
          opacity: isCartOpen ? 0.4 : 0, 
          pointerEvents: isCartOpen ? 'auto' : 'none',
          transition: 'opacity 300ms cubic-bezier(0.25, 1, 0.5, 1)'
        }}
      />

      {/* Cart Drawer Panel sliding in from right */}
      <div 
        className="position-fixed top-0 end-0 h-100 bg-white shadow-lg d-flex flex-column"
        style={{ 
          width: '100%',
          maxWidth: '450px',
          zIndex: 1070,
          transform: isCartOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 350ms cubic-bezier(0.25, 1, 0.5, 1)',
        }}
      >
        {/* Header */}
        <div className="d-flex align-items-center justify-content-between p-4 border-bottom">
          <h5 className="fw-bold text-uppercase m-0 d-flex align-items-center gap-2">
            <ShoppingBag size={20} /> Bag
          </h5>
          <button 
            onClick={closeCart} 
            className="btn btn-link p-1 text-dark text-decoration-none btn-nike-active"
          >
            <X size={24} />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-grow-1 overflow-auto p-4 d-flex flex-column gap-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-5 my-auto">
              <ShoppingBag size={48} className="text-muted mb-3 mx-auto d-block" />
              <p className="fw-semibold mb-1">Your bag is empty.</p>
              <p className="text-muted small">Alışverişe devam etmek ve sepetinizi doldurmak için ayakkabılara göz atın.</p>
              <button 
                onClick={closeCart} 
                className="btn btn-nike-black bg-dark text-white rounded-pill px-4 py-2 mt-3"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item, idx) => (
              <div key={`${item.id}-${item.size}`} className="d-flex gap-3 border-bottom border-light pb-4">
                
                {/* Product Image */}
                <div className="bg-light-gray rounded overflow-hidden flex-shrink-0" style={{ width: '90px', height: '90px' }}>
                  <img src={item.image} alt={item.title} className="w-100 h-100" style={{ objectFit: 'cover' }} />
                </div>

                {/* Product Meta */}
                <div className="flex-grow-1 d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex justify-content-between align-items-start">
                      <h6 className="fw-bold text-dark m-0 text-truncate" style={{ maxWidth: '200px' }}>{item.title}</h6>
                      <span className="fw-bold text-dark small">
                        {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(item.price * item.quantity)}
                      </span>
                    </div>
                    <span className="text-secondary small d-block mb-1">Size: {item.size}</span>
                  </div>

                  {/* Quantity adjustments & delete */}
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center border border-light-gray rounded-pill px-2 py-1">
                      <button 
                        onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                        className="btn btn-link p-0 text-dark d-flex align-items-center btn-nike-active"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-3 fw-bold small" style={{ minWidth: '32px', textAlign: 'center' }}>
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                        className="btn btn-link p-0 text-dark d-flex align-items-center btn-nike-active"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <button 
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="btn btn-link p-1 text-muted hover-text-danger btn-nike-active"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                </div>

              </div>
            ))
          )}
        </div>

        {/* Footer Summary / Checkout CTA */}
        {cartItems.length > 0 && (
          <div className="p-4 border-top bg-light-gray" style={{ backgroundColor: '#F9F9F9' }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-secondary fw-semibold">Subtotal</span>
              <h5 className="fw-bold text-dark m-0">
                {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(cartTotal)}
              </h5>
            </div>
            <p className="text-muted small mb-4">Kargo ve vergiler ödeme adımında hesaplanacaktır.</p>
            <button className="btn-nike-black btn-nike-active w-100 py-3.5 fw-bold text-uppercase d-flex align-items-center justify-content-center">
              Checkout
            </button>
          </div>
        )}

      </div>
    </>
  );
};

export default CartDrawer;
