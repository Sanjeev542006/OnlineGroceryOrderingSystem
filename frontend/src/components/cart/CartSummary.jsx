import React from 'react';
import { useCart } from '../../contexts/CartContext';
import { Truck, Shield, CreditCard } from 'lucide-react';

const CartSummary = ({ onCheckout }) => {
  const { 
    getCartSubtotal, 
    getTaxAmount, 
    getShippingCost, 
    getFinalTotal,
    cartItems 
  } = useCart();

  const subtotal = getCartSubtotal();
  const tax = getTaxAmount();
  const shipping = getShippingCost();
  const total = getFinalTotal();
  const isEligibleForFreeShipping = subtotal >= 50;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
      
      {/* Order Details */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal ({cartItems.length} items)</span>
          <span className="text-gray-900">${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax</span>
          <span className="text-gray-900">${tax.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <div className="flex items-center space-x-1">
            <span className="text-gray-600">Shipping</span>
            {isEligibleForFreeShipping && (
              <span className="text-xs text-emerald-600 font-medium">(Free!)</span>
            )}
          </div>
          <span className={`${shipping === 0 ? 'text-emerald-600' : 'text-gray-900'}`}>
            {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        
        {!isEligibleForFreeShipping && (
          <div className="text-xs text-gray-500 bg-blue-50 p-2 rounded">
            Add ${(50 - subtotal).toFixed(2)} more for free shipping!
          </div>
        )}
        
        <div className="border-t pt-3">
          <div className="flex justify-between">
            <span className="text-base font-semibold text-gray-900">Total</span>
            <span className="text-base font-semibold text-gray-900">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="space-y-3 mb-6 text-xs text-gray-600">
        <div className="flex items-center space-x-2">
          <Truck className="w-4 h-4 text-emerald-500" />
          <span>Free delivery on orders over $50</span>
        </div>
        <div className="flex items-center space-x-2">
          <Shield className="w-4 h-4 text-emerald-500" />
          <span>100% satisfaction guarantee</span>
        </div>
        <div className="flex items-center space-x-2">
          <CreditCard className="w-4 h-4 text-emerald-500" />
          <span>Secure payment processing</span>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        onClick={onCheckout}
        disabled={cartItems.length === 0}
        className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors"
      >
        Proceed to Checkout
      </button>
      
      <p className="text-xs text-gray-500 text-center mt-3">
        Secure checkout powered by SSL encryption
      </p>
    </div>
  );
};

export default CartSummary;