import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import './index.css';

// Import Context
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';

// Import Layout Components
import MainLayout from './components/layout/MainLayout';
import AuthLayout from './components/layout/AuthLayout';

// Import Auth Components
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

// Import Common Components
import ProtectedRoute from './components/common/ProtectedRoute';
import PublicRoute from './components/common/PublicRoute';

// Import Pages
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/ProfilePage';
import OrdersPage from './pages/OrdersPage';
import VendorDashboard from './pages/VendorDashboard';
import VendorProducts from './pages/VendorProducts';
import VendorOrders from './pages/VendorOrders';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminVendors from './pages/AdminVendors';

// Layout Wrapper Component
const LayoutWrapper = ({ children }) => {
  return <MainLayout>{children}</MainLayout>;
};

// 404 Not Found Component
const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-400 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-600 mb-4">Page Not Found</h2>
        <p className="text-gray-500 mb-8">The page you're looking for doesn't exist.</p>
        <button
          onClick={() => window.location.href = '/'}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg transition-colors"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

// Main App Component
function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <AuthLayout>
                    <LoginPage />
                  </AuthLayout>
                </PublicRoute>
              } 
            />
            
            <Route 
              path="/register" 
              element={
                <PublicRoute>
                  <AuthLayout>
                    <RegisterPage />
                  </AuthLayout>
                </PublicRoute>
              } 
            />

            {/* Public Pages */}
            <Route 
              path="/" 
              element={
                <LayoutWrapper>
                  <HomePage />
                </LayoutWrapper>
              } 
            />
            
            <Route 
              path="/products" 
              element={
                <LayoutWrapper>
                  <ProductsPage />
                </LayoutWrapper>
              } 
            />

            {/* Protected Routes */}
            <Route 
              path="/cart" 
              element={
                <LayoutWrapper>
                  <CartPage />
                </LayoutWrapper>
              } 
            />

            <Route 
              path="/profile" 
              element={
                <ProtectedRoute allowedRoles={['CUSTOMER', 'VENDOR', 'ADMIN']}>
                  <LayoutWrapper>
                    <ProfilePage />
                  </LayoutWrapper>
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/orders" 
              element={
                <ProtectedRoute allowedRoles={['CUSTOMER']}>
                  <LayoutWrapper>
                    <OrdersPage />
                  </LayoutWrapper>
                </ProtectedRoute>
              } 
            />

            {/* Vendor Routes */}
            <Route 
              path="/vendor/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['VENDOR']}>
                  <LayoutWrapper>
                    <VendorDashboard />
                  </LayoutWrapper>
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/vendor/products" 
              element={
                <ProtectedRoute allowedRoles={['VENDOR']}>
                  <LayoutWrapper>
                    <VendorProducts />
                  </LayoutWrapper>
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/vendor/orders" 
              element={
                <ProtectedRoute allowedRoles={['VENDOR']}>
                  <LayoutWrapper>
                    <VendorOrders />
                  </LayoutWrapper>
                </ProtectedRoute>
              } 
            />

            {/* Admin Routes */}
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <LayoutWrapper>
                    <AdminDashboard />
                  </LayoutWrapper>
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/admin/users" 
              element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <LayoutWrapper>
                    <AdminUsers />
                  </LayoutWrapper>
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/admin/vendors" 
              element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <LayoutWrapper>
                    <AdminVendors />
                  </LayoutWrapper>
                </ProtectedRoute>
              } 
            />

            {/* Catch all route - 404 */}
            <Route 
              path="*" 
              element={<NotFoundPage />} 
            />
          </Routes>
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;