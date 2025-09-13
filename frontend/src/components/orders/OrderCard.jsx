import React from 'react';
import { Package, Calendar, MapPin, CreditCard, RotateCcw, Eye } from 'lucide-react';
import { formatOrderStatus, formatOrderDate, formatOrderNumber, orderStatusColors } from '../../../profileOrdersMockData';

const OrderCard = ({ order, onViewDetails, onReorder }) => {
  const statusColor = orderStatusColors[order.status] || orderStatusColors.processing;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Package className="w-5 h-5 text-emerald-600" />
          <div>
            <h3 className="font-semibold text-gray-900">
              Order {formatOrderNumber(order.id)}
            </h3>
            <p className="text-sm text-gray-600">
              {formatOrderDate(order.orderDate)}
            </p>
          </div>
        </div>
        
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusColor.bg} ${statusColor.text} ${statusColor.border} border`}>
          {formatOrderStatus(order.status)}
        </span>
      </div>

      {/* Order Items Preview */}
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-sm text-gray-600">Items ({order.items.length}):</span>
        </div>
        <div className="flex -space-x-2">
          {order.items.slice(0, 3).map((item, index) => (
            <img
              key={index}
              src={item.image}
              alt={item.name}
              className="w-8 h-8 rounded-full border-2 border-white object-cover"
            />
          ))}
          {order.items.length > 3 && (
            <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600">
              +{order.items.length - 3}
            </div>
          )}
        </div>
      </div>

      {/* Order Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
        <div className="flex items-center space-x-2 text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>
            {order.deliveryDate 
              ? `Delivered ${formatOrderDate(order.deliveryDate)}`
              : `Est. delivery ${formatOrderDate(order.estimatedDelivery)}`
            }
          </span>
        </div>
        
        <div className="flex items-center space-x-2 text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{order.deliveryAddress.city}, {order.deliveryAddress.state}</span>
        </div>
        
        <div className="flex items-center space-x-2 text-gray-600">
          <CreditCard className="w-4 h-4" />
          <span>{order.paymentMethod}</span>
        </div>
        
        <div className="text-right md:text-left">
          <span className="font-semibold text-gray-900">${order.total.toFixed(2)}</span>
        </div>
      </div>

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
          {order.status === 'delivered' && (
            <button
              onClick={() => onReorder(order)}
              className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reorder</span>
            </button>
          )}
          
          {(order.status === 'processing' || order.status === 'in_transit') && (
            <button
              onClick={() => onViewDetails(order)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Track Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;