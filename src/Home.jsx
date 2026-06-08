import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaSignOutAlt, FaSignInAlt } from "react-icons/fa";
import "./Home.css";
import { useCart } from "./contexts/CartContext";
import { useAuth } from "./contexts/AuthContext";

function Logo() {
  return (
    <svg width="50" height="50" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="45" fill="#0ea5e9" />
      <path d="M50 15 L70 55 L50 85 L30 55 Z" fill="#ffffff" />
      <circle cx="50" cy="50" r="10" fill="#f59e0b" />
    </svg>
  );
}

const places = [
  { name: "Charminar",        price: 1999, image: "https://images.unsplash.com/photo-1588416499018-d0c6218c4b2c?w=600", desc: "The iconic monument and symbol of Hyderabad." },
  { name: "Golconda Fort",    price: 2499, image: "https://images.unsplash.com/photo-1599661046827-dacde6976549?w=600", desc: "Historic fort known for amazing architecture." },
  { name: "Birla Mandir",     price: 1499, image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600", desc: "Beautiful white marble temple with city views." },
  { name: "Salar Jung Museum",price: 1799, image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=600", desc: "One of India's largest museums." },
  { name: "Hussain Sagar",    price: 999,  image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600", desc: "Famous lake with Buddha statue." },
  { name: "Ramoji Film City", price: 3499, image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600", desc: "World's largest integrated film studio complex." },
];

function Home() {
  const [search, setSearch] = useState("");
  const { cart, addToCart, totalItems } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const inCart = (name) => cart.some(i => i.name === name);

  const filtered = places.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home-container">
      <nav className="home-navbar">
        <div className="brand" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
          <Logo />
          <div>
            <h2>HydVista</h2>
            <p>Explore Hyderabad</p>
          </div>
        </div>

        <div className="menu d-flex align-items-center gap-2 gap-md-3">
          <button onClick={() => navigate('/')} className="menu-btn">Home</button>
          <button className="menu-btn">Places</button>
          <button className="menu-btn">Gallery</button>
          <button className="menu-btn">Contact</button>

          {/* Cart icon */}
          <button className="cart-icon-btn" onClick={() => navigate('/cart')} title="My Trip Cart">
            <FaShoppingCart />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </button>

          {/* Auth */}
          {user ? (
            <div className="d-flex align-items-center gap-2">
              <span style={{ fontSize: '13px', color: '#555', fontWeight: 500 }}>
                Hi, {user.username || user.phone || 'User'}
              </span>
              <button className="menu-btn d-flex align-items-center gap-1" onClick={() => { logout(); navigate('/login'); }}>
                <FaSignOutAlt /> Logout
              </button>
            </div>
          ) : (
            <button className="login-nav-btn" onClick={() => navigate('/login')}>
              <FaSignInAlt className="me-1" /> Login
            </button>
          )}
        </div>
      </nav>

      <section className="hero">
        <h1>Discover Hyderabad</h1>
        <p>Explore forts, temples, museums, lakes and the rich culture of the City of Pearls.</p>
        <input
          type="text"
          placeholder="Search tourist places..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </section>

      <section className="cards">
        {filtered.map((place) => (
          <div className="place-card" key={place.name}>
            <img src={place.image} alt={place.name} />
            <div className="card-content">
              <h3>{place.name}</h3>
              <p>{place.desc}</p>
              <div className="d-flex justify-content-between align-items-center mt-2">
                <span className="place-price">₹{place.price.toLocaleString('en-IN')}<small>/person</small></span>
                <button
                  className={`add-cart-btn${inCart(place.name) ? ' added' : ''}`}
                  onClick={() => addToCart(place)}
                >
                  {inCart(place.name) ? '✓ Added' : '+ Add to Trip'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Floating cart bar when items added */}
      {totalItems > 0 && (
        <div className="cart-floater" onClick={() => navigate('/cart')}>
          <span>{totalItems} {totalItems === 1 ? 'place' : 'places'} added</span>
          <span className="cart-floater-cta">View Trip Cart →</span>
        </div>
      )}

      <footer>
        <h3>HydVista Tourism</h3>
        <p>Experience the heritage and beauty of Hyderabad.</p>
      </footer>
    </div>
  );
}

export default Home;
