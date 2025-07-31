// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAppContext } from './components/common/AppContext';
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

const AppRoutes = () => {
  const { currentPage, user } = useAppContext();

  const ConsumerApp = () => {
    const renderPage = () => {
      switch (currentPage) {
        case 'dashboard': return <ConsumerDashboard />;
        case 'products': return <Products />;
        case 'cart': return <Cart />;
        case 'orders': return <Orders />;
        case 'profile': return <Profile userType="consumer" />;
        default: return <ConsumerDashboard />;
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

  const SupplierApp = () => {
    const renderPage = () => {
      switch (currentPage) {
        case 'dashboard': return <SupplierDashboard />;
        case 'products': return <ProductManagementApp />;
        case 'orders': return <Orders />;
        case 'analytics': return <SupplierDashboard />;
        case 'profile': return <Profile userType="supplier" />;
        default: return <SupplierDashboard />;
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

  const ProtectedRoute = ({ children, requiredUserType }) => {
    if (!user) return <Navigate to="/login" replace />;
    if (requiredUserType && user.type !== requiredUserType) {
      return <Navigate to={user.type === 'supplier' ? '/supplier' : '/consumer'} replace />;
    }
    return children;
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            user
              ? <Navigate to={user.type === 'supplier' ? '/supplier' : '/consumer'} replace />
              : <Login />
          }
        />

        <Route
          path="/consumer"
          element={
            <ProtectedRoute requiredUserType="consumer">
              <ConsumerApp />
            </ProtectedRoute>
          }
        />

        <Route
          path="/supplier"
          element={
            <ProtectedRoute requiredUserType="supplier">
              <SupplierApp />
            </ProtectedRoute>
          }
        />

        <Route
          path="/"
          element={
            user
              ? <Navigate to={user.type === 'supplier' ? '/supplier' : '/consumer'} replace />
              : <Navigate to="/login" replace />
          }
        />

        <Route
          path="*"
          element={
            user
              ? <Navigate to={user.type === 'supplier' ? '/supplier' : '/consumer'} replace />
              : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </Router>
  );
};

// Wrap routes with AppProvider
const App = () => (
  <AppProvider>
    <AppRoutes />
  </AppProvider>
);

export default App;
