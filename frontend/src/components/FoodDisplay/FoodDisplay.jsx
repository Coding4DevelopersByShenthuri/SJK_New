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
            <div className="food-display" id="food-display">
                <h2>{dynamicTitle}</h2>
                <div className="no-dishes-message">
                    <p>😔 Sorry, we’re out of dishes at the moment. Please check back soon!</p>
                    <div className="crying-gif">
                        <img
                            src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExeHJjbGpkano2NGoxMzJzaTd6aTY1ajZnaWc1ODh3NXhycTZxZW44byZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/qQdL532ZANbjy/200w.webp"
                            alt="Crying Animation"
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
                        image={item.image}
                    />
                ))}
            </div>
            {filteredFoodList.length > 10 && (
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