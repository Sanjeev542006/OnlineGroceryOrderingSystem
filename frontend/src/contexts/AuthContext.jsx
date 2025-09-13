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
      
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password
        })
      });

      if (response.ok) {
        const authResponse = await response.json();
        
        const user = {
          email: userData.email,
          role: authResponse.role
        };
        
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', authResponse.token);
        
        setUser(user);
        return { success: true, user };
      } else {
        const errorMessage = await response.text();
        return { success: false, message: errorMessage };
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        return { success: false, message: 'Cannot connect to server. Please ensure the backend is running on http://localhost:8080' };
      }
      return { success: false, message: 'Network error. Please try again.' };
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
      
      const response = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          password: userData.password,
          role: userData.role,
          address: userData.address || ''
        })
      });

      if (response.ok) {
        const message = await response.text();
        return { success: true, message };
      } else {
        const errorMessage = await response.text();
        return { success: false, message: errorMessage };
      }
    } catch (error) {
      console.error('Registration error:', error);
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        return { success: false, message: 'Cannot connect to server. Please ensure the backend is running on http://localhost:8080' };
      }
      return { success: false, message: 'Network error. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  };

  const getAuthToken = () => {
    return localStorage.getItem('token');
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    register,
    getAuthToken,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};