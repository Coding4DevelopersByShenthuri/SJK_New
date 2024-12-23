import React, { useState } from 'react';
import './AllMenu.css';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';

const AllMenu = () => {
  const [category, setCategory] = useState('All'); // Manage category state

  return (
    <div>
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
    </div>
  );
};

export default AllMenu;