import React, { useState } from 'react';
import { Search, Star, Plus } from 'lucide-react';
import { useAppContext } from '../common/AppContext';

const Products = () => {
  const { addToCart } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'fruits', 'vegetables', 'dairy', 'meat', 'grains'];

  const products = [
    { id: 1, name: 'Fresh Tomatoes', price: 4.99, category: 'vegetables', image: '🍅', rating: 4.5, supplier: 'Fresh Farms' },
    { id: 2, name: 'Organic Apples', price: 6.99, category: 'fruits', image: '🍎', rating: 4.8, supplier: 'Organic Valley' },
    { id: 3, name: 'Whole Milk', price: 3.49, category: 'dairy', image: '🥛', rating: 4.3, supplier: 'Dairy Fresh' },
    { id: 4, name: 'Free-Range Chicken', price: 12.99, category: 'meat', image: '🍗', rating: 4.7, supplier: 'Farm Fresh' },
    { id: 5, name: 'Brown Rice', price: 8.99, category: 'grains', image: '🌾', rating: 4.4, supplier: 'Grain Masters' },
    { id: 6, name: 'Fresh Bananas', price: 2.99, category: 'fruits', image: '🍌', rating: 4.6, supplier: 'Tropical Fruits' },
    { id: 7, name: 'Organic Carrots', price: 3.99, category: 'vegetables', image: '🥕', rating: 4.5, supplier: 'Fresh Farms' },
    { id: 8, name: 'Greek Yogurt', price: 5.49, category: 'dairy', image: '🥛', rating: 4.6, supplier: 'Dairy Fresh' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-1">Discover fresh, quality products from trusted suppliers.</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="text-4xl mb-4 text-center">{product.image}</div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.supplier}</p>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{product.rating}</span>
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <span className="text-xl font-bold text-gray-900">${product.price}</span>
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Products Found */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;