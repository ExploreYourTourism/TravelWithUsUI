import { FaUser, FaLock, FaFacebookF, FaTwitter, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Login.css";
import charminar from "./assets/images/charminar.jpg";

function Login() {
  return (
    <div className="login-container">
      <div className="left-panel">
        <img src={charminar} alt="Travel" className="travel-image" />
        <div className="overlay">
          <h1>Welcome Back</h1>
          <p>
            Login to continue exploring amazing travel destinations and creating unforgettable memories with us.
          </p>
        </div>
      </div>

      <div className="right-panel">
        <div className="login-card">
          <h1>Login</h1>

          <div className="input-group">
            <label>Username</label>
            <div className="input-box">
              <FaUser className="icon" />
              <input
                type="text"
                placeholder="Type your username"
              />
            </div>
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="input-box">
              <FaLock className="icon" />
              <input
                type="password"
                placeholder="Type your password"
              />
            </div>
          </div>

          <div className="forgot">
            <a href="#">Forgot password?</a>
          </div>

          <button className="login-btn">
            LOGIN
          </button>

          <p className="social-text">
            Or Sign In Using
          </p>

          <div className="social-icons">
            <button>
              <FaFacebookF />
            </button>

            <button>
              <FaTwitter />
            </button>

            <button>
              <FaGoogle />
            </button>
          </div>

          <div className="signup-section">
            <p>Don't have an account?</p>
            <Link to="/register">SIGN UP</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;