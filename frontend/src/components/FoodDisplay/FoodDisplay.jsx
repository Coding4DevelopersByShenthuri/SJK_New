import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category = 'All' }) => {
    const { food_list } = useContext(StoreContext);

    // Check if food_list exists and has items
    if (!food_list || food_list.length === 0) {
        return (
            <div className='food-display' id='food-display'>
                <h2>Top Dishes for you</h2>
                <p>No dishes available at the moment. Please check back later.</p>
            </div>
        );
    }

    return (
        <div className='food-display' id='food-display'>
            <h2>Top Dishes for you</h2>
            <div className='food-display-list'>
                {food_list
                    .filter((item) => category === 'All' || category === item.category)
                    .map((item) => (
                        <FoodItem
                            key={item._id} // Use _id as a unique key
                            id={item._id}
                            name={item.name}
                            description={item.description}
                            price={item.price}
                            image={item.image}
                        />
                    ))}
            </div>
        </div>
    );
};

export default FoodDisplay;
