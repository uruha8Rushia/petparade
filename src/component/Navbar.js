import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Import the CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/about" className="nav-link">
            About
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/product" className="nav-link">
            Product
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/FAQ" className="nav-link">
            FAQ
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
