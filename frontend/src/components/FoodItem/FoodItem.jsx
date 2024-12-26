import React, { useContext, useState } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ id, name, price, description, image }) => {
    const { basketItems, addToBasket, removeFromBasket } = useContext(StoreContext);
    const [selectedPriceType, setSelectedPriceType] = useState(null);

    const handlePriceClick = (type) => {
        console.log(`${type} price selected: Rs ${price[type]}`);
        setSelectedPriceType(type);
    };

    const handleAddToBasket = () => {
        if (price?.normal || price?.full) {
            if (selectedPriceType) {
                const chosenPrice = price[selectedPriceType];
                addToBasket(id, selectedPriceType, chosenPrice);
            } else {
                console.log('Please select a price option first.');
            }
        } else if (price) {
            addToBasket(id, 'single', price); // Add single price items
        } else {
            console.log('Cannot add this item to the basket.');
        }
    };

    const getQuantity = (id, priceType) => {
        return basketItems[id] && basketItems[id][priceType || 'single'] ? basketItems[id][priceType || 'single'].quantity : 0;
    };

    return (
        <div className="food-item">
            <div className="food-item-img-container">
                <img className="food-item-image" src={image} alt="" />
                {!basketItems[id] || !basketItems[id][selectedPriceType || 'single'] ? (
                    <img
                        className="add"
                        onClick={handleAddToBasket}
                        src={assets.add_icon_white}
                        alt="Add to basket"
                    />
                ) : (
                    <div className="food-item-counter">
                        <img
                            onClick={() => removeFromBasket(id, selectedPriceType || 'single')}
                            src={assets.remove_icon_red}
                            alt="Remove from basket"
                        />
                        <p>{getQuantity(id, selectedPriceType || 'single')}</p>
                        <img
                            onClick={handleAddToBasket}
                            src={assets.add_icon_green}
                            alt="Add more to basket"
                        />
                    </div>
                )}
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt="Rating stars" />
                </div>
                <p className="food-item-desc">{description}</p>
                <div className="food-item-price">
                    {price?.normal && price?.full ? (
                        <>
                            <p
                                className={selectedPriceType === 'normal' ? 'selected-price' : ''}
                                onClick={() => handlePriceClick('normal')}
                            >
                                Normal: Rs {price.normal}
                            </p>
                            <p
                                className={selectedPriceType === 'full' ? 'selected-price' : ''}
                                onClick={() => handlePriceClick('full')}
                            >
                                Full: Rs {price.full}
                            </p>
                        </>
                    ) : (
                        price && <p>Rs {price}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FoodItem;