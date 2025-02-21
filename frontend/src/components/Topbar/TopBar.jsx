import React from 'react';


const TopBar = () => {
  return (
    <div className="topbar">
      <div className="container">
        <address className="topbar-item">
          <div className="icon">
            <ion-icon name="location-outline" aria-hidden="true"></ion-icon>
          </div>
          <span className="span">Station Road, Chavakachcheri, Jaffna.</span>
        </address>

        <div className="separator"></div>

        <div className="topbar-item item-2">
          <div className="icon">
            <ion-icon name="time-outline" aria-hidden="true"></ion-icon>
          </div>
          <span className="span">Daily : 6.30 am to 10.30 pm</span>
        </div>

        <a href="tel:+94777240510" className="topbar-item link">
          <div className="icon">
            <ion-icon name="call-outline" aria-hidden="true"></ion-icon>
          </div>
          <span className="span">+94 777240510</span>
        </a>

        <div className="separator"></div>

        <a href="mailto:shakthyjaffnakitchen@gmail.com" className="topbar-item link">
          <div className="icon">
            <ion-icon name="mail-outline" aria-hidden="true"></ion-icon>
          </div>
          <span className="span">shakthyjaffnakitchen@gmail.com</span>
        </a>
      </div>
    </div>
  );
};

export default TopBar;
