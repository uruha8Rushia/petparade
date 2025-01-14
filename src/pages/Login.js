import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    // Temporarily skip validation and navigate to home
    navigate("/Home"); // Navigate to the /home page
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-logo">
          <img src="/nav_logo.png" alt="Logo" /> {/* Replace with your logo */}
        </div>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email Address</label>
            <div className="input-field">
              <input type="email" placeholder="Username@gmail.com" />
            </div>
          </div>
          <div className="input-group">
            <label>Password</label>
            <div className="input-field">
              <input type="password" placeholder="Password" />
              <span className="password-toggle">👁️</span> {/* Add toggle functionality */}
            </div>
          </div>
          <button type="submit" className="login-button">Login</button>
          <div className="login-links">
            <a href="/signup">Signup</a>
            <a href="/Help">Help?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
