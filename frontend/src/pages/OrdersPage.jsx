import React, { useState, useEffect } from 'react';
import { Package, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import OrderCard from '../components/orders/OrderCard';
import OrderDetailsModal from '../components/orders/OrderDetailsModal';
import OrderFilters from '../components/orders/OrderFilters';
import { mockOrders } from '../../profileOrdersMockData';

const OrdersPage = () => {
  const { addToCart } = useCart();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    // In a real app, fetch orders from API
    setOrders(mockOrders);
    setFilteredOrders(mockOrders);
  }, []);

  useEffect(() => {
    // Apply filters
    let filtered = orders;

    if (filters.searchTerm) {
      filtered = filtered.filter(order =>
        order.orderNumber.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        order.items.some(item =>
          item.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
        )
      );
    }

    if (filters.status) {
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

    setFilteredOrders(filtered);
  }, [orders, filters]);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleReorder = async (order) => {
    try {
      // Add all items from the order to cart
      for (const item of order.items) {
        addToCart({
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image
        }, item.quantity);
      }
      alert(`${order.items.length} items added to cart!`);
    } catch (error) {
      console.error('Error reordering:', error);
      alert('Failed to add items to cart');
    }
  };

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
          {Object.keys(filters).length > 0
            ? 'Try adjusting your filters to find more orders.'
            : "You haven't placed any orders yet. Start shopping to see your orders here!"
          }
        </p>
        
        {Object.keys(filters).length === 0 && (
          <button
            onClick={() => window.location.href = '/products'}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Start Shopping
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <Package className="w-8 h-8 text-emerald-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
              <p className="text-gray-600">Track and manage your orders</p>
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

        {orders.length === 0 ? (
          <EmptyOrders />
        ) : (
          <>
            {/* Filters */}
            <OrderFilters
              filters={filters}
              onFiltersChange={setFilters}
            />

            {/* Orders List */}
            {filteredOrders.length === 0 ? (
              <EmptyOrders />
            ) : (
              <div className="space-y-6">
                {filteredOrders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    onViewDetails={handleViewDetails}
                    onReorder={handleReorder}
                  />
                ))}
              </div>
            )}
          </>
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

export default OrdersPage;