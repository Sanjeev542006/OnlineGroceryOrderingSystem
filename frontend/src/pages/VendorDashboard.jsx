import React, { useState, useEffect } from 'react';
import { LayoutGrid, DollarSign, Package, ShoppingBag, TrendingUp } from 'lucide-react';
import StatCard from '../components/vendor/StatCard';
import RevenueChart from '../components/vendor/RevenueChart';
import TopProductsList from '../components/vendor/TopProductsList';
import { mockVendorAnalytics, formatCurrency } from '../../vendorMockData';

const VendorDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAnalytics(mockVendorAnalytics);
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-80 bg-gray-200 rounded-lg"></div>
              <div className="h-80 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <LayoutGrid className="w-8 h-8 text-emerald-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Vendor Dashboard</h1>
              <p className="text-gray-600">Welcome back! Here's your business overview</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Last updated</p>
            <p className="text-sm font-medium text-gray-900">
              {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Revenue"
            value={formatCurrency(analytics.totalRevenue)}
            change={analytics.revenueGrowth}
            changeType="increase"
            icon={DollarSign}
            color="emerald"
          />
          <StatCard
            title="Total Orders"
            value={analytics.totalOrders.toLocaleString()}
            change={analytics.orderGrowth}
            changeType="increase"
            icon={ShoppingBag}
            color="blue"
          />
          <StatCard
            title="Products Listed"
            value={analytics.totalProducts}
            icon={Package}
            color="purple"
          />
          <StatCard
            title="Avg Order Value"
            value={formatCurrency(analytics.averageOrderValue)}
            icon={TrendingUp}
            color="orange"
          />
        </div>

        {/* Monthly Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">This Month</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Revenue</span>
                <span className="font-semibold text-gray-900">{formatCurrency(analytics.revenueThisMonth)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Orders</span>
                <span className="font-semibold text-gray-900">{analytics.ordersThisMonth}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Growth Rate</span>
                <span className="font-semibold text-emerald-600">+{analytics.revenueGrowth}%</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Status Overview</h3>
            <div className="space-y-3">
              {Object.entries(analytics.ordersByStatus).map(([status, count]) => (
                <div key={status} className="flex justify-between items-center">
                  <span className="text-gray-600 capitalize">{status.replace('_', ' ')}</span>
                  <span className="font-semibold text-gray-900">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <RevenueChart 
            data={analytics.revenueByMonth} 
            title="Revenue Trends (Last 6 Months)"
          />
          <TopProductsList 
            products={analytics.topProducts} 
            title="Top Performing Products"
          />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => window.location.href = '/vendor/products'}
              className="flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-lg transition-colors"
            >
              <Package className="w-5 h-5" />
              <span>Manage Products</span>
            </button>
            <button
              onClick={() => window.location.href = '/vendor/orders'}
              className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>View Orders</span>
            </button>
            <button
              onClick={() => alert('Analytics feature coming soon!')}
              className="flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg transition-colors"
            >
              <TrendingUp className="w-5 h-5" />
              <span>View Analytics</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;