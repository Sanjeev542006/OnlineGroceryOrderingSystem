import React from 'react';
import { X, Package, Calendar, MapPin, CreditCard, Download } from 'lucide-react';
import { formatOrderStatus, formatOrderDate, formatOrderNumber, orderStatusColors } from '../../../profileOrdersMockData';

const OrderDetailsModal = ({ order, isOpen, onClose }) => {
  if (!isOpen || !order) return null;

  const statusColor = orderStatusColors[order.status] || orderStatusColors.processing;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Package className="w-6 h-6 text-emerald-600" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Order {formatOrderNumber(order.id)}
              </h2>
              <p className="text-sm text-gray-600">
                Placed on {formatOrderDate(order.orderDate)}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Order Status</span>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusColor.bg} ${statusColor.text} ${statusColor.border} border`}>
              {formatOrderStatus(order.status)}
            </span>
          </div>

          {/* Order Items */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Items Ordered</h3>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{item.name}</h4>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                    <p className="text-sm text-gray-600">${item.price.toFixed(2)} each</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="text-gray-900">${order.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-900">
                  {order.shipping === 0 ? 'Free' : `$${order.shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="border-t border-gray-200 pt-2">
                <div className="flex justify-between font-semibold">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-emerald-600" />
                Delivery Address
              </h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p className="font-medium text-gray-900">{order.deliveryAddress.fullName}</p>
                <p>{order.deliveryAddress.addressLine1}</p>
                {order.deliveryAddress.addressLine2 && <p>{order.deliveryAddress.addressLine2}</p>}
                <p>{order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.zipCode}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-emerald-600" />
                Payment Method
              </h3>
              <p className="text-sm text-gray-600">{order.paymentMethod}</p>
            </div>
          </div>

          {/* Delivery Timeline */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-emerald-600" />
              Delivery Information
            </h3>
            <div className="text-sm text-gray-600">
              {order.deliveryDate ? (
                <p>Delivered on {formatOrderDate(order.deliveryDate)}</p>
              ) : (
                <p>Estimated delivery: {formatOrderDate(order.estimatedDelivery)}</p>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={() => alert('Download receipt functionality would be implemented here')}
            className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 font-medium"
          >
            <Download className="w-4 h-4" />
            <span>Download Receipt</span>
          </button>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
            {order.status !== 'delivered' && order.status !== 'cancelled' && (
              <button
                onClick={() => alert('Contact support functionality would be implemented here')}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
              >
                Contact Support
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;