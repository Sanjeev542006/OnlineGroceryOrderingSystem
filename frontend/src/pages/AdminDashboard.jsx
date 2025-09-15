import React, { useState, useEffect } from 'react';
import { LayoutGrid, Users, Store, ShoppingBag, DollarSign, TrendingUp, Activity } from 'lucide-react';
import AdminStatCard from '../components/admin/AdminStatCard';
import SystemHealthIndicator from '../components/admin/SystemHealthIndicator';
import ActivityFeed from '../components/admin/ActivityFeed';
import PlatformChart from '../components/admin/PlatformChart';
import { mockSystemAnalytics, mockRecentActivities, formatSystemMetric, formatGrowthRate } from '../../adminMockData';

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('http://localhost:8080/dashboard/stats');
        if (response.ok) {
          const stats = await response.json();
          
          const transformedAnalytics = {
            totalUsers: stats.totalUsers,
            approvedVendors: stats.approvedVendors,
            totalOrders: stats.totalOrders,
            platformRevenue: stats.platformRevenue,
            userGrowth: stats.userGrowth,
            vendorGrowth: stats.vendorGrowth,
            orderGrowth: stats.orderGrowth,
            revenueGrowth: stats.revenueGrowth,
            dailyActiveUsers: stats.dailyActiveUsers,
            newRegistrationsToday: stats.newRegistrationsToday,
            vendorApplicationsToday: stats.vendorApplicationsToday,
            pendingVendors: stats.pendingVendors,
            systemUptime: stats.systemUptime,
            averageResponseTime: stats.averageResponseTime,
            topPerformingVendors: [],
            revenueByMonth: [
              { month: 'Jan', revenue: 12000, users: 150, orders: 89 },
              { month: 'Feb', revenue: 15000, users: 180, orders: 112 },
              { month: 'Mar', revenue: 18000, users: 220, orders: 145 },
              { month: 'Apr', revenue: 22000, users: 280, orders: 178 },
              { month: 'May', revenue: 25000, users: 320, orders: 201 },
              { month: 'Jun', revenue: 28000, users: 380, orders: 234 }
            ]
          };
          
          setAnalytics(transformedAnalytics);
          setActivities(mockRecentActivities);
        } else {
          setAnalytics(mockSystemAnalytics);
          setActivities(mockRecentActivities);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setAnalytics(mockSystemAnalytics);
        setActivities(mockRecentActivities);
      }
      setIsLoading(false);
    };
    
    fetchDashboardData();
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
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">System overview and platform analytics</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">System Status</p>
            <p className="text-sm font-medium text-green-600">
              ● Online ({formatSystemMetric(analytics.systemUptime, 'performance')} uptime)
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <AdminStatCard
            title="Total Users"
            value={formatSystemMetric(analytics.totalUsers, 'users')}
            change={analytics.userGrowth}
            changeType="increase"
            icon={Users}
            color="blue"
          />
          <AdminStatCard
            title="Active Vendors"
            value={formatSystemMetric(analytics.approvedVendors, 'vendors')}
            change={analytics.vendorGrowth}
            changeType="increase"
            icon={Store}
            color="purple"
          />
          <AdminStatCard
            title="Total Orders"
            value={formatSystemMetric(analytics.totalOrders, 'orders')}
            change={analytics.orderGrowth}
            changeType="increase"
            icon={ShoppingBag}
            color="emerald"
          />
          <AdminStatCard
            title="Platform Revenue"
            value={formatSystemMetric(analytics.platformRevenue, 'revenue')}
            change={analytics.revenueGrowth}
            changeType="increase"
            icon={DollarSign}
            color="orange"
          />
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Activity</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Daily Active Users</span>
                <span className="font-semibold text-gray-900">{analytics.dailyActiveUsers.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">New Registrations</span>
                <span className="font-semibold text-gray-900">{analytics.newRegistrationsToday}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Vendor Applications</span>
                <span className="font-semibold text-gray-900">{analytics.vendorApplicationsToday}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Pending Vendors</span>
                <span className="font-semibold text-yellow-600">{analytics.pendingVendors}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Growth Metrics</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">User Growth</span>
                <span className="font-semibold text-emerald-600">{formatGrowthRate(analytics.userGrowth)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Vendor Growth</span>
                <span className="font-semibold text-emerald-600">{formatGrowthRate(analytics.vendorGrowth)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Order Growth</span>
                <span className="font-semibold text-emerald-600">{formatGrowthRate(analytics.orderGrowth)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Revenue Growth</span>
                <span className="font-semibold text-emerald-600">{formatGrowthRate(analytics.revenueGrowth)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Vendors</h3>
            <div className="space-y-3">
              {analytics.topPerformingVendors.slice(0, 3).map((vendor, index) => (
                <div key={vendor.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      index === 0 ? 'bg-yellow-100 text-yellow-800' :
                      index === 1 ? 'bg-gray-100 text-gray-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {index + 1}
                    </div>
                    <span className="text-sm font-medium text-gray-900 truncate">
                      {vendor.businessName}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600">${vendor.revenue.toFixed(0)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Charts and System Health */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Platform Metrics Chart */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-emerald-600" />
                Platform Trends
              </h3>
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="revenue">Revenue</option>
                <option value="users">Users</option>
                <option value="orders">Orders</option>
              </select>
            </div>
            <div className="h-64">
              <div className="flex items-end justify-between h-full space-x-2">
                {analytics.revenueByMonth.map((item, index) => {
                  const getValue = () => {
                    switch (selectedMetric) {
                      case 'revenue': return item.revenue;
                      case 'users': return item.users;
                      case 'orders': return item.orders;
                      default: return item.revenue;
                    }
                  };
                  
                  const maxValue = Math.max(...analytics.revenueByMonth.map(i => {
                    switch (selectedMetric) {
                      case 'revenue': return i.revenue;
                      case 'users': return i.users;
                      case 'orders': return i.orders;
                      default: return i.revenue;
                    }
                  }));
                  
                  const value = getValue();
                  const height = (value / maxValue) * 100;
                  
                  const getColorClass = () => {
                    switch (selectedMetric) {
                      case 'revenue': return 'from-emerald-500 to-emerald-400';
                      case 'users': return 'from-blue-500 to-blue-400';
                      case 'orders': return 'from-purple-500 to-purple-400';
                      default: return 'from-emerald-500 to-emerald-400';
                    }
                  };
                  
                  const formatValue = (val) => {
                    switch (selectedMetric) {
                      case 'revenue': return `$${val.toFixed(0)}`;
                      case 'users':
                      case 'orders': return val.toLocaleString();
                      default: return val.toString();
                    }
                  };
                  
                  return (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div className="relative w-full">
                        <div
                          className={`bg-gradient-to-t ${getColorClass()} rounded-t-md transition-all duration-300 hover:opacity-80 cursor-pointer`}
                          style={{ height: `${height}%`, minHeight: '8px' }}
                          title={`${item.month}: ${formatValue(value)}`}
                        ></div>
                      </div>
                      <div className="mt-2 text-xs text-gray-600 font-medium">
                        {item.month}
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatValue(value)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* System Health */}
          <SystemHealthIndicator
            uptime={analytics.systemUptime}
            responseTime={analytics.averageResponseTime}
            activeConnections={analytics.dailyActiveUsers}
            memoryUsage={67.3}
          />
        </div>

        {/* Recent Activities */}
        <ActivityFeed activities={activities} />

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button
              onClick={() => window.location.href = '/admin/users'}
              className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg transition-colors"
            >
              <Users className="w-5 h-5" />
              <span>Manage Users</span>
            </button>
            <button
              onClick={() => window.location.href = '/admin/vendors'}
              className="flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg transition-colors"
            >
              <Store className="w-5 h-5" />
              <span>Manage Vendors</span>
            </button>
            <button
              onClick={() => alert('System settings coming soon!')}
              className="flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-lg transition-colors"
            >
              <Activity className="w-5 h-5" />
              <span>System Settings</span>
            </button>
            <button
              onClick={() => alert('Export data functionality coming soon!')}
              className="flex items-center justify-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white p-4 rounded-lg transition-colors"
            >
              <TrendingUp className="w-5 h-5" />
              <span>Export Data</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;