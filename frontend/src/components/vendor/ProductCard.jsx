import React, { useState } from 'react';
import { Edit, Trash2, MoreVertical, Package, DollarSign, Hash } from 'lucide-react';

const ProductCard = ({ product, onEdit, onDelete, onUpdateStock }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isUpdatingStock, setIsUpdatingStock] = useState(false);
  const [newStock, setNewStock] = useState(product.stock);

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      onDelete(product.id);
    }
    setShowMenu(false);
  };

  const handleStockUpdate = async () => {
    if (newStock !== product.stock) {
      await onUpdateStock(product.id, newStock);
    }
    setIsUpdatingStock(false);
  };

  const handleStockCancel = () => {
    setNewStock(product.stock);
    setIsUpdatingStock(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Product Image */}
      <div className="h-48 bg-gray-200">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300/e5e7eb/6b7280?text=No+Image';
          }}
        />
      </div>
      
      {/* Product Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 text-lg">{product.name}</h3>
          
          {/* Three-dot menu */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
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
        <p className="text-gray-600 text-sm mb-3">{product.description}</p>

        {/* Pricing */}
        <div className="flex items-center space-x-2 mb-3">
          <DollarSign className="w-4 h-4 text-gray-500" />
          <span className="text-lg font-bold text-gray-900">${product.price}</span>
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
                product.stock === 0 ? 'text-red-600' :
                product.stock <= 10 ? 'text-orange-600' :
                'text-green-600'
              }`}>
                {product.stock} in stock
              </span>
            )}
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