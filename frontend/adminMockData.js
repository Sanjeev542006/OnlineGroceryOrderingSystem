// Mock data for admin dashboard, users, and vendors

export const mockAdminProfile = {
  id: 1,
  name: 'Admin User',
  email: 'admin@grocery.com',
  role: 'ADMIN',
  permissions: ['user_management', 'vendor_management', 'system_settings', 'analytics'],
  lastLogin: '2024-01-23T09:30:00Z'
};

export const mockSystemAnalytics = {
  totalUsers: 12547,
  activeUsers: 8934,
  totalVendors: 156,
  approvedVendors: 142,
  pendingVendors: 8,
  totalOrders: 45678,
  platformRevenue: 1234567.89,
  monthlyRevenue: 156789.45,
  userGrowth: 15.3,
  vendorGrowth: 8.7,
  orderGrowth: 22.1,
  revenueGrowth: 18.5,
  systemUptime: 99.97,
  averageResponseTime: 245,
  dailyActiveUsers: 3456,
  newRegistrationsToday: 23,
  vendorApplicationsToday: 3,
  revenueByMonth: [
    { month: 'Jan', revenue: 89234.56, users: 1023, orders: 3456 },
    { month: 'Feb', revenue: 95678.12, users: 1156, orders: 3789 },
    { month: 'Mar', revenue: 102345.67, users: 1289, orders: 4123 },
    { month: 'Apr', revenue: 118901.23, users: 1445, orders: 4567 },
    { month: 'May', revenue: 134567.89, users: 1623, orders: 5012 },
    { month: 'Jun', revenue: 156789.45, users: 1834, orders: 5678 }
  ],
  topPerformingVendors: [
    {
      id: 2,
      businessName: 'Fresh Farm Groceries',
      revenue: 45678.90,
      orders: 1247,
      rating: 4.8,
      products: 45
    },
    {
      id: 3,
      businessName: 'Organic Valley Market',
      revenue: 38456.78,
      orders: 1089,
      rating: 4.7,
      products: 38
    },
    {
      id: 4,
      businessName: 'City Fresh Produce',
      revenue: 32145.67,
      orders: 934,
      rating: 4.6,
      products: 42
    }
  ]
};

export const mockUsers = [
  {
    id: 3,
    name: 'John Doe',
    email: 'customer@grocery.com',
    phone: '+1 (555) 123-4567',
    status: 'active',
    registrationDate: '2023-08-15T10:30:00Z',
    lastLogin: '2024-01-23T14:45:00Z',
    totalOrders: 23,
    totalSpent: 1456.78,
    addresses: 2,
    isVerified: true
  },
  {
    id: 4,
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1 (555) 234-5678',
    status: 'active',
    registrationDate: '2023-09-22T16:20:00Z',
    lastLogin: '2024-01-22T11:30:00Z',
    totalOrders: 18,
    totalSpent: 987.45,
    addresses: 1,
    isVerified: true
  },
  {
    id: 5,
    name: 'Mike Johnson',
    email: 'mike@example.com',
    phone: '+1 (555) 345-6789',
    status: 'suspended',
    registrationDate: '2023-07-10T09:15:00Z',
    lastLogin: '2024-01-20T08:22:00Z',
    totalOrders: 5,
    totalSpent: 234.56,
    addresses: 1,
    isVerified: false,
    suspensionReason: 'Multiple policy violations'
  }
];

export const mockVendors = [
  {
    id: 2,
    name: 'Fresh Farm Vendor',
    email: 'vendor@grocery.com',
    phone: '+1 (555) 987-6543',
    businessName: 'Fresh Farm Groceries',
    businessAddress: '456 Farm Road, Green Valley, CA 90210',
    status: 'approved',
    registrationDate: '2023-06-15T12:00:00Z',
    approvalDate: '2023-06-18T14:30:00Z',
    isVerified: true,
    rating: 4.8,
    totalOrders: 1247,
    totalRevenue: 45678.90,
    totalProducts: 45,
    businessLicense: 'BL-2023-001234',
    taxId: 'TX-987654321'
  },
  {
    id: 6,
    name: 'Organic Valley Owner',
    email: 'organic@example.com',
    phone: '+1 (555) 456-7890',
    businessName: 'Organic Valley Market',
    businessAddress: '789 Organic Street, Health City, NY 10001',
    status: 'approved',
    registrationDate: '2023-07-20T10:45:00Z',
    approvalDate: '2023-07-23T16:15:00Z',
    isVerified: true,
    rating: 4.7,
    totalOrders: 1089,
    totalRevenue: 38456.78,
    totalProducts: 38,
    businessLicense: 'BL-2023-001235',
    taxId: 'TX-876543210'
  },
  {
    id: 7,
    name: 'New Vendor',
    email: 'newvendor@example.com',
    phone: '+1 (555) 567-8901',
    businessName: 'New Fresh Market',
    businessAddress: '123 New Street, Fresh Town, FL 33101',
    status: 'pending',
    registrationDate: '2024-01-20T08:30:00Z',
    isVerified: false,
    rating: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    businessLicense: 'BL-2024-001236',
    taxId: 'TX-765432109',
    applicationNotes: 'New vendor application with complete documentation'
  }
];

export const mockRecentActivities = [
  {
    id: 1,
    type: 'user_registration',
    description: 'New user registered: sarah@example.com',
    timestamp: '2024-01-23T15:30:00Z',
    userId: 8
  },
  {
    id: 2,
    type: 'vendor_application',
    description: 'New vendor application: Fresh Mart LLC',
    timestamp: '2024-01-23T14:45:00Z',
    vendorId: 9
  },
  {
    id: 3,
    type: 'order_completed',
    description: 'Order #002003 completed successfully',
    timestamp: '2024-01-23T14:20:00Z',
    orderId: 2003
  },
  {
    id: 4,
    type: 'vendor_approved',
    description: 'Vendor approved: Organic Valley Market',
    timestamp: '2024-01-23T13:15:00Z',
    vendorId: 6,
    adminId: 1
  }
];

// Helper functions
export const formatUserStatus = (status) => {
  switch (status) {
    case 'active':
      return 'Active';
    case 'suspended':
      return 'Suspended';
    case 'inactive':
      return 'Inactive';
    case 'pending':
      return 'Pending';
    default:
      return 'Unknown';
  }
};

export const formatVendorApprovalStatus = (status) => {
  switch (status) {
    case 'pending':
      return 'Pending Approval';
    case 'approved':
      return 'Approved';
    case 'rejected':
      return 'Rejected';
    case 'suspended':
      return 'Suspended';
    default:
      return 'Unknown';
  }
};

export const formatSystemMetric = (value, type) => {
  switch (type) {
    case 'users':
    case 'vendors':
    case 'orders':
      return value.toLocaleString();
    case 'revenue':
      return `$${value.toLocaleString()}`;
    case 'performance':
      return `${value.toFixed(1)}%`;
    default:
      return value.toString();
  }
};

export const formatGrowthRate = (rate) => {
  const sign = rate >= 0 ? '+' : '';
  return `${sign}${rate.toFixed(1)}%`;
};

export const formatUptime = (percentage) => {
  return `${percentage.toFixed(2)}%`;
};

// Status color mappings for admin users
export const adminUserStatusColors = {
  active: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    border: 'border-green-200',
    icon: 'text-green-600'
  },
  suspended: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    border: 'border-red-200',
    icon: 'text-red-600'
  },
  inactive: {
    bg: 'bg-gray-100',
    text: 'text-gray-800',
    border: 'border-gray-200',
    icon: 'text-gray-600'
  },
  pending: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    border: 'border-yellow-200',
    icon: 'text-yellow-600'
  }
};

// Vendor approval status colors
export const vendorApprovalStatusColors = {
  pending: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    border: 'border-yellow-200',
    icon: 'text-yellow-600'
  },
  approved: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    border: 'border-green-200',
    icon: 'text-green-600'
  },
  rejected: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    border: 'border-red-200',
    icon: 'text-red-600'
  },
  suspended: {
    bg: 'bg-orange-100',
    text: 'text-orange-800',
    border: 'border-orange-200',
    icon: 'text-orange-600'
  }
};