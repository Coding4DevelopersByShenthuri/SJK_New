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
