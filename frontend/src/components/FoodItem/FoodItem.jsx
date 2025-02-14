import React, { useContext, useState } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ id, name, price, description, image }) => {
    const { basketItems, addToBasket, removeFromBasket } = useContext(StoreContext);
    const [selectedPriceType, setSelectedPriceType] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState('');
    const [quantity, setQuantity] = useState(1);

    const handlePriceClick = (type) => setSelectedPriceType(type);
    const handlePopupToggle = () => setIsPopupOpen(!isPopupOpen);
    const handleDeliveryMethodChange = (e) => setSelectedDeliveryMethod(e.target.value);
    const increaseQuantity = () => setQuantity(prev => prev + 1);
    const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : prev));

    const handleAddToBasket = () => {
        if (!selectedPriceType && (price?.normal || price?.full)) {
            console.log('Please select a price option first.');
            return;
        }
        
        const chosenPrice = selectedPriceType ? price[selectedPriceType] : price;
        addToBasket(id, selectedPriceType || 'single', chosenPrice, quantity, selectedDeliveryMethod);
    };

    return (
        <div className="food-item">
            <div className="food-item-img-container" onClick={handlePopupToggle}>
                <img className="food-item-image" src={image} alt={name} />
                {(!basketItems[id] || !basketItems[id][selectedPriceType || 'single']) && (
                    <img
                        className="add"
                        onClick={handleAddToBasket}
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
                            <p className={selectedPriceType === 'normal' ? 'selected-price' : ''} onClick={() => handlePriceClick('normal')}>Normal: Rs {price.normal}</p>
                            <p className={selectedPriceType === 'full' ? 'selected-price' : ''} onClick={() => handlePriceClick('full')}>Full: Rs {price.full}</p>
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
                        <img className="popup-image" src={image} alt={name} />
                        <h3 style={{ color: 'black' }}>{name}</h3>
                        <p>{description}</p>
                        <div className="popup-price">
                            {price?.normal && price?.full ? (
                                <>
                                    <p className={selectedPriceType === 'normal' ? 'selected-price' : ''} onClick={() => handlePriceClick('normal')}>Normal: Rs {price.normal}</p>
                                    <p className={selectedPriceType === 'full' ? 'selected-price' : ''} onClick={() => handlePriceClick('full')}>Full: Rs {price.full}</p>
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
        </div>
    );
};

export default FoodItem;