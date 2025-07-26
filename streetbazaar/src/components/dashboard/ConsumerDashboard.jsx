import React from 'react'
import { useState, useContext,  } from 'react';

const ConsumerDashboard = () => {
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    location: '',
    sortBy: 'name'
  });
  const [showCart, setShowCart] = useState(false);
  const { getCartItemsCount } = useContext(CartContext);
  
  const filteredProducts = mockProducts.filter(product => {
    return (
      (!filters.search || product.name.toLowerCase().includes(filters.search.toLowerCase())) &&
      (!filters.category || product.category === filters.category) &&
      (!filters.location || product.location === filters.location)
    );
  }).sort((a, b) => {
    switch (filters.sortBy) {
      case 'price_low':
        return a.price - b.price;
      case 'price_high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return a.name.localeCompare(b.name);
    }
  });
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Browse Products</h1>
        <button
          onClick={() => setShowCart(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2"
        >
          <ShoppingCart className="h-5 w-5" />
          <span>Cart ({getCartItemsCount()})</span>
        </button>
      </div>
      
      <ProductFilters filters={filters} onFilterChange={setFilters} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">No products found matching your filters.</p>
        </div>
      )}
      
      <Cart isOpen={showCart} onClose={() => setShowCart(false)} />
    </div>
  );
};

export default ConsumerDashboard