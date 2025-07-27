import React, { useState } from 'react';
import { Search, Star, Plus } from 'lucide-react';
import { useAppContext } from '../common/AppContext';

const Products = () => {
  const { addToCart } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'fruits', 'vegetables', 'dairy', 'meat', 'grains'];

  const products = [
  {
    id: 1,
    name: 'Organic Apples',
    price: 199, // ₹
    category: 'Fruits',
    image: 'https://imgs.search.brave.com/mZtWK3M-YWHmmg85OxtZ4DliRwc6XU82NEjUa3mbiaE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9mcmVz/aGluZGlhb3JnYW5p/Y3MuY29tL2Nkbi9z/aG9wL3Byb2R1Y3Rz/L0FwcGxlcy5qcGc_/dj0xNjg2NzM5NTMw',
    rating: 4.8,
    supplier: 'Organic Valley'
  },
  {
    id: 2,
    name: 'Fresh Carrots',
    price: 99,
    category: 'Vegetables',
    image: 'https://imgs.search.brave.com/da64FDwHTwVhDwRkrRW6tzA18j5HrVJd1CIzMJG6XW4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNjE5/MjUyOTYwL3Bob3Rv/L2NhcnJvdC5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9Qy1Q/bFoyb0hXMlNEQ2th/WlhuOHJnMVVGZGVG/NWlzbXdpeTN2N3VR/UlZLRT0',
    rating: 4.5,
    supplier: 'Fresh Farms'
  },
  {
    id: 3,
    name: 'Mixed Berries',
    price: 299,
    category: 'Fruits',
    image: 'https://imgs.search.brave.com/CRzSLPe3d0gL9UFS5uq-ZHICodglszzCaXts0oLGb8g/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL1Mv/YXNzZXRzLndob2xl/Zm9vZHNtYXJrZXQu/Y29tL1BJRS9wcm9k/dWN0LzVlZjBjMjJj/MzI2OWFlOGEzMDc5/YTdhYV8wMDI1ODIx/ODAwMDAwMi1nbGFt/b3ItZnJvbnRwYWNr/YWdlZ2xhbW9yLTIw/MjAtMDUtMjh0MjMt/MDEtMzEtcGl4ZWwt/M2EtcXVhbGl0eS05/MC0xLTIxLTEtdXNl/ci01OTg0YWQ0MmE5/NjdmODgwNTI0ZGUy/YzQtbHBsZS02NjQ0/MzkuX0ZNd2VicF9f/U1I2MDAsNjAwXy5q/cGc',
    rating: 4.7,
    supplier: 'Berry Bliss'
  },
  {
    id: 4,
    name: 'Green Broccoli',
    price: 149,
    category: 'Vegetables',
    image: 'https://imgs.search.brave.com/HB2hVnz99MGhMWwfItA8ZeiC2J0wuH-Jz5wzAEVSiZE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/Y3JlYXRlLnZpc3Rh/LmNvbS9hcGkvbWVk/aWEvc21hbGwvMjEy/NDQ2MDg4L3N0b2Nr/LXBob3RvLWZyZXNo/LWdyZWVuLWJyb2Nj/b2xpLWNsb3NldXA',
    rating: 4.6,
    supplier: 'Fresh Farms'
  },
  {
    id: 5,
    name: 'Organic Bananas',
    price: 119,
    category: 'Fruits',
    image: 'https://imgs.search.brave.com/Xu13omF0e3d4Fath03ffNPvzH_4lfoLubVxRAXSEpEY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bWVsaXNzYXMuY29t/L2Nkbi9zaG9wL3By/b2R1Y3RzL2ltYWdl/LW9mLW9yZ2FuaWMt/YmFuYW5hcy1vcmdh/bmljcy0xNDc2Mzc1/NjQyMTE2NF82MDB4/NjAwLmpwZz92PTE2/MTY5NTgwNjQ',
    rating: 4.4,
    supplier: 'Tropical Fruits'
  },
  {
    id: 6,
    name: 'Cherry Tomatoes',
    price: 179,
    category: 'Vegetables',
    image: 'https://imgs.search.brave.com/xM_Z-qRGEvExgcVri2eOq0lTVybVELsb-hoQB5KDVXE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvOTE2/MTQ5NTY0L3Bob3Rv/L2ZyZXNoLW9yZ2Fu/aWMtY2hlcnJ5LXRv/bWF0b2VzLXNob3Qt/b24tcnVzdGljLXdv/b2Rlbi10YWJsZS5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/QjFpWGowNVhySThN/WXNNSThWMmZBbjYw/U1JLZmhlaGRwY0k5/TzBnMDItcz0',
    rating: 4.5,
    supplier: 'Organic Valley'
  },
  {
    id: 7,
    name: 'Green Peppers',
    price: 129,
    category: 'Vegetables',
    image: 'https://imgs.search.brave.com/jVKItIjtYtaEWBWnK1agOm2z_tWvJvuZSrBU5cTT6Lo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTY1/MzUzOTY3Mi9waG90/by9jbG9zZS11cC1n/cmVlbi1iZWxsLXBl/cHBlcnMuanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPTV6akF0/RnlIV18tREdBX19Y/bF9uVk9SUl9ocEw4/bjJyTTQzZ1RieGJF/bms9',
    rating: 4.3,
    supplier: 'Fresh Farms'
  },
  {
    id: 8,
    name: 'Red Grapes',
    price: 249,
    category: 'Fruits',
    image: 'https://imgs.search.brave.com/0YlNYwKalLlfYrawvD6dStSwp-ke-uRfvFV3Pye9n0Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvOTk4/OTcyMzc0L3Bob3Rv/L2dyYXBlcy1zZWVk/bGVzcy1yZWQtdGV4/dHVyZWQtYmFja2dy/b3VuZC5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9VVM4cjJk/R3lITk42QUdzSUR2/TU5NRXhBOG5Vc0RY/YXR5Y0doY09pUnVp/MD0',
    rating: 4.6,
    supplier: 'Berry Bliss'
  }
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
                <div className="w-full h-40 mb-4 flex justify-center items-center">
                  <img src={product.image} alt={product.name} className="w-full object-cover h-full rounded" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.supplier}</p>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{product.rating}</span>
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
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