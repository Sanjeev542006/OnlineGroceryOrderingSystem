import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({ title, value, change, changeType, icon: Icon, color = 'emerald' }) => {
  const colorClasses = {
    emerald: 'from-emerald-500 to-emerald-600',
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600'
  };

  return (
    <div className={`bg-gradient-to-r ${colorClasses[color]} text-white rounded-lg p-6 shadow-sm`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/80 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
          {change !== undefined && (
            <div className="flex items-center mt-2">
              {changeType === 'increase' ? (
                <TrendingUp className="w-4 h-4 text-white/80 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-white/80 mr-1" />
              )}
              <span className="text-white/80 text-sm">
                {Math.abs(change)}% {changeType === 'increase' ? 'increase' : 'decrease'}
              </span>
            </div>
          )}
        </div>
        <div className="bg-white/20 p-3 rounded-full">
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;