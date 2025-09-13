import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Truck, Shield, Clock, Star, ArrowRight } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const HomePage = () => {
  const { addToCart } = useCart();
  const featuredProducts = [
    {
      id: 1,
      name: 'Fresh Organic Apples',
      price: 4.99,
      originalPrice: 6.99,
      image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&h=300&fit=crop',
      rating: 4.8,
      reviews: 124
    },
    {
      id: 2,
      name: 'Premium Bananas',
      price: 2.49,
      originalPrice: 3.49,
      image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&h=300&fit=crop',
      rating: 4.6,
      reviews: 89
    },
    {
      id: 3,
      name: 'Fresh Milk',
      price: 3.99,
      originalPrice: 4.99,
      image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&h=300&fit=crop',
      rating: 4.9,
      reviews: 156
    },
    {
      id: 4,
      name: 'Whole Grain Bread',
      price: 2.99,
      originalPrice: 3.99,
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=300&fit=crop',
      rating: 4.7,
      reviews: 203
    }
  ];

  const categories = [
    { name: 'Fruits & Vegetables', icon: '🥕', count: '150+ items' },
    { name: 'Dairy & Eggs', icon: '🥛', count: '80+ items' },
    { name: 'Meat & Seafood', icon: '🥩', count: '60+ items' },
    { name: 'Bakery', icon: '🍞', count: '45+ items' },
    { name: 'Beverages', icon: '🥤', count: '120+ items' },
    { name: 'Snacks', icon: '🍿', count: '90+ items' }
  ];

  const features = [
    {
      icon: Truck,
      title: 'Free Delivery',
      description: 'Free delivery on orders over $50'
    },
    {
      icon: Clock,
      title: 'Quick Service',
      description: 'Same day delivery available'
    },
    {
      icon: Shield,
      title: 'Quality Guarantee',
      description: '100% fresh and quality products'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Fresh Groceries
                <span className="block text-yellow-300">Delivered Fast</span>
              </h1>
              <p className="text-xl mb-8 text-emerald-100">
                Get your favorite groceries delivered to your doorstep in under 2 hours. 
                Fresh, quality products at the best prices.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-emerald-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Shop Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-emerald-600 transition-colors"
                >
                  Sign Up Free
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=400&fit=crop"
                alt="Fresh groceries"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white text-gray-900 p-4 rounded-lg shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-semibold">Live Tracking</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">Your order is being prepared</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover fresh products across all categories. From farm-fresh produce to daily essentials.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/products?category=${encodeURIComponent(category.name)}`}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center group"
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500">{category.count}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
              <p className="text-gray-600">Hand-picked favorites at great prices</p>
            </div>
            <Link
              to="/products"
              className="text-emerald-600 hover:text-emerald-700 font-semibold flex items-center"
            >
              View All
              <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      Save ${(product.originalPrice - product.price).toFixed(2)}
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                  
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
                      <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                    </div>
                    <button 
                      onClick={() => addToCart(product)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-lg transition-colors"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to start shopping?
          </h2>
          <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust GroceryMart for their daily needs.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center px-8 py-4 bg-white text-emerald-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
          >
            Get Started Today
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;