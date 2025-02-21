import React, { useState, useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom"; // Renamed to RouterLink to avoid conflicts
import { Link as ScrollLink } from "react-scroll"; // Import ScrollLink from react-scroll
import SignInPopup from "../SignInPopup/SignInPopup.jsx";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/Shakthi_Logo.png";
import { MdOutlineRestaurantMenu, MdClose } from "react-icons/md";
import { FiShoppingBag } from "react-icons/fi";

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const [showBackTopBtn, setShowBackTopBtn] = useState(false);
  const [basketCount] = useState(0);
  const [isSignInPopupVisible, setSignInPopupVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  let lastScrollPos = 0;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setIsSticky(currentScrollPos > 50);
      setIsHeaderHidden(currentScrollPos > 50 && currentScrollPos > lastScrollPos);
      setShowBackTopBtn(currentScrollPos >= 50);
      lastScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== "/home" && location.pathname !== "/") {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  }, [location]);

  const handleNavLinkClick = () => {
    if (window.innerWidth <= 768) {
      setIsNavOpen(false);
    }
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const refreshHome = () => {
    window.location.reload();
  };

  const handleBasketClick = () => {
    window.open('/basket', '_blank');
  };

  return (
    <>
      <header
        className={`header ${isSticky ? "active" : ""} ${isHeaderHidden ? "hide" : ""} ${isNavOpen ? "nav-open" : ""}`}
        data-header
      >
        <div className="container">
          {/* Logo */}
          <a href="#" className="logo" onClick={refreshHome}>
            <img src={logo} className="responsive-logo" alt="SJK - Home" />
          </a>

          {/* Navbar */}
          <nav className={`navbar ${isNavOpen ? "active" : ""}`} data-navbar>
            <button className="close-btn" aria-label="Close menu" onClick={toggleNav}>
              <MdOutlineRestaurantMenu size={24} />
            </button>

            <a href="#" className="logo">
              <img src={logo} className="responsive-logo" alt="SJK - Home" />
            </a>

            <ul className="navbar-list">
              {[
                { href: "/home", label: "Home" },
                { href: "/about", label: "About Us" },
                { href: "/service", label: "Services" },
                { href: "/menu", label: "Special Dish" },
                { href: "/all-menu", label: "Menu" },
                { href: "/blog", label: "Blogs" },
              ].map(({ href, label }) => (
                <li className="navbar-item" key={href}>
                  <RouterLink
                    to={href}
                    className="navbar-link hover-underline"
                    onClick={handleNavLinkClick}
                  >
                    <div className="separator"></div>
                    <span className="span">{label}</span>
                  </RouterLink>
                </li>
              ))}

              {/* Separate Sign In option */}
              <li className="navbar-item">
                <a
                  href="#signin"
                  className="navbar-link hover-underline"
                  onClick={(e) => {
                    e.preventDefault();
                    setSignInPopupVisible(true);
                  }}
                >
                  <div className="separator"></div>
                  <span className="span">Sign In</span>
                </a>
              </li>
            </ul>

            {/* Contact Info */}
            <div className="text-center">
              <p className="headline-1 navbar-title">Visit Us</p>
              <address className="body-4">
                Station Road, Chavakachcheri, <br />
                Jaffna.
              </address>

              <p className="body-4 navbar-text">Open: 6.30 am - 10.30 pm</p>

              <a href="mailto:shakthyjaffnakitchen@gmail.com" className="body-4 sidebar-link">
                shakthyjaffnakitchen@gmail.com
              </a>

              <div className="separator"></div>

              <p className="contact-label">Booking Request</p>

              <a href="tel:+94777240510" className="body-1 contact-number hover-underline">
                +94-777-240510
              </a>

              {/* Use ScrollLink for smooth scrolling to the reservation section */}
              <ScrollLink
                to="reservation" // ID of the reservation section
                smooth={true} // Enable smooth scrolling
                duration={500} // Duration of the scroll animation
                className="btn btn-secondary nav-btn"
                style={{
                  cursor: "pointer",
                  marginTop: "20px",
                  display: "block",
                  textAlign: "center",
                  left: "40px",
                }}
              >
                <span className="text text-1">Find A Table</span>
                <span className="text text-2" aria-hidden="true">
                  Find A Table
                </span>
              </ScrollLink>
            </div>
          </nav>

          {/* Shopping Basket Icon */}
          <div className="basket-icon" onClick={() => navigate("/basket")}>
            <FiShoppingBag size={24} />
            {basketCount > 0 && <span className="basket-badge">{basketCount}</span>}
          </div>

          {/* Use ScrollLink for smooth scrolling to the reservation section */}
          <ScrollLink
            to="reservation" // ID of the reservation section
            smooth={true} // Enable smooth scrolling
            duration={500} // Duration of the scroll animation
            className="btn btn-secondary"
            style={{ cursor: "pointer" }}
          >
            <span className="text text-1">Find A Table</span>
            <span className="text text-2" aria-hidden="true">
              Find A Table
            </span>
          </ScrollLink>

          {/* Navigation toggle buttons */}
          <button className="nav-open-btn" aria-label="Open menu" onClick={toggleNav}>
            <span className="line line-1"></span>
            <span className="line line-2"></span>
            <span className="line line-3"></span>
          </button>

          <div className={`overlay ${isNavOpen ? "active" : ""}`} onClick={toggleNav} data-overlay></div>
        </div>
      </header>

      <SignInPopup
        isVisible={isSignInPopupVisible}
        onClose={() => setSignInPopupVisible(false)}
      />

      {/* Back-to-top button */}
      <button
        className={`back-top-btn ${showBackTopBtn ? "active" : ""}`}
        data-back-top-btn
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ion-icon name="arrow-up-outline"></ion-icon>
      </button>
    </>
  );
};

export default Header;