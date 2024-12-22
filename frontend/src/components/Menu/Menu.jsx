import React from "react";
import shape5 from "../../assets/images/shape-5.png";
import shape6 from "../../assets/images/shape-6.png";
import menu1 from "../../assets/images/menu-1.png";
import menu2 from "../../assets/images/menu-2.png";
import menu3 from "../../assets/images/menu-3.png";
import menu4 from "../../assets/images/menu-4.png";
import menu5 from "../../assets/images/menu-5.png";
import menu6 from "../../assets/images/menu-6.png";

const Menu = () => {
  const menuItems = [
    {
      image: menu1,
      alt: "Chicken Chettinad",
      title: "Chicken Chettinad",
      price: "Rs 1300",
      description: "Chicken, Coconut, Tamarind , olives, and Mustard seeds.",
      badge: "Seasonal",
    },
    {
      image: menu2,
      alt: "Vegetable Noodles",
      title: "Vegetable Noodles",
      price: "Rs 400",
      description: "Mashrooms, Vegetables, Soy sauce, tomato sauce, Sesame oil, seasonings and spices.",
      badge: null,
    },
    {
      image: menu3,
      alt: "Vegetable Special Meal",
      title: "Vegetable Special Meal",
      price: "Rs 350",
      description: "cauliflower, Rice, Papad, Dal, Mixed Vegetables.",
      badge: null,
    },
    {
      image: menu4,
      alt: "Paneer Tikka Masala",
      title: "Paneer Tikka Masala",
      price: "Rs 1050",
      description: "Paneer (cubed), Yogurt, Ginger-garlic paste, Cilantro, Kasuri methi and seasonings.",
      badge: "New",
    },
    {
      image: menu5,
      alt: "Beef Meal",
      title: "Beef Meal",
      price: "Rs 750",
      description: "Beef, Tomatoes, Ginger-garlic paste, Spices, Coconut milk or yogurt.",
      badge: null,
    },
    {
      image: menu6,
      alt: "Prawn Biriyani",
      title: "Prawn Biriyani",
      price: "Rs 950",
      description: "Basmati rice, Prawns (peeled and deveined), Onions, Fresh coriander and mint leaves, seasonings and spices.",
      badge: null,
    },
  ];

  return (
    <section className="section menu" aria-labelledby="menu-label" id="menu">
      <div className="container">
        <p className="section-subtitle text-center label-2">Special Selection</p>
        <h2 className="headline-1 section-title text-center">Delicious Menu</h2>

        <ul className="grid-list">
          {menuItems.map((item, index) => (
            <li key={index}>
              <div className="menu-card hover:card">
                <figure
                  className="card-banner img-holder"
                  style={{ "--width": 100, "--height": 100 }}
                >
                  <img
                    src={item.image}
                    width="100"
                    height="100"
                    loading="lazy"
                    alt={item.alt}
                    className="img-cover"
                  />
                </figure>

                <div>
                  <div className="title-wrapper">
                    <h3 className="title-3">
                      <a href="#" className="card-title">
                        {item.title}
                      </a>
                    </h3>

                    {item.badge && <span className="badge label-1">{item.badge}</span>}
                    <span className="span title-2">{item.price}</span>
                  </div>

                  <p className="card-text label-1">{item.description}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <p className="menu-text text-center">
          Openings daily from <span className="span">6:30 am</span> to
          <span className="span">10:30 pm</span>
        </p>

        <a href="#menu" className="btn btn-primary">
          <span className="text text-1">View All Menu</span>
          <span className="text text-2" aria-hidden="true">
            View All Menu
          </span>
        </a>

        <img
          src={shape5}
          width="921"
          height="1036"
          loading="lazy"
          alt="shape"
          className="shape shape-2 move-anim"
        />
        <img
          src={shape6}
          width="343"
          height="345"
          loading="lazy"
          alt="shape"
          className="shape shape-3 move-anim"
        />
      </div>
    </section>
  );
};

export default Menu;
