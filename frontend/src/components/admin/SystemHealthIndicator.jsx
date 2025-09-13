import React from 'react';
import { Monitor, Wifi, Database, Server } from 'lucide-react';

const SystemHealthIndicator = ({ uptime, responseTime, activeConnections, memoryUsage }) => {
  const getHealthStatus = (value, thresholds) => {
    if (value >= thresholds.excellent) return 'excellent';
    if (value >= thresholds.good) return 'good';
    if (value >= thresholds.warning) return 'warning';
    return 'critical';
  };

  const uptimeStatus = getHealthStatus(uptime, { excellent: 99.9, good: 99.5, warning: 99.0 });
  const responseStatus = getHealthStatus(500 - responseTime, { excellent: 300, good: 200, warning: 100 });
  const memoryStatus = getHealthStatus(100 - memoryUsage, { excellent: 30, good: 20, warning: 10 });

  const statusColors = {
    excellent: { bg: 'bg-green-100', text: 'text-green-800', indicator: 'bg-green-500' },
    good: { bg: 'bg-blue-100', text: 'text-blue-800', indicator: 'bg-blue-500' },
    warning: { bg: 'bg-yellow-100', text: 'text-yellow-800', indicator: 'bg-yellow-500' },
    critical: { bg: 'bg-red-100', text: 'text-red-800', indicator: 'bg-red-500' }
  };

  const metrics = [
    {
      label: 'System Uptime',
      value: `${uptime.toFixed(2)}%`,
      status: uptimeStatus,
      icon: Monitor
    },
    {
      label: 'Response Time',
      value: `${responseTime}ms`,
      status: responseStatus,
      icon: Wifi
    },
    {
      label: 'Active Connections',
      value: activeConnections.toLocaleString(),
      status: 'good',
      icon: Database
    },
    {
      label: 'Memory Usage',
      value: `${memoryUsage.toFixed(1)}%`,
      status: memoryStatus,
      icon: Server
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Monitor className="w-5 h-5 mr-2 text-emerald-600" />
        System Health
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          const colors = statusColors[metric.status];
          
          return (
            <div key={index} className={`p-4 rounded-lg ${colors.bg}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon className={`w-5 h-5 ${colors.text}`} />
                  <span className={`text-sm font-medium ${colors.text}`}>
                    {metric.label}
                  </span>
                </div>
                <div className={`w-3 h-3 rounded-full ${colors.indicator}`}></div>
              </div>
              <p className={`text-lg font-bold ${colors.text} mt-1`}>
                {metric.value}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SystemHealthIndicator;