import React, { useContext, useState } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ id, name, price, normalPrice, fullPrice, description, image }) => {
    const { basketItems, addToBasket,url } = useContext(StoreContext);
    const [selectedPriceType, setSelectedPriceType] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [showSuccessMsg, setShowSuccessMsg] = useState(false);

    // Handle selecting price type (normal or full) for food items with multiple prices
    const handlePriceClick = (type) => setSelectedPriceType(type);

    // Toggle popup open/close
    const handlePopupToggle = () => setIsPopupOpen(!isPopupOpen);

    // Handle changing delivery method
    const handleDeliveryMethodChange = (e) => setSelectedDeliveryMethod(e.target.value);

    // Increase quantity
    const increaseQuantity = () => setQuantity(prev => prev + 1);

    // Decrease quantity
    const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : prev));

    // Handle adding item to the basket
    const handleAddToBasket = () => {
        if (price?.normal && price?.full && !selectedPriceType) {
            console.log('Please select a price option first.');
            return;
        }
        if (!selectedDeliveryMethod) {
            console.log('Please select a delivery method.');
            return;
        }

        let chosenPrice;
        if (selectedPriceType === 'normal') {
            chosenPrice = normalPrice;
        } else if (selectedPriceType === 'full') {
            chosenPrice = fullPrice;
        } else {
            chosenPrice = price; // Default portion price
        }

        addToBasket(id, selectedPriceType || 'Portion', chosenPrice, quantity, selectedDeliveryMethod);

        // Show success message
        setShowSuccessMsg(true);

        // Hide message & close popup after 1.5 seconds
        setTimeout(() => {
            setShowSuccessMsg(false);
            setIsPopupOpen(false);
        }, 1500);
    };

    // Log image URL to check what value is being passed
    console.log(image);  // Check what value is being passed

    return (
        <div className="food-item">
            <div className="food-item-img-container" onClick={handlePopupToggle}>
                <img className="food-item-image" src={`${url}/uploads/${image}`} alt={name} />
                {(!basketItems[id] || !basketItems[id][selectedPriceType || 'portion']) && (
                    <img
                        className="add"
                        onClick={handlePopupToggle}
                        src={assets.add_icon_white}
                        alt="Add to basket"
                    />
                )}
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt="Rating stars" />
                </div>
                <p className="food-item-desc">{description}</p>
                <div className="food-item-price">
                    <p
                        className={selectedPriceType === 'portion' ? 'selected-price' : ''}
                        onClick={() => handlePriceClick('portion')}
                    >
                        Portion: Rs {price}
                    </p>
                    {normalPrice && (
                        <p
                            className={selectedPriceType === 'normal' ? 'selected-price' : ''}
                            onClick={() => handlePriceClick('normal')}
                        >
                            Normal: Rs {normalPrice}
                        </p>
                    )}
                    {fullPrice && (
                        <p
                            className={selectedPriceType === 'full' ? 'selected-price' : ''}
                            onClick={() => handlePriceClick('full')}
                        >
                            Full: Rs {fullPrice}
                        </p>
                    )}
                </div>
            </div>

            {isPopupOpen && (
                <div className="food-item-popup">
                    <div className="popup-content">
                        <span className="popup-close" onClick={handlePopupToggle}>X</span>
                        <img className="popup-image" src={`${url}/uploads/${image}`} alt={name} />
                        <h3 style={{ color: 'black' }}>{name}</h3>
                        <p>{description}</p>

                        <div className="popup-prices">
                            <p
                                className={selectedPriceType === 'portion' ? 'selected-price' : ''}
                                onClick={() => handlePriceClick('portion')}
                            >
                                Portion: Rs {price}
                            </p>
                            {normalPrice && (
                                <p
                                    className={selectedPriceType === 'normal' ? 'selected-price' : ''}
                                    onClick={() => handlePriceClick('normal')}
                                >
                                    Normal: Rs {normalPrice}
                                </p>
                            )}
                            {fullPrice && (
                                <p
                                    className={selectedPriceType === 'full' ? 'selected-price' : ''}
                                    onClick={() => handlePriceClick('full')}
                                >
                                    Full: Rs {fullPrice}
                                </p>
                            )}
                        </div>
                        
                        <div className="delivery-methods">
                            <h4>Delivery Methods:</h4>
                            <div className="delivery-method-options">
                                {['dine-in', 'takeaway', 'home-delivery'].map(method => (
                                    <label key={method}>
                                        <input
                                            type="radio"
                                            value={method}
                                            checked={selectedDeliveryMethod === method}
                                            onChange={handleDeliveryMethodChange}
                                        />
                                        {method.replace('-', ' ').toUpperCase()}
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="quantity-counter">
                            <button className="counter-btn" onClick={decreaseQuantity}>-</button>
                            <span className="quantity">{quantity}</span>
                            <button className="counter-btn" onClick={increaseQuantity}>+</button>
                        </div>
                        <button className="add-to-basket-btn" onClick={handleAddToBasket}>Add to Basket</button>
                    </div>
                </div>
            )}

            {showSuccessMsg && (
                <div className="success-message">
                    <p>✅ Added Successfully!</p>
                </div>
            )}
        </div>
    );
};

export default FoodItem;