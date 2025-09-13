import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const getRoleBasedRedirect = (role) => {
  switch (role) {
    case 'ADMIN':
      return '/admin/dashboard';
    case 'VENDOR':
      return '/vendor/dashboard';
    case 'CUSTOMER':
    default:
      return '/';
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Initialize auth state from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (savedUser && token) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (userData) => {
    try {
      setIsLoading(true);
      
      // Mock authentication logic
      const mockUsers = {
        'admin@grocery.com': { id: 1, email: 'admin@grocery.com', role: 'ADMIN', name: 'Admin User' },
        'vendor@grocery.com': { id: 2, email: 'vendor@grocery.com', role: 'VENDOR', name: 'Vendor User' },
        'customer@grocery.com': { id: 3, email: 'customer@grocery.com', role: 'CUSTOMER', name: 'Customer User' }
      };

      const authenticatedUser = mockUsers[userData.email];
      
      if (authenticatedUser && userData.password === 'password') {
        const token = 'mock-jwt-token-' + Date.now();
        
        localStorage.setItem('user', JSON.stringify(authenticatedUser));
        localStorage.setItem('token', token);
        
        setUser(authenticatedUser);
        return { success: true, user: authenticatedUser };
      } else {
        return { success: false, message: 'Invalid credentials' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Login failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  const register = async (userData) => {
    try {
      setIsLoading(true);
      
      const newUser = {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        role: 'CUSTOMER'
      };

      const token = 'mock-jwt-token-' + Date.now();
      
      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem('token', token);
      
      setUser(newUser);
      return { success: true, user: newUser };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: 'Registration failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    register,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};