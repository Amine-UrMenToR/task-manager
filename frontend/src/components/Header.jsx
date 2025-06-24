import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header>
      {user ? (
        <>
          <span>Welcome, {user.username}!</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </header>
  );
}
