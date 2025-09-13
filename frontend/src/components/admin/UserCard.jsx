import React, { useState } from 'react';
import { User, Mail, Phone, Calendar, ShoppingBag, MapPin, MoreVertical, Ban, CheckCircle, Trash2, Eye } from 'lucide-react';
import { formatUserStatus, adminUserStatusColors } from '../../../adminMockData';

const UserCard = ({ user, onViewDetails, onUpdateStatus, onSuspend, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);
  
  const statusColor = adminUserStatusColors[user.status] || adminUserStatusColors.active;

  const handleStatusChange = (newStatus) => {
    if (newStatus === 'suspended') {
      const reason = prompt('Please provide a reason for suspension:');
      if (reason) {
        onSuspend(user.id, reason);
      }
    } else {
      onUpdateStatus(user.id, newStatus);
    }
    setShowMenu(false);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete user "${user.name}"? This action cannot be undone.`)) {
      onDelete(user.id);
    }
    setShowMenu(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{user.name}</h3>
            <p className="text-sm text-gray-600">ID: {user.id}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusColor.bg} ${statusColor.text} ${statusColor.border} border`}>
            {formatUserStatus(user.status)}
          </span>
          
          {/* Three-dot menu */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
            
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                <button
                  onClick={() => {
                    onViewDetails(user);
                    setShowMenu(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </button>
                
                {user.status === 'active' && (
                  <button
                    onClick={() => handleStatusChange('suspended')}
                    className="flex items-center w-full px-4 py-2 text-sm text-orange-600 hover:bg-orange-50"
                  >
                    <Ban className="w-4 h-4 mr-2" />
                    Suspend User
                  </button>
                )}
                
                {user.status === 'suspended' && (
                  <button
                    onClick={() => handleStatusChange('active')}
                    className="flex items-center w-full px-4 py-2 text-sm text-green-600 hover:bg-green-50"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Activate User
                  </button>
                )}
                
                <button
                  onClick={handleDelete}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete User
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* User Details */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Mail className="w-4 h-4" />
          <span>{user.email}</span>
          {user.isVerified && (
            <CheckCircle className="w-4 h-4 text-green-500" title="Verified" />
          )}
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Phone className="w-4 h-4" />
          <span>{user.phone}</span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>Joined {new Date(user.registrationDate).toLocaleDateString()}</span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{user.addresses} address{user.addresses !== 1 ? 'es' : ''}</span>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <ShoppingBag className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">Orders</span>
          </div>
          <p className="font-semibold text-gray-900">{user.totalOrders}</p>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-1">Total Spent</p>
          <p className="font-semibold text-gray-900">${user.totalSpent.toFixed(2)}</p>
        </div>
      </div>

      {/* Last Login */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Last login: {new Date(user.lastLogin).toLocaleDateString()} at {new Date(user.lastLogin).toLocaleTimeString()}
        </p>
      </div>

      {/* Suspension Reason */}
      {user.status === 'suspended' && user.suspensionReason && (
        <div className="mt-3 p-3 bg-red-50 rounded-lg">
          <p className="text-sm text-red-800">
            <strong>Suspension Reason:</strong> {user.suspensionReason}
          </p>
        </div>
      )}
    </div>
  );
};

export default UserCard;