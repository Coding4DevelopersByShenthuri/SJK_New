import React from 'react';

const Footer = () => {
  return (
    <footer className="footer section has-bg-image text-center" style={{ backgroundImage: 'url(../src/assets/images/footer-bg.jpg)' }}>
      <div className="container">
        <div className="footer-top grid-list">
          <div className="footer-brand has-before has-after">
            <a href="#" className="logo">
              <img src="../src/assets/images/Shakthi_Logo.png" width="160" height="50" loading="lazy" alt="SJK home" />
            </a>
            <address className="body-4">
              Station Road Chavakachcheri, Jaffna.
            </address>
            <a href="mailto:shakthijaffnakitchen@gmail.com" className="body-4 contact-link">shakthijaffnakitchen@gmail.com</a>
            <a href="tel:+94-777-240510" className="body-4 contact-link">Booking Request : +94-777-240510</a>
            <p className="body-4">Open : 06:30 am - 10:30 pm</p>
            <div className="wrapper">
              <div className="separator"></div>
              <div className="separator"></div>
              <div className="separator"></div>
            </div>
            <p className="title-1">Get News & Offers</p>
            <p className="label-1">
              Subscribe us & Get <span className="span">affordable Discounts.</span>
            </p>
            <form action="" className="input-wrapper">
              <div className="icon-wrapper">
                <ion-icon name="mail-outline" aria-hidden="true"></ion-icon>
                <input type="email" name="email_address" placeholder="Your email" autoComplete="off" className="input-field" />
              </div>
              <button type="submit" className="btn btn-secondary">
                <span className="text text-1">Subscribe</span>
                <span className="text text-2" aria-hidden="true">Subscribe</span>
              </button>
            </form>
          </div>
          <ul className="footer-list">
            <li><a href="#home" className="label-2 footer-link hover-underline">Home</a></li>
            <li><a href="#menu" className="label-2 footer-link hover-underline">Menus</a></li>
            <li><a href="#about" className="label-2 footer-link hover-underline">About Us</a></li>
          </ul>
          <ul className="footer-list">
            <li><a href="https://www.facebook.com/profile.php?id=61558985514970&mibextid=ZbWKwL" className="label-2 footer-link hover-underline">Facebook</a></li>
            <li><a href="https://www.instagram.com/shakthy_jaffna_kitchen?igsh=MWt4eHI0anJhbzFpMw==" className="label-2 footer-link hover-underline">Instagram</a></li>
            <li><a href="https://x.com/S_Jaffnakitchen" className="label-2 footer-link hover-underline">Twitter</a></li>
            <li><a href="https://www.youtube.com/@ShakthyJaffnakitchen" className="label-2 footer-link hover-underline">Youtube</a></li>
            <li><a href="https://maps.app.goo.gl/AFF1cb53cDNaCmRB6" className="label-2 footer-link hover-underline">Google Map</a></li>
          </ul>
        </div>
        <div className="footer-bottom">
          <p className="copyright">
            &copy; 2024 Shakthi Jaffna Kitchen. All Rights Reserved | Crafted by Shenthuri Maran with ♡ <a href="https://www.facebook.com/profile.php?id=100085593338393" target="_blank" className="link">Let's Connect</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
