import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppContext } from './components/common/AppContext';
import Header from './components/common/Header';
import HeaderSupplier from './components/common/HeaderSupplier';
import Footer from './components/common/Footer';
import Login from './components/auth/Login';
import ConsumerDashboard from './components/dashboard/ConsumerDashboard';
import SupplierDashboard from './components/dashboard/SupplierDashboard';
import Products from './components/products/Product';
import Cart from './components/cart/Cart';
import Orders from './components/cart/Orders';
import Profile from './components/common/Profile';
import ProductManagementApp from './components/products/ProductManagementApp';

const App = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null); // User starts as null (not logged in)

  // Mock data for suppliers
  const [products] = useState([
    { id: 1, name: 'Sample Product 1', price: 99.99, stock: 15, category: 'Electronics', supplierId: 'supplier123' },
    { id: 2, name: 'Sample Product 2', price: 149.99, stock: 8, category: 'Fashion', supplierId: 'supplier123' },
    { id: 3, name: 'Sample Product 3', price: 79.99, stock: 25, category: 'Books', supplierId: 'other_supplier' }
  ]);

  const [orders] = useState([
    { id: 'ORD001', customerId: 'customer1', customerName: 'John Doe', total: 99.99, status: 'processing', date: '2025-07-25', items: [{ productId: 1 }] },
    { id: 'ORD002', customerId: 'customer2', customerName: 'Jane Smith', total: 149.99, status: 'delivered', date: '2025-07-24', items: [{ productId: 2 }] }
  ]);

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
    setUser(null);
    setCurrentPage('dashboard');
    setCartItems([]);
    console.log('User logged out');
  };

  // Filter data for current supplier (for header notifications)
  const supplierProducts = products?.filter(product => product.supplierId === user?.id) || [];
  const supplierOrders = orders?.filter(order => 
    order.items?.some(item => supplierProducts.some(p => p.id === item.productId))
  ) || [];

  const contextValue = {
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
    orders,
    supplierProducts,
    supplierOrders
  };

  // Consumer Dashboard Component with routing
  const ConsumerApp = () => {
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
          return <Profile userType="consumer" />;
        default:
          return <ConsumerDashboard />;
      }
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>{renderPage()}</main>
        <Footer />
      </div>
    );
  };

  // Supplier Dashboard Component with routing
  const SupplierApp = () => {
    const renderPage = () => {
      switch (currentPage) {
        case 'dashboard':
          return <SupplierDashboard />;
        case 'products':
          return <ProductManagementApp />;
        case 'orders':
          return <Orders />;
        case 'analytics':
          return <SupplierDashboard />; // Analytics is handled within SupplierDashboard
        case 'profile':
          return <Profile userType="supplier" />;
        default:
          return <SupplierDashboard />;
      }
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <HeaderSupplier />
        <main>{renderPage()}</main>
        <Footer />
      </div>
    );
  };

  // Protected Route Component
  const ProtectedRoute = ({ children, requiredUserType }) => {
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    
    if (requiredUserType && user.type !== requiredUserType) {
      // Redirect to appropriate dashboard if wrong user type
      const redirectPath = user.type === 'supplier' ? '/supplier' : '/consumer';
      return <Navigate to={redirectPath} replace />;
    }
    
    return children;
  };

  return (
    <AppContext.Provider value={contextValue}>
      <Router>
        <Routes>
          {/* Login Route */}
          <Route 
            path="/login" 
            element={
              user ? (
                <Navigate to={user.type === 'supplier' ? '/supplier' : '/consumer'} replace />
              ) : (
                <Login />
              )
            } 
          />
          
          {/* Consumer Routes */}
          <Route 
            path="/consumer" 
            element={
              <ProtectedRoute requiredUserType="consumer">
                <ConsumerApp />
              </ProtectedRoute>
            } 
          />
          
          {/* Supplier Routes */}
          <Route 
            path="/supplier" 
            element={
              <ProtectedRoute requiredUserType="supplier">
                <SupplierApp />
              </ProtectedRoute>
            } 
          />
          
          {/* Default Route */}
          <Route 
            path="/" 
            element={
              user ? (
                <Navigate to={user.type === 'supplier' ? '/supplier' : '/consumer'} replace />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          
          {/* Catch all other routes */}
          <Route 
            path="*" 
            element={
              <Navigate to={user ? (user.type === 'supplier' ? '/supplier' : '/consumer') : '/login'} replace />
            } 
          />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
};

export default App;