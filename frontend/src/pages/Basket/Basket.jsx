import React, { useContext, useState } from 'react';
import './Basket.css';
import { StoreContext } from '../../context/StoreContext';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Basket = () => {
  const { basketItems, food_list, removeFromBasket } = useContext(StoreContext);
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  // Calculate subtotal
  const subtotal = food_list.reduce((acc, item) => {
    return acc + (basketItems[item._id] || 0) * item.price;
  }, 0);

  const deliveryFee = 2; // Fixed delivery fee
  const total = subtotal - discount + deliveryFee;

  // Handle promo code submission
  const handlePromoCodeSubmit = () => {
    if (promoCode === 'SAVE10') {
      setDiscount(10); // Apply discount
      setErrorMessage('');
    } else {
      setErrorMessage('Invalid promo code');
      setDiscount(0);

      // Hide error message after 3 seconds
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  };

  return (
    <div className="basket">
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div className="basket-items">
        <div className="basket-items-title">
          <p>Item</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr />
        {food_list.map((item) => {
          if (basketItems[item._id] > 0) {
            return (
              <div key={item._id} className="basket-items-item">
                <img src={item.image} alt={item.name} />
                <p>{item.name}</p>
                <p>Rs {item.price}</p>
                <p>{basketItems[item._id]}</p>
                <p>Rs {item.price * basketItems[item._id]}</p>
                <button onClick={() => removeFromBasket(item._id)}>
                  <FaTrash />
                </button>
              </div>
            );
          }
          return null;
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
          <div>
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
