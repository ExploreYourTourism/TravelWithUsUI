import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaShoppingCart, FaSignOutAlt, FaSignInAlt,
  FaStar, FaStarHalfAlt, FaRegStar,
  FaMapMarkerAlt, FaClock, FaTimes,
  FaCheckCircle, FaMinus, FaPlus,
  FaCalendarAlt, FaUsers, FaCheck,
} from "react-icons/fa";
import { useCart } from "./contexts/CartContext";
import { useAuth } from "./contexts/AuthContext";
import "./Places.css";

function Logo() {
  return (
    <svg width="50" height="50" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="45" fill="#0ea5e9" />
      <path d="M50 15 L70 55 L50 85 L30 55 Z" fill="#ffffff" />
      <circle cx="50" cy="50" r="10" fill="#f59e0b" />
    </svg>
  );
}

const CATEGORIES = ["All", "Monuments", "Devotional", "Nature", "Culture"];

const CAT_COLORS = {
  Monuments: { bg: "#fef3c7", text: "#d97706", border: "#fcd34d" },
  Devotional: { bg: "#fce7f3", text: "#be185d", border: "#f9a8d4" },
  Nature:     { bg: "#d1fae5", text: "#065f46", border: "#6ee7b7" },
  Culture:    { bg: "#dbeafe", text: "#1e40af", border: "#93c5fd" },
};

const PLACES = [
  {
    id: 1, name: "Charminar", category: "Monuments",
    location: "Old City, Hyderabad", rating: 4.8, reviews: 12450,
    price: 1999, childPrice: 999, duration: "2–3 hrs", badge: "Most Popular",
    image: "https://images.unsplash.com/photo-1588416499018-d0c6218c4b2c?w=800&h=520&fit=crop",
    desc: "The iconic 16th-century mosque — symbol of Hyderabad, built by Sultan Muhammad Quli Qutb Shah in 1591.",
    highlights: ["4 imposing minarets & arches", "Laad Bazaar bangle market", "Evening illumination show"],
    includes: ["Entry ticket", "Guided tour", "Audio guide"],
  },
  {
    id: 2, name: "Golconda Fort", category: "Monuments",
    location: "Ibrahim Bagh, Hyderabad", rating: 4.7, reviews: 9820,
    price: 2499, childPrice: 1199, duration: "3–4 hrs", badge: "Heritage Site",
    image: "https://images.unsplash.com/photo-1599661046827-dacde6976549?w=800&h=520&fit=crop",
    desc: "A magnificent medieval citadel with a famous acoustic system, once the world's hub for diamond trade.",
    highlights: ["Acoustic clapping system", "Light & sound show nightly", "Panoramic city views"],
    includes: ["Entry ticket", "Guide", "Sound show pass"],
  },
  {
    id: 3, name: "Chowmahalla Palace", category: "Monuments",
    location: "Khilwat, Old City", rating: 4.6, reviews: 6230,
    price: 1799, childPrice: 899, duration: "2–3 hrs", badge: "",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed6736c?w=800&h=520&fit=crop",
    desc: "Opulent seat of the Asaf Jahi Nizams featuring baroque and Indo-Saracenic architecture.",
    highlights: ["Vintage royal car collection", "Magnificent Durbar Hall", "Pristine Mughal gardens"],
    includes: ["Entry ticket", "Guided tour", "Photography pass"],
  },
  {
    id: 4, name: "Birla Mandir", category: "Devotional",
    location: "Naubat Pahad Hill, Hyderabad", rating: 4.9, reviews: 15100,
    price: 499, childPrice: 0, duration: "1–2 hrs", badge: "Free for Children",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=520&fit=crop",
    desc: "A stunning white Rajasthani marble Venkateswara temple perched on a hill with breathtaking city views.",
    highlights: ["Gleaming white marble architecture", "Hilltop panoramic views", "Serene meditation area"],
    includes: ["Entry ticket", "Prasadam", "Guided puja"],
  },
  {
    id: 5, name: "Chilkur Balaji Temple", category: "Devotional",
    location: "Chilkur, Hyderabad", rating: 4.8, reviews: 8720,
    price: 299, childPrice: 0, duration: "1–2 hrs", badge: "Visa Balaji",
    image: "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?w=800&h=520&fit=crop",
    desc: "Known as the 'Visa Balaji' temple — millions visit this 500-year-old Vaishnava shrine for overseas blessings.",
    highlights: ["Ancient 500-year-old shrine", "No donation box policy", "Circumambulation ritual"],
    includes: ["Entry ticket", "Prasadam", "Guided darshan"],
  },
  {
    id: 6, name: "Mecca Masjid", category: "Devotional",
    location: "Charminar Area, Hyderabad", rating: 4.7, reviews: 7350,
    price: 199, childPrice: 0, duration: "1 hr", badge: "",
    image: "https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=800&h=520&fit=crop",
    desc: "One of India's oldest and largest mosques built in 1694 — bricks from Mecca were used in the central arch.",
    highlights: ["Bricks sourced from Mecca", "Capacity 10,000 worshippers", "15 arches of granite"],
    includes: ["Entry ticket", "Guided tour", "Heritage walk"],
  },
  {
    id: 7, name: "Hussain Sagar Lake", category: "Nature",
    location: "Tank Bund Road, Hyderabad", rating: 4.5, reviews: 18920,
    price: 999, childPrice: 499, duration: "2–3 hrs", badge: "Family Favourite",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=520&fit=crop",
    desc: "A heart-shaped lake from 1562, home to the iconic 18-metre monolithic Buddha statue on Rock of Gibraltar island.",
    highlights: ["Giant Buddha statue island", "Speed boat & cruise rides", "Lumbini Park & NTR Garden"],
    includes: ["Entry ticket", "Boat ride", "Park access"],
  },
  {
    id: 8, name: "KBR National Park", category: "Nature",
    location: "Jubilee Hills, Hyderabad", rating: 4.6, reviews: 5410,
    price: 599, childPrice: 299, duration: "2–3 hrs", badge: "Eco Retreat",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&h=520&fit=crop",
    desc: "A 390-acre urban forest and biodiversity reserve in the heart of the city, perfect for trekking and bird watching.",
    highlights: ["600+ plant species", "100+ bird species", "Morning trek trails"],
    includes: ["Entry pass", "Nature guide", "Trail map"],
  },
  {
    id: 9, name: "Nehru Zoological Park", category: "Nature",
    location: "Mir Alam Tank Road, Hyderabad", rating: 4.4, reviews: 11200,
    price: 1299, childPrice: 649, duration: "4–5 hrs", badge: "",
    image: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=800&h=520&fit=crop",
    desc: "One of India's largest zoos spanning 380 acres with 1,500+ animals including tigers, lions, and elephants.",
    highlights: ["Tiger & lion safari zone", "Butterfly park", "Toy train ride"],
    includes: ["Entry ticket", "Safari pass", "Butterfly park"],
  },
  {
    id: 10, name: "Salar Jung Museum", category: "Culture",
    location: "Dar-ul-Shifa, Hyderabad", rating: 4.7, reviews: 9340,
    price: 1799, childPrice: 899, duration: "3–4 hrs", badge: "National Museum",
    image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800&h=520&fit=crop",
    desc: "One of three National Museums of India, housing Nawab Salar Jung III's extraordinary private collection of art.",
    highlights: ["Famous Musical Clock hourly show", "Veiled Rebecca marble sculpture", "Priceless jade collection"],
    includes: ["Entry ticket", "Audio guide", "Museum booklet"],
  },
  {
    id: 11, name: "Ramoji Film City", category: "Culture",
    location: "Hayathnagar, Hyderabad", rating: 4.8, reviews: 22100,
    price: 3499, childPrice: 1749, duration: "Full Day", badge: "Guinness Record",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=520&fit=crop",
    desc: "World's largest integrated film studio complex (certified by Guinness), spanning 1666 acres with themed zones.",
    highlights: ["50+ live shows daily", "Bollywood studio set tours", "1666-acre entertainment campus"],
    includes: ["Full-day pass", "Live shows", "Studio tours", "Transfers"],
  },
  {
    id: 12, name: "Laad Bazaar", category: "Culture",
    location: "Near Charminar, Hyderabad", rating: 4.5, reviews: 6800,
    price: 799, childPrice: 399, duration: "2–3 hrs", badge: "",
    image: "https://images.unsplash.com/photo-1566604008577-ff1a2b8e0e94?w=800&h=520&fit=crop",
    desc: "A 400-year-old street bazaar near Charminar, dazzling with lacquer bangles, pearls, bridal wear, and street food.",
    highlights: ["Famous lacquer bangle shops", "Pearl & gold jewellery", "Traditional Hyderabadi street food"],
    includes: ["Shopping tour guide", "Tasting walk", "Transport"],
  },
];

function StarRating({ rating }) {
  return (
    <span className="stars">
      {[1, 2, 3, 4, 5].map(i => (
        i <= Math.floor(rating) ? <FaStar key={i} /> :
        i - rating < 1 ? <FaStarHalfAlt key={i} /> :
        <FaRegStar key={i} />
      ))}
    </span>
  );
}

const today = new Date().toISOString().split("T")[0];

export default function Places() {
  const navigate = useNavigate();
  const { cart, addToCart, totalItems } = useCart();
  const { user, logout } = useAuth();

  const [activeCategory, setActiveCategory] = useState("All");
  const [bookingPlace, setBookingPlace] = useState(null);
  const [booking, setBooking] = useState({ date: "", adults: 1, children: 0, requests: "" });
  const [bookingErrors, setBookingErrors] = useState({});
  const [booked, setBooked] = useState(false);

  const filtered = activeCategory === "All"
    ? PLACES
    : PLACES.filter(p => p.category === activeCategory);

  const inCart = name => cart.some(i => i.name === name);

  const openBooking = place => {
    setBookingPlace(place);
    setBooking({ date: "", adults: 1, children: 0, requests: "" });
    setBookingErrors({});
    setBooked(false);
  };

  const closeBooking = () => { setBookingPlace(null); setBooked(false); };

  const adjust = (field, delta) =>
    setBooking(b => ({ ...b, [field]: Math.max(field === "adults" ? 1 : 0, b[field] + delta) }));

  const validateBooking = () => {
    const e = {};
    if (!booking.date) { e.date = "Select a visit date"; }
    else if (booking.date < today) { e.date = "Date must be today or later"; }
    setBookingErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleConfirm = () => {
    if (!validateBooking()) return;
    setBooked(true);
  };

  useEffect(() => {
    if (!bookingPlace) return;
    const onKey = e => { if (e.key === "Escape") closeBooking(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [bookingPlace]);

  const grandTotal = bookingPlace
    ? booking.adults * bookingPlace.price
    + booking.children * bookingPlace.childPrice
    + 500
    : 0;

  return (
    <div className="places-wrapper">

      {/* ── Navbar ── */}
      <nav className="home-navbar">
        <div className="brand" style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          <Logo />
          <div><h2>HydVista</h2><p>Explore Hyderabad</p></div>
        </div>
        <div className="menu d-flex align-items-center gap-2 gap-md-3">
          <button onClick={() => navigate("/")}        className="menu-btn">Home</button>
          <button onClick={() => navigate("/places")}  className="menu-btn nav-active">Places</button>
          <button onClick={() => navigate("/gallery")} className="menu-btn">Gallery</button>
          <button onClick={() => navigate("/contact")} className="menu-btn">Contact</button>
          <button className="cart-icon-btn" onClick={() => navigate("/cart")} title="My Trip Cart">
            <FaShoppingCart />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </button>
          {user ? (
            <div className="d-flex align-items-center gap-2">
              <span style={{ fontSize: "13px", color: "#555", fontWeight: 500 }}>
                Hi, {user.username || user.phone || "User"}
              </span>
              <button className="menu-btn d-flex align-items-center gap-1"
                onClick={() => { logout(); navigate("/login"); }}>
                <FaSignOutAlt /> Logout
              </button>
            </div>
          ) : (
            <button className="login-nav-btn" onClick={() => navigate("/login")}>
              <FaSignInAlt className="me-1" /> Login
            </button>
          )}
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="places-hero">
        <div className="places-hero-inner">
          <span className="places-tag">🗺️ Explore Places</span>
          <h1>Discover Hyderabad</h1>
          <p>From ancient forts to serene lakes — book your perfect Hyderabad experience instantly.</p>
          <div className="places-stats">
            <div className="pstat"><strong>{PLACES.length}+</strong><span>Places</span></div>
            <div className="pstat-div" />
            <div className="pstat"><strong>4</strong><span>Categories</span></div>
            <div className="pstat-div" />
            <div className="pstat"><strong>50K+</strong><span>Happy Visitors</span></div>
          </div>
        </div>
      </section>

      {/* ── Filters ── */}
      <div className="places-filters">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`pf-btn${activeCategory === cat ? " active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat === "All"        && "🌐 "}
            {cat === "Monuments"  && "🏛️ "}
            {cat === "Devotional" && "🛕 "}
            {cat === "Nature"     && "🌿 "}
            {cat === "Culture"    && "🎭 "}
            {cat}
            <span className="pf-count">
              {cat === "All" ? PLACES.length : PLACES.filter(p => p.category === cat).length}
            </span>
          </button>
        ))}
      </div>

      {/* ── Places Grid ── */}
      <section className="places-grid-section">
        <div className="places-grid">
          {filtered.map(place => {
            const col = CAT_COLORS[place.category];
            const added = inCart(place.name);
            return (
              <div className="place-card-v2" key={place.id}>

                {/* Image */}
                <div className="pcv2-img">
                  <img src={place.image} alt={place.name} loading="lazy" />
                  <span className="pcv2-cat-badge" style={{ background: col.bg, color: col.text, border: `1px solid ${col.border}` }}>
                    {place.category}
                  </span>
                  {place.badge && <span className="pcv2-top-badge">{place.badge}</span>}
                </div>

                {/* Body */}
                <div className="pcv2-body">
                  <h3 className="pcv2-name">{place.name}</h3>

                  <div className="pcv2-meta">
                    <span className="pcv2-loc"><FaMapMarkerAlt /> {place.location}</span>
                    <span className="pcv2-dur"><FaClock /> {place.duration}</span>
                  </div>

                  <div className="pcv2-rating">
                    <StarRating rating={place.rating} />
                    <span className="pcv2-rating-num">{place.rating}</span>
                    <span className="pcv2-reviews">({place.reviews.toLocaleString("en-IN")} reviews)</span>
                  </div>

                  <p className="pcv2-desc">{place.desc}</p>

                  <ul className="pcv2-highlights">
                    {place.highlights.map((h, i) => (
                      <li key={i}><FaCheck className="pcv2-check" />{h}</li>
                    ))}
                  </ul>

                  <div className="pcv2-footer">
                    <div className="pcv2-price">
                      <span className="pcv2-price-label">From</span>
                      <span className="pcv2-price-val">₹{place.price.toLocaleString("en-IN")}</span>
                      <span className="pcv2-price-unit">/person</span>
                    </div>
                    <div className="pcv2-actions">
                      <button
                        className={`pcv2-cart-btn${added ? " added" : ""}`}
                        onClick={() => addToCart(place)}
                      >
                        {added ? "✓ Added" : "+ Cart"}
                      </button>
                      <button className="pcv2-book-btn" onClick={() => openBooking(place)}>
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Booking Modal ── */}
      {bookingPlace && (
        <div className="bk-backdrop" onClick={closeBooking}>
          <div className="bk-modal" onClick={e => e.stopPropagation()}>
            <button className="bk-close" onClick={closeBooking}><FaTimes /></button>

            {booked ? (
              /* ── Success Screen ── */
              <div className="bk-success">
                <div className="bk-success-icon"><FaCheckCircle /></div>
                <h2>Booking Confirmed!</h2>
                <p>Your trip to <strong>{bookingPlace.name}</strong> is booked.</p>
                <div className="bk-success-details">
                  <div><span>📅 Visit Date</span><strong>{new Date(booking.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</strong></div>
                  <div><span>👥 Guests</span><strong>{booking.adults} Adult{booking.adults > 1 ? "s" : ""}{booking.children > 0 ? ` · ${booking.children} Child${booking.children > 1 ? "ren" : ""}` : ""}</strong></div>
                  <div><span>💰 Total Paid</span><strong style={{ color: "#9c4dff" }}>₹{grandTotal.toLocaleString("en-IN")}</strong></div>
                </div>
                <p className="bk-success-note">A confirmation has been sent to your email.</p>
                <button className="bk-done-btn" onClick={closeBooking}>Done</button>
              </div>
            ) : (
              /* ── Booking Form ── */
              <>
                {/* Modal header image */}
                <div className="bk-header">
                  <img src={bookingPlace.image} alt={bookingPlace.name} />
                  <div className="bk-header-overlay">
                    <span className="bk-cat" style={{ background: CAT_COLORS[bookingPlace.category].bg, color: CAT_COLORS[bookingPlace.category].text }}>
                      {bookingPlace.category}
                    </span>
                    <h2>{bookingPlace.name}</h2>
                    <p><FaMapMarkerAlt style={{ marginRight: 4 }} />{bookingPlace.location}</p>
                  </div>
                </div>

                <div className="bk-body">
                  <div className="bk-cols">

                    {/* Left: Form */}
                    <div className="bk-form">
                      <h4>Booking Details</h4>

                      {/* Date */}
                      <div className={`bk-field${bookingErrors.date ? " has-error" : ""}`}>
                        <label><FaCalendarAlt className="bk-field-icon" /> Visit Date <span>*</span></label>
                        <input
                          type="date"
                          min={today}
                          value={booking.date}
                          onChange={e => {
                            setBooking(b => ({ ...b, date: e.target.value }));
                            setBookingErrors(er => ({ ...er, date: "" }));
                          }}
                        />
                        {bookingErrors.date && <span className="bk-error">{bookingErrors.date}</span>}
                      </div>

                      {/* Adults */}
                      <div className="bk-field">
                        <label><FaUsers className="bk-field-icon" /> Adults</label>
                        <div className="bk-counter">
                          <button onClick={() => adjust("adults", -1)}><FaMinus /></button>
                          <span>{booking.adults}</span>
                          <button onClick={() => adjust("adults", 1)}><FaPlus /></button>
                          <span className="bk-rate">₹{bookingPlace.price.toLocaleString("en-IN")} each</span>
                        </div>
                      </div>

                      {/* Children */}
                      <div className="bk-field">
                        <label>
                          <FaUsers className="bk-field-icon" /> Children
                          <span className="bk-half-tag">Half price</span>
                        </label>
                        <div className="bk-counter">
                          <button onClick={() => adjust("children", -1)}><FaMinus /></button>
                          <span>{booking.children}</span>
                          <button onClick={() => adjust("children", 1)}><FaPlus /></button>
                          <span className="bk-rate">₹{bookingPlace.childPrice.toLocaleString("en-IN")} each</span>
                        </div>
                      </div>

                      {/* Special Requests */}
                      <div className="bk-field">
                        <label>Special Requests <span className="bk-optional">(optional)</span></label>
                        <textarea
                          rows={3}
                          placeholder="Wheelchair access, dietary needs, specific timings..."
                          value={booking.requests}
                          onChange={e => setBooking(b => ({ ...b, requests: e.target.value }))}
                        />
                      </div>
                    </div>

                    {/* Right: Summary */}
                    <div className="bk-summary">
                      <h4>Price Summary</h4>

                      <div className="bk-summary-rows">
                        <div className="bk-summary-row">
                          <span>Adults × {booking.adults}</span>
                          <span>₹{(booking.adults * bookingPlace.price).toLocaleString("en-IN")}</span>
                        </div>
                        {booking.children > 0 && (
                          <div className="bk-summary-row">
                            <span>Children × {booking.children}</span>
                            <span>₹{(booking.children * bookingPlace.childPrice).toLocaleString("en-IN")}</span>
                          </div>
                        )}
                        <div className="bk-summary-row">
                          <span>Service fee</span>
                          <span>₹500</span>
                        </div>
                        <div className="bk-summary-total">
                          <span>Total Amount</span>
                          <span>₹{grandTotal.toLocaleString("en-IN")}</span>
                        </div>
                        <p className="bk-savings">
                          ✓ You save ₹{Math.round(grandTotal * 0.1).toLocaleString("en-IN")} on this booking!
                        </p>
                      </div>

                      <h4 className="bk-includes-title">What's Included</h4>
                      <ul className="bk-includes">
                        {bookingPlace.includes.map((inc, i) => (
                          <li key={i}><FaCheck className="bk-inc-check" />{inc}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <button className="bk-confirm-btn" onClick={handleConfirm}>
                    Confirm Booking · ₹{grandTotal.toLocaleString("en-IN")}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── Footer ── */}
      <footer>
        <h3>HydVista Tourism</h3>
        <p>Experience the heritage and beauty of Hyderabad.</p>
      </footer>
    </div>
  );
}
