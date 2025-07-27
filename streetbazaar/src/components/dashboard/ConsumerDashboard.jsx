import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { useAppContext } from '../common/AppContext';
import DashboardStats from './DashboardStats';

const ConsumerDashboard = () => {
  const { user } = useAppContext();
  const [activeTab, setActiveTab] = useState('overview');

  const consumerStats = {
    totalOrders: 156,
    activeOrders: 8,
    completedOrders: 142,
    totalSpent: 12450,
    averageRating: 4.8,
    favoriteSuppliers: 12
  };

  const recentOrders = [
    { id: '#ORD-001', supplier: 'Fresh Foods Co.', amount: 289.50, status: 'Delivered', date: '2024-01-15' },
    { id: '#ORD-002', supplier: 'Organic Market', amount: 1156.20, status: 'In Transit', date: '2024-01-14' },
    { id: '#ORD-003', supplier: 'Local Farms', amount: 873.80, status: 'Processing', date: '2024-01-13' },
    { id: '#ORD-004', supplier: 'Green Grocers', amount: 994.30, status: 'Delivered', date: '2024-01-12' }
  ];

  const favoriteSuppliers = [
    { name: 'Fresh Foods Co.', rating: 4.9, orders: 23, category: 'Organic' },
    { name: 'Local Farms', rating: 4.7, orders: 18, category: 'Vegetables' },
    { name: 'Organic Market', rating: 4.8, orders: 15, category: 'Mixed' }
  ];

  const getStatusColor = (status) => {
    const colors = {
      'Delivered': 'bg-green-100 text-green-800',
      'In Transit': 'bg-blue-100 text-blue-800',
      'Processing': 'bg-yellow-100 text-yellow-800',
      'Cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
          <p className="text-gray-600 mt-1">Here's your order summary and account overview.</p>
        </div>

        {/* Stats */}
        <DashboardStats stats={consumerStats} />

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {['overview', 'recent-orders', 'favorites'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.replace('-', ' ')}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content based on active tab */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
            </div>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-gray-900">{order.id}</p>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{order.supplier}</p>
                    <p className="text-sm text-gray-500">{order.date}</p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="font-semibold text-gray-900">₹{order.amount}</p>
                    <button className="text-blue-600 hover:text-blue-700 text-sm">View</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Favorite Suppliers */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Favorite Suppliers</h3>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
            </div>
            <div className="space-y-4">
              {favoriteSuppliers.map((supplier, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{supplier.name}</p>
                    <p className="text-sm text-gray-600">{supplier.category}</p>
                    <div className="flex items-center mt-2">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">{supplier.rating}</span>
                      <span className="text-sm text-gray-500 ml-2">({supplier.orders} orders)</span>
                    </div>
                  </div>
                  <button className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition-colors">
                    Order
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsumerDashboard;