import React from "react";
import "./AllMenu.css";

const AllMenu = () => {
  return (
    <section className="all-menu">
      <div className="container">
        <h2 className="menu-title">All Our Menu Items</h2>
        {/* Add the menu items here */}
        <p className="menu-description">
          Explore our wide variety of dishes, from appetizers to desserts!
        </p>
        {/* Example of menu items */}
        <ul className="menu-items">
          <li>Lobster Tortellini</li>
          <li>Chicken Alfredo</li>
          <li>Grilled Salmon</li>
          {/* Add more items as needed */}
        </ul>
      </div>
    </section>
  );
};

export default AllMenu;
