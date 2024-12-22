import React from "react";
import specialDishBanner from "../../assets/images/special-dish-banner.jpg";
import badge from "../../assets/images/badge-1.png";
import shape1 from "../../assets/images/shape-4.png";
import shape2 from "../../assets/images/shape-9.png";

const SpecialDish = () => {
  return (
    <section className="special-dish text-center" aria-labelledby="dish-label">
      <div className="special-dish-banner">
        <img
          src={specialDishBanner}
          width="940"
          height="900"
          loading="lazy"
          alt="special dish"
          className="img-cover"
        />
      </div>

      <div className="special-dish-content bg-black-10">
        <div className="container">
          <img
            src={badge}
            width="28"
            height="41"
            loading="lazy"
            alt="badge"
            className="abs-img"
          />

          <p className="section-subtitle label-2">Special Dish</p>

          <h2 className="headline-1 section-title">BBQ Grilled Chicken</h2>

          <p className="section-text">
          BBQ Grilled Chicken is a deliciously smoky and flavorful dish that's 
          perfect for outdoor gatherings or a cozy meal at home. Marinated in a 
          blend of spices, herbs, and BBQ sauce, the chicken is grilled to perfection, 
          creating a crispy outer layer while keeping the inside tender and juicy. 
          The smoky aroma from the grill enhances the savory taste, making it a crowd
          favorite. Served with sides like coleslaw or roasted vegetables, BBQ Grilled 
          Chicken is a satisfying meal that's both simple to make and full of bold flavors.
          </p>

          <div className="wrapper">
            <del className="del body-3">Rs 2000</del>
            <span className="span body-1">Rs 1500</span>
          </div>

          <a href="#" className="btn btn-primary">
            <span className="text text-1">View All Menu</span>
            <span className="text text-2" aria-hidden="true">
              View All Menu
            </span>
          </a>
        </div>
      </div>

      <img
        src={shape1}
        width="179"
        height="359"
        loading="lazy"
        alt=""
        className="shape shape-1"
      />

      <img
        src={shape2}
        width="351"
        height="462"
        loading="lazy"
        alt=""
        className="shape shape-2"
      />
    </section>
  );
};

export default SpecialDish;
