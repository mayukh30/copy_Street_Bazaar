import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const AddProduct = ({ onAddProduct, onClose, editProduct = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    image: '',
    rating: 5,
    inStock: true
  });

  useEffect(() => {
    if (editProduct) {
      setFormData(editProduct);
    }
  }, [editProduct]);

  const categories = [
  'Vegetables',
  'Fruits',
  'Spices & Herbs',
  'Dairy Products',
  'Meat & Eggs',
  'Grains & Pulses',
  'Snacks & Bakery',
  'Beverages',
  'Oils & Condiments',
  'Household Essentials'
];

  const handleSubmit = () => {
    if (!formData.name || !formData.price || !formData.category) {
      alert('Please fill in all required fields');
      return;
    }
    
    const product = {
      ...formData,
      id: editProduct ? editProduct.id : Date.now(),
      price: parseFloat(formData.price)
    };
    onAddProduct(product);
    setFormData({
      name: '',
      price: '',
      category: '',
      description: '',
      image: '',
      rating: 5,
      inStock: true
    });
    if (onClose) onClose();
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            {editProduct ? 'Edit Product' : 'Add New Product'}
          </h2>
          {onClose && (
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
          )}
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price (₹)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rating (1-5)
            </label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              min="1"
              max="5"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="inStock"
              checked={formData.inStock}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="text-sm font-medium text-gray-700">
              In Stock
            </label>
          </div>

          <div className="flex gap-2 pt-4">
            <button
              type="button"
              onClick={handleSubmit}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              {editProduct ? 'Update Product' : 'Add Product'}
            </button>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


export default AddProduct