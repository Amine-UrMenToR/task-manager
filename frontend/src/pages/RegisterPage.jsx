import { useState } from 'react';
import axios from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function RegisterPage() {
  const [creds, setCreds] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('/auth/register', creds);
      toast.success('Registered successfully! You can now log in.');
      navigate('/login');
    } catch (err) {
      console.error(err);
      // backend returns 400 if username exists
      toast.error(err.response?.data || 'Registration failed');
    }
  };

  return (
    <div className="container" style={{ maxWidth: '400px', marginTop: '2rem' }}>
      <h2 style={{ color: '#007bff', textAlign: 'center' }}>Register</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={creds.username}
          onChange={e => setCreds({ ...creds, username: e.target.value })}
          required
          style={{ flex: 1, padding: '0.6rem', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={creds.password}
          onChange={e => setCreds({ ...creds, password: e.target.value })}
          required
          style={{ flex: 1, padding: '0.6rem', borderRadius: '4px', border: '1px solid #ccc' }}
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
          Register
        </button>
      </form>
      <p style={{ marginTop: '1rem', textAlign: 'center' }}>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}
