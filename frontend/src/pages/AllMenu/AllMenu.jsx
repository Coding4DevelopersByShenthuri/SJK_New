import React, { useState } from 'react';
import './AllMenu.css';
import welcome from '../../assets/welcome.png';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import SubHeading from '../../components/SubHeading/SubHeading';

const AllMenu = () => {
  const [category, setCategory] = useState('All'); // Manage category state

  return (
    <div className="app__allmenu">
      {/* Header Section */}
      <div className="app__header app__wrapper section__padding">
        <div className="app__wrapper_info">
          <SubHeading title="Chase the new flavour" />
          <h1 className="app__header-h1">The Key to Your Fine Dining</h1>
          <p className="p__opensans app__header-p">
            We redefine the art of dining with a perfect blend of exquisite flavors, 
            elegant ambiance, and impeccable service. Every dish is a masterpiece 
            crafted from the finest ingredients, promising a culinary journey that delights your senses. 
            Whether it’s a special occasion or a casual evening out, we aim to create unforgettable moments 
            that leave a lasting impression.
          </p>
        </div>
        <div className="app__wrapper_img">
          <img src={welcome} alt="welcome" className="welcome__img" />
        </div>
      </div>

      {/* Explore Menu and Food Display Section */}
      <div className="app__menu-content">
        <ExploreMenu category={category} setCategory={setCategory} />
        <FoodDisplay category={category} />
      </div>
    </div>
  );
};

export default AllMenu;
