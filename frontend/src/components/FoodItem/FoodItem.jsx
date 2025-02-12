import React, { useContext, useState } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ id, name, price, description, image }) => {
    const { basketItems, addToBasket, removeFromBasket } = useContext(StoreContext);
    const [selectedPriceType, setSelectedPriceType] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false); // State to control the popup visibility
    const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(''); // Delivery method state

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

    const handleRemoveFromBasket = () => {
        if (basketItems[id] && basketItems[id][selectedPriceType || 'single']) {
            removeFromBasket(id, selectedPriceType || 'single');
        }
    };

    const getQuantity = (id, priceType) => {
        return basketItems[id] && basketItems[id][priceType || 'single']
            ? basketItems[id][priceType || 'single'].quantity
            : 0;
    };

    const handleIncrement = () => {
        if (price?.normal || price?.full) {
            const chosenPrice = price[selectedPriceType || 'normal'];
            addToBasket(id, selectedPriceType || 'normal', chosenPrice);  // Increment by 1
        } else if (price) {
            addToBasket(id, 'single', price);  // Increment by 1 for single price items
        }
    };

    const handleDecrement = () => {
        if (basketItems[id] && basketItems[id][selectedPriceType || 'single']) {
            removeFromBasket(id, selectedPriceType || 'single');  // Decrement by 1
        }
    };

    const handlePopupToggle = () => {
        setIsPopupOpen(!isPopupOpen); // Toggle the popup visibility
    };

    const handleDeliveryMethodChange = (e) => {
        setSelectedDeliveryMethod(e.target.value); // Handle delivery method selection
    };

    return (
        <div className="food-item">
            <div className="food-item-img-container" onClick={handlePopupToggle}>
                <img className="food-item-image" src={image} alt={name} />
                {(!basketItems[id] || !basketItems[id][selectedPriceType || 'single']) ? (
                    <img
                        className="add"
                        onClick={handleAddToBasket}
                        src={assets.add_icon_white}
                        alt="Add to basket"
                    />
                ) : (
                    <div className="food-item-counter">
                        <img
                            onClick={handleDecrement}
                            src={assets.remove_icon_red}
                            alt="Remove from basket"
                        />
                        <p>{getQuantity(id, selectedPriceType || 'single')}</p>
                        <img
                            onClick={handleIncrement}
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

            {/* Popup for Food Item Details */}
            {isPopupOpen && (
                <div className="food-item-popup">
                    <div className="popup-content">
                        <span className="popup-close" onClick={handlePopupToggle}>X</span>
                        <img className="popup-image" src={image} alt={name} />
                        <h3 style={{ color: 'black' }}>{name}</h3> {/* Food item name in black */}
                        <p>{description}</p>
                        <div className="popup-price">
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
                        <div className="delivery-methods">
                            <h4>Delivery Methods:</h4>
                            <div className="delivery-method-options">
                                <label>
                                    <input
                                        type="radio"
                                        value="dine-in"
                                        checked={selectedDeliveryMethod === 'dine-in'}
                                        onChange={handleDeliveryMethodChange}
                                    />
                                    Dine-In
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        value="takeaway"
                                        checked={selectedDeliveryMethod === 'takeaway'}
                                        onChange={handleDeliveryMethodChange}
                                    />
                                    Takeaway
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        value="home-delivery"
                                        checked={selectedDeliveryMethod === 'home-delivery'}
                                        onChange={handleDeliveryMethodChange}
                                    />
                                    Home Delivery
                                </label>
                            </div>
                        </div>
                        <button className="add-to-basket-btn" onClick={handleAddToBasket}>Add to Basket</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FoodItem;