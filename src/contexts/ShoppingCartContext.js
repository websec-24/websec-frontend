import React, { createContext, useContext, useEffect, useState } from 'react';

const ShoppingCartContext = createContext();

export const useShoppingCart = () => useContext(ShoppingCartContext);

export const ShoppingCartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart): [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart])

  const addItemToCart = (item) => {
    const productIndex = cart.findIndex((product) => product._id === item._id);
    if (productIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[productIndex].selectedQuantity += item.selectedQuantity;
      setCart(updatedCart);
    } else {
      setCart((prevCart) => [...prevCart, item]);
    }
  };

  const removeItemFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getItemTotal = () => {
    return cart.reduce((total, product) => total + product.selectedQuantity, 0);
  }

  const getPriceTotal = () => {
    return cart.reduce((acc, item) => acc + (item.price * item.selectedQuantity), 0);
  }

  return (
    <ShoppingCartContext.Provider
      value={{ cart, addItemToCart, removeItemFromCart, clearCart, getItemTotal, getPriceTotal
       }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
