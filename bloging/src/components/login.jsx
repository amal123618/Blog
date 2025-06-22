import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
      "https://blog-10-nrph.onrender.com/login/",
      {
        username,
        password
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

      if (response.data.access && response.data.refresh) {
        localStorage.setItem("token", response.data.access);
        localStorage.setItem("refreshToken", response.data.refresh);
        setMessage("Login successful!");
        navigate("/"); 
      } else {
        setMessage("Invalid login response. Please try again.");
      }
    } catch (error) {
      setMessage(error.response?.data?.error || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <h2>Login to Your Blog</h2>
        <p>Access your dashboard and manage your blogs.</p>
      </div>
      <form onSubmit={handleSubmit} className="login-form">
        {message && <p className="error-message">{message}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <p className="register-link">
          Not registered? <Link to="/register">Create an account</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
