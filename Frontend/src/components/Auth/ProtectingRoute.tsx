import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = () => {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get('http://localhost:3000/auth/current-user');
        if (res.status === 201) {
          setAuth(true);
        } else {
          setAuth(false);
        }
      } catch (err) {
        setAuth(false);
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return auth ? <Outlet /> : <Navigate to="/Login" />;
};

export default ProtectedRoute;