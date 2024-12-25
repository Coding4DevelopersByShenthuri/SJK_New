import React, { useContext } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ id, name, price, description, image }) => {
    const { basketItems, addToBasket, removeFromBasket } = useContext(StoreContext);

    return (
        <div className='food-item'>
            <div className='food-item-img-container'>
                <img className='food-item-image' src={image} alt={`Image of ${name}`} />
                {!basketItems[id] ? (
                    <img
                        className='add'
                        onClick={() => addToBasket(id)}
                        src={assets.add_icon_white}
                        alt={`Add ${name} to basket`}
                    />
                ) : (
                    <div className='food-item-counter'>
                        <img
                            onClick={() => removeFromBasket(id)}
                            src={assets.remove_icon_red}
                            alt={`Remove one ${name} from basket`}
                        />
                        <p>{basketItems[id]}</p>
                        <img
                            onClick={() => addToBasket(id)}
                            src={assets.add_icon_green}
                            alt={`Add one more ${name} to basket`}
                        />
                    </div>
                )}
            </div>
            <div className='food-item-info'>
                <div className='food-item-name-rating'>
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt="Rating stars" />
                </div>
                <p className='food-item-desc'>{description}</p>
                <p className='food-item-price'>Rs {price}</p>
            </div>
        </div>
    );
};

export default FoodItem;