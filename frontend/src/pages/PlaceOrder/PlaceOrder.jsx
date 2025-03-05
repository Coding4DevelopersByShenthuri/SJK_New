import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const PlaceOrder = () => {
  const { basketItems, food_list, token, url } = useContext(StoreContext);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState('');
  const deliveryFee = 250;

  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    street: '',
    city: '',
    province: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item)=>{
      if (basketItems[item._id]>0) {
        let itemInfo = item;
        itemInfo['quantity'] = basketItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    let orderData = {
      address: data,
      items: orderItems,
      amount: subtotal()+250,
    }
    let response = await axios.post(url+'/api/order/place', orderData, {headers: {token}});
    if (response.data.success) {
      const {session_url} = response.data.data;
      window.location.replace = (session_url);
    }
    else{
      alert('Error!');
    }
  }

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
    <form onSubmit={placeOrder} className="place-order" onSubmit={handleFormSubmit}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="First Name"
            required
          />
          <input
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder="Last Name"
            required
          />
        </div>
        <input
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          type="email"
          placeholder="Email Address"
        />
        <input
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          placeholder="Street"
          required
        />
        <div className="multi-fields">
          {/* City Dropdown */}
          <select
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            required
            className="bg-gray-800 text-white border rounded p-2"
          >
            <option value="" disabled className="text-white">
              Select City
            </option>
            <option className='bg-gray-800' value="city1">Chavakachcheri</option>
            <option value="city2">Kalvayal</option>
            <option value="city3">Meesalai</option>
            <option value="city3">Sangaththanai</option>
            <option value="city3">Nunavil</option>
            <option value="city3">Kachchai</option>
            <option value="city3">Kodikamam</option>
            <option value="city3">Madduvil</option>
            {/* Add more cities as needed */}
          </select>

          {/* Province Dropdown */}
          <select
            name="province"
            onChange={onChangeHandler}
            value={data.province}
            required
            className="bg-gray-800 text-white border rounded p-2"
          >
            <option value="" disabled className="text-white">
              Select Province
            </option>
            <option value="province1">Jaffna</option>
            {/* Add more provinces as needed */}
          </select>
        </div>
        <div className="multi-fields">
          <input type="text" value="40000" disabled required />
          <input type="text" value="Sri Lanka" disabled required />
        </div>
        <input
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          type="text"
          placeholder="Phone Number"
          required
        />
      </div>

      <div className="place-order-right">
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
          <button type="submit" className="proceed-button">
            PROCEED TO PAYMENT
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
