import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';

const PlaceOrder = () => {
  const { getTotalBasketAmount } = useContext(StoreContext); // Get the total basket amount from context
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState(''); // To show error message
  const deliveryFee = 250; // Fixed delivery fee

  // Get the subtotal from the context (total basket amount)
  const subtotal = getTotalBasketAmount();

  // Calculate the total (subtotal - discount + delivery fee)
  const calculateTotal = () => {
    return subtotal - discount + deliveryFee;
  };

  // Handle promo code submission
  const handlePromoCodeSubmit = () => {
    if (promoCode === 'SAVE10') {
      setDiscount(10); // Apply discount
      setError(''); // Clear error if promo code is valid
    } else {
      setError('Invalid promo code'); // Show error if promo code is invalid
      setDiscount(0); // Reset discount if the code is invalid
    }
  };

  // Handle form submission (basic validation)
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic (e.g., API call, form validation, etc.)
  };

  return (
    <form className='place-order' onSubmit={handleFormSubmit}>
      <div className='place-order-left'>
        <p className='title'>Delivery Information</p>
        <div className='multi-fields'>
          <input type="text" placeholder="First Name" required />
          <input type="text" placeholder="Last Name" required />
        </div>
        <input type="email" placeholder='Email Address' />
        <input type="text" placeholder='Street' required />
        <div className='multi-fields'>
          {/* City field fixed to Chavakachcheri */}
          <input type="text" value="Chavakachcheri" disabled required />
          {/* District field fixed to Jaffna */}
          <input type="text" value="Jaffna" disabled required />
        </div>
        <div className='multi-fields'>
          {/* Postal Code fixed to 40000 */}
          <input type="text" value="40000" disabled required />
          {/* Country field fixed to Sri Lanka */}
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
              <p>Rs {subtotal}</p> {/* Show the calculated subtotal */}
            </div>
            <hr />
            <div className="basket-total-details">
              <p>Promo Discount</p>
              <p>- Rs {discount}</p>
            </div>
            <hr />
            <div className="basket-total-details">
              <p>Delivery Fee</p>
              <p>Rs {deliveryFee}</p> {/* Show delivery fee */}
            </div>
            <hr />
            <div className="basket-total-details">
              <p>Total</p>
              <b>Rs {calculateTotal()}</b> {/* Show the total, including discount and delivery fee */}
            </div>
          </div>

          {/* Promo Code Section */}
          <div className="basket-promocode">
            <p>If you have a promo code, enter it here</p>
            <div className="basket-promocode-input">
              <input
                type="text"
                placeholder="Promo Code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="promo-code-input"
              />
              <button
                type="button"
                onClick={handlePromoCodeSubmit}
                disabled={!promoCode} // Disable button if promoCode is empty
                className="apply-button"
              >
                Apply
              </button>
            </div>
            {error && <p className="error-message">{error}</p>} {/* Show error message if promo code is invalid */}
          </div>
          <button type="submit" className="proceed-button">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
