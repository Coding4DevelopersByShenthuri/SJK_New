import React from 'react';

const FeaturesSection = () => {
  return (
    <section className="section features text-center" aria-label="features">
      <div className="container">

        <p className="section-subtitle label-2">Why Choose Us</p>

        <h2 className="headline-1 section-title">Our Strength</h2>

        <ul className="grid-list">

          <li className="feature-item">
            <div className="feature-card">
              <div className="card-icon">
                <img src="../src/assets/images/features-icon-1.png" width="100" height="80" loading="lazy" alt="icon" />
              </div>
              <h3 className="title-2 card-title">Hygienic Food</h3>
              <p className="label-1 card-text">
                Our hygienic food ensures peace of mind, offering you meals prepared with the highest standards of cleanliness and safety.
              </p>
            </div>
          </li>

          <li className="feature-item">
            <div className="feature-card">
              <div className="card-icon">
                <img src="../src/assets/images/features-icon-2.png" width="100" height="80" loading="lazy" alt="icon" />
              </div>
              <h3 className="title-2 card-title">Fresh Environment</h3>
              <p className="label-1 card-text">
                Our fresh environment revitalizes your senses, providing a clean, invigorating atmosphere that promotes well-being and relaxation.
              </p>
            </div>
          </li>

          <li className="feature-item">
            <div className="feature-card">
              <div className="card-icon">
                <img src="../src/assets/images/features-icon-3.png" width="100" height="80" loading="lazy" alt="icon" />
              </div>
              <h3 className="title-2 card-title">Skilled Chefs</h3>
              <p className="label-1 card-text">
                Our skilled chefs bring culinary artistry to every dish, blending expertise and passion to create unforgettable dining experiences.
              </p>
            </div>
          </li>

          <li className="feature-item">
            <div className="feature-card">
              <div className="card-icon">
                <img src="../src/assets/images/features-icon-4.png" width="100" height="80" loading="lazy" alt="icon" />
              </div>
              <h3 className="title-2 card-title">Event & Party</h3>
              <p className="label-1 card-text">
                Make every celebration unforgettable with our expertly planned events and parties, tailored to create lasting memories.
              </p>
            </div>
          </li>

        </ul>

        <img src="../src/assets/images/shape-7.png" width="208" height="178" loading="lazy" alt="shape" className="shape shape-1" />
        <img src="../src/assets/images/shape-8.png" width="120" height="115" loading="lazy" alt="shape" className="shape shape-2" />

      </div>
    </section>
  );
};

export default FeaturesSection;
