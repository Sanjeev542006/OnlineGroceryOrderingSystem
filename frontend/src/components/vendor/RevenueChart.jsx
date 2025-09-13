import React from 'react';
import { BarChart3 } from 'lucide-react';

const RevenueChart = ({ data, title = "Revenue Trends" }) => {
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

  const maxRevenue = Math.max(...data.map(item => item.revenue));
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-80">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <BarChart3 className="w-5 h-5 mr-2 text-emerald-600" />
        {title}
      </h3>
      
      <div className="h-64">
        <div className="flex items-end justify-between h-full space-x-2">
          {data.map((item, index) => {
            const height = (item.revenue / maxRevenue) * 100;
            return (
              <div key={index} className="flex flex-col items-center flex-1">
                <div className="relative w-full">
                  <div
                    className="bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-md transition-all duration-300 hover:from-emerald-600 hover:to-emerald-500 cursor-pointer"
                    style={{ height: `${height}%`, minHeight: '8px' }}
                    title={`${item.month}: $${item.revenue.toFixed(2)}`}
                  ></div>
                </div>
                <div className="mt-2 text-xs text-gray-600 font-medium">
                  {item.month}
                </div>
                <div className="text-xs text-gray-500">
                  ${item.revenue.toFixed(0)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;