// Mock data for vendor dashboard, products, and orders

export const mockVendorProfile = {
  id: 2,
  name: 'Fresh Farm Vendor',
  email: 'vendor@grocery.com',
  phone: '+1 (555) 987-6543',
  businessName: 'Fresh Farm Groceries',
  businessAddress: '456 Farm Road, Green Valley, CA 90210',
  joinedDate: '2023-06-15',
  isVerified: true,
  rating: 4.8,
  totalOrders: 1247,
  totalRevenue: 45678.90
};

export const mockVendorProducts = [
  {
    id: 101,
    name: 'Fresh Organic Apples',
    description: 'Crisp and sweet organic apples from our local farm',
    category: 'fruits_vegetables',
    price: 4.99,
    originalPrice: 6.99,
    stockQuantity: 45,
    lowStockThreshold: 10,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&h=300&fit=crop',
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
    totalSold: 234,
    revenue: 1165.66
  },
  {
    id: 102,
    name: 'Premium Bananas',
    description: 'Fresh, ripe bananas packed with natural sweetness',
    category: 'fruits_vegetables',
    price: 2.49,
    originalPrice: 3.49,
    stockQuantity: 8,
    lowStockThreshold: 10,
    status: 'low_stock',
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&h=300&fit=crop',
    createdAt: '2024-01-12T09:15:00Z',
    updatedAt: '2024-01-22T11:45:00Z',
    totalSold: 189,
    revenue: 470.61
  },
  {
    id: 103,
    name: 'Farm Fresh Milk',
    description: 'Whole milk from grass-fed cows, rich in calcium',
    category: 'dairy_eggs',
    price: 3.99,
    originalPrice: 4.99,
    stockQuantity: 0,
    lowStockThreshold: 5,
    status: 'out_of_stock',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&h=300&fit=crop',
    createdAt: '2024-01-08T07:30:00Z',
    updatedAt: '2024-01-23T16:20:00Z',
    totalSold: 156,
    revenue: 622.44
  }
];

export const mockVendorOrders = [
  {
    id: 2001,
    orderNumber: '002001',
    customerId: 3,
    customerName: 'John Doe',
    customerEmail: 'customer@grocery.com',
    customerPhone: '+1 (555) 123-4567',
    status: 'pending',
    orderDate: '2024-01-23T10:30:00Z',
    requestedDeliveryDate: '2024-01-24T16:00:00Z',
    total: 34.47,
    subtotal: 29.97,
    tax: 2.40,
    deliveryFee: 2.10,
    items: [
      {
        productId: 101,
        name: 'Fresh Organic Apples',
        quantity: 3,
        price: 4.99,
        image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&h=300&fit=crop'
      },
      {
        productId: 102,
        name: 'Premium Bananas',
        quantity: 6,
        price: 2.49,
        image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&h=300&fit=crop'
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
    paymentMethod: 'Credit Card ending in 4567',
    paymentStatus: 'paid',
    notes: 'Please deliver between 4-6 PM'
  },
  {
    id: 2002,
    orderNumber: '002002',
    customerId: 4,
    customerName: 'Jane Smith',
    customerEmail: 'jane@example.com',
    customerPhone: '+1 (555) 234-5678',
    status: 'preparing',
    orderDate: '2024-01-22T14:15:00Z',
    requestedDeliveryDate: '2024-01-23T18:00:00Z',
    acceptedAt: '2024-01-22T14:30:00Z',
    total: 19.96,
    subtotal: 17.46,
    tax: 1.40,
    deliveryFee: 1.10,
    items: [
      {
        productId: 101,
        name: 'Fresh Organic Apples',
        quantity: 2,
        price: 4.99,
        image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&h=300&fit=crop'
      },
      {
        productId: 102,
        name: 'Premium Bananas',
        quantity: 3,
        price: 2.49,
        image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&h=300&fit=crop'
      }
    ],
    deliveryAddress: {
      fullName: 'Jane Smith',
      addressLine1: '789 Oak Avenue',
      addressLine2: '',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210'
    },
    paymentMethod: 'PayPal',
    paymentStatus: 'paid',
    notes: ''
  }
];

export const mockVendorAnalytics = {
  totalRevenue: 45678.90,
  totalOrders: 1247,
  totalProducts: 45,
  averageOrderValue: 36.64,
  revenueThisMonth: 8934.56,
  ordersThisMonth: 234,
  revenueGrowth: 12.5,
  orderGrowth: 8.3,
  topProducts: [
    {
      id: 101,
      name: 'Fresh Organic Apples',
      totalSold: 234,
      revenue: 1165.66
    },
    {
      id: 103,
      name: 'Farm Fresh Milk',
      totalSold: 156,
      revenue: 622.44
    },
    {
      id: 102,
      name: 'Premium Bananas',
      totalSold: 189,
      revenue: 470.61
    }
  ],
  revenueByMonth: [
    { month: 'Jan', revenue: 3456.78 },
    { month: 'Feb', revenue: 4123.45 },
    { month: 'Mar', revenue: 3789.12 },
    { month: 'Apr', revenue: 4567.89 },
    { month: 'May', revenue: 5234.56 },
    { month: 'Jun', revenue: 4890.23 }
  ],
  ordersByStatus: {
    pending: 12,
    accepted: 8,
    preparing: 15,
    ready: 6,
    completed: 1206,
    rejected: 0
  }
};

// Helper functions
export const formatProductStatus = (status) => {
  switch (status) {
    case 'active':
      return 'Active';
    case 'inactive':
      return 'Inactive';
    case 'out_of_stock':
      return 'Out of Stock';
    case 'low_stock':
      return 'Low Stock';
    default:
      return 'Unknown';
  }
};

export const formatVendorOrderStatus = (status) => {
  switch (status) {
    case 'pending':
      return 'Pending';
    case 'accepted':
      return 'Accepted';
    case 'preparing':
      return 'Preparing';
    case 'ready':
      return 'Ready for Pickup';
    case 'completed':
      return 'Completed';
    case 'rejected':
      return 'Rejected';
    default:
      return 'Unknown';
  }
};

export const formatProductCategory = (category) => {
  switch (category) {
    case 'fruits_vegetables':
      return 'Fruits & Vegetables';
    case 'dairy_eggs':
      return 'Dairy & Eggs';
    case 'meat_seafood':
      return 'Meat & Seafood';
    case 'bakery':
      return 'Bakery';
    case 'beverages':
      return 'Beverages';
    case 'snacks':
      return 'Snacks';
    case 'pantry':
      return 'Pantry';
    case 'frozen':
      return 'Frozen';
    default:
      return 'Other';
  }
};

export const formatCurrency = (amount) => {
  return `$${amount.toFixed(2)}`;
};

export const formatStockLevel = (quantity, lowStockThreshold = 10) => {
  if (quantity === 0) return 'Out of Stock';
  if (quantity <= lowStockThreshold) return 'Low Stock';
  return 'In Stock';
};

// Status color mappings for vendor orders
export const vendorOrderStatusColors = {
  pending: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    border: 'border-yellow-200',
    icon: 'text-yellow-600'
  },
  accepted: {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    border: 'border-blue-200',
    icon: 'text-blue-600'
  },
  preparing: {
    bg: 'bg-purple-100',
    text: 'text-purple-800',
    border: 'border-purple-200',
    icon: 'text-purple-600'
  },
  ready: {
    bg: 'bg-indigo-100',
    text: 'text-indigo-800',
    border: 'border-indigo-200',
    icon: 'text-indigo-600'
  },
  completed: {
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
  }
};

// Product status colors
export const productStatusColors = {
  active: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    border: 'border-green-200'
  },
  inactive: {
    bg: 'bg-gray-100',
    text: 'text-gray-800',
    border: 'border-gray-200'
  },
  out_of_stock: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    border: 'border-red-200'
  },
  low_stock: {
    bg: 'bg-orange-100',
    text: 'text-orange-800',
    border: 'border-orange-200'
  }
};