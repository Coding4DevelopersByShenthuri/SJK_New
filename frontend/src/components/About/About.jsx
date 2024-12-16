import React from "react";
import aboutBanner from "../../assets/images/about-banner.jpg";
import absImage from "../../assets/images/about-abs-image.jpg";
import badge from "../../assets/images/badge-2.png";
import shape from "../../assets/images/shape-3.png";

const About = () => {
  return (
    <section className="section about" aria-labelledby="about-label" id="about">
      <div className="container">
        <div className="about-content text-center">
          <p className="label-2 section-subtitle" id="about-label">Our Story</p>

          <h2 className="headline-1 section-title">Every Flavor Tells a Story</h2>

          <p className="section-text">
            A narrative woven from the essence of its ingredients and the hands that
            crafted it. From the first bite, a journey begins, taking you through fields
            of fresh produce, bustling kitchens, and family traditions passed down through
            generations. Each taste reveals a chapter, rich with the culture, history, and
            love that shaped it. As flavors mingle and dance on your palate, they unfold
            tales of distant lands, forgotten recipes, and the passion of those who brought
            them to life. In every dish, a story awaits, ready to be discovered and savored.
          </p>

          <div className="contact-label">Book Through Call</div>

          <a href="tel:+94777240510" className="body-1 contact-number hover-underline">
            +94 (777) 240 510
          </a>

          <a href="#" className="btn btn-primary">
            <span className="text text-1">Read More</span>
            <span className="text text-2" aria-hidden="true">Read More</span>
          </a>
        </div>

        <figure className="about-banner">
          <img
            src={aboutBanner}
            width="570"
            height="570"
            loading="lazy"
            alt="about banner"
            className="w-100"
            data-parallax-item
            data-parallax-speed="1"
          />

          <div className="abs-img abs-img-1 has-before" data-parallax-item data-parallax-speed="1.75">
            <img
              src={absImage}
              width="285"
              height="285"
              loading="lazy"
              alt="Decorative image"
              className="w-100"
            />
          </div>

          <div className="abs-img abs-img-2 has-before">
            <img
              src={badge}
              width="133"
              height="134"
              loading="lazy"
              alt="Badge"
            />
          </div>
        </figure>

        <img
          src={shape}
          width="197"
          height="194"
          loading="lazy"
          alt="Decorative shape"
          className="shape"
        />
      </div>
    </section>
  );
};

export default About;
