import React, { useContext, useState } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ id, name, price, description, Image, url }) => {
    const { basketItems, addToBasket } = useContext(StoreContext);
    const [selectedPriceType, setSelectedPriceType] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [showSuccessMsg, setShowSuccessMsg] = useState(false);

    // Construct the full image URL
    const imageUrl = Image ? `${url}/images/${Image}` : assets.placeholder_image;
    console.log('FoodItem Image URL:', imageUrl);

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
        if (!price || (price?.normal && price?.full && !selectedPriceType)) {
            console.log('Please select a price option first.');
            return;
        }
        if (!selectedDeliveryMethod) {
            console.log('Please select a delivery method.');
            return;
        }
    
        const chosenPrice = selectedPriceType ? price[selectedPriceType] : price;
        addToBasket(id, selectedPriceType || 'Portion', chosenPrice, quantity, selectedDeliveryMethod);
    
        // Show success message
        setShowSuccessMsg(true);
    
        // Hide message & close popup after 1.5 seconds
        setTimeout(() => {
            setShowSuccessMsg(false);
            setIsPopupOpen(false);
        }, 1500);
    };


    return (
        <div className="food-item">
            <div className="food-item-img-container" onClick={handlePopupToggle}>
            <img className="food-item-image" src={imageUrl} alt={name} />
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

            {isPopupOpen && (
                <div className="food-item-popup">
                    <div className="popup-content">
                        <span className="popup-close" onClick={handlePopupToggle}>X</span>
                        <img className="popup-image" src={url + "/images/" + Image} alt={name} />
                        <h3 style={{ color: 'black' }}>{name}</h3>
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