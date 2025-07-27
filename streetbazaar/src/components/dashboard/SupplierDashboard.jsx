import React, { useState } from 'react';

const SupplierDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const supplierStats = {
    totalRevenue: 45320,
    totalOrders: 234,
    totalProducts: 156,
    totalCustomers: 89,
    pendingOrders: 12,
    completedOrders: 198,
    averageRating: 4.6,
    growthRate: 23
  };

  const recentOrders = [
    { id: '#ORD-101', customer: 'John Smith', product: 'Organic Tomatoes', amount: 45.60, status: 'Processing', date: '2024-01-15' },
    { id: '#ORD-102', customer: 'Sarah Johnson', product: 'Fresh Lettuce', amount: 28.90, status: 'Shipped', date: '2024-01-14' },
    { id: '#ORD-103', customer: 'Mike Davis', product: 'Bell Peppers', amount: 67.30, status: 'Delivered', date: '2024-01-13' },
    { id: '#ORD-104', customer: 'Lisa Brown', product: 'Carrots Bundle', amount: 34.20, status: 'Processing', date: '2024-01-12' }
  ];

  const topProducts = [
    { name: 'Organic Tomatoes', sales: 89, revenue: 2456.70, stock: 45 },
    { name: 'Fresh Lettuce', sales: 67, revenue: 1834.50, stock: 23 },
    { name: 'Bell Peppers', sales: 54, revenue: 1623.20, stock: 67 },
    { name: 'Carrots Bundle', sales: 43, revenue: 1234.60, stock: 89 }
  ];

  const getStatusColor = (status) => {
    const colors = {
      'Delivered': 'bg-green-100 text-green-800',
      'Shipped': 'bg-blue-100 text-blue-800',
      'Processing': 'bg-yellow-100 text-yellow-800',
      'Cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Supplier Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage your products and orders efficiently.</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <div className="relative">
              <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              Add Product
            </button>
          </div>
        </div>

        {/* Stats */}
        <DashboardStats stats={supplierStats} type="supplier" />

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {['overview', 'orders', 'products', 'customers', 'analytics'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                    activeTab === tab
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Orders */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
                <button className="text-green-600 hover:text-green-700 text-sm font-medium">View All</button>
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
                      <p className="text-sm text-gray-600 mt-1">{order.customer}</p>
                      <p className="text-sm text-gray-500">{order.product}</p>
                      <p className="text-xs text-gray-400">{order.date}</p>
                    </div>
                    <div className="text-right ml-4">
                      <p className="font-semibold text-gray-900">${order.amount}</p>
                      <button className="text-green-600 hover:text-green-700 text-sm">Manage</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Top Products</h3>
                <button className="text-green-600 hover:text-green-700 text-sm font-medium">View All</button>
              </div>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <div className="flex items-center mt-2 space-x-4">
                        <span className="text-sm text-gray-600">{product.sales} sales</span>
                        <span className="text-sm text-gray-600">Stock: {product.stock}</span>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <p className="font-semibold text-gray-900">${product.revenue}</p>
                      <button className="text-green-600 hover:text-green-700 text-sm">Edit</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
              <Package className="h-8 w-8 text-green-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">Add Product</span>
            </button>
            <button className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <ShoppingCart className="h-8 w-8 text-blue-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">Manage Orders</span>
            </button>
            <button className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
              <BarChart3 className="h-8 w-8 text-purple-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">View Analytics</span>
            </button>
            <button className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
              <Users className="h-8 w-8 text-orange-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">Customer Support</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierDashboard;
