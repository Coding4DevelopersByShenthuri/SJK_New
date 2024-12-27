import React, { useContext, useState } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category = 'All' }) => {
    const { food_list } = useContext(StoreContext);
    const [showAll, setShowAll] = useState(false);

    // Filter dishes based on category
    const filteredFoodList = food_list
        ? food_list.filter((item) => category === 'All' || category === item.category)
        : [];

    // Determine the displayed dishes (limit to first 10 or show all)
    const displayedFoodList = showAll ? filteredFoodList : filteredFoodList.slice(0, 10);

    // Determine the dynamic title based on the active category
    const dynamicTitle = category === 'All' ? 'Top Dishes for You' : `${category} for You Below!`;

    // Handle case where no food items are available
    if (filteredFoodList.length === 0) {
        return (
            <div className='food-display' id='food-display'>
                <h2>{dynamicTitle}</h2>
                <p>No dishes available at the moment. Please check back later.</p>
            </div>
        );
    }

    return (
        <div className='food-display' id='food-display'>
            <h2>{dynamicTitle}</h2>
            <div className='food-display-list'>
                {displayedFoodList.map((item) => (
                    <FoodItem
                        key={item._id}
                        id={item._id}
                        name={item.name}
                        description={item.description}
                        price={item.price}
                        image={item.image}
                    />
                ))}
            </div>
            {filteredFoodList.length > 10 && (
                <button
                    className='expand-all-button'
                    onClick={() => setShowAll((prev) => !prev)}
                >
                    {showAll ? 'Collapse' : 'Expand All'}
                </button>
            )}
        </div>
    );
};

export default FoodDisplay;