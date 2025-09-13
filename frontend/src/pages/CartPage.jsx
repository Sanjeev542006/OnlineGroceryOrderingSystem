import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import EmptyCart from '../components/cart/EmptyCart';
import { ArrowLeft, ShoppingCart } from 'lucide-react';

const CartPage = () => {
  const { user } = useAuth();
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      // Redirect to login if not authenticated
      navigate('/login', { state: { from: { pathname: '/cart' } } });
      return;
    }
    
    // For now, just show an alert - in a real app, this would navigate to checkout
    alert('Checkout functionality would be implemented here!');
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart();
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <EmptyCart />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link
              to="/products"
              className="flex items-center text-emerald-600 hover:text-emerald-700 font-medium"
            >
              <ArrowLeft className="w-5 h-5 mr-1" />
              Continue Shopping
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <ShoppingCart className="w-6 h-6 mr-2" />
              Shopping Cart ({cartItems.length})
            </h1>
            
            {cartItems.length > 0 && (
              <button
                onClick={handleClearCart}
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Clear Cart
              </button>
            )}
          </div>
        </div>

        {/* Cart Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
            
            {/* Continue Shopping */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-blue-900">
                    Need more items?
                  </h3>
                  <p className="text-sm text-blue-700 mt-1">
                    Browse our full selection of fresh groceries
                  </p>
                </div>
                <Link
                  to="/products"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Shop More
                </Link>
              </div>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <CartSummary onCheckout={handleCheckout} />
              
              {/* Security Notice */}
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600 text-center">
                  🔒 Your payment information is secure and encrypted
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Easy Returns</h3>
            <p className="text-sm text-gray-600">
              Not satisfied? Return items within 30 days for a full refund.
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="text-emerald-600 font-bold text-lg">24/7</div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Customer Support</h3>
            <p className="text-sm text-gray-600">
              Our support team is available around the clock to help you.
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="text-emerald-600 font-bold">🚚</div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Fast Delivery</h3>
            <p className="text-sm text-gray-600">
              Same-day delivery available for orders placed before 2 PM.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;