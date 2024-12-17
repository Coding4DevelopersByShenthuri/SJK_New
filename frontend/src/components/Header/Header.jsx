import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import logo from "../../assets/images/Shakthi_Logo.png";
import { MdOutlineRestaurantMenu } from "react-icons/md";

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const [showBackTopBtn, setShowBackTopBtn] = useState(false);
  let lastScrollPos = 0;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      // Sticky header logic
      setIsSticky(currentScrollPos > 50);

      // Show/hide header based on scroll direction
      setIsHeaderHidden(currentScrollPos > 50 && currentScrollPos > lastScrollPos);

      // Show/hide back-to-top button
      setShowBackTopBtn(currentScrollPos >= 50);

      lastScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const refreshHome = () => {
    window.location.reload();
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
                { href: "#home", label: "Home" },
                { href: "#menu", label: "Special Dish" },
                { href: "#about", label: "About Us" },
                { href: "#service", label: "Services" },
              ].map(({ href, label }) => (
                <li className="navbar-item" key={href}>
                  <a href={href} className="navbar-link hover-underline">
                    <div className="separator"></div>
                    <span className="span">{label}</span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Contact Info */}
            <div className="text-center">
              <p className="headline-1 navbar-title">Visit Us</p>
              <address className="body-4">
                Station Road, Chavakachcheri, <br />
                Jaffna.
              </address>

              <p className="body-4 navbar-text">Open: 6.30 am - 10.30 pm</p>

              <a href="mailto:shakthijaffnakitchen@gmail.com" className="body-4 sidebar-link">
                shakthijaffnakitchen@gmail.com
              </a>

              <div className="separator"></div>

              <p className="contact-label">Booking Request</p>

              <a href="tel:+94777240510" className="body-1 contact-number hover-underline">
                +94-777-240510
              </a>

              {/* Find A Table Button in Small Device Navigation */}
              <Link
                to="reservation"
                smooth={true}
                duration={500}
                className="btn btn-secondary nav-btn"
                style={{ cursor: "pointer", marginTop: "20px", display: "block", textAlign: "center", left: "40px", }}
              >
                <span className="text text-1">Find A Table</span>
                <span className="text text-2" aria-hidden="true">
                  Find A Table
                </span>
              </Link>
            </div>
          </nav>

          {/* Sign In Button */}
          <div className="topbar-item sign-in">
            <button className="sign-in-btn">Sign In</button>
          </div>

          {/* Scroll to Reservation Section */}
          <Link
            to="reservation"
            smooth={true}
            duration={500}
            className="btn btn-secondary"
            style={{ cursor: "pointer" }}
          >
            <span className="text text-1">Find A Table</span>
            <span className="text text-2" aria-hidden="true">
              Find A Table
            </span>
          </Link>

          {/* Navigation toggle buttons */}
          <button className="nav-open-btn" aria-label="Open menu" onClick={toggleNav}>
            <span className="line line-1"></span>
            <span className="line line-2"></span>
            <span className="line line-3"></span>
          </button>

          <div className={`overlay ${isNavOpen ? "active" : ""}`} onClick={toggleNav} data-overlay></div>
        </div>
      </header>

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
