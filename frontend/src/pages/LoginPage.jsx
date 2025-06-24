import { useState, useContext } from 'react';
import axios from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function LoginPage() {
  const [creds, setCreds] = useState({username:'',password:''});
  const { login } = useContext(AuthContext);
  const nav = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', creds);
      login(res.data.token);
      toast.success('Logged in!');
      nav('/');
    } catch {
      toast.error('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" onChange={e=>setCreds({...creds,username:e.target.value})} required/>
      <input type="password" name="password" onChange={e=>setCreds({...creds,password:e.target.value})} required/>
      <button type="submit">Login</button>
    </form>
  );
}
