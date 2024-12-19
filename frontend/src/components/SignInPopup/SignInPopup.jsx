import React, { useState } from "react";
import "./SignInPopup.css";

const SignInPopup = ({ isVisible, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
  };

  if (!isVisible) return null;

  return (
    <div className="popup-overlay">
      <div className="signin-popup-container">
        <div className="signin-popup-title">
          <h2>Sign Up</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <form className="signin-popup-form" onSubmit={handleSubmit}>
          <div className="signin-popup-inputs">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Confirm Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Confirm your password"
                required
              />
            </div>
          </div>
          <button type="submit" className="signin-button">
            Sign Up
          </button>
          <div className="signin-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
          </div>
        </form>
        <div className="signin-popup-footer">
          <p>
            Already have an account?{" "}
            <button onClick={() => alert('Redirect to Login page')}>Login</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPopup;
