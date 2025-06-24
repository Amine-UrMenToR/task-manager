// src/pages/RegisterPage.jsx
import { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function RegisterPage() {
  const [creds, setCreds] = useState({ username: '', password: '' });
  const nav = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('/auth/register', creds);
      toast.success('Account created! Please log in.');
      nav('/login');
    } catch (err) {
      toast.error(err.response?.data || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input
        name="username"
        placeholder="Username"
        required
        onChange={e => setCreds({ ...creds, username: e.target.value })}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        onChange={e => setCreds({ ...creds, password: e.target.value })}
      />
      <button type="submit">Register</button>
    </form>
  );
}
