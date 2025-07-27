import React, { useContext } from 'react';
import { AppContext } from '../common/AppContext';
import DashboardStatsSupplier from '../dashboard/DashboardStatsSupplier';
import Profile from '../common/Profile';
import { Package, DollarSign, TrendingUp, Users, Plus, Edit, Eye, BarChart3, ShoppingCart, AlertCircle } from 'lucide-react';

const SupplierDashboard = () => {
  const { user, products, orders, currentPage, setCurrentPage } = useContext(AppContext);

  // Filter data for current supplier
  const supplierProducts = products?.filter(product => product.supplierId === user?.id) || [];
  const supplierOrders = orders?.filter(order => 
    order.items?.some(item => supplierProducts.some(p => p.id === item.productId))
  ) || [];

  // Supplier-specific stats
  const supplierStats = [
    {
      title: 'Total Products',
      value: supplierProducts.length,
      icon: Package,
      color: 'blue',
      trend: `+${supplierProducts.filter(p => p.isNew).length || 0} new`
    },
    {
      title: 'Total Revenue',
      value: `$${supplierOrders.reduce((sum, order) => sum + (order.total || 0), 0).toFixed(2)}`,
      icon: DollarSign,
      color: 'green',
      trend: '+12% this month'
    },
    {
      title: 'Active Orders',
      value: supplierOrders.filter(order => order.status === 'pending' || order.status === 'processing').length,
      icon: ShoppingCart,
      color: 'orange',
      trend: `${supplierOrders.filter(order => order.status === 'delivered').length} completed`
    },
    {
      title: 'Customers Served',
      value: new Set(supplierOrders.map(order => order.customerId)).size,
      icon: Users,
      color: 'purple',
      trend: '+5 new customers'
    }
  ];

  const lowStockProducts = supplierProducts.filter(product => (product.stock || 0) < 10);
  const recentOrders = supplierOrders.slice(0, 5);

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome back, {user?.companyName || user?.name || 'Supplier'}!</h2>
        <p className="text-green-100">Manage your products and track your business performance</p>
      </div>

      {/* Stats */}
      <DashboardStatsSupplier stats={supplierStats} />

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => setCurrentPage('products')}
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Plus className="h-6 w-6 text-blue-600" />
            <span className="font-medium text-gray-900">Add New Product</span>
          </button>
          <button 
            onClick={() => setCurrentPage('orders')}
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ShoppingCart className="h-6 w-6 text-green-600" />
            <span className="font-medium text-gray-900">View Orders</span>
          </button>
          <button 
            onClick={() => setCurrentPage('analytics')}
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <BarChart3 className="h-6 w-6 text-purple-600" />
            <span className="font-medium text-gray-900">View Analytics</span>
          </button>
        </div>
      </div>

      {/* Low Stock Alert */}
      {lowStockProducts.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <AlertCircle className="h-6 w-6 text-yellow-600 mr-2" />
            <h3 className="text-lg font-medium text-yellow-800">Low Stock Alert</h3>
          </div>
          <div className="space-y-2">
            {lowStockProducts.slice(0, 3).map(product => (
              <div key={product.id} className="flex justify-between items-center">
                <span className="text-yellow-800">{product.name}</span>
                <span className="text-yellow-600 font-medium">{product.stock || 0} left</span>
              </div>
            ))}
            {lowStockProducts.length > 3 && (
              <p className="text-yellow-600 text-sm">
                +{lowStockProducts.length - 3} more items need restocking
              </p>
            )}
          </div>
        </div>
      )}

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Recent Orders</h3>
          <button 
            onClick={() => setCurrentPage('orders')}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            View All
          </button>
        </div>
        <div className="divide-y divide-gray-200">
          {recentOrders.length > 0 ? (
            recentOrders.map((order) => (
              <div key={order.id} className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <ShoppingCart className="h-8 w-8 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Order #{order.id}</p>
                    <p className="text-sm text-gray-500">Customer: {order.customerName || `ID: ${order.customerId}`}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">{order.date || 'Recent'}</p>
                    <p className="text-sm font-medium text-gray-900">${order.total || '0.00'}</p>
                  </div>
                </div>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  order.status === 'delivered' 
                    ? 'bg-green-100 text-green-800'
                    : order.status === 'shipped'
                    ? 'bg-blue-100 text-blue-800'
                    : order.status === 'processing'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {order.status || 'Pending'}
                </span>
              </div>
            ))
          ) : (
            <div className="px-6 py-8 text-center text-gray-500">
              <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No orders yet. Orders for your products will appear here!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">My Products</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Product</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        {supplierProducts.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {supplierProducts.map((product) => (
              <div key={product.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                      <Package className="h-6 w-6 text-gray-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{product.name}</h4>
                      <p className="text-sm text-gray-500">Category: {product.category || 'Uncategorized'}</p>
                      <p className="text-sm text-gray-500">Stock: {product.stock || 0} units</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">${product.price}</p>
                      <p className={`text-sm ${(product.stock || 0) < 10 ? 'text-red-600' : 'text-green-600'}`}>
                        {(product.stock || 0) < 10 ? 'Low Stock' : 'In Stock'}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-600 hover:text-blue-600">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-green-600">
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-6 py-12 text-center text-gray-500">
            <Package className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products yet</h3>
            <p className="mb-4">Start by adding your first product to the catalog.</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Add Your First Product
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">All Orders</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {supplierOrders.length > 0 ? (
          supplierOrders.map((order) => (
            <div key={order.id} className="px-6 py-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Order #{order.id}</h4>
                  <p className="text-sm text-gray-500">Customer: {order.customerName || `ID: ${order.customerId}`}</p>
                  <p className="text-sm text-gray-500">Date: {order.date || 'Recent'}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    order.status === 'delivered' 
                      ? 'bg-green-100 text-green-800'
                      : order.status === 'shipped'
                      ? 'bg-blue-100 text-blue-800'
                      : order.status === 'processing'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {order.status || 'Pending'}
                  </span>
                  <p className="text-lg font-semibold text-gray-900">${order.total || '0.00'}</p>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <p className="text-sm text-gray-600">{order.items?.length || 0} item(s)</p>
                <div className="mt-2 flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View Details
                  </button>
                  {order.status === 'pending' && (
                    <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                      Mark as Processing
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="px-6 py-12 text-center text-gray-500">
            <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
            <p>Orders for your products will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Sales Overview</h4>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">This Month</span>
              <span className="font-medium">${supplierOrders.reduce((sum, order) => sum + (order.total || 0), 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Orders</span>
              <span className="font-medium">{supplierOrders.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Average Order</span>
              <span className="font-medium">
                ${supplierOrders.length > 0 ? (supplierOrders.reduce((sum, order) => sum + (order.total || 0), 0) / supplierOrders.length).toFixed(2) : '0.00'}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Product Performance</h4>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Products</span>
              <span className="font-medium">{supplierProducts.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Low Stock Items</span>
              <span className="font-medium text-red-600">{lowStockProducts.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Categories</span>
              <span className="font-medium">
                {new Set(supplierProducts.map(p => p.category)).size}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render based on currentPage from context
  const renderCurrentSection = () => {
    switch (currentPage) {
      case 'dashboard':
        return renderOverview();
      case 'products':
        return renderProducts();
      case 'orders':
        return renderOrders();
      case 'analytics':
        return renderAnalytics();
      case 'profile':
        return <Profile userType="supplier" />;
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderCurrentSection()}
      </div>
    </div>
  );
};

export default SupplierDashboard;