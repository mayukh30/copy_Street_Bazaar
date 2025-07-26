import React,{useState} from 'react'
import { Plus } from 'lucide-react';
import AddProduct from './AddProduct'
import ProductCategories from './ProductCategories'
import ProductFilters from './ProductFilters'
import ProductList from './ProductList'

const ProductManagementApp = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Wireless Headphones",
      price: 99.99,
      category: "Electronics",
      description: "High-quality wireless headphones with noise cancellation",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      rating: 4,
      inStock: true
    },
    {
      id: 2,
      name: "Cotton T-Shirt",
      price: 24.99,
      category: "Clothing",
      description: "Comfortable 100% cotton t-shirt",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop",
      rating: 5,
      inStock: true
    },
    {
      id: 3,
      name: "JavaScript Guide",
      price: 39.99,
      category: "Books",
      description: "Complete guide to modern JavaScript development",
      image: "",
      rating: 4,
      inStock: false
    }
  ]);

  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    minRating: '',
    inStock: ''
  });

  // Calculate category counts
  const categoryCount = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    acc.All = (acc.All || 0) + 1;
    return acc;
  }, {});

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      // Category filter
      if (selectedCategory && product.category !== selectedCategory) return false;
      
      // Search filter
      if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      
      // Price filters
      if (filters.minPrice && product.price < parseFloat(filters.minPrice)) return false;
      if (filters.maxPrice && product.price > parseFloat(filters.maxPrice)) return false;
      
      // Rating filter
      if (filters.minRating && product.rating < parseInt(filters.minRating)) return false;
      
      // Stock filter
      if (filters.inStock === 'true' && !product.inStock) return false;
      if (filters.inStock === 'false' && product.inStock) return false;
      
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'category':
          return a.category.localeCompare(b.category);
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const handleAddProduct = (product) => {
    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === product.id ? product : p));
      setEditingProduct(null);
    } else {
      setProducts(prev => [...prev, product]);
    }
    setShowAddProduct(false);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowAddProduct(true);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev.filter(p => p.id !== productId));
    }
  };

  const handleAddToCart = (product) => {
    alert(`Added ${product.name} to cart!`);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      minPrice: '',
      maxPrice: '',
      minRating: '',
      inStock: ''
    });
    setSelectedCategory('');
    setSearchTerm('');
  };

  const closeModal = () => {
    setShowAddProduct(false);
    setEditingProduct(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Product Management</h1>
          <button
            onClick={() => setShowAddProduct(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus size={20} />
            Add Product
          </button>
        </div>

        <ProductCategories
          categories={categoryCount}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />

        <ProductFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />

        <ProductList
          products={filteredProducts}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
          onAddToCart={handleAddToCart}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {showAddProduct && (
          <AddProduct
            onAddProduct={handleAddProduct}
            onClose={closeModal}
            editProduct={editingProduct}
          />
        )}
      </div>
    </div>
  );
};

export default ProductManagementApp