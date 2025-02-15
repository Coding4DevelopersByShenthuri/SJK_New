import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';

const PlaceOrder = () => {
  const { basketItems, food_list } = useContext(StoreContext);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState('');
  const deliveryFee = 250;

  // Calculate subtotal
  const subtotal = Object.entries(basketItems).reduce((total, [itemId, priceTypes]) => {
    return (
      total +
      Object.entries(priceTypes).reduce((subtotal, [priceType, details]) => {
        const itemPrice = details.price || 0;
        return subtotal + details.quantity * itemPrice;
      }, 0)
    );
  }, 0);

  const total = subtotal - discount + deliveryFee;

  const handlePromoCodeSubmit = () => {
    if (promoCode === 'SAVE10') {
      setDiscount(10);
      setError('');
    } else {
      setError('Invalid promo code');
      setDiscount(0);
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted! Proceeding to payment...');
  };

  return (
    <form className='place-order' onSubmit={handleFormSubmit}>
      <div className='place-order-left'>
        <p className='title'>Delivery Information</p>
        <div className='multi-fields'>
          <input type="text" placeholder="First Name" required />
          <input type="text" placeholder="Last Name" required />
        </div>
        <input type="email" placeholder='Email Address' required />
        <input type="text" placeholder='Street' required />
        <div className='multi-fields'>
          <input type="text" value="Chavakachcheri" disabled required />
          <input type="text" value="Jaffna" disabled required />
        </div>
        <div className='multi-fields'>
          <input type="text" value="40000" disabled required />
          <input type="text" value="Sri Lanka" disabled required />
        </div>
        <input type="text" placeholder='Phone Number' required />
      </div>

      <div className='place-order-right'>
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

          <div className="basket-promocode">
            <p>If you have a promo code, enter it here</p>
            <div className="basket-promocode-input">
              <input
                type="text"
                placeholder="Promo Code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button type="button" onClick={handlePromoCodeSubmit} disabled={!promoCode}>
                Apply
              </button>
            </div>
            {error && <p className="error-message">{error}</p>}
          </div>
          <button type="submit" className="proceed-button">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;