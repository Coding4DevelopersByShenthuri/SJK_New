import React from 'react';

const Service = () => {
  return (
    <section id="service" className="section service bg-black-10 text-center" aria-label="service">
      <div className="container">
        <p className="section-subtitle label-2">Flavors For Royalty</p>
        <h2 className="headline-1 section-title">We Offer Top Notch</h2>
        <p className="section-text">
          We offer top-notch quality in everything we do, ensuring that excellence is not just a goal but a standard.
          From our meticulously sourced ingredients to our carefully crafted products, every detail is a testament to
          our commitment to superiority. Our team of dedicated professionals works tirelessly to deliver unparalleled
          service and exceptional results, making sure that your experience with us is nothing short of outstanding.
          When you choose us, you choose a level of quality that stands above the rest, promising reliability,
          innovation, and satisfaction in every aspect.
        </p>
        <ul className="grid-list">
          <li>
            <div className="service-card">
              <a href="#service" className="has-before hover:shine">
                <figure className="card-banner img-holder" style={{ '--width': 285, '--height': 336 }}>
                  <img
                    src="../src/assets/images/service-1.jpg"
                    width="285"
                    height="336"
                    loading="lazy"
                    alt="Breakfast"
                    className="img-cover"
                  />
                </figure>
              </a>
              <div className="card-content">
                <h3 className="title-4 card-title">
                  <a href="#">Breakfast</a>
                </h3>
                <a href="#" className="btn-text hover-underline label-2">View Menu</a>
              </div>
            </div>
          </li>
          <li>
            <div className="service-card">
              <a href="#" className="has-before hover:shine">
                <figure className="card-banner img-holder" style={{ '--width': 285, '--height': 336 }}>
                  <img
                    src="../src/assets/images/service-2.jpg"
                    width="285"
                    height="336"
                    loading="lazy"
                    alt="Appetizers"
                    className="img-cover"
                  />
                </figure>
              </a>
              <div className="card-content">
                <h3 className="title-4 card-title">
                  <a href="#">Appetizers</a>
                </h3>
                <a href="#" className="btn-text hover-underline label-2">View Menu</a>
              </div>
            </div>
          </li>
          <li>
            <div className="service-card">
              <a href="#" className="has-before hover:shine">
                <figure className="card-banner img-holder" style={{ '--width': 285, '--height': 336 }}>
                  <img
                    src="../src/assets/images/service-3.jpg"
                    width="285"
                    height="336"
                    loading="lazy"
                    alt="Drinks"
                    className="img-cover"
                  />
                </figure>
              </a>
              <div className="card-content">
                <h3 className="title-4 card-title">
                  <a href="#">Drinks</a>
                </h3>
                <a href="#" className="btn-text hover-underline label-2">View Menu</a>
              </div>
            </div>
          </li>
        </ul>
        <img
          src="../src/assets/images/shape-1.png"
          width="246"
          height="412"
          loading="lazy"
          alt="shape"
          className="shape shape-1 move-anim"
        />
        <img
          src="../src/assets/images/shape-2.png"
          width="343"
          height="345"
          loading="lazy"
          alt="shape"
          className="shape shape-2 move-anim"
        />
      </div>
    </section>
  );
};

export default Service;
