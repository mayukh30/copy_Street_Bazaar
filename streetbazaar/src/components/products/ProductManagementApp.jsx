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
    name: "Fresh Apples",
    price: 149.99,
    category: "Fruits",
    description: "Crisp and juicy red apples, freshly harvested.",
    image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=300&h=300&fit=crop",
    rating: 5,
    inStock: true
  },
  {
    id: 2,
    name: "Organic Bananas",
    price: 79.99,
    category: "Fruits",
    description: "Sweet organic bananas, rich in potassium and other nutrients.",
    image: "https://imgs.search.brave.com/TeNihp5c9yP-RMlBZUup_ATiAwCPtqnKLycLQWBv97I/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMjYv/Njc4Lzc0My9zbWFs/bC9haS1nZW5lcmF0/ZWQtYWktZ2VuZXJh/dGl2ZS15ZWxsb3ct/ZnJlc2gtZWNvLW9y/Z2FuaWMtYmFuYW5h/LXZlZ2V0YXJpYW4t/bWFya2V0LXByb21v/dGlvbi1kZWNvcmF0/aW9uLWdyYXBoaWMt/YXJ0LXBob3RvLmpw/Zw",
    rating: 4,
    inStock: true
  },
  {
    id: 3,
    name: "Carrots",
    price: 49.99,
    category: "Vegetables",
    description: "Crunchy orange carrots full of beta-carotene.",
    image: "https://images.unsplash.com/photo-1582515073490-39981397c445?w=300&h=300&fit=crop",
    rating: 4,
    inStock: true
  },
  {
    id: 4,
    name: "Broccoli",
    price: 59.99,
    category: "Vegetables",
    description: "Fresh green broccoli packed with nutrients.",
    image: "https://imgs.search.brave.com/HB2hVnz99MGhMWwfItA8ZeiC2J0wuH-Jz5wzAEVSiZE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/Y3JlYXRlLnZpc3Rh/LmNvbS9hcGkvbWVk/aWEvc21hbGwvMjEy/NDQ2MDg4L3N0b2Nr/LXBob3RvLWZyZXNo/LWdyZWVuLWJyb2Nj/b2xpLWNsb3NldXA",
    rating: 5,
    inStock: false
  },
  {
    id: 5,
    name: "Tomatoes",
    price: 39.99,
    category: "Vegetables",
    description: "Juicy red tomatoes, ideal for salads and sauces.",
    image: "https://imgs.search.brave.com/Kd2jeo7DfKY2powk-Gc-B1nWQXXR0yxXujIGjarMHKw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvODA2/OTA0NDk2L3Bob3Rv/L3RvbWF0b3Mtb3V0/ZG9vcnMuanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPUJLVjNN/TEdFR2pVWDQ0eVR2/U1Z2Rkc5bVNvQlhM/TFRUMTFHcmIxajJG/OGs9",
    rating: 4,
    inStock: true
  },
  {
    id: 6,
    name: "Green Chillies",
    price: 25.99,
    category: "Spices",
    description: "Hot and fresh green chillies to spice up your dishes.",
    image: "https://imgs.search.brave.com/F3g8aNFMNN547THEjUw3IC1gzR_mtQmfNWnrN_usKIU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9mcmVz/aC1ncmVlbi1jaGls/bGllcy1vdmVyZmxv/d2luZy1iYXNrZXQt/Y2xvc2UtdXAtaW1h/Z2UtMzI4MDMxNjQ1/LmpwZw",
    rating: 3,
    inStock: true
  },
  {
    id: 7,
    name: "Turmeric Powder",
    price: 89.99,
    category: "Spices",
    description: "High-quality ground turmeric with rich color.",
    image: "https://imgs.search.brave.com/JIf5IVTUrNcXHHQ8OQgEay5P1_RyiP_lB8vpZTdEZug/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzEwLzE3LzY0LzQ0/LzM2MF9GXzEwMTc2/NDQ0NjZfckQwRlhw/RTZMdVNmVVpZdDFt/cXZUWGtjbkw2ZFNa/dTUuanBn",
    rating: 5,
    inStock: true
  },
  {
    id: 8,
    name: "Ginger Root",
    price: 59.99,
    category: "Spices",
    description: "Fresh aromatic ginger root for cooking and tea.",
    image: "https://imgs.search.brave.com/sP7KVyFfDddnva2cjppSH0Gftz0qW48Ep1NdIzljUdw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMjIv/ODUyLzMxMy9zbWFs/bC9nZW5lcmF0aXZl/LWFpLWdpbmdlci1y/b290LXNwaWNlcmVh/bGlzdGljLWlsbHVz/dGFydGlvbi1vbi1k/YXJrLWJhY2tncm91/bmQtcGhvdG8uanBn",
    rating: 4,
    inStock: true
  },
  {
    id: 9,
    name: "Mangoes",
    price: 199.99,
    category: "Fruits",
    description: "Juicy summer mangoes full of tropical flavor.",
    image: "https://imgs.search.brave.com/fBqopEuE6SB4ODKcem5_NDyTUFl1O0sTuMDuz-qOZps/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTM0/NjA4NDY2L3Bob3Rv/L3BvcHVsYXIta2Vz/YXItbWFuZ29lcy13/aXRoLWxpZ2h0LWdy/ZWVuLWJhY2tyb3Vu/ZC1pc29sYXRlZC5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/TmFPNkNMNk92X2JF/YXFfTXN3V056TG53/UUJ1elJHbW5sVC1l/cUxoYU9oVT0",
    rating: 5,
    inStock: true
  },
  {
    id: 10,
    name: "Spinach",
    price: 34.99,
    category: "Vegetables",
    description: "Leafy green spinach packed with iron and vitamins.",
    image: "https://imgs.search.brave.com/4J0GSVvmiI8VgLrRrF3zcRN1mizRyXxnmKB5Nv9o0QE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9zcGlu/YWNoLTE4NTM5MjEx/LmpwZw",
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