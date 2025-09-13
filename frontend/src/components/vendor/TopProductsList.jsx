import React from 'react';
import { Trophy, Package } from 'lucide-react';
import { formatCurrency } from '../../../vendorMockData';

const TopProductsList = ({ products, title = "Top Products" }) => {
  if (!products || products.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Trophy className="w-5 h-5 mr-2 text-emerald-600" />
          {title}
        </h3>
        <div className="text-center py-8 text-gray-500">
          <Package className="w-12 h-12 mx-auto mb-2 text-gray-300" />
          <p>No products data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Trophy className="w-5 h-5 mr-2 text-emerald-600" />
        {title}
      </h3>
      
      <div className="space-y-4">
        {products.map((product, index) => (
          <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                index === 0 ? 'bg-yellow-100 text-yellow-800' :
                index === 1 ? 'bg-gray-100 text-gray-800' :
                index === 2 ? 'bg-orange-100 text-orange-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {index + 1}
              </div>
              <div>
                <p className="font-medium text-gray-900">{product.name}</p>
                <p className="text-sm text-gray-600">{product.totalSold} sold</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900">{formatCurrency(product.revenue)}</p>
              <p className="text-sm text-gray-600">revenue</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProductsList;