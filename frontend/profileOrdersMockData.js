// Mock data for profile and orders

export const mockUserProfile = {
  id: 3,
  name: 'John Doe',
  email: 'customer@grocery.com',
  phone: '+1 (555) 123-4567',
  dateOfBirth: '1990-05-15',
  joinedDate: '2023-01-15',
  addresses: [
    {
      id: 1,
      type: 'home',
      isDefault: true,
      fullName: 'John Doe',
      addressLine1: '123 Main Street',
      addressLine2: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States'
    },
    {
      id: 2,
      type: 'work',
      isDefault: false,
      fullName: 'John Doe',
      addressLine1: '456 Business Ave',
      addressLine2: 'Suite 200',
      city: 'New York',
      state: 'NY',
      zipCode: '10002',
      country: 'United States'
    }
  ],
  preferences: {
    emailNotifications: true,
    smsNotifications: false,
    promotionalEmails: true,
    orderUpdates: true
  }
};

export const mockOrders = [
  {
    id: 1001,
    orderNumber: '001001',
    status: 'delivered',
    orderDate: '2024-01-15T10:30:00Z',
    deliveryDate: '2024-01-15T16:45:00Z',
    total: 67.89,
    subtotal: 59.90,
    tax: 4.79,
    shipping: 3.20,
    items: [
      {
        id: 1,
        name: 'Fresh Organic Apples',
        quantity: 2,
        price: 4.99,
        image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&h=300&fit=crop'
      },
      {
        id: 3,
        name: 'Fresh Milk',
        quantity: 1,
        price: 3.99,
        image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&h=300&fit=crop'
      }
    ],
    deliveryAddress: {
      fullName: 'John Doe',
      addressLine1: '123 Main Street',
      addressLine2: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      zipCode: '10001'
    },
    paymentMethod: 'Credit Card ending in 4567'
  },
  {
    id: 1002,
    orderNumber: '001002',
    status: 'in_transit',
    orderDate: '2024-01-20T14:15:00Z',
    estimatedDelivery: '2024-01-21T18:00:00Z',
    total: 45.67,
    subtotal: 39.98,
    tax: 3.19,
    shipping: 2.50,
    items: [
      {
        id: 2,
        name: 'Premium Bananas',
        quantity: 3,
        price: 2.49,
        image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&h=300&fit=crop'
      },
      {
        id: 4,
        name: 'Whole Grain Bread',
        quantity: 2,
        price: 2.99,
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=300&fit=crop'
      }
    ],
    deliveryAddress: {
      fullName: 'John Doe',
      addressLine1: '123 Main Street',
      addressLine2: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      zipCode: '10001'
    },
    paymentMethod: 'Credit Card ending in 4567'
  },
  {
    id: 1003,
    orderNumber: '001003',
    status: 'processing',
    orderDate: '2024-01-22T09:45:00Z',
    estimatedDelivery: '2024-01-23T17:30:00Z',
    total: 89.34,
    subtotal: 78.45,
    tax: 6.27,
    shipping: 4.62,
    items: [
      {
        id: 5,
        name: 'Premium Chicken Breast',
        quantity: 1,
        price: 8.99,
        image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=300&h=300&fit=crop'
      },
      {
        id: 1,
        name: 'Fresh Organic Apples',
        quantity: 4,
        price: 4.99,
        image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&h=300&fit=crop'
      }
    ],
    deliveryAddress: {
      fullName: 'John Doe',
      addressLine1: '456 Business Ave',
      addressLine2: 'Suite 200',
      city: 'New York',
      state: 'NY',
      zipCode: '10002'
    },
    paymentMethod: 'Credit Card ending in 4567'
  }
];

// Helper functions
export const formatOrderStatus = (status) => {
  switch (status) {
    case 'processing':
      return 'Processing';
    case 'confirmed':
      return 'Confirmed';
    case 'preparing':
      return 'Preparing';
    case 'in_transit':
      return 'In Transit';
    case 'delivered':
      return 'Delivered';
    case 'cancelled':
      return 'Cancelled';
    default:
      return 'Unknown';
  }
};

export const formatOrderDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatOrderNumber = (orderId) => {
  return `#${orderId.toString().padStart(6, '0')}`;
};

export const formatAddressType = (type) => {
  switch (type) {
    case 'home':
      return 'Home';
    case 'work':
      return 'Work';
    case 'other':
      return 'Other';
    default:
      return 'Address';
  }
};

// Status color mappings
export const orderStatusColors = {
  processing: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    border: 'border-yellow-200'
  },
  confirmed: {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    border: 'border-blue-200'
  },
  preparing: {
    bg: 'bg-purple-100',
    text: 'text-purple-800',
    border: 'border-purple-200'
  },
  in_transit: {
    bg: 'bg-indigo-100',
    text: 'text-indigo-800',
    border: 'border-indigo-200'
  },
  delivered: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    border: 'border-green-200'
  },
  cancelled: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    border: 'border-red-200'
  }
};