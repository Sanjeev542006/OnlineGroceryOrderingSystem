import React, { useState, useEffect } from 'react';
import { ShoppingBag, Filter } from 'lucide-react';
import VendorOrderCard from '../components/vendor/VendorOrderCard';
import OrderDetailsModal from '../components/orders/OrderDetailsModal';
import { mockVendorOrders } from '../../vendorMockData';

const VendorOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    dateFrom: '',
    dateTo: '',
    searchTerm: ''
  });

  const statusOptions = [
    { value: 'all', label: 'All Orders' },
    { value: 'pending', label: 'Pending' },
    { value: 'accepted', label: 'Accepted' },
    { value: 'preparing', label: 'Preparing' },
    { value: 'ready', label: 'Ready for Pickup' },
    { value: 'completed', label: 'Completed' },
    { value: 'rejected', label: 'Rejected' }
  ];

  useEffect(() => {
    setOrders(mockVendorOrders);
    setFilteredOrders(mockVendorOrders);
  }, []);

  useEffect(() => {
    let filtered = orders;

    if (filters.searchTerm) {
      filtered = filtered.filter(order =>
        order.orderNumber.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        order.customerName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        order.items.some(item =>
          item.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
        )
      );
    }

    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter(order => order.status === filters.status);
    }

    if (filters.dateFrom) {
      filtered = filtered.filter(order =>
        new Date(order.orderDate) >= new Date(filters.dateFrom)
      );
    }

    if (filters.dateTo) {
      filtered = filtered.filter(order =>
        new Date(order.orderDate) <= new Date(filters.dateTo)
      );
    }

    // Sort by order date (newest first)
    filtered.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));

    setFilteredOrders(filtered);
  }, [orders, filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      setOrders(prev => prev.map(order =>
        order.id === orderId
          ? { 
              ...order, 
              status: newStatus,
              ...(newStatus === 'accepted' && { acceptedAt: new Date().toISOString() }),
              ...(newStatus === 'completed' && { completedAt: new Date().toISOString() })
            }
          : order
      ));
      alert(`Order status updated to ${newStatus}`);
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order status');
    }
  };

  const handleAcceptOrder = async (orderId) => {
    await handleUpdateOrderStatus(orderId, 'accepted');
  };

  const handleRejectOrder = async (orderId, reason) => {
    try {
      setOrders(prev => prev.map(order =>
        order.id === orderId
          ? { 
              ...order, 
              status: 'rejected',
              rejectionReason: reason,
              rejectedAt: new Date().toISOString()
            }
          : order
      ));
      alert('Order rejected successfully');
    } catch (error) {
      console.error('Error rejecting order:', error);
      alert('Failed to reject order');
    }
  };

  const getOrderStatusCounts = () => {
    const counts = {};
    statusOptions.forEach(status => {
      if (status.value === 'all') {
        counts[status.value] = orders.length;
      } else {
        counts[status.value] = orders.filter(order => order.status === status.value).length;
      }
    });
    return counts;
  };

  const statusCounts = getOrderStatusCounts();

  const EmptyOrders = () => (
    <div className="text-center py-12">
      <div className="max-w-md mx-auto">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-12 h-12 text-gray-400" />
        </div>
        
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          No orders found
        </h2>
        <p className="text-gray-600 mb-8">
          {Object.values(filters).some(filter => filter && filter !== 'all')
            ? 'Try adjusting your filters to find more orders.'
            : "You don't have any orders yet. Orders will appear here when customers place them."
          }
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <ShoppingBag className="w-8 h-8 text-emerald-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
              <p className="text-gray-600">Manage incoming customer orders</p>
            </div>
          </div>
          
          {orders.length > 0 && (
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">{filteredOrders.length}</p>
              <p className="text-sm text-gray-600">
                {filteredOrders.length === 1 ? 'Order' : 'Orders'}
              </p>
            </div>
          )}
        </div>

        {/* Status Overview */}
        {orders.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
            {statusOptions.map((status) => (
              <button
                key={status.value}
                onClick={() => handleFilterChange('status', status.value)}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  filters.status === status.value
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
              >
                <div className="text-2xl font-bold">{statusCounts[status.value] || 0}</div>
                <div className="text-sm">{status.label}</div>
              </button>
            ))}
          </div>
        )}

        {/* Filters */}
        {orders.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <Filter className="w-5 h-5 text-emerald-600" />
              <h3 className="text-lg font-semibold text-gray-900">Filter Orders</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search orders, customers, or items..."
                  value={filters.searchTerm}
                  onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              {/* Status Filter */}
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              {/* Date From */}
              <input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />

              {/* Date To */}
              <input
                type="date"
                value={filters.dateTo}
                onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            {/* Clear Filters */}
            {(filters.searchTerm || filters.status !== 'all' || filters.dateFrom || filters.dateTo) && (
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setFilters({ status: 'all', dateFrom: '', dateTo: '', searchTerm: '' })}
                  className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <EmptyOrders />
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <VendorOrderCard
                key={order.id}
                order={order}
                onUpdateStatus={handleUpdateOrderStatus}
                onViewDetails={handleViewDetails}
                onAccept={handleAcceptOrder}
                onReject={handleRejectOrder}
              />
            ))}
          </div>
        )}

        {/* Order Details Modal */}
        <OrderDetailsModal
          order={selectedOrder}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedOrder(null);
          }}
        />
      </div>
    </div>
  );
};

export default VendorOrders;