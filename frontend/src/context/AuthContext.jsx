// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import axios from '../api/axios';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // On app start, try to load a stored token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;            // nothing to do

    try {
      const { sub, exp } = jwtDecode(token);
      // optional: check expiration
      if (exp * 1000 < Date.now()) throw new Error('Token expired');

      setUser({ username: sub, token });
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } catch (err) {
      console.warn('Stored token invalid, clearing it:', err);
      localStorage.removeItem('token');
    }
  }, []);

  const login = (token) => {
    try {
      const { sub, exp } = jwtDecode(token);
      if (exp * 1000 < Date.now()) throw new Error('Token expired');

      localStorage.setItem('token', token);
      setUser({ username: sub, token });
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      toast.success('Logged in!');
    } catch (err) {
      console.error('Login token invalid:', err);
      toast.error('Received invalid token from server');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    toast.info('Logged out');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
