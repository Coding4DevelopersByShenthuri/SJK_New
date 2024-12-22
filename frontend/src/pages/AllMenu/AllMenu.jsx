import React from 'react';
import './AllMenu.css';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';

const AllMenu = () => {
  return (
    <div>
        <ExploreMenu />
        <FoodDisplay />
    </div>
  )
}

export default AllMenu;