// src/common/AppContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';

export const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContext.Provider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [supplierProducts, setSupplierProducts] = useState([]);
  const [supplierOrders, setSupplierOrders] = useState([]);

  // Monitor Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          id: firebaseUser.uid,
          email: firebaseUser.email,
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const addToCart = (item) => setCartItems((prev) => [...prev, item]);
  const updateCartItem = (itemId, newQuantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  const removeFromCart = (itemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        cartItems,
        addToCart,
        updateCartItem,
        removeFromCart,
        user,
        setUser,
        logout,
        products,
        setProducts,
        orders,
        setOrders,
        supplierProducts,
        setSupplierProducts,
        supplierOrders,
        setSupplierOrders,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export default AppProvider;