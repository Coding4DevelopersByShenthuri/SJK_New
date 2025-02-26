import React, { useContext, useState } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category = 'All' }) => {
    const { food_list } = useContext(StoreContext);
    const [showAll, setShowAll] = useState(false);

    // Filter dishes based on category (case-insensitive)
    const filteredFoodList = food_list?.filter((item) => 
        category.toLowerCase() === 'all' || category.toLowerCase() === item.category.toLowerCase()
    ) || [];

    // Determine displayed items
    const displayedFoodList = showAll ? filteredFoodList : filteredFoodList.slice(0, 20);

    // Dynamic title
    const dynamicTitle = `${category === 'All' ? 'Top Dishes' : category} for You Below!`;

    // Check if expand button is needed
    const shouldShowExpandButton = filteredFoodList.length > 20;

    if (filteredFoodList.length === 0) {
        return (
            <div className="food-display" id="food-display">
                <h2>{dynamicTitle}</h2>
                <div className="no-dishes-message">
                    <p>😔 Sorry, we’re out of dishes at the moment. Please check back soon!</p>
                    <div className="crying-gif">
                        <img
                            src="https://media1.giphy.com/media/qQdL532ZANbjy/200w.webp"
                            alt="Crying Animation"
                            onError={(e) => e.target.src = '/images/placeholder.gif'}
                        />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="food-display" id="food-display">
            <h2>{dynamicTitle}</h2>
            <div className="food-display-list">
                {displayedFoodList.map((item) => (
                    <FoodItem
                        key={item._id}
                        id={item._id}
                        name={item.name}
                        description={item.description}
                        price={item.price}
                        normalPrice={item.normalPrice}
                        fullPrice={item.fullPrice}
                    />
                ))}
            </div>
            {shouldShowExpandButton && (
                <button
                    className="expand-all-button"
                    onClick={() => setShowAll((prev) => !prev)}
                >
                    {showAll ? 'Collapse' : 'Expand All'}
                </button>
            )}
        </div>
    );
};

export default FoodDisplay;
