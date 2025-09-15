import React, { useState, useEffect } from 'react';
import { Store, Search, Filter, Download, Grid, List } from 'lucide-react';
import VendorCard from '../components/admin/VendorCard';


const AdminVendors = () => {
  const [vendors, setVendors] = useState([]);
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedVerification, setSelectedVerification] = useState('all');
  const [sortBy, setSortBy] = useState('businessName');
  const [viewMode, setViewMode] = useState('grid');

  const statusOptions = [
    { value: 'all', label: 'All Vendors' },
    { value: 'pending', label: 'Pending Approval' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'suspended', label: 'Suspended' }
  ];

  const verificationOptions = [
    { value: 'all', label: 'All Vendors' },
    { value: 'verified', label: 'Verified' },
    { value: 'unverified', label: 'Unverified' }
  ];

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        console.log('Fetching vendors from API...');
        const response = await fetch('http://localhost:8080/vendors');
        console.log('Vendors response status:', response.status);
        
        if (response.ok) {
          const vendorData = await response.json();
          console.log('Fetched vendors:', vendorData);
          
          const formattedVendors = vendorData.map(vendor => ({
            id: vendor.id,
            businessName: vendor.name,
            name: vendor.user?.name || 'N/A',
            email: vendor.user?.email || 'N/A',
            phone: 'N/A',
            status: vendor.status?.toLowerCase() || 'pending',
            isVerified: vendor.status === 'APPROVED',
            registrationDate: new Date().toISOString().split('T')[0],
            totalRevenue: 0,
            totalOrders: 0,
            rating: 0
          }));
          
          setVendors(formattedVendors);
          setFilteredVendors(formattedVendors);
        } else {
          console.error('Failed to fetch vendors:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error fetching vendors:', error);
      }
    };
    fetchVendors();
  }, []);

  useEffect(() => {
    let filtered = vendors.filter(vendor => {
      const matchesSearch = vendor.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          vendor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          vendor.phone.includes(searchTerm);
      const matchesStatus = selectedStatus === 'all' || vendor.status === selectedStatus;
      const matchesVerification = selectedVerification === 'all' ||
                                (selectedVerification === 'verified' && vendor.isVerified) ||
                                (selectedVerification === 'unverified' && !vendor.isVerified);
      
      return matchesSearch && matchesStatus && matchesVerification;
    });

    // Sort vendors
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'businessName':
          return a.businessName.localeCompare(b.businessName);
        case 'name':
          return a.name.localeCompare(b.name);
        case 'registration':
          return new Date(b.registrationDate) - new Date(a.registrationDate);
        case 'revenue':
          return b.totalRevenue - a.totalRevenue;
        case 'orders':
          return b.totalOrders - a.totalOrders;
        case 'rating':
          return b.rating - a.rating;
        default:
          return a.businessName.localeCompare(b.businessName);
      }
    });

    setFilteredVendors(filtered);
  }, [vendors, searchTerm, selectedStatus, selectedVerification, sortBy]);

  const handleViewDetails = (vendor) => {
    alert(`View details for ${vendor.businessName} - This would open a detailed modal`);
  };

  const handleApproveVendor = async (vendorId) => {
    try {
      const response = await fetch(`http://localhost:8080/vendors/${vendorId}/approve`, {
        method: 'PATCH'
      });
      if (response.ok) {
        setVendors(prev => prev.map(vendor =>
          vendor.id === vendorId 
            ? { ...vendor, status: 'approved', isVerified: true, approvalDate: new Date().toISOString() }
            : vendor
        ));
        alert('Vendor approved successfully');
      } else {
        alert('Failed to approve vendor');
      }
    } catch (error) {
      console.error('Error approving vendor:', error);
      alert('Failed to approve vendor');
    }
  };

  const handleRejectVendor = async (vendorId, reason) => {
    try {
      const response = await fetch(`http://localhost:8080/vendors/${vendorId}/reject`, {
        method: 'PATCH'
      });
      if (response.ok) {
        setVendors(prev => prev.map(vendor =>
          vendor.id === vendorId 
            ? { ...vendor, status: 'rejected', isVerified: false, rejectionReason: reason }
            : vendor
        ));
        alert('Vendor rejected successfully');
      } else {
        alert('Failed to reject vendor');
      }
    } catch (error) {
      console.error('Error rejecting vendor:', error);
      alert('Failed to reject vendor');
    }
  };

  const handleSuspendVendor = async (vendorId, reason) => {
    try {
      const response = await fetch(`http://localhost:8080/vendors/${vendorId}/suspend`, {
        method: 'PATCH'
      });
      if (response.ok) {
        setVendors(prev => prev.map(vendor =>
          vendor.id === vendorId 
            ? { ...vendor, status: 'suspended', suspensionReason: reason }
            : vendor
        ));
        alert('Vendor suspended successfully');
      } else {
        alert('Failed to suspend vendor');
      }
    } catch (error) {
      console.error('Error suspending vendor:', error);
      alert('Failed to suspend vendor');
    }
  };

  const handleExportVendors = () => {
    alert('Export functionality would be implemented here');
  };

  const getStatusCounts = () => {
    const counts = {};
    statusOptions.forEach(status => {
      if (status.value === 'all') {
        counts[status.value] = vendors.length;
      } else {
        counts[status.value] = vendors.filter(vendor => vendor.status === status.value).length;
      }
    });
    return counts;
  };

  const statusCounts = getStatusCounts();

  const EmptyVendors = () => (
    <div className="text-center py-12">
      <div className="max-w-md mx-auto">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Store className="w-12 h-12 text-gray-400" />
        </div>
        
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          No vendors found
        </h2>
        <p className="text-gray-600 mb-8">
          {searchTerm || selectedStatus !== 'all' || selectedVerification !== 'all'
            ? 'Try adjusting your search or filter criteria.'
            : 'No vendor applications have been submitted yet.'
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
            <Store className="w-8 h-8 text-emerald-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Vendor Management</h1>
              <p className="text-gray-600">Manage vendor applications and accounts</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={handleExportVendors}
              className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export Vendors</span>
            </button>
            
            {vendors.length > 0 && (
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">{filteredVendors.length}</p>
                <p className="text-sm text-gray-600">
                  {filteredVendors.length === 1 ? 'Vendor' : 'Vendors'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Status Overview */}
        {vendors.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {statusOptions.map((status) => (
              <button
                key={status.value}
                onClick={() => setSelectedStatus(status.value)}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  selectedStatus === status.value
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

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search vendors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* Verification Filter */}
            <select
              value={selectedVerification}
              onChange={(e) => setSelectedVerification(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              {verificationOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="businessName">Business Name</option>
              <option value="name">Owner Name</option>
              <option value="registration">Registration Date</option>
              <option value="revenue">Total Revenue</option>
              <option value="orders">Total Orders</option>
              <option value="rating">Rating</option>
            </select>

            {/* View Mode */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${
                  viewMode === 'grid'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${
                  viewMode === 'list'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Clear Filters */}
          {(searchTerm || selectedStatus !== 'all' || selectedVerification !== 'all') && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedStatus('all');
                  setSelectedVerification('all');
                }}
                className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Vendors Grid */}
        {filteredVendors.length === 0 ? (
          <EmptyVendors />
        ) : (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {filteredVendors.map(vendor => (
              <VendorCard
                key={vendor.id}
                vendor={vendor}
                onViewDetails={handleViewDetails}
                onApprove={handleApproveVendor}
                onReject={handleRejectVendor}
                onSuspend={handleSuspendVendor}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminVendors;