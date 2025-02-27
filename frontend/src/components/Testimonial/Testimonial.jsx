import React from "react";
import testiBg from "../../assets/images/testimonial-bg.jpg";
import testiAvatar from "../../assets/images/testi-avatar.png";
import Sign from "../../assets/sign.png";
import "./Testimonial.css"; 

const Testimonial = () => {
  return (
    <section
      className="section testi text-center has-bg-image"
      style={{ backgroundImage: `url(${testiBg})` }}
      aria-label="testimonials"
    >
      <div className="container">
        {/* Quote Icon */}
        <div className="quote">”</div>

        {/* Testimonial Text */}
        <p className="headline-2 testi-text">
          We Deal with your Trust.
        </p>

        {/* Separator Lines */}
        <div className="wrapper">
          <div className="separator"></div>
          <div className="separator"></div>
          <div className="separator"></div>
        </div>

        {/* Profile Section */}
        <div className="profile">
          <img
            src={testiAvatar}
            width="100"
            height="100"
            loading="lazy"
            alt="Satheepan"
            className="img"
          />
          <p className="label-2 profile-name">Chandrakumar Satheepan</p>
          <h5>Founder, CEO</h5>
          <img 
          src={Sign}
          width="250"
          height="250"
          loading="lazy"
          className="sign-img"
          alt="" />
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
