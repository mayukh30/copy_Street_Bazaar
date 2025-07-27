import React, { useState } from 'react';
import {
  ShoppingCart,
  Package,
  Bell,
  User,
  Menu,
  X,
  Home,
  Grid,
  Settings,
  History,
  LogOut,
  TrendingUp,
  BarChart3,
  Users,
  Eye,
  Edit,
  Plus
} from 'lucide-react';
import { useAppContext } from '../common/AppContext';

const HeaderSupplier = () => {
  const {
    user,
    logout,
    cartItems,
    supplierProducts = [],
    supplierOrders = [],
    currentPage,
    setCurrentPage
  } = useAppContext();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const lowStockProducts = supplierProducts.filter(p => (p.stock || 0) < 10);

  const tabs = [
    { id: 'dashboard', label: 'Overview', icon: TrendingUp },
    { id: 'products', label: 'My Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'profile', label: 'Profile', icon: Users }
  ];

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">FreshMart</h1>
              
        {/* Navigation Tabs */}
        <nav className="hidden md:flex space-x-8">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setCurrentPage(tab.id)}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded ${
                  currentPage === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <Icon className="h-4 w-4 mr-1" />
                {tab.label}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-600 hover:text-blue-600">
            <Bell className="h-5 w-5" />
            {lowStockProducts.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {lowStockProducts.length}
              </span>
            )}
          </button>
          
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600"
            >
              <User className="h-5 w-5" />
              <span>{user?.name}</span>
            </button>
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10">
                <button
                  onClick={() => {
                    setCurrentPage('profile');
                    setIsProfileOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-gray-600 hover:bg-gray-50"
                >
                  <User className="inline h-4 w-4 mr-2" />
                  Profile
                </button>
                <button
                  onClick={logout}
                  className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50"
                >
                  <LogOut className="inline h-4 w-4 mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-blue-600"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-2 space-y-1">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setCurrentPage(tab.id);
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded ${
                    currentPage === tab.id
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

export default HeaderSupplier;