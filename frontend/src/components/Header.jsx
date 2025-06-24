import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link }        from 'react-router-dom';
import '../Header.css';   // or './Header.css'

export default function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="header">
      <h1>Task Manager</h1>

      <div className="user-actions">
        {user ? (
          <>
            <span>Welcome, {user.username}!</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </header>
  );
}
