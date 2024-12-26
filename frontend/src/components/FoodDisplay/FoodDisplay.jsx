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

    // Handle case where no food items are available
    if (filteredFoodList.length === 0) {
        return (
            <div className='food-display' id='food-display'>
                <h2>Top Dishes for You</h2>
                <p>No dishes available at the moment. Please check back later.</p>
            </div>
        );
    }

    return (
        <div className='food-display' id='food-display'>
            <h2>Top Dishes for You</h2>
            <div className='food-display-list'>
                {displayedFoodList.map((item) => {
                    let formattedPrice;

                    // Handle cases where price is an object
                    if (item.price && typeof item.price === 'object') {
                        formattedPrice = `Normal: ${item.price.normal || 'N/A'}, Full: ${item.price.full || 'N/A'}`;
                    } else {
                        formattedPrice = item.price || 'N/A';
                    }

                    return (
                        <FoodItem
                            key={item._id}
                            id={item._id}
                            name={item.name}
                            description={item.description}
                            price={formattedPrice}
                            image={item.image}
                        />
                    );
                })}
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