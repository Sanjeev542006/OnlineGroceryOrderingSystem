import React, { useState, useEffect } from 'react';
import { Package, Plus, Search, Filter, Grid, List } from 'lucide-react';
import ProductForm from '../components/vendor/ProductForm';
import ProductCard from '../components/vendor/ProductCard';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../utils/api';

const VendorProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'fruits_vegetables', label: 'Fruits & Vegetables' },
    { value: 'dairy_eggs', label: 'Dairy & Eggs' },
    { value: 'meat_seafood', label: 'Meat & Seafood' },
    { value: 'bakery', label: 'Bakery' },
    { value: 'beverages', label: 'Beverages' },
    { value: 'snacks', label: 'Snacks' }
  ];

  const statuses = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'low_stock', label: 'Low Stock' },
    { value: 'out_of_stock', label: 'Out of Stock' }
  ];

  const { user } = useAuth();
  const [vendorId, setVendorId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use prebuilt products instead of API
    const prebuiltProducts = [
      { id: 1, name: "Fresh Apples", description: "Crisp red apples", price: 4.99, stock: 50, imageUrl: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400" },
      { id: 2, name: "Organic Bananas", description: "Sweet organic bananas", price: 2.99, stock: 75, imageUrl: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400" },
      { id: 3, name: "Fresh Milk", description: "Whole milk 1 gallon", price: 3.49, stock: 30, imageUrl: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400" },
      { id: 4, name: "Bread Loaf", description: "Whole wheat bread", price: 2.79, stock: 25, imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400" },
      { id: 5, name: "Chicken Breast", description: "Fresh chicken breast", price: 8.99, stock: 20, imageUrl: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400" },
      { id: 6, name: "Tomatoes", description: "Fresh red tomatoes", price: 3.99, stock: 40, imageUrl: "https://images.unsplash.com/photo-1546470427-e5ac89cd0b31?w=400" },
      { id: 7, name: "Lettuce", description: "Fresh green lettuce", price: 1.99, stock: 35, imageUrl: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400" },
      { id: 8, name: "Orange Juice", description: "Fresh orange juice", price: 4.49, stock: 15, imageUrl: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400" },
      { id: 9, name: "Pasta", description: "Italian pasta", price: 1.99, stock: 60, imageUrl: "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400" },
      { id: 10, name: "Rice", description: "Basmati rice 5lb", price: 6.99, stock: 25, imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400" },
      { id: 11, name: "Eggs", description: "Farm fresh eggs dozen", price: 3.99, stock: 45, imageUrl: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400" },
      { id: 12, name: "Cheese", description: "Cheddar cheese block", price: 5.99, stock: 20, imageUrl: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400" },
      { id: 13, name: "Yogurt", description: "Greek yogurt", price: 4.99, stock: 30, imageUrl: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400" },
      { id: 14, name: "Carrots", description: "Fresh carrots", price: 2.49, stock: 55, imageUrl: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400" },
      { id: 15, name: "Potatoes", description: "Russet potatoes 5lb", price: 3.99, stock: 40, imageUrl: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400" },
      { id: 16, name: "Onions", description: "Yellow onions", price: 2.99, stock: 50, imageUrl: "https://images.unsplash.com/photo-1508747703725-719777637510?w=400" },
      { id: 17, name: "Bell Peppers", description: "Mixed bell peppers", price: 4.99, stock: 25, imageUrl: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400" },
      { id: 18, name: "Salmon", description: "Fresh salmon fillet", price: 12.99, stock: 15, imageUrl: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400" },
      { id: 19, name: "Ground Beef", description: "Lean ground beef", price: 7.99, stock: 18, imageUrl: "https://images.unsplash.com/photo-1588347818133-38c4106c7d8d?w=400" },
      { id: 20, name: "Cereal", description: "Breakfast cereal", price: 4.49, stock: 35, imageUrl: "https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?w=400" }
    ];
    
    setProducts(prebuiltProducts);
    setFilteredProducts(prebuiltProducts);
    setLoading(false);
  }, []);

  useEffect(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'stock':
          return b.stockQuantity - a.stockQuantity;
        case 'revenue':
          return b.revenue - a.revenue;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, selectedStatus, sortBy]);

  const handleSaveProduct = async (productData) => {
    try {
      if (editingProduct) {
        // Update existing product
        setProducts(prev => prev.map(product =>
          product.id === editingProduct.id
            ? { ...product, ...productData }
            : product
        ));
        setEditingProduct(null);
      } else {
        // Add new product
        const newProduct = {
          ...productData,
          id: Date.now()
        };
        setProducts(prev => [newProduct, ...prev]);
        setIsAddingProduct(false);
      }
      alert('Product saved successfully!');
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product');
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      setProducts(prev => prev.filter(product => product.id !== productId));
      alert('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

  const handleUpdateStock = async (productId, newStock) => {
    try {
      setProducts(prev => prev.map(product => 
        product.id === productId 
          ? { ...product, stock: newStock }
          : product
      ));
      alert('Stock updated successfully!');
    } catch (error) {
      console.error('Error updating stock:', error);
      alert('Failed to update stock');
    }
  };

  const EmptyProducts = () => (
    <div className="text-center py-12">
      <div className="max-w-md mx-auto">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Package className="w-12 h-12 text-gray-400" />
        </div>
        
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          {searchTerm || selectedCategory !== 'all' || selectedStatus !== 'all' 
            ? 'No products found' 
            : 'No products yet'
          }
        </h2>
        <p className="text-gray-600 mb-8">
          {searchTerm || selectedCategory !== 'all' || selectedStatus !== 'all'
            ? 'Try adjusting your search or filter criteria.'
            : 'Start by adding your first product to the inventory.'
          }
        </p>
        
        {!searchTerm && selectedCategory === 'all' && selectedStatus === 'all' && (
          <button
            onClick={() => setIsAddingProduct(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Add Your First Product
          </button>
        )}
      </div>
    </div>
  );

  if (isAddingProduct || editingProduct) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ProductForm
            product={editingProduct}
            onSave={handleSaveProduct}
            onCancel={() => {
              setIsAddingProduct(false);
              setEditingProduct(null);
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <Package className="w-8 h-8 text-emerald-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
              <p className="text-gray-600">Manage your product inventory and listings</p>
            </div>
          </div>
          
          <button
            onClick={() => setIsAddingProduct(true)}
            className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Add Product</span>
          </button>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              {statuses.map(status => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="stock">Stock Level</option>
              <option value="revenue">Revenue</option>
            </select>

            {/* View Mode */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${
                  viewMode === 'grid'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${
                  viewMode === 'list'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <EmptyProducts />
        ) : (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={setEditingProduct}
                onDelete={handleDeleteProduct}
                onUpdateStock={handleUpdateStock}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorProducts;