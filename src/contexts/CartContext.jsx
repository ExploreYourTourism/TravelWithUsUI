/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('travelCart')) || []; }
    catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('travelCart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (place) => {
    setCart(prev => {
      const existing = prev.find(i => i.name === place.name);
      if (existing) return prev.map(i => i.name === place.name ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...place, qty: 1 }];
    });
  };

  const removeFromCart = (name) => setCart(prev => prev.filter(i => i.name !== name));

  const updateQty = (name, delta) => {
    setCart(prev =>
      prev.map(i => i.name === name ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
    );
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
