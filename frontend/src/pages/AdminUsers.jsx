import React, { useState, useEffect } from 'react';
import { Users, Search, Filter, Download, Grid, List } from 'lucide-react';
import UserCard from '../components/admin/UserCard';
import { mockUsers } from '../../adminMockData';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedVerification, setSelectedVerification] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'suspended', label: 'Suspended' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'pending', label: 'Pending' }
  ];

  const verificationOptions = [
    { value: 'all', label: 'All Users' },
    { value: 'verified', label: 'Verified' },
    { value: 'unverified', label: 'Unverified' }
  ];

  useEffect(() => {
    setUsers(mockUsers);
    setFilteredUsers(mockUsers);
  }, []);

  useEffect(() => {
    let filtered = users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.phone.includes(searchTerm);
      const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
      const matchesVerification = selectedVerification === 'all' ||
                                (selectedVerification === 'verified' && user.isVerified) ||
                                (selectedVerification === 'unverified' && !user.isVerified);
      
      return matchesSearch && matchesStatus && matchesVerification;
    });

    // Sort users
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'email':
          return a.email.localeCompare(b.email);
        case 'registration':
          return new Date(b.registrationDate) - new Date(a.registrationDate);
        case 'orders':
          return b.totalOrders - a.totalOrders;
        case 'spent':
          return b.totalSpent - a.totalSpent;
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredUsers(filtered);
  }, [users, searchTerm, selectedStatus, selectedVerification, sortBy]);

  const handleViewDetails = (user) => {
    alert(`View details for ${user.name} - This would open a detailed modal`);
  };

  const handleUpdateStatus = async (userId, status) => {
    try {
      setUsers(prev => prev.map(user =>
        user.id === userId ? { ...user, status } : user
      ));
      alert(`User status updated to ${status}`);
    } catch (error) {
      console.error('Error updating user status:', error);
      alert('Failed to update user status');
    }
  };

  const handleSuspendUser = async (userId, reason) => {
    try {
      setUsers(prev => prev.map(user =>
        user.id === userId 
          ? { ...user, status: 'suspended', suspensionReason: reason }
          : user
      ));
      alert('User suspended successfully');
    } catch (error) {
      console.error('Error suspending user:', error);
      alert('Failed to suspend user');
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      setUsers(prev => prev.filter(user => user.id !== userId));
      alert('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
    }
  };

  const handleExportUsers = () => {
    alert('Export functionality would be implemented here');
  };

  const getStatusCounts = () => {
    const counts = {};
    statusOptions.forEach(status => {
      if (status.value === 'all') {
        counts[status.value] = users.length;
      } else {
        counts[status.value] = users.filter(user => user.status === status.value).length;
      }
    });
    return counts;
  };

  const statusCounts = getStatusCounts();

  const EmptyUsers = () => (
    <div className="text-center py-12">
      <div className="max-w-md mx-auto">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Users className="w-12 h-12 text-gray-400" />
        </div>
        
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          No users found
        </h2>
        <p className="text-gray-600 mb-8">
          {searchTerm || selectedStatus !== 'all' || selectedVerification !== 'all'
            ? 'Try adjusting your search or filter criteria.'
            : 'No users are registered in the system yet.'
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
            <Users className="w-8 h-8 text-emerald-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
              <p className="text-gray-600">Manage customer accounts and user data</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={handleExportUsers}
              className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export Users</span>
            </button>
            
            {users.length > 0 && (
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">{filteredUsers.length}</p>
                <p className="text-sm text-gray-600">
                  {filteredUsers.length === 1 ? 'User' : 'Users'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Status Overview */}
        {users.length > 0 && (
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
                placeholder="Search users..."
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
              <option value="name">Sort by Name</option>
              <option value="email">Sort by Email</option>
              <option value="registration">Registration Date</option>
              <option value="orders">Total Orders</option>
              <option value="spent">Total Spent</option>
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

        {/* Users Grid */}
        {filteredUsers.length === 0 ? (
          <EmptyUsers />
        ) : (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {filteredUsers.map(user => (
              <UserCard
                key={user.id}
                user={user}
                onViewDetails={handleViewDetails}
                onUpdateStatus={handleUpdateStatus}
                onSuspend={handleSuspendUser}
                onDelete={handleDeleteUser}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;