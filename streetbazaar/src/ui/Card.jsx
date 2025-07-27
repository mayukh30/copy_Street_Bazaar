import React from 'react';

function Card({ className = '', children, ...props }) {
  return (
    <div
      className={`rounded-2xl border bg-white text-gray-900 shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;
