import React from 'react'
import { useContext } from 'react';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-3xl">{product.image}</span>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600 dark:text-gray-400">{product.rating}</span>
          </div>
        </div>
        
        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{product.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{product.supplier}</p>
        
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-bold text-green-600">₹{product.price}</span>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <MapPin className="h-4 w-4 mr-1" />
            {product.location}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">Stock: {product.stock}</span>
          {user && user.type === 'consumer' && (
            <button
              onClick={() => addToCart(product)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};


export default ProductCard