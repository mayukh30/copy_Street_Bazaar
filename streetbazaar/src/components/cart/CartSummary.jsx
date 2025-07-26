import React from 'react';
import { CreditCard, Lock } from 'lucide-react';

const CartSummary = ({ subtotal, shipping, tax, total, onCheckout }) => {
  return (
    <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
      {/* Summary Details */}
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-sm text-gray-600">
          <span>Shipping</span>
          <span>
            {shipping === 0 ? (
              <span className="text-green-600 font-medium">Free</span>
            ) : (
              `$${shipping.toFixed(2)}`
            )}
          </span>
        </div>
        
        <div className="flex justify-between text-sm text-gray-600">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        
        {shipping === 0 && (
          <div className="text-xs text-green-600 font-medium">
            🎉 You qualify for free shipping!
          </div>
        )}
        
        {shipping > 0 && (
          <div className="text-xs text-gray-500">
            Add ${(100 - subtotal).toFixed(2)} more for free shipping
          </div>
        )}
      </div>

      {/* Total */}
      <div className="flex justify-between border-t border-gray-200 pt-2 mb-4">
        <span className="text-base font-semibold text-gray-900">Total</span>
        <span className="text-base font-semibold text-gray-900">
          ${total.toFixed(2)}
        </span>
      </div>

      {/* Checkout Button */}
      <button
        onClick={onCheckout}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 group"
      >
        <Lock className="h-4 w-4" />
        Secure Checkout
        <CreditCard className="h-4 w-4 group-hover:scale-110 transition-transform" />
      </button>

      {/* Security Notice */}
      <div className="mt-3 text-center">
        <p className="text-xs text-gray-500">
          Secure checkout with SSL encryption
        </p>
      </div>

      {/* Payment Methods */}
      <div className="mt-2 flex justify-center gap-2">
        <div className="text-xs text-gray-400 bg-white px-2 py-1 rounded border">
          VISA
        </div>
        <div className="text-xs text-gray-400 bg-white px-2 py-1 rounded border">
          MC
        </div>
        <div className="text-xs text-gray-400 bg-white px-2 py-1 rounded border">
          AMEX
        </div>
        <div className="text-xs text-gray-400 bg-white px-2 py-1 rounded border">
          PayPal
        </div>
      </div>
    </div>
  );
};

export default CartSummary;