import React from 'react';
import { Link } from 'react-router-dom';
import logo from './assets/logo.png';
import './index.css';
import './navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <img src={logo} alt="Logo" className="logo" />
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/datainsights">Data Insights</Link></li>
        <li><Link to="/about-us">About Us</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
