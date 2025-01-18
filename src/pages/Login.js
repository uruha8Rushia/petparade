import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFavourites } from "../Favourite"; // Ensure Favourite context is imported
import "./Login.css";

const Login = () => {

  const handleBack = () => {
    navigate(-1);
  };
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setFavourites } = useFavourites(); // Destructure setFavourites from useFavourites

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear previous errors
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `action=login&username=${username}&password=${password}`,
      });
      const data = await response.json();
      setLoading(false);
      if (data.message === "Login successful") {
        localStorage.setItem("username", username);

        // Fetch favourites after login
        fetch(`/api/favourites?username=${username}`)
          .then((response) => response.json())
          .then((fetchedFavourites) => {
            setFavourites(fetchedFavourites); // Sync favourites state
          })
          .catch((error) => console.error("Error fetching favourites:", error));

        if (data.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/home");
        }
      } else {
        setError(data.message); // Display backend message as error
      }
    } catch (error) {
      setLoading(false);
      setError("Something went wrong. Please try again."); // General error message
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
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
            {error && <p className="error-message">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
