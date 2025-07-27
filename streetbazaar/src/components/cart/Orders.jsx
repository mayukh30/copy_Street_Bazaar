import React, { useState } from 'react';

const Orders = () => {
  const [activeTab, setActiveTab] = useState('all');

  const orders = [
    { id: '#ORD-001', date: '2024-01-15', items: 4, total: 89.50, status: 'Delivered', supplier: 'Fresh Foods Co.' },
    { id: '#ORD-002', date: '2024-01-14', items: 2, total: 156.20, status: 'In Transit', supplier: 'Organic Market' },
    { id: '#ORD-003', date: '2024-01-13', items: 6, total: 73.80, status: 'Processing', supplier: 'Local Farms' },
    { id: '#ORD-004', date: '2024-01-12', items: 3, total: 94.30, status: 'Delivered', supplier: 'Green Grocers' },
    { id: '#ORD-005', date: '2024-01-11', items: 5, total: 127.60, status: 'Cancelled', supplier: 'Farm Fresh' },
    { id: '#ORD-006', date: '2024-01-10', items: 2, total: 45.30, status: 'Processing', supplier: 'Fresh Foods Co.' },
    { id: '#ORD-007', date: '2024-01-09', items: 8, total: 203.70, status: 'Delivered', supplier: 'Organic Market' }
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

  const filteredOrders = activeTab === 'all' ? orders : orders.filter(order => 
    order.status.toLowerCase().replace(' ', '-') === activeTab
  );

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Order History</h1>

        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {['all', 'processing', 'in-transit', 'delivered', 'cancelled'].map((tab) => (
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

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-2">
                    <h3 className="font-semibold text-gray-900">{order.id}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Supplier: {order.supplier}</p>
                    <p>Date: {order.date}</p>
                    <p>Items: {order.items}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">${order.total}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors text-sm">
                      View Details
                    </button>
                    {order.status === 'Delivered' && (
                      <button className="bg-green-50 text-green-600 px-4 py-2 rounded-lg hover:bg-green-100 transition-colors text-sm">
                        Reorder
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Orders Found */}
        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Package className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-600">No orders match the selected status.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;