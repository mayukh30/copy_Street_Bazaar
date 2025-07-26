import React from 'react'

const ProductCategories = ({ categories, selectedCategory, onCategorySelect }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Categories</h3>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategorySelect('')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === ''
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All Products ({categories.All || 0})
        </button>
        {Object.entries(categories).map(([category, count]) => {
          if (category === 'All') return null;
          return (
            <button
              key={category}
              onClick={() => onCategorySelect(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category} ({count})
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProductCategories