import React, { useState } from 'react';
import { Bell, Mail, MessageSquare, Package, Save } from 'lucide-react';

const NotificationSettings = ({ preferences, onSave }) => {
  const [settings, setSettings] = useState(preferences);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await onSave(settings);
    } catch (error) {
      console.error('Error saving notification settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const ToggleSwitch = ({ enabled, onChange }) => (
    <button
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
        enabled ? 'bg-emerald-600' : 'bg-gray-200'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Bell className="w-5 h-5 text-emerald-600" />
          <h3 className="text-lg font-semibold text-gray-900">Notification Preferences</h3>
        </div>
      </div>

      <div className="space-y-6">
        {/* Email Notifications */}
        <div className="flex items-center justify-between">
          <div className="flex items-start space-x-3">
            <Mail className="w-5 h-5 text-gray-500 mt-1" />
            <div>
              <h4 className="text-sm font-medium text-gray-900">Email Notifications</h4>
              <p className="text-sm text-gray-600">Receive important updates via email</p>
            </div>
          </div>
          <ToggleSwitch
            enabled={settings.emailNotifications}
            onChange={() => handleToggle('emailNotifications')}
          />
        </div>

        {/* SMS Notifications */}
        <div className="flex items-center justify-between">
          <div className="flex items-start space-x-3">
            <MessageSquare className="w-5 h-5 text-gray-500 mt-1" />
            <div>
              <h4 className="text-sm font-medium text-gray-900">SMS Notifications</h4>
              <p className="text-sm text-gray-600">Get text messages for urgent updates</p>
            </div>
          </div>
          <ToggleSwitch
            enabled={settings.smsNotifications}
            onChange={() => handleToggle('smsNotifications')}
          />
        </div>

        {/* Order Updates */}
        <div className="flex items-center justify-between">
          <div className="flex items-start space-x-3">
            <Package className="w-5 h-5 text-gray-500 mt-1" />
            <div>
              <h4 className="text-sm font-medium text-gray-900">Order Updates</h4>
              <p className="text-sm text-gray-600">Track your orders with real-time updates</p>
            </div>
          </div>
          <ToggleSwitch
            enabled={settings.orderUpdates}
            onChange={() => handleToggle('orderUpdates')}
          />
        </div>

        {/* Promotional Emails */}
        <div className="flex items-center justify-between">
          <div className="flex items-start space-x-3">
            <Mail className="w-5 h-5 text-gray-500 mt-1" />
            <div>
              <h4 className="text-sm font-medium text-gray-900">Promotional Emails</h4>
              <p className="text-sm text-gray-600">Receive deals, offers, and newsletters</p>
            </div>
          </div>
          <ToggleSwitch
            enabled={settings.promotionalEmails}
            onChange={() => handleToggle('promotionalEmails')}
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-6 border-t border-gray-200 mt-6">
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white rounded-lg transition-colors flex items-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>{isLoading ? 'Saving...' : 'Save Preferences'}</span>
        </button>
      </div>
    </div>
  );
};

export default NotificationSettings;