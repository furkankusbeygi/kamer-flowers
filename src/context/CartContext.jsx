"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Sayfa yüklendiğinde eski sepeti tarayıcıdan (Local Storage) çek
  useEffect(() => {
    const savedCart = localStorage.getItem('kamer_cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Sepette her değişiklik olduğunda tarayıcıya kaydet
  useEffect(() => {
    localStorage.setItem('kamer_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Sepete Ekle Fonksiyonu
  const addToCart = (product) => {
    setCartItems(prev => {
      // Ürün sepette zaten var mı bak
      const existingItem = prev.find(item => item._id === product._id);
      if (existingItem) {
        // Varsa miktarını 1 artır
        return prev.map(item =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      // Yoksa yeni ürün olarak ekle (miktar 1 olarak başlar)
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Sepetten Tamamen Sil
  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item._id !== id));
  };

  // Adet Artır / Azalt
  const updateQuantity = (id, amount) => {
    setCartItems(prev => prev.map(item => {
      if (item._id === id) {
        const newQuantity = item.quantity + amount;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);