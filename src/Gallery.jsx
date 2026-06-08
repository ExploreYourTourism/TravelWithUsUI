import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaShoppingCart, FaSignOutAlt, FaSignInAlt,
  FaTimes, FaChevronLeft, FaChevronRight,
  FaMapMarkerAlt, FaExpand,
} from "react-icons/fa";
import { useCart } from "./contexts/CartContext";
import { useAuth } from "./contexts/AuthContext";
import "./Gallery.css";

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

const CATEGORY_COLORS = {
  Monuments: { bg: "#fef3c7", text: "#d97706", dot: "#f59e0b" },
  Devotional: { bg: "#fce7f3", text: "#be185d", dot: "#ec4899" },
  Nature:     { bg: "#d1fae5", text: "#065f46", dot: "#10b981" },
  Culture:    { bg: "#dbeafe", text: "#1e40af", dot: "#3b82f6" },
};

const photos = [
  {
    id: 1,
    name: "Charminar",
    category: "Monuments",
    location: "Old City, Hyderabad",
    desc: "The iconic 16th-century mosque and monument — the symbol of Hyderabad, built in 1591 by Sultan Muhammad Quli Qutb Shah.",
    image: "https://images.unsplash.com/photo-1588416499018-d0c6218c4b2c?w=800&h=530&fit=crop",
    orient: "landscape",
  },
  {
    id: 2,
    name: "Birla Mandir",
    category: "Devotional",
    location: "Naubat Pahad Hill, Hyderabad",
    desc: "A stunning white marble Venkateswara temple perched on a hill, offering breathtaking views of the city and Hussain Sagar.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=800&fit=crop",
    orient: "portrait",
  },
  {
    id: 3,
    name: "Golconda Fort",
    category: "Monuments",
    location: "Ibrahim Bagh, Hyderabad",
    desc: "A magnificent 16th-century fort known for its acoustic system, diamond trade history, and the famous light-and-sound show.",
    image: "https://images.unsplash.com/photo-1599661046827-dacde6976549?w=800&h=530&fit=crop",
    orient: "landscape",
  },
  {
    id: 4,
    name: "Mecca Masjid",
    category: "Devotional",
    location: "Charminar, Hyderabad",
    desc: "One of the oldest and largest mosques in India, built in 1694. Bricks from Mecca were used in the central arch, hence the name.",
    image: "https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=600&h=800&fit=crop",
    orient: "portrait",
  },
  {
    id: 5,
    name: "Hussain Sagar Lake",
    category: "Nature",
    location: "Tank Bund Road, Hyderabad",
    desc: "A heart-shaped lake built in 1562, home to the iconic 18-metre monolithic Buddha statue standing on the Rock of Gibraltar island.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=530&fit=crop",
    orient: "landscape",
  },
  {
    id: 6,
    name: "Chowmahalla Palace",
    category: "Monuments",
    location: "Khilwat, Old City",
    desc: "The opulent seat of the Asaf Jahi dynasty, built in the 18th century. A spectacular complex of courtyards and halls.",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed6736c?w=600&h=800&fit=crop",
    orient: "portrait",
  },
  {
    id: 7,
    name: "Chilkur Balaji Temple",
    category: "Devotional",
    location: "Chilkur, Hyderabad",
    desc: "Known as the 'Visa Balaji' temple, millions of devotees visit this ancient Vaishnava shrine seeking blessings for foreign travel.",
    image: "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?w=800&h=530&fit=crop",
    orient: "landscape",
  },
  {
    id: 8,
    name: "KBR National Park",
    category: "Nature",
    location: "Jubilee Hills, Hyderabad",
    desc: "A lush 390-acre urban forest and biodiversity hotspot in the heart of the city, home to deer, birds, and exotic flora.",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&h=530&fit=crop",
    orient: "landscape",
  },
  {
    id: 9,
    name: "Ramoji Film City",
    category: "Culture",
    location: "Hayathnagar, Hyderabad",
    desc: "The world's largest integrated film studio complex spanning 1666 acres — a UNESCO-certified attraction and entertainment hub.",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=800&fit=crop",
    orient: "portrait",
  },
  {
    id: 10,
    name: "Qutb Shahi Tombs",
    category: "Monuments",
    location: "Ibrahim Bagh, Hyderabad",
    desc: "A UNESCO tentative World Heritage site — grand domed mausoleums of the Qutb Shahi dynasty surrounded by lush gardens.",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=530&fit=crop",
    orient: "landscape",
  },
  {
    id: 11,
    name: "Salar Jung Museum",
    category: "Culture",
    location: "Dar-ul-Shifa, Hyderabad",
    desc: "One of India's largest museums, housing a priceless collection of art, antiques, and artifacts from across the world.",
    image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800&h=530&fit=crop",
    orient: "landscape",
  },
  {
    id: 12,
    name: "Gandipet Lake",
    category: "Nature",
    location: "Osman Sagar, Hyderabad",
    desc: "A scenic reservoir built across the Musi River in 1920, surrounded by rocky hills — a perfect weekend getaway from the city.",
    image: "https://images.unsplash.com/photo-1455156218388-5e61b526818b?w=600&h=800&fit=crop",
    orient: "portrait",
  },
  {
    id: 13,
    name: "Keesaragutta Temple",
    category: "Devotional",
    location: "Keesara, Hyderabad",
    desc: "An ancient hilltop Lord Shiva temple surrounded by dense forest, especially crowded during Maha Shivaratri festival.",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=600&h=800&fit=crop",
    orient: "portrait",
  },
  {
    id: 14,
    name: "Necklace Road",
    category: "Culture",
    location: "Tank Bund, Hyderabad",
    desc: "A stunning 3-km stretch along Hussain Sagar, glittering with lights at night — the lifestyle hub of the city.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=530&fit=crop",
    orient: "landscape",
  },
  {
    id: 15,
    name: "Laad Bazaar",
    category: "Culture",
    location: "Near Charminar, Hyderabad",
    desc: "A 400-year-old street market famous for its dazzling lacquer bangles, pearls, and traditional Hyderabadi jewellery.",
    image: "https://images.unsplash.com/photo-1566604008577-ff1a2b8e0e94?w=800&h=530&fit=crop",
    orient: "landscape",
  },
  {
    id: 16,
    name: "Nehru Zoological Park",
    category: "Nature",
    location: "Mir Alam Tank Road, Hyderabad",
    desc: "One of India's largest zoos spanning 380 acres, home to over 1,500 animals including tigers, lions, giraffes, and elephants.",
    image: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=600&h=800&fit=crop",
    orient: "portrait",
  },
  {
    id: 17,
    name: "Sanghi Temple",
    category: "Devotional",
    location: "Hayathnagar, Hyderabad",
    desc: "A magnificent hilltop temple complex dedicated to Lord Venkateswara, offering a panoramic view and peaceful atmosphere.",
    image: "https://images.unsplash.com/photo-1601931935821-5fbe71157695?w=800&h=530&fit=crop",
    orient: "landscape",
  },
  {
    id: 18,
    name: "Paigah Tombs",
    category: "Monuments",
    location: "Santosh Nagar, Hyderabad",
    desc: "Exquisitely carved marble mausoleums of the Paigah nobles — a hidden architectural gem rarely visited by tourists.",
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600&h=800&fit=crop",
    orient: "portrait",
  },
];

export default function Gallery() {
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const { user, logout } = useAuth();

  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState(null); // index into filtered array

  const filtered = activeCategory === "All"
    ? photos
    : photos.filter(p => p.category === activeCategory);

  const openLightbox = (idx) => setLightbox(idx);
  const closeLightbox = () => setLightbox(null);

  const goPrev = useCallback(() => {
    setLightbox(i => (i - 1 + filtered.length) % filtered.length);
  }, [filtered.length]);

  const goNext = useCallback(() => {
    setLightbox(i => (i + 1) % filtered.length);
  }, [filtered.length]);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === "Escape")     closeLightbox();
      if (e.key === "ArrowLeft")  goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, goPrev, goNext]);

  const activeLightboxPhoto = lightbox !== null ? filtered[lightbox] : null;

  return (
    <div className="gallery-wrapper">

      {/* ── Navbar ── */}
      <nav className="home-navbar">
        <div className="brand" style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          <Logo />
          <div><h2>HydVista</h2><p>Explore Hyderabad</p></div>
        </div>
        <div className="menu d-flex align-items-center gap-2 gap-md-3">
          <button onClick={() => navigate("/")}        className="menu-btn">Home</button>
          <button onClick={() => navigate("/places")}  className="menu-btn">Places</button>
          <button onClick={() => navigate("/gallery")} className="menu-btn nav-active">Gallery</button>
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
      <section className="gallery-hero">
        <div className="gallery-hero-inner">
          <span className="gallery-tag">📸 Photo Gallery</span>
          <h1>Hyderabad Through the Lens</h1>
          <p>Explore the beauty, heritage, and spirituality of the City of Pearls through our curated photo collection.</p>
          <div className="gallery-stats">
            <div className="gstat"><strong>{photos.length}</strong><span>Photos</span></div>
            <div className="gstat-divider" />
            <div className="gstat"><strong>4</strong><span>Categories</span></div>
            <div className="gstat-divider" />
            <div className="gstat"><strong>18</strong><span>Locations</span></div>
          </div>
        </div>
      </section>

      {/* ── Filter Tabs ── */}
      <div className="gallery-filters">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`filter-btn${activeCategory === cat ? " active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat === "All"       && "🌐 "}
            {cat === "Monuments" && "🏛️ "}
            {cat === "Devotional"&& "🛕 "}
            {cat === "Nature"    && "🌿 "}
            {cat === "Culture"   && "🎭 "}
            {cat}
            <span className="filter-count">
              {cat === "All" ? photos.length : photos.filter(p => p.category === cat).length}
            </span>
          </button>
        ))}
      </div>

      {/* ── Masonry Grid ── */}
      <div className="gallery-masonry">
        {filtered.map((photo, idx) => {
          const col = CATEGORY_COLORS[photo.category];
          return (
            <div
              key={photo.id}
              className={`gallery-item ${photo.orient}`}
              onClick={() => openLightbox(idx)}
            >
              <img src={photo.image} alt={photo.name} loading="lazy" />

              <div className="gallery-overlay">
                <span className="gallery-cat-badge" style={{ background: col.bg, color: col.text }}>
                  <span className="cat-dot" style={{ background: col.dot }} />
                  {photo.category}
                </span>
                <div className="gallery-info">
                  <h3>{photo.name}</h3>
                  <p><FaMapMarkerAlt className="me-1" style={{ fontSize: "10px" }} />{photo.location}</p>
                </div>
                <div className="gallery-expand"><FaExpand /></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Lightbox ── */}
      {activeLightboxPhoto && (
        <div className="lightbox-backdrop" onClick={closeLightbox}>
          <div className="lightbox-modal" onClick={e => e.stopPropagation()}>

            <button className="lb-close" onClick={closeLightbox}><FaTimes /></button>
            <button className="lb-arrow lb-prev" onClick={goPrev}><FaChevronLeft /></button>
            <button className="lb-arrow lb-next" onClick={goNext}><FaChevronRight /></button>

            <div className="lb-image-wrap">
              <img src={activeLightboxPhoto.image} alt={activeLightboxPhoto.name} />
            </div>

            <div className="lb-info">
              <div>
                <span
                  className="lb-badge"
                  style={{
                    background: CATEGORY_COLORS[activeLightboxPhoto.category].bg,
                    color: CATEGORY_COLORS[activeLightboxPhoto.category].text,
                  }}
                >
                  {activeLightboxPhoto.category}
                </span>
                <h2>{activeLightboxPhoto.name}</h2>
                <p className="lb-location">
                  <FaMapMarkerAlt style={{ marginRight: 5, color: "#9c4dff" }} />
                  {activeLightboxPhoto.location}
                </p>
                <p className="lb-desc">{activeLightboxPhoto.desc}</p>
              </div>
              <div className="lb-counter">
                {lightbox + 1} / {filtered.length}
              </div>
            </div>
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
