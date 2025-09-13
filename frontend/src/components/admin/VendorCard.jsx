import React, { useState } from 'react';
import { Store, Mail, Phone, MapPin, Star, Package, DollarSign, ShoppingBag, MoreVertical, CheckCircle, X, Ban, Eye } from 'lucide-react';
import { formatVendorApprovalStatus, vendorApprovalStatusColors } from '../../../adminMockData';

const VendorCard = ({ vendor, onViewDetails, onApprove, onReject, onSuspend }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [suspendReason, setSuspendReason] = useState('');
  
  const statusColor = vendorApprovalStatusColors[vendor.status] || vendorApprovalStatusColors.pending;

  const handleApprove = () => {
    onApprove(vendor.id);
    setShowMenu(false);
  };

  const handleReject = () => {
    if (rejectReason.trim()) {
      onReject(vendor.id, rejectReason);
      setShowRejectModal(false);
      setRejectReason('');
    }
    setShowMenu(false);
  };

  const handleSuspend = () => {
    if (suspendReason.trim()) {
      onSuspend(vendor.id, suspendReason);
      setShowSuspendModal(false);
      setSuspendReason('');
    }
    setShowMenu(false);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Store className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{vendor.businessName}</h3>
              <p className="text-sm text-gray-600">{vendor.name}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusColor.bg} ${statusColor.text} ${statusColor.border} border`}>
              {formatVendorApprovalStatus(vendor.status)}
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
                      onViewDetails(vendor);
                      setShowMenu(false);
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </button>
                  
                  {vendor.status === 'pending' && (
                    <>
                      <button
                        onClick={handleApprove}
                        className="flex items-center w-full px-4 py-2 text-sm text-green-600 hover:bg-green-50"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve Vendor
                      </button>
                      <button
                        onClick={() => {
                          setShowRejectModal(true);
                          setShowMenu(false);
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Reject Vendor
                      </button>
                    </>
                  )}
                  
                  {vendor.status === 'approved' && (
                    <button
                      onClick={() => {
                        setShowSuspendModal(true);
                        setShowMenu(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-orange-600 hover:bg-orange-50"
                    >
                      <Ban className="w-4 h-4 mr-2" />
                      Suspend Vendor
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Vendor Details */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Mail className="w-4 h-4" />
            <span>{vendor.email}</span>
            {vendor.isVerified && (
              <CheckCircle className="w-4 h-4 text-green-500" title="Verified" />
            )}
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Phone className="w-4 h-4" />
            <span>{vendor.phone}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{vendor.businessAddress}</span>
          </div>
          
          {vendor.rating > 0 && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>{vendor.rating.toFixed(1)} rating</span>
            </div>
          )}
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Package className="w-4 h-4 text-gray-500" />
            </div>
            <p className="font-semibold text-gray-900">{vendor.totalProducts}</p>
            <p className="text-xs text-gray-600">Products</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <ShoppingBag className="w-4 h-4 text-gray-500" />
            </div>
            <p className="font-semibold text-gray-900">{vendor.totalOrders}</p>
            <p className="text-xs text-gray-600">Orders</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <DollarSign className="w-4 h-4 text-gray-500" />
            </div>
            <p className="font-semibold text-gray-900">${vendor.totalRevenue.toFixed(0)}</p>
            <p className="text-xs text-gray-600">Revenue</p>
          </div>
        </div>

        {/* Registration Date */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Applied: {new Date(vendor.registrationDate).toLocaleDateString()}
            {vendor.approvalDate && (
              <span> • Approved: {new Date(vendor.approvalDate).toLocaleDateString()}</span>
            )}
          </p>
        </div>

        {/* Application Notes */}
        {vendor.applicationNotes && (
          <div className="mt-3 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Notes:</strong> {vendor.applicationNotes}
            </p>
          </div>
        )}
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Reject Vendor Application</h3>
            <p className="text-gray-600 mb-4">
              Please provide a reason for rejecting {vendor.businessName}:
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
                disabled={!rejectReason.trim()}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-lg transition-colors"
              >
                Reject Vendor
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Suspend Modal */}
      {showSuspendModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Suspend Vendor</h3>
            <p className="text-gray-600 mb-4">
              Please provide a reason for suspending {vendor.businessName}:
            </p>
            <textarea
              value={suspendReason}
              onChange={(e) => setSuspendReason(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              rows={3}
              placeholder="Enter suspension reason..."
            />
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => {
                  setShowSuspendModal(false);
                  setSuspendReason('');
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSuspend}
                disabled={!suspendReason.trim()}
                className="px-4 py-2 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white rounded-lg transition-colors"
              >
                Suspend Vendor
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VendorCard;