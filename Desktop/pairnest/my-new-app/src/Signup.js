import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Eye icon for password visibility toggle

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // State for confirm password

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation for matching passwords
    if (password !== confirmPassword) {
      alert("Passwords do not match");
    } else {
      // Proceed with signup logic (API call, etc.)
      console.log("Signup successful");
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        {/* Email Input */}
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password Input */}
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <div className="password-input">
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        {/* Confirm Password Input */}
        <div className="input-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <div className="password-input">
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            >
              {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
