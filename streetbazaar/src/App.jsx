import React, { useState } from 'react';
import { AppContext } from './components/common/AppContext';
import Header from './components/common/Header';
import HeaderSupplier from './components/common/HeaderSupplier';
import Footer from './components/common/Footer';
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
  
  // Change user type to 'supplier' to test SupplierDashboard
  const [user] = useState({
    id: 'supplier123',
    name: 'Bheem',
    email: 'bheemChutki@email.com',
    type: 'consumer', // Change this to 'supplier' or 'consumer' to switch dashboards
    companyName: 'Bheem Supply Co.' // Additional field for suppliers
  });

  // Mock data for suppliers - you can move this to AppContext later
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
    // Handle logout logic
    console.log('Logging out...');
    // In a real app, you would clear user session, redirect to login, etc.
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
    logout,
    products,
    orders,
    supplierProducts, // Add filtered supplier products
    supplierOrders    // Add filtered supplier orders
  };

  const renderPage = () => {
    // If user is a supplier, show supplier-specific pages
    if (user.type === 'supplier') {
      switch (currentPage) {
        case 'dashboard':
          return <SupplierDashboard />;
        case 'products':
          return <ProductManagementApp />; // Supplier product management
        case 'orders':
          return <Orders />; // Supplier order management
        case 'analytics':
          return <SupplierDashboard />; // Analytics is handled within SupplierDashboard
        case 'profile':
          return <Profile userType="supplier" />;
        default:
          return <SupplierDashboard />;
      }
    }
    
    // If user is a consumer, show consumer-specific pages
    if (user.type === 'consumer') {
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
    }
    
    // Default fallback
    return <ConsumerDashboard />;
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className="min-h-screen bg-gray-50">
        {user.type === 'supplier' ? (<HeaderSupplier />): (<Header />)}
        
        <main>
          {renderPage()}
        </main>
        <Footer />
      </div>
    </AppContext.Provider>
  );
};

export default App;