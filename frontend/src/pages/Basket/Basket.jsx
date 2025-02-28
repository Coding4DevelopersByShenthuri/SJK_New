import React, { useContext, useState } from 'react';
import '../Basket/Basket.css';
import { StoreContext } from '../../context/StoreContext';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Basket = () => {
  const { basketItems, food_list, removeFromBasket, updateBasketItem, url } = useContext(StoreContext);
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  // Calculate subtotal
  const subtotal = Object.entries(basketItems || {}).reduce((total, [itemId, priceTypes]) => {
    // Check if priceTypes is an object
    if (priceTypes && typeof priceTypes === 'object') {
      return (
        total +
        Object.entries(priceTypes).reduce((subtotal, [priceType, details]) => {
          const itemPrice = details.price || 0;
          return subtotal + details.quantity * itemPrice;
        }, 0)
      );
    }
    return total; // Return total if priceTypes is invalid
  }, 0);

  const deliveryFee = 250;
  const total = subtotal - discount + deliveryFee;

  const handlePromoCodeSubmit = () => {
    if (promoCode === 'SAVE10') {
      setDiscount(10);
      setErrorMessage('');
    } else {
      setErrorMessage('Invalid promo code');
      setDiscount(0);
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  const handleQuantityChange = (itemId, priceType, change) => {
    const currentQuantity = basketItems[itemId]?.[priceType]?.quantity || 0;
    const newQuantity = currentQuantity + change;
    if (newQuantity >= 0) {
      updateBasketItem(itemId, priceType, newQuantity);
    }
  };

  return (
    <div className="basket-container">
      <div className="basket">
        <h1 className="basket-heading">My Basket</h1>
        <p className="basket-aesthetic">"Every item here tells a story, crafted just for you."</p>
        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <div className="basket-items">
          <div className="basket-items-title">
            <p>Item</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Delivery Method</p>
            <p>Remove</p>
          </div>
          <hr />

          {food_list.map((item) => {
            const itemBasketDetails = basketItems[item._id];
            if (!itemBasketDetails) return null;

            return Object.entries(itemBasketDetails).map(([priceType, details]) => {
              const itemPrice = details.price || 0;
              return (
                <div key={`${item._id}-${priceType}`} className="basket-items-item">
                  <img src={`${url}/images/${item.Image}`} alt={item.name} />
                  <p>{item.name} ({priceType})</p>
                  <p>Rs {itemPrice}</p>
                  <div className="quantity-controls">
                    <button onClick={() => handleQuantityChange(item._id, priceType, +1)}>+</button>
                    <p>{details.quantity}</p>
                    <button onClick={() => handleQuantityChange(item._id, priceType, -1)}>-</button>
                  </div>
                  <p>Rs {itemPrice * details.quantity}</p>
                  <p>{details.deliveryMethod}</p>
                  <button onClick={() => removeFromBasket(item._id, priceType)}>
                    <FaTrash />
                  </button>
                </div>
              );
            });
          })}
        </div>

        <div className="basket-bottom">
          <div className="basket-total">
            <h2>Basket Totals</h2>
            <div>
              <div className="basket-total-details">
                <p>Subtotal</p>
                <p>Rs {subtotal}</p>
              </div>
              <hr />
              <div className="basket-total-details">
                <p>Promo Discount</p>
                <p>- Rs {discount}</p>
              </div>
              <hr />
              <div className="basket-total-details">
                <p>Delivery Fee</p>
                <p>Rs {deliveryFee}</p>
              </div>
              <hr />
              <div className="basket-total-details">
                <p>Total</p>
                <b>Rs {total}</b>
              </div>
            </div>
            <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
          </div>

          <div className="basket-promocode">
            <p>If you have a promo code, enter it here</p>
            <div className="basket-promocode-input">
              <input
                type="text"
                placeholder="Promo Code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button onClick={handlePromoCodeSubmit}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Basket;