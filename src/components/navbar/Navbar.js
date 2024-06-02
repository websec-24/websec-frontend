import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogoClick = () => navigate("/");
  const handleLogout = () => {
    logout();
    navigate("/");
  }

  return (
        <nav className="navbar">
            <div className="navbar-logo">
              <h3 onClick={handleLogoClick}>Webshop</h3>
            </div>
            <ul className="navbar-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              {currentUser ? (
                    <>
                      <li><button onClick={handleLogout}>Logout</button></li>
                    </>
                ) : (
                    <>
                      <li><Link to="/login">Login</Link></li>
                      <li><Link to="/signup">Sign Up</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
