import React from "react";

const TopBar = () => {
  return (
    <div className="topbar">
      <div className="container">
        {/* Address */}
        <address className="topbar-item">
          <div className="icon">
            <ion-icon name="location-outline" aria-hidden="true"></ion-icon>
          </div>
          <span className="span">Station Road, Chavakachcheri, Jaffna.</span>
        </address>

        <div className="separator"></div>

        {/* Daily Timings */}
        <div className="topbar-item item-2">
          <div className="icon">
            <ion-icon name="time-outline" aria-hidden="true"></ion-icon>
          </div>
          <span className="span">Daily : 6.30 am to 10.30 pm</span>
        </div>

        <div className="separator"></div>

        {/* Phone Number */}
        <a href="tel:+94777240510" className="topbar-item link">
          <div className="icon">
            <ion-icon name="call-outline" aria-hidden="true"></ion-icon>
          </div>
          <span className="span">+94 777240510</span>
        </a>

        <div className="separator"></div>

        {/* Email */}
        <a
          href="mailto:shakthijaffnakitchen@gmail.com"
          className="topbar-item link"
        >
          <div className="icon">
            <ion-icon name="mail-outline" aria-hidden="true"></ion-icon>
          </div>
          <span className="span">shakthijaffnakitchen@gmail.com</span>
        </a>

        <div className="separator"></div>

        {/* Sign In Button */}
        <div className="topbar-item sign-in">
          <button className="sign-in-btn">Sign In</button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
