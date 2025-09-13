import React from 'react';
import { MapPin, Edit, Trash2, Star } from 'lucide-react';
import { formatAddressType } from '../../../profileOrdersMockData';

const AddressCard = ({ address, onEdit, onDelete, onSetDefault }) => {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      onDelete(address.id);
    }
  };

  const handleSetDefault = () => {
    if (!address.isDefault) {
      onSetDefault(address.id);
    }
  };

  return (
    <div className={`bg-white rounded-lg border-2 p-4 transition-colors ${
      address.isDefault ? 'border-emerald-200 bg-emerald-50' : 'border-gray-200'
    }`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-emerald-600" />
          <div className="flex items-center space-x-2">
            <span className="font-medium text-gray-900">
              {formatAddressType(address.type)}
            </span>
            {address.isDefault && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                <Star className="w-3 h-3 mr-1" />
                Default
              </span>
            )}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onEdit(address)}
            className="p-1 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded transition-colors"
            title="Edit address"
          >
            <Edit className="w-4 h-4" />
          </button>
          {!address.isDefault && (
            <button
              onClick={handleDelete}
              className="p-1 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
              title="Delete address"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Address Details */}
      <div className="text-sm text-gray-600 space-y-1">
        <p className="font-medium text-gray-900">{address.fullName}</p>
        <p>{address.addressLine1}</p>
        {address.addressLine2 && <p>{address.addressLine2}</p>}
        <p>{address.city}, {address.state} {address.zipCode}</p>
        <p>{address.country}</p>
      </div>

      {/* Set as Default Button */}
      {!address.isDefault && (
        <button
          onClick={handleSetDefault}
          className="mt-3 text-sm text-emerald-600 hover:text-emerald-700 font-medium"
        >
          Set as default
        </button>
      )}
    </div>
  );
};

export default AddressCard;