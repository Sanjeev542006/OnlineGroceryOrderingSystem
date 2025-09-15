import React, { useState, useEffect } from 'react';
import { Search, Filter, Grid, List, Star, ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const ProductsPage = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');
  const [priceRange, setPriceRange] = useState([0, 100]);

  // Mock products data
  const mockProducts = [
    {
      id: 1,
      name: 'Fresh Organic Apples',
      category: 'Fruits & Vegetables',
      price: 4.99,
      originalPrice: 6.99,
      image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&h=300&fit=crop',
      rating: 4.8,
      reviews: 124,
      inStock: true,
      description: 'Crisp and sweet organic apples, perfect for snacking or baking.'
    },
    {
      id: 2,
      name: 'Premium Bananas',
      category: 'Fruits & Vegetables',
      price: 2.49,
      originalPrice: 3.49,
      image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&h=300&fit=crop',
      rating: 4.6,
      reviews: 89,
      inStock: true,
      description: 'Fresh, ripe bananas packed with natural sweetness and nutrients.'
    },
    {
      id: 3,
      name: 'Fresh Milk',
      category: 'Dairy & Eggs',
      price: 3.99,
      originalPrice: 4.99,
      image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&h=300&fit=crop',
      rating: 4.9,
      reviews: 156,
      inStock: true,
      description: 'Farm-fresh whole milk, rich in calcium and vitamins.'
    },
    {
      id: 4,
      name: 'Whole Grain Bread',
      category: 'Bakery',
      price: 2.99,
      originalPrice: 3.99,
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=300&fit=crop',
      rating: 4.7,
      reviews: 203,
      inStock: true,
      description: 'Nutritious whole grain bread, perfect for sandwiches and toast.'
    },
    {
      id: 5,
      name: 'Premium Chicken Breast',
      category: 'Meat & Seafood',
      price: 8.99,
      originalPrice: 10.99,
      image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=300&h=300&fit=crop',
      rating: 4.8,
      reviews: 78,
      inStock: true,
      description: 'Fresh, lean chicken breast, perfect for healthy meals.'
    },
    {
      id: 6,
      name: 'Orange Juice',
      category: 'Beverages',
      price: 4.49,
      originalPrice: 5.49,
      image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=300&h=300&fit=crop',
      rating: 4.5,
      reviews: 92,
      inStock: false,
      description: 'Freshly squeezed orange juice, no added sugar or preservatives.'
    }
  ];

  const categories = [
    'all',
    'Fruits & Vegetables',
    'Dairy & Eggs',
    'Meat & Seafood',
    'Bakery',
    'Beverages',
    'Snacks'
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('Fetching products from API...');
        const response = await fetch('http://localhost:8080/products');
        console.log('Products response status:', response.status);
        
        if (response.ok) {
          const productData = await response.json();
          console.log('Fetched products:', productData);
          
          const formattedProducts = productData.map(product => ({
            id: product.id,
            name: product.name,
            category: product.category || 'General',
            price: parseFloat(product.price),
            originalPrice: parseFloat(product.price) + 1,
            image: product.imageUrl || 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&h=300&fit=crop',
            rating: 4.5,
            reviews: 50,
            inStock: product.stock > 0,
            description: product.description || 'Fresh quality product'
          }));
          
          setProducts(formattedProducts);
          setFilteredProducts(formattedProducts);
        } else {
          console.error('Failed to fetch products, using mock data');
          setProducts(mockProducts);
          setFilteredProducts(mockProducts);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts(mockProducts);
        setFilteredProducts(mockProducts);
      }
    };
    
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, sortBy, priceRange]);

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 flex space-x-2">
          {product.originalPrice > product.price && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              Save ${(product.originalPrice - product.price).toFixed(2)}
            </span>
          )}
          <button className="bg-white p-2 rounded-full shadow-sm hover:shadow-md transition-shadow">
            <Heart className="w-4 h-4 text-gray-600" />
          </button>
        </div>
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-white text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-3">{product.description}</p>
        
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">${product.price}</span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
            )}
          </div>
          <button
            onClick={() => addToCart(product)}
            disabled={!product.inStock}
            className={`p-2 rounded-lg transition-colors ${
              product.inStock
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const ProductListItem = ({ product }) => (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex">
      <div className="relative w-32 h-32 flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-white text-gray-900 px-2 py-1 rounded text-xs font-medium">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      
      <div className="flex-1 p-4 flex justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{product.description}</p>
          
          <div className="flex items-center">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
          </div>
        </div>
        
        <div className="flex flex-col items-end justify-between">
          <div className="text-right">
            <div className="text-lg font-bold text-gray-900">${product.price}</div>
            {product.originalPrice > product.price && (
              <div className="text-sm text-gray-500 line-through">${product.originalPrice}</div>
            )}
          </div>
          <button
            onClick={() => addToCart(product)}
            disabled={!product.inStock}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
              product.inStock
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">All Products</h1>
          <p className="text-gray-600">Discover fresh, quality products for your daily needs</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
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
              <option value="rating">Highest Rated</option>
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

        {/* Products Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProducts.map(product => (
              <ProductListItem key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Filter className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;