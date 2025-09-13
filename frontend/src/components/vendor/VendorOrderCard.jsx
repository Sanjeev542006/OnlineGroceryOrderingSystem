import React, { useState } from 'react';
import { Package, User, MapPin, CreditCard, Clock, Check, X, Eye, Phone, Mail } from 'lucide-react';
import { formatVendorOrderStatus, formatCurrency, vendorOrderStatusColors } from '../../../vendorMockData';

const VendorOrderCard = ({ order, onUpdateStatus, onViewDetails, onAccept, onReject }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const statusColor = vendorOrderStatusColors[order.status] || vendorOrderStatusColors.pending;

  const handleAccept = async () => {
    setIsUpdating(true);
    try {
      await onAccept(order.id);
    } catch (error) {
      console.error('Error accepting order:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleReject = async () => {
    if (!rejectReason.trim()) {
      alert('Please provide a reason for rejection');
      return;
    }
    
    setIsUpdating(true);
    try {
      await onReject(order.id, rejectReason);
      setShowRejectModal(false);
      setRejectReason('');
    } catch (error) {
      console.error('Error rejecting order:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    setIsUpdating(true);
    try {
      await onUpdateStatus(order.id, newStatus);
    } catch (error) {
      console.error('Error updating order status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const getNextStatus = (currentStatus) => {
    const statusFlow = {
      'pending': 'accepted',
      'accepted': 'preparing',
      'preparing': 'ready',
      'ready': 'completed'
    };
    return statusFlow[currentStatus];
  };

  const getNextStatusLabel = (currentStatus) => {
    const labels = {
      'pending': 'Accept Order',
      'accepted': 'Start Preparing',
      'preparing': 'Mark as Ready',
      'ready': 'Mark as Completed'
    };
    return labels[currentStatus];
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Package className="w-5 h-5 text-emerald-600" />
            <div>
              <h3 className="font-semibold text-gray-900">
                Order #{order.orderNumber}
              </h3>
              <p className="text-sm text-gray-600">
                {new Date(order.orderDate).toLocaleDateString()} at {new Date(order.orderDate).toLocaleTimeString()}
              </p>
            </div>
          </div>
          
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusColor.bg} ${statusColor.text} ${statusColor.border} border`}>
            {formatVendorOrderStatus(order.status)}
          </span>
        </div>

        {/* Customer Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <User className="w-4 h-4" />
            <span>{order.customerName}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Mail className="w-4 h-4" />
            <span>{order.customerEmail}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Phone className="w-4 h-4" />
            <span>{order.customerPhone}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{order.deliveryAddress.city}, {order.deliveryAddress.state}</span>
          </div>
        </div>

        {/* Order Items Preview */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Items ({order.items.length}):</p>
          <div className="flex -space-x-2 mb-2">
            {order.items.slice(0, 4).map((item, index) => (
              <img
                key={index}
                src={item.image}
                alt={item.name}
                className="w-8 h-8 rounded-full border-2 border-white object-cover"
                title={`${item.name} (${item.quantity}x)`}
              />
            ))}
            {order.items.length > 4 && (
              <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600">
                +{order.items.length - 4}
              </div>
            )}
          </div>
          <div className="text-sm text-gray-600">
            {order.items.map((item, index) => (
              <span key={item.productId}>
                {item.name} ({item.quantity}x)
                {index < order.items.length - 1 ? ', ' : ''}
              </span>
            ))}
          </div>
        </div>

        {/* Order Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
          <div className="flex items-center space-x-2 text-gray-600">
            <Clock className="w-4 h-4" />
            <span>
              Delivery: {new Date(order.requestedDeliveryDate).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <CreditCard className="w-4 h-4" />
            <span>{order.paymentMethod}</span>
          </div>
          <div className="text-right md:text-left">
            <span className="font-semibold text-gray-900">{formatCurrency(order.total)}</span>
          </div>
        </div>

        {/* Notes */}
        {order.notes && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Customer Note:</strong> {order.notes}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <button
            onClick={() => onViewDetails(order)}
            className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 font-medium text-sm"
          >
            <Eye className="w-4 h-4" />
            <span>View Details</span>
          </button>
          
          <div className="flex items-center space-x-3">
            {order.status === 'pending' && (
              <>
                <button
                  onClick={() => setShowRejectModal(true)}
                  disabled={isUpdating}
                  className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span>Reject</span>
                </button>
                <button
                  onClick={handleAccept}
                  disabled={isUpdating}
                  className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  <Check className="w-4 h-4" />
                  <span>{isUpdating ? 'Accepting...' : 'Accept'}</span>
                </button>
              </>
            )}
            
            {order.status !== 'pending' && order.status !== 'completed' && order.status !== 'rejected' && (
              <button
                onClick={() => handleStatusUpdate(getNextStatus(order.status))}
                disabled={isUpdating}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                {isUpdating ? 'Updating...' : getNextStatusLabel(order.status)}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Reject Order</h3>
            <p className="text-gray-600 mb-4">
              Please provide a reason for rejecting order #{order.orderNumber}:
            </p>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              rows={3}
              placeholder="Enter rejection reason..."
            />
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectReason('');
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                disabled={isUpdating || !rejectReason.trim()}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-lg transition-colors"
              >
                {isUpdating ? 'Rejecting...' : 'Reject Order'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VendorOrderCard;