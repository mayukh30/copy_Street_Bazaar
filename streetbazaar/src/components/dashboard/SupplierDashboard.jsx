import React from 'react'
import { useState } from 'react';

const SupplierDashboard = () => {
  const [products, setProducts] = useState(mockProducts.slice(0, 3));
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: 'Vegetables',
    location: '',
    stock: '',
    image: '📦'
  });
  
  const handleAddProduct = (e) => {
    e.preventDefault();
    const product = {
      ...newProduct,
      id: Date.now(),
      price: parseInt(newProduct.price),
      stock: parseInt(newProduct.stock),
      rating: 4.0,
      supplier: 'Your Store'
    };
    setProducts([...products, product]);
    setNewProduct({ name: '', price: '', category: 'Vegetables', location: '', stock: '', image: '📦' });
    setShowAddForm(false);
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Supplier Dashboard</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Product</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Total Products</h3>
          <p className="text-3xl font-bold text-blue-600">{products.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Total Stock</h3>
          <p className="text-3xl font-bold text-green-600">
            {products.reduce((sum, p) => sum + p.stock, 0)}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Avg Rating</h3>
          <p className="text-3xl font-bold text-yellow-600">4.5</p>
        </div>
      </div>
    </div>
  )};

export default SupplierDashboard