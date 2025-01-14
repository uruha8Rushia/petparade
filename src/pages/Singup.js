import React from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleSignup = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    // Temporarily skip validation and navigate to a confirmation page or home
    navigate("/Home"); // Navigate to the /home page
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-logo">
          <img src="/nav_logo.png" alt="Logo" /> {/* Replace with your logo */}
        </div>
        <form className="signup-form" onSubmit={handleSignup}>
          <div className="input-group">
            <label>Name</label>
            <div className="input-field">
              <input type="text" placeholder="Enter your full name" required />
            </div>
          </div>
          <div className="input-group">
            <label>Gender</label>
            <div className="input-field">
              <select required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div className="input-group">
            <label>Email Address</label>
            <div className="input-field">
              <input type="email" placeholder="Username@gmail.com" required />
            </div>
          </div>
          <div className="input-group">
            <label>Phone</label>
            <div className="input-field">
              <input type="tel" placeholder="Phone number" required />
            </div>
          </div>
          <div className="input-group">
            <label>Address</label>
            <div className="input-field">
              <input type="text" placeholder="Street Address" required />
            </div>
          </div>
          <div className="input-group">
            <label>City</label>
            <div className="input-field">
              <input type="text" placeholder="City" required />
            </div>
          </div>
          <div className="input-group">
            <label>Poskod</label>
            <div className="input-field">
              <input type="text" placeholder="Postal Code" required />
            </div>
          </div>
          <button type="submit" className="signup-button">Sign Up</button>
          <div className="signup-links">
            <a href="/">Back to Login</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
