import React, { useState } from 'react';
import { Edit, Trash2, MoreVertical, Package, DollarSign, Hash } from 'lucide-react';
import { formatProductStatus, formatProductCategory, formatCurrency, productStatusColors } from '../../../vendorMockData';

const ProductCard = ({ product, onEdit, onDelete, onUpdateStock }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isUpdatingStock, setIsUpdatingStock] = useState(false);
  const [newStock, setNewStock] = useState(product.stockQuantity);

  const statusColor = productStatusColors[product.status] || productStatusColors.active;

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      onDelete(product.id);
    }
    setShowMenu(false);
  };

  const handleStockUpdate = async () => {
    if (newStock !== product.stockQuantity) {
      await onUpdateStock(product.id, newStock);
    }
    setIsUpdatingStock(false);
  };

  const handleStockCancel = () => {
    setNewStock(product.stockQuantity);
    setIsUpdatingStock(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Product Image */}
      <div className="relative h-48">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 flex space-x-2">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusColor.bg} ${statusColor.text} ${statusColor.border} border`}>
            {formatProductStatus(product.status)}
          </span>
          
          {/* Three-dot menu */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 bg-white/90 hover:bg-white rounded-full shadow-sm transition-colors"
            >
              <MoreVertical className="w-4 h-4 text-gray-600" />
            </button>
            
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                <button
                  onClick={() => {
                    onEdit(product);
                    setShowMenu(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Product
                </button>
                <button
                  onClick={() => {
                    setIsUpdatingStock(true);
                    setShowMenu(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Hash className="w-4 h-4 mr-2" />
                  Update Stock
                </button>
                <button
                  onClick={handleDelete}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Product
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4">
        <div className="mb-2">
          <h3 className="font-semibold text-gray-900 text-lg">{product.name}</h3>
          <p className="text-sm text-gray-600 mt-1">{formatProductCategory(product.category)}</p>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

        {/* Pricing */}
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-lg font-bold text-gray-900">{formatCurrency(product.price)}</span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-sm text-gray-500 line-through">{formatCurrency(product.originalPrice)}</span>
          )}
        </div>

        {/* Stock Information */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Package className="w-4 h-4 text-gray-500" />
            {isUpdatingStock ? (
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  value={newStock}
                  onChange={(e) => setNewStock(parseInt(e.target.value) || 0)}
                  className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                  min="0"
                />
                <button
                  onClick={handleStockUpdate}
                  className="text-xs bg-emerald-600 text-white px-2 py-1 rounded hover:bg-emerald-700"
                >
                  Save
                </button>
                <button
                  onClick={handleStockCancel}
                  className="text-xs bg-gray-300 text-gray-700 px-2 py-1 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <span className={`text-sm font-medium ${
                product.stockQuantity === 0 ? 'text-red-600' :
                product.stockQuantity <= product.lowStockThreshold ? 'text-orange-600' :
                'text-green-600'
              }`}>
                {product.stockQuantity} in stock
              </span>
            )}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-200">
          <div className="text-center">
            <p className="text-sm text-gray-600">Total Sold</p>
            <p className="font-semibold text-gray-900">{product.totalSold}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Revenue</p>
            <p className="font-semibold text-gray-900">{formatCurrency(product.revenue)}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex space-x-2 mt-4">
          <button
            onClick={() => onEdit(product)}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1"
          >
            <Edit className="w-4 h-4" />
            <span>Edit</span>
          </button>
          <button
            onClick={() => setIsUpdatingStock(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
            title="Update Stock"
          >
            <Hash className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;