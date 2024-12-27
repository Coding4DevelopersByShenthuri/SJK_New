import React, { useContext, useState } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ id, name, price, description, image, extras }) => {
    const { basketItems, addToBasket, removeFromBasket } = useContext(StoreContext);
    const [selectedPriceType, setSelectedPriceType] = useState(null);
    const [selectedExtras, setSelectedExtras] = useState([]); // To store selected extras
    const [showExtras, setShowExtras] = useState(false); // To toggle visibility of extras

    // Generate random prices for Egg and Cheese extras
    const generateRandomPrice = () => {
        return Math.floor(Math.random() * (30 - 20 + 1)) + 20; // Random price between 20 and 30
    };

    const handlePriceClick = (type) => {
        console.log(`${type} price selected: Rs ${price[type]}`);
        setSelectedPriceType(type);
    };

    const handleAddToBasket = () => {
        // Ensure selectedPriceType is valid (either 'normal' or 'full')
        const validPriceType = selectedPriceType || 'normal';  // Default to 'normal' if null

        // Ensure the price for the selectedPriceType is available
        const itemPrice = price[validPriceType];
        if (!itemPrice) {
            console.log('Invalid price type or no price available');
            return;  // Stop the function if no price is available
        }

        // Start with the price of the selected price type
        let totalPrice = itemPrice;

        // Add the price of selected extras to the total price
        selectedExtras.forEach(extra => {
            totalPrice += extra.price;
            console.log(`Added extra: ${extra.name} for Rs ${extra.price}`);
        });

        // If totalPrice is valid, proceed with adding the item to the basket
        if (totalPrice) {
            addToBasket(id, validPriceType, totalPrice, selectedExtras); // Add item with extras and price
        } else {
            console.log('Cannot add this item to the basket.');
        }
    };


    const getQuantity = (id, priceType) => {
        return basketItems[id] && basketItems[id][priceType || 'single']
            ? basketItems[id][priceType || 'single'].quantity
            : 0;
    };

    const handleIncrement = () => {
        let totalPrice = price[selectedPriceType || 'normal'];
        selectedExtras.forEach(extra => {
            totalPrice += extra.price;
        });
        addToBasket(id, selectedPriceType || 'normal', totalPrice);  // Increment by 1
    };

    const handleDecrement = () => {
        if (basketItems[id] && basketItems[id][selectedPriceType || 'single']) {
            removeFromBasket(id, selectedPriceType || 'single');  // Decrement by 1
        }
    };

    // Toggle extras visibility
    const toggleExtras = () => {
        setShowExtras(prev => !prev);
    };

    // Handle selecting/deselecting an extra
    const handleSelectExtra = (extra) => {
        setSelectedExtras(prev => {
            if (prev.includes(extra)) {
                return prev.filter(item => item !== extra); // Deselect extra
            } else {
                return [...prev, extra]; // Select extra
            }
        });
    };

    // Extras with fixed prices (Egg and Cheese)
    const extrasList = extras || [
        { name: 'Egg', price: 200 },  // Fixed price for Egg
        { name: 'Cheese', price: 300 },  // Fixed price for Cheese
    ];

    return (
        <div className="food-item">
            <div className="food-item-img-container">
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

                {/* Extras Badge */}
                <div className="extras-badge" onClick={toggleExtras}>
                    <p>Extras</p>
                </div>

                {/* Extras List */}
                {showExtras && extrasList.length > 0 && (
                    <div className="extras-list">
                        {extrasList.map(extra => (
                            <div
                                key={extra.name}
                                className={`extra-item ${selectedExtras.includes(extra) ? 'selected' : ''}`}
                                onClick={() => handleSelectExtra(extra)}
                            >
                                <p>{extra.name} (+Rs {extra.price})</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FoodItem;