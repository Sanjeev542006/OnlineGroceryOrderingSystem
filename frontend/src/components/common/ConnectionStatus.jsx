import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

const ConnectionStatus = () => {
  const [isConnected, setIsConnected] = useState(null);
  const [show, setShow] = useState(true);

  const checkConnection = async () => {
    try {
      await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'test', password: 'test' })
      });
      setIsConnected(true);
      setTimeout(() => setShow(false), 3000);
    } catch (error) {
      setIsConnected(false);
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  if (!show || isConnected === null) return null;

  return (
    <div className={`fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 transition-opacity duration-500 ${
      isConnected 
        ? 'bg-green-100 border border-green-400 text-green-700' 
        : 'bg-red-100 border border-red-400 text-red-700'
    }`}>
      {isConnected ? (
        <>
          <CheckCircle className="w-4 h-4" />
          <span className="text-sm">Backend Connected</span>
        </>
      ) : (
        <>
          <AlertCircle className="w-4 h-4" />
          <span className="text-sm">Backend Disconnected</span>
        </>
      )}
    </div>
  );
};

export default ConnectionStatus;