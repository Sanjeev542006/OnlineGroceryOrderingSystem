import React from 'react';
import { Clock, User, Store, ShoppingBag, CheckCircle } from 'lucide-react';

const ActivityFeed = ({ activities, title = "Recent Activities" }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'user_registration':
        return User;
      case 'vendor_application':
        return Store;
      case 'order_completed':
        return ShoppingBag;
      case 'vendor_approved':
        return CheckCircle;
      default:
        return Clock;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'user_registration':
        return 'text-blue-600 bg-blue-100';
      case 'vendor_application':
        return 'text-purple-600 bg-purple-100';
      case 'order_completed':
        return 'text-green-600 bg-green-100';
      case 'vendor_approved':
        return 'text-emerald-600 bg-emerald-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  if (!activities || activities.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Clock className="w-5 h-5 mr-2 text-emerald-600" />
          {title}
        </h3>
        <div className="text-center py-8 text-gray-500">
          <Clock className="w-12 h-12 mx-auto mb-2 text-gray-300" />
          <p>No recent activities</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Clock className="w-5 h-5 mr-2 text-emerald-600" />
        {title}
      </h3>
      
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activities.map((activity) => {
          const Icon = getActivityIcon(activity.type);
          const colorClasses = getActivityColor(activity.type);
          
          return (
            <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className={`p-2 rounded-full ${colorClasses}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">{activity.description}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatTimeAgo(activity.timestamp)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityFeed;