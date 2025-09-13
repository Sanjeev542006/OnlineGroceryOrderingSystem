import React from 'react';
import { Search, Filter } from 'lucide-react';

const OrderFilters = ({ filters, onFiltersChange }) => {
  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const statusOptions = [
    { value: '', label: 'All Orders' },
    { value: 'processing', label: 'Processing' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'preparing', label: 'Preparing' },
    { value: 'in_transit', label: 'In Transit' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex items-center space-x-2 mb-4">
        <Filter className="w-5 h-5 text-emerald-600" />
        <h3 className="text-lg font-semibold text-gray-900">Filter Orders</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search orders..."
            value={filters.searchTerm || ''}
            onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        {/* Status Filter */}
        <select
          value={filters.status || ''}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        >
          {statusOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Date From */}
        <input
          type="date"
          placeholder="From date"
          value={filters.dateFrom || ''}
          onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        />

        {/* Date To */}
        <input
          type="date"
          placeholder="To date"
          value={filters.dateTo || ''}
          onChange={(e) => handleFilterChange('dateTo', e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        />
      </div>

      {/* Clear Filters */}
      {(filters.searchTerm || filters.status || filters.dateFrom || filters.dateTo) && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => onFiltersChange({})}
            className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderFilters;