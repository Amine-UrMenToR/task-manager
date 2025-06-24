// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from 'react';
// src/context/AuthContext.jsx
import jwtDecode from 'jwt-decode';

import axios from '../api/axios';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const { sub } = jwtDecode(token);
      setUser({ username: sub, token });
      axios.defaults.headers.Authorization = `Bearer ${token}`;
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    const { sub } = jwtDecode(token);
    setUser({ username: sub, token });
    axios.defaults.headers.Authorization = `Bearer ${token}`;
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.Authorization;
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
