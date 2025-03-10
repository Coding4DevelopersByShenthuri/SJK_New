import React, { useContext, useState, useEffect } from "react";
import "./SignInPopup.css";
import googleIcon from "../../assets/images/icons8-google.svg";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const SignInPopup = ({ isVisible, onClose }) => {
    const { url, setToken } = useContext(StoreContext);
    const [currState, setCurrState] = useState("Sign Up");
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    });

    useEffect(() => {
        // Check if token exists in localStorage but don't auto-set it unless user logs in
        const storedToken = localStorage.getItem("token");
        if (!storedToken) {
            setToken(null); // Ensure user stays logged out on reload
        }
    }, [setToken]);

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const endpoint = currState === "Sign Up" ? "/api/user/signup" : "/api/user/login";
        const fullUrl = `${url}${endpoint}`;

        console.log("API Request to:", fullUrl);

        try {
            const response = await axios.post(fullUrl, data);

            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                toast.success(response.data.message);
                onClose();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Axios Error:", error.response || error.message);
            toast.error(error.response?.data?.message || "Something went wrong!");
        }
    };


    if (!isVisible) return null;

    return (
        <div className="popup-overlay">
            <div onSubmit={onSubmitHandler} className="signin-popup-container">
                <div className="signin-popup-title">
                    <h2>{currState}</h2>
                    <button className="close-button" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <form className="signin-popup-form" onSubmit={onSubmitHandler}>
                    <div className="signin-popup-inputs">
                        {currState === "Sign Up" && (
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    onChange={onChangeHandler}
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>
                        )}
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={data.email}
                                onChange={onChangeHandler}
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={data.password}
                                onChange={onChangeHandler}
                                placeholder="Enter your password"
                                required
                            />
                        </div>
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