import React, { useState } from "react";
import "./SignInPopup.css";
import googleIcon from "../../assets/images/icons8-google.svg";

const SignInPopup = ({ isVisible, onClose }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [currState, setCurrState] = useState("Sign Up");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Email:", email, "Password:", password);
    };

    if (!isVisible) return null;

    return (
        <div className="popup-overlay">
            <div className="signin-popup-container">
                <div className="signin-popup-title">
                    <h2>{currState}</h2>
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
                        {currState === "Sign Up" && (
                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    placeholder="Confirm your password"
                                    required
                                />
                            </div>
                        )}
                    </div>
                    <button type="submit" className="signin-button">
                        {currState === "Sign Up" ? "Sign Up" : "Login"}
                    </button>
                    {currState === "Sign Up" && (
                        <div className="signin-popup-condition">
                            <input type="checkbox" required />
                            <p>By continuing, I agree to the terms of use & privacy policy.</p>
                        </div>
                    )}
                </form>

                {/* Google Sign Up/Login buttons */}
                <div className="google-auth-buttons">
                    {currState === "Sign Up" ? (
                        <button className="google-signup-button">
                            <img src={googleIcon} alt="Google Icon" className="google-icon" />
                            Sign Up with Google
                        </button>
                    ) : (
                        <button className="google-login-button">
                            <img src={googleIcon} alt="Google Icon" className="google-icon" />
                            Login with Google
                        </button>
                    )}
                </div>

                <div className="signin-popup-footer">
                    {currState === "Sign Up" ? (
                        <p>
                            Already have an account?{" "}
                            <button onClick={() => setCurrState("Login")}>Login</button>
                        </p>
                    ) : (
                        <p className="move-down-text">
                            Don’t have an account?{" "}
                            <button onClick={() => setCurrState("Sign Up")}>SignUp</button>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SignInPopup;
