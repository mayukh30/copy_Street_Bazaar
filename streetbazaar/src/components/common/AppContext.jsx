import React, { createContext, useContext } from 'react';

// Create the context
export const AppContext = createContext();

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContext.Provider');
  }
  return context;
};

// Default context value structure (for reference)
export const defaultContextValue = {
  currentPage: 'dashboard',
  setCurrentPage: () => {},
  cartItems: [],
  addToCart: () => {},
  updateCartItem: () => {},
  removeFromCart: () => {},
  user: null,
  setUser: () => {},
  logout: () => {},
  products: [],
  orders: [],
  supplierProducts: [],
  supplierOrders: []
};