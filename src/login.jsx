import { useState } from "react";
import { FaUser, FaLock, FaFacebookF, FaTwitter, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import LeftPanel from "./LeftPanel";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Login successful:", formData);
      // Add your login API call here
    }
  };

  return (
    <div className="auth-container">
      <LeftPanel 
        title="Welcome Back" 
        description="Login to continue exploring amazing travel destinations and creating unforgettable memories with us."
      />

      <div className="auth-right">
        <div className="auth-card">
          <h1>Login</h1>

          <div className="form-group">
            <label className="form-label">Username</label>
            <div className={`form-input-wrapper ${errors.username ? 'error-border' : ''}`}>
              <FaUser className="icon" />
              <input
                type="text"
                name="username"
                placeholder="Type your username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            {errors.username && <span className="error-text">{errors.username}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className={`form-input-wrapper ${errors.password ? 'error-border' : ''}`}>
              <FaLock className="icon" />
              <input
                type="password"
                name="password"
                placeholder="Type your password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <div className="forgot-link">
            <a href="#">Forgot password?</a>
          </div>

          <button className="btn auth-btn" onClick={handleLogin}>
            LOGIN
          </button>

          <p className="auth-text">Or Sign In Using</p>

          <div className="social-icons">
            <button type="button">
              <FaFacebookF />
            </button>

            <button type="button">
              <FaTwitter />
            </button>

            <button type="button">
              <FaGoogle />
            </button>
          </div>

          <div className="auth-footer">
            <p>Don't have an account? <Link to="/register">SIGN UP</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;