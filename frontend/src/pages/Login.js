import React, { useState } from "react";
import "../styles/Login.css";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple check for now
    if (username === "admin" && password === "admin123") {
      setError("");
      onLogin();
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="login-page">
      <h1 className="page-heading">Student Database Portal</h1>
      <div className="login-container">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoFocus
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        {error && <p className="message error">{error}</p>}
      </div>
    </div>
  );
}

export default Login;
