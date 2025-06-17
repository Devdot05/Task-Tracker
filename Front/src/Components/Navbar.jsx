// Navbar.js
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('users'))
  const userId = user._id
//   console.log(userId);
  

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <Link className="navbar-brand" to="/">MyApp</Link>

      <div className="ml-auto">
        {!isAuthenticated && location.pathname === '/' && (
          <>
            <Link className="btn btn-outline-primary mx-1" to="/login">Sign In</Link>
            <Link className="btn btn-outline-success mx-1" to="/signup">Sign Up</Link>
          </>
        )}

        {isAuthenticated && location.pathname === '/' &&(
          <>
            <Link className="btn btn-outline-secondary mx-1" to={`/dashboard/${userId}`}>Dashboard</Link>
            <button className="btn btn-danger mx-1" onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
