import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {

  const handleBack = () => {
    navigate(-1);
  };
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `action=login&username=${username}&password=${password}`
      });
      const data = await response.json();
      if (data.message === "Login successful") {
        if (data.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/home");
        }
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className="login-container">
        <div className="login-card">
          <div className="login-logo">
            <img src="/nav_logo.png" alt="Logo" />
          </div>
          <form className="login-form" onSubmit={handleLogin}>
            <div className="input-group">
              <label>Username</label>
              <div className="input-field">
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="input-group">
              <label>Password</label>
              <div className="input-field">
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <button type="submit" className="login-button">Login</button>
            <button type="button" className="login-button" onClick={handleBack}>Back to Signup</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;