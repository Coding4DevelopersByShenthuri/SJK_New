import React from "react";
import testiBg from "../../assets/images/testimonial-bg.jpg";
import testiAvatar from "../../assets/images/testi-avatar.jpg"; 

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
          I wanted to thank you for inviting me down for that amazing dinner the other night. The food was extraordinary.
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
            alt="Sam Jhonson"
            className="img"
          />
          <p className="label-2 profile-name">Sam Jhonson</p>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
