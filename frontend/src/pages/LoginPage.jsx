// src/pages/LoginPage.jsx

import { useState, useContext } from 'react';
import axios from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function LoginPage() {
  const [creds, setCreds] = useState({ username: '', password: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', creds);
      login(res.data.token);
      toast.success('Logged in!');
      navigate('/');
    } catch {
      toast.error('Login failed');
    }
  };

  return (
    <div className="container" style={{ maxWidth: '400px', marginTop: '2rem' }}>
      <h2 style={{ color: '#007bff', textAlign: 'center' }}>Login</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={creds.username}
          onChange={e => setCreds({ ...creds, username: e.target.value })}
          required
          style={{
            flex: 1,
            padding: '0.6rem',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={creds.password}
          onChange={e => setCreds({ ...creds, password: e.target.value })}
          required
          style={{
            flex: 1,
            padding: '0.6rem',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            padding: '0 1rem',
            fontWeight: 500,
          }}
        >
          Login
        </button>
      </form>
      <p style={{ marginTop: '1rem', textAlign: 'center' }}>
        Don’t have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}
