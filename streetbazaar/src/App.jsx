import React, { useState } from 'react';
import { AppContext } from './components/common/AppContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import ConsumerDashboard from './components/dashboard/ConsumerDashboard';
import Products from './components/products/Product';
import Cart from './components/cart/Cart';
import Orders from './components/cart/Orders';
import Profile from './components/common/Profile';
import ProductManagementApp from './components/products/ProductManagementApp';

const App = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [cartItems, setCartItems] = useState([]);
  const [user] = useState({
    name: 'Bheem',
    email: 'bheemChutki@email.com',
    type: 'consumer'
  });

  const addToCart = (product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateCartItem = (id, quantity) => {
    if (quantity === 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const logout = () => {
    // Handle logout logic
    console.log('Logging out...');
    // In a real app, you would clear user session, redirect to login, etc.
  };

  const contextValue = {
    currentPage,
    setCurrentPage,
    cartItems,
    addToCart,
    updateCartItem,
    removeFromCart,
    user,
    logout
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <ConsumerDashboard />;
      case 'products':
        return <Products />;
      case 'cart':
        return <Cart />;
      case 'orders':
        return <Orders />;
      case 'profile':
        return <Profile />;
      default:
        return <ConsumerDashboard />;
    }
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          {renderPage()}
        </main>
        {/* <ProductManagementApp /> */}
        <Footer />
      </div>
    </AppContext.Provider>
  );
};

export default App;