import React from 'react';
import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo */}
        <div className="text-center">
          <Link to="/" className="flex items-center justify-center space-x-2">
            <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
              <Package className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">GroceryMart</span>
          </Link>
          <p className="mt-2 text-sm text-gray-600">
            Your one-stop destination for fresh groceries
          </p>
        </div>

        {/* Auth Form Container */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {children}
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          <p>&copy; 2024 GroceryMart. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;