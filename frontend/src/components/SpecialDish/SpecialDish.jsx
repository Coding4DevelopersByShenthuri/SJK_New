import React from "react";
import { Link } from "react-router-dom";
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

          <h2 className="headline-1 section-title">Lobster Tortellini</h2>

          <p className="section-text">
            Lobster tortellini is a culinary masterpiece that combines the rich,
            succulent flavors of fresh lobster with the delicate texture of
            handmade pasta. Each tortellini is carefully filled with a savory
            mixture of tender lobster meat, ricotta cheese, and a blend of herbs
            and spices, creating a luxurious and flavorful filling. The pasta
            itself is thin and tender, providing the perfect vessel for the rich,
            buttery lobster filling.
          </p>

          <div className="wrapper">
            <del className="del body-3">$40.00</del>
            <span className="span body-1">$20.00</span>
          </div>

          <Link to="/all-menu" className="btn btn-primary">
            <span className="text text-1">View All Menu</span>
            <span className="text text-2" aria-hidden="true">
              View All Menu
            </span>
          </Link>
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
