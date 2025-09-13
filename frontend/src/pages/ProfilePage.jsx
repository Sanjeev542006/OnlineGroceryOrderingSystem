import React, { useState, useEffect } from 'react';
import { User, MapPin, Plus, Edit, Shield, Bell } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import ProfileForm from '../components/profile/ProfileForm';
import AddressCard from '../components/profile/AddressCard';
import AddressForm from '../components/profile/AddressForm';
import NotificationSettings from '../components/profile/NotificationSettings';
import { mockUserProfile } from '../../profileOrdersMockData';

const ProfilePage = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(mockUserProfile);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    // In a real app, fetch user profile data here
    if (user) {
      setProfile(prev => ({
        ...prev,
        name: user.name,
        email: user.email
      }));
    }
  }, [user]);

  const handleSaveProfile = async (updatedProfile) => {
    try {
      setProfile(prev => ({
        ...prev,
        ...updatedProfile
      }));
      setIsEditingProfile(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  const handleSaveAddress = async (addressData) => {
    try {
      if (editingAddress) {
        // Update existing address
        setProfile(prev => ({
          ...prev,
          addresses: prev.addresses.map(addr =>
            addr.id === editingAddress.id
              ? { ...addr, ...addressData }
              : addressData.isDefault
              ? { ...addr, isDefault: false }
              : addr
          )
        }));
      } else {
        // Add new address
        const newAddress = {
          ...addressData,
          id: Date.now()
        };
        
        setProfile(prev => ({
          ...prev,
          addresses: addressData.isDefault
            ? [newAddress, ...prev.addresses.map(addr => ({ ...addr, isDefault: false }))]
            : [...prev.addresses, newAddress]
        }));
      }
      
      setIsAddingAddress(false);
      setEditingAddress(null);
      alert('Address saved successfully!');
    } catch (error) {
      console.error('Error saving address:', error);
      alert('Failed to save address');
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      setProfile(prev => ({
        ...prev,
        addresses: prev.addresses.filter(addr => addr.id !== addressId)
      }));
      alert('Address deleted successfully!');
    } catch (error) {
      console.error('Error deleting address:', error);
      alert('Failed to delete address');
    }
  };

  const handleSetDefaultAddress = async (addressId) => {
    try {
      setProfile(prev => ({
        ...prev,
        addresses: prev.addresses.map(addr => ({
          ...addr,
          isDefault: addr.id === addressId
        }))
      }));
      alert('Default address updated!');
    } catch (error) {
      console.error('Error setting default address:', error);
      alert('Failed to update default address');
    }
  };

  const handleSaveNotificationSettings = async (preferences) => {
    try {
      setProfile(prev => ({
        ...prev,
        preferences
      }));
      alert('Notification preferences updated!');
    } catch (error) {
      console.error('Error updating notification preferences:', error);
      alert('Failed to update preferences');
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile Info', icon: User },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-gray-600 mt-2">Manage your account information and preferences</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-emerald-500 text-emerald-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {/* Profile Info Tab */}
            {activeTab === 'profile' && (
              <div>
                {!isEditingProfile ? (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
                      <button
                        onClick={() => setIsEditingProfile(true)}
                        className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                        <span>Edit Profile</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <p className="text-gray-900">{profile.name}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <p className="text-gray-900">{profile.email}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <p className="text-gray-900">{profile.phone}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                        <p className="text-gray-900">
                          {profile.dateOfBirth ? new Date(profile.dateOfBirth).toLocaleDateString() : 'Not provided'}
                        </p>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Member Since</label>
                          <p className="text-gray-900">{new Date(profile.joinedDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
                          <p className="text-gray-900">Customer</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <ProfileForm
                    profile={profile}
                    onSave={handleSaveProfile}
                    onCancel={() => setIsEditingProfile(false)}
                  />
                )}
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Delivery Addresses</h2>
                  <button
                    onClick={() => setIsAddingAddress(true)}
                    className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Address</span>
                  </button>
                </div>

                {isAddingAddress || editingAddress ? (
                  <AddressForm
                    address={editingAddress}
                    onSave={handleSaveAddress}
                    onCancel={() => {
                      setIsAddingAddress(false);
                      setEditingAddress(null);
                    }}
                  />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {profile.addresses.map((address) => (
                      <AddressCard
                        key={address.id}
                        address={address}
                        onEdit={setEditingAddress}
                        onDelete={handleDeleteAddress}
                        onSetDefault={handleSetDefaultAddress}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <NotificationSettings
                preferences={profile.preferences}
                onSave={handleSaveNotificationSettings}
              />
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Security Settings</h2>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex">
                    <Shield className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">
                        Security features coming soon
                      </h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        <p>We're working on adding password change, two-factor authentication, and other security features.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-2">Change Password</h3>
                    <p className="text-sm text-gray-600 mb-4">Update your password to keep your account secure.</p>
                    <button
                      onClick={() => alert('Password change functionality would be implemented here')}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Change Password
                    </button>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-2">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-600 mb-4">Add an extra layer of security to your account.</p>
                    <button
                      onClick={() => alert('2FA setup functionality would be implemented here')}
                      className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium cursor-not-allowed"
                      disabled
                    >
                      Enable 2FA (Coming Soon)
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;