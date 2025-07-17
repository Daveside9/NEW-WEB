import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // useNavigate instead of useHistory in React Router v6+

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Use navigate for redirection

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/login/",
        {
          username: email, // Pass email as 'username' to match backend
          password,
        },
        {
          headers: {
            "Content-Type": "application/json", // Ensure JSON content type
          },
        }
      );

      if (response.data.message === "Login successful") {
        console.log("Login successful");
        navigate("/dashboard"); // Redirect to the dashboard
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.error || "Invalid credentials");
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default Login;