import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, ArrowRight } from 'lucide-react';

const EmptyCart = () => {
  return (
    <div className="text-center py-12">
      <div className="max-w-md mx-auto">
        {/* Empty Cart Icon */}
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingCart className="w-12 h-12 text-gray-400" />
        </div>
        
        {/* Empty State Content */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Your cart is empty
        </h2>
        <p className="text-gray-600 mb-8">
          Looks like you haven't added any items to your cart yet. 
          Start shopping to fill it up!
        </p>
        
        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            to="/products"
            className="inline-flex items-center justify-center w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Start Shopping
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
          
          <Link
            to="/"
            className="inline-flex items-center justify-center w-full border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Back to Home
          </Link>
        </div>
        
        {/* Featured Categories */}
        <div className="mt-12">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Popular Categories</h3>
          <div className="grid grid-cols-2 gap-4">
            <Link
              to="/products?category=Fruits%20%26%20Vegetables"
              className="p-4 border border-gray-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-colors group"
            >
              <div className="text-2xl mb-2">🥕</div>
              <div className="text-sm font-medium text-gray-900 group-hover:text-emerald-600">
                Fruits & Vegetables
              </div>
            </Link>
            
            <Link
              to="/products?category=Dairy%20%26%20Eggs"
              className="p-4 border border-gray-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-colors group"
            >
              <div className="text-2xl mb-2">🥛</div>
              <div className="text-sm font-medium text-gray-900 group-hover:text-emerald-600">
                Dairy & Eggs
              </div>
            </Link>
            
            <Link
              to="/products?category=Meat%20%26%20Seafood"
              className="p-4 border border-gray-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-colors group"
            >
              <div className="text-2xl mb-2">🥩</div>
              <div className="text-sm font-medium text-gray-900 group-hover:text-emerald-600">
                Meat & Seafood
              </div>
            </Link>
            
            <Link
              to="/products?category=Bakery"
              className="p-4 border border-gray-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-colors group"
            >
              <div className="text-2xl mb-2">🍞</div>
              <div className="text-sm font-medium text-gray-900 group-hover:text-emerald-600">
                Bakery
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;