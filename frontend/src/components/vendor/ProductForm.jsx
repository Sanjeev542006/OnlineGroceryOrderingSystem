import React, { useState } from 'react';
import { Package, DollarSign, Hash, FileText, Tag, Image, Save, X } from 'lucide-react';
import { formatProductCategory } from '../../../vendorMockData';

const ProductForm = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    category: product?.category || 'fruits_vegetables',
    price: product?.price || '',
    originalPrice: product?.originalPrice || '',
    stockQuantity: product?.stockQuantity || '',
    lowStockThreshold: product?.lowStockThreshold || 10,
    image: product?.image || '',
    status: product?.status || 'active'
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    { value: 'fruits_vegetables', label: 'Fruits & Vegetables' },
    { value: 'dairy_eggs', label: 'Dairy & Eggs' },
    { value: 'meat_seafood', label: 'Meat & Seafood' },
    { value: 'bakery', label: 'Bakery' },
    { value: 'beverages', label: 'Beverages' },
    { value: 'snacks', label: 'Snacks' },
    { value: 'pantry', label: 'Pantry' },
    { value: 'frozen', label: 'Frozen' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Product description is required';
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'Valid price is required';
    }

    if (formData.originalPrice && formData.originalPrice < formData.price) {
      newErrors.originalPrice = 'Original price should be higher than current price';
    }

    if (!formData.stockQuantity || formData.stockQuantity < 0) {
      newErrors.stockQuantity = 'Valid stock quantity is required';
    }

    if (!formData.image.trim()) {
      newErrors.image = 'Product image URL is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.includes('price') || name.includes('Quantity') || name.includes('Threshold') 
        ? parseFloat(value) || '' 
        : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      await onSave(formData);
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900 flex items-center">
          <Package className="w-6 h-6 mr-2 text-emerald-600" />
          {product ? 'Edit Product' : 'Add New Product'}
        </h3>
        <button
          onClick={onCancel}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Product Name *
          </label>
          <div className="relative">
            <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                errors.name ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter product name"
            />
          </div>
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                errors.description ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter product description"
            />
          </div>
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
        </div>

        {/* Category and Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
              Current Price * ($)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                min="0"
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                  errors.price ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="0.00"
              />
            </div>
            {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
          </div>

          <div>
            <label htmlFor="originalPrice" className="block text-sm font-medium text-gray-700 mb-2">
              Original Price ($)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="number"
                id="originalPrice"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleChange}
                step="0.01"
                min="0"
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                  errors.originalPrice ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="0.00"
              />
            </div>
            {errors.originalPrice && <p className="mt-1 text-sm text-red-600">{errors.originalPrice}</p>}
          </div>
        </div>

        {/* Inventory */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="stockQuantity" className="block text-sm font-medium text-gray-700 mb-2">
              Stock Quantity *
            </label>
            <div className="relative">
              <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="number"
                id="stockQuantity"
                name="stockQuantity"
                value={formData.stockQuantity}
                onChange={handleChange}
                min="0"
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                  errors.stockQuantity ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="0"
              />
            </div>
            {errors.stockQuantity && <p className="mt-1 text-sm text-red-600">{errors.stockQuantity}</p>}
          </div>

          <div>
            <label htmlFor="lowStockThreshold" className="block text-sm font-medium text-gray-700 mb-2">
              Low Stock Alert Threshold
            </label>
            <div className="relative">
              <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="number"
                id="lowStockThreshold"
                name="lowStockThreshold"
                value={formData.lowStockThreshold}
                onChange={handleChange}
                min="0"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="10"
              />
            </div>
          </div>
        </div>

        {/* Product Image */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
            Product Image URL *
          </label>
          <div className="relative">
            <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                errors.image ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="https://example.com/image.jpg"
            />
          </div>
          {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
          {formData.image && (
            <div className="mt-2">
              <img
                src={formData.image}
                alt="Product preview"
                className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white rounded-lg transition-colors flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>{isLoading ? 'Saving...' : 'Save Product'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;