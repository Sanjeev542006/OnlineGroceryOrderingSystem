import React from 'react';
import { BarChart3 } from 'lucide-react';

const PlatformChart = ({ data, title = "Platform Metrics", type = "revenue" }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-80">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2 text-emerald-600" />
          {title}
        </h3>
        <div className="flex items-center justify-center h-64 text-gray-500">
          <div className="text-center">
            <BarChart3 className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p>No data available</p>
          </div>
        </div>
      </div>
    );
  }

  const getMaxValue = () => {
    switch (type) {
      case 'revenue':
        return Math.max(...data.map(item => item.revenue));
      case 'users':
        return Math.max(...data.map(item => item.users));
      case 'orders':
        return Math.max(...data.map(item => item.orders));
      default:
        return Math.max(...data.map(item => item.revenue));
    }
  };

  const getValue = (item) => {
    switch (type) {
      case 'revenue':
        return item.revenue;
      case 'users':
        return item.users;
      case 'orders':
        return item.orders;
      default:
        return item.revenue;
    }
  };

  const formatValue = (value) => {
    switch (type) {
      case 'revenue':
        return `$${value.toFixed(0)}`;
      case 'users':
      case 'orders':
        return value.toLocaleString();
      default:
        return value.toString();
    }
  };

  const getColorClass = () => {
    switch (type) {
      case 'revenue':
        return 'from-emerald-500 to-emerald-400';
      case 'users':
        return 'from-blue-500 to-blue-400';
      case 'orders':
        return 'from-purple-500 to-purple-400';
      default:
        return 'from-emerald-500 to-emerald-400';
    }
  };

  const maxValue = getMaxValue();
  const colorClass = getColorClass();
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-80">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <BarChart3 className="w-5 h-5 mr-2 text-emerald-600" />
        {title}
      </h3>
      
      <div className="h-64">
        <div className="flex items-end justify-between h-full space-x-2">
          {data.map((item, index) => {
            const value = getValue(item);
            const height = (value / maxValue) * 100;
            
            return (
              <div key={index} className="flex flex-col items-center flex-1">
                <div className="relative w-full">
                  <div
                    className={`bg-gradient-to-t ${colorClass} rounded-t-md transition-all duration-300 hover:opacity-80 cursor-pointer`}
                    style={{ height: `${height}%`, minHeight: '8px' }}
                    title={`${item.month}: ${formatValue(value)}`}
                  ></div>
                </div>
                <div className="mt-2 text-xs text-gray-600 font-medium">
                  {item.month}
                </div>
                <div className="text-xs text-gray-500">
                  {formatValue(value)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PlatformChart;