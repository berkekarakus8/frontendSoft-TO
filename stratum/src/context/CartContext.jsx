import React, { createContext, useState, useContext, useEffect } from 'react';

/**
 * @typedef {Object} CartItem
 * @property {number|string} id
 * @property {string} title
 * @property {number} price
 * @property {string} image
 * @property {string} size
 * @property {number} quantity
 */

/**
 * @typedef {Object} CartContextType
 * @property {CartItem[]} cartItems
 * @property {boolean} isCartOpen
 * @property {function(Object, string): void} addToCart
 * @property {function(number|string, string): void} removeFromCart
 * @property {function(number|string, string, number): void} updateQuantity
 * @property {function(): void} toggleCart
 * @property {function(): void} openCart
 * @property {function(): void} closeCart
 * @property {number} cartCount
 * @property {number} cartTotal
 */

const CartContext = createContext(null);

/**
 * CartProvider component to manage cart items and drawer states globally.
 */
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('stratum_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('stratum_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const toggleCart = () => setIsCartOpen(prev => !prev);
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  /**
   * Adds an item to the cart or increments its quantity if it already exists with the same size.
   * @param {Object} product
   * @param {string} size
   */
  const addToCart = (product, size) => {
    setCartItems(prevItems => {
      const existingIdx = prevItems.findIndex(
        item => item.id === product.id && item.size === size
      );

      if (existingIdx > -1) {
        const newItems = [...prevItems];
        newItems[existingIdx].quantity += 1;
        return newItems;
      }

      return [...prevItems, {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        size: size,
        quantity: 1
      }];
    });
    // Open cart drawer automatically when adding items
    openCart();
  };

  /**
   * Removes an item completely from the cart.
   * @param {number|string} productId
   * @param {string} size
   */
  const removeFromCart = (productId, size) => {
    setCartItems(prevItems => prevItems.filter(
      item => !(item.id === productId && item.size === size)
    ));
  };

  /**
   * Updates the quantity of a specific cart item.
   * @param {number|string} productId
   * @param {string} size
   * @param {number} quantity
   */
  const updateQuantity = (productId, size, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    setCartItems(prevItems => prevItems.map(
      item => (item.id === productId && item.size === size)
        ? { ...item, quantity }
        : item
    ));
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      isCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      toggleCart,
      openCart,
      closeCart,
      cartCount,
      cartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

/**
 * Custom hook to use the global cart state context.
 * @returns {CartContextType}
 */
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
