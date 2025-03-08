import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const PlaceOrder = () => {
  const { basketItems, food_list, token, url } = useContext(StoreContext);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const deliveryFee = 250;

  if (!basketItems || !food_list || !url) {
    console.error("Missing required context values!");
    return <p>Error: Unable to load data.</p>;
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

  useEffect(() => {
    if (subtotal === 0) {
      navigate("/basket"); // Redirect to basket page if subtotal is zero
    }
  }, [subtotal, navigate]);


  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    province: "",
    zipcode: "40000",
    country: "Sri Lanka",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    setLoading(true);

    let orderItems = food_list
      .filter((item) => basketItems[item._id] && basketItems[item._id] > 0)
      .map((item) => ({
        ...item,
        quantity: basketItems[item._id],
      }));

    let orderData = {
      address: data,
      items: orderItems,
      amount: total,
    };

    console.log("Placing order:", orderData);

    try {
      console.log("Sending request with headers:", { Authorization: `Bearer ${token}` });

      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Order response:", response.data);

      if (response.data.success) {
        const { session_url } = response.data.data;
        window.location.href = session_url; // Redirect to payment page
      } else {
        alert("Error placing order!");
      }
    } catch (error) {
      console.error("Order Error:", error.response?.data || error.message);
      
      if (error.response?.status === 401) {
        alert("Session expired! Please login again.");
        navigate("/login");
      } else {
        alert("Network Error! Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePromoCodeSubmit = () => {
    if (promoCode === "SAVE10") {
      setDiscount(10);
      setError("");
    } else {
      setError("Invalid promo code");
      setDiscount(0);
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            name="firstname"
            onChange={onChangeHandler}
            value={data.firstname}
            type="text"
            placeholder="First Name"
            required
          />
          <input
            name="lastname"
            onChange={onChangeHandler}
            value={data.lastname}
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
          required
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
          <select
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            required
            className="bg-gray-800 text-white border rounded p-2"
          >
            <option value="" disabled>
              Select City
            </option>
            <option value="Chavakachcheri">Chavakachcheri</option>
            <option value="Kalvayal">Kalvayal</option>
            <option value="Meesalai">Meesalai</option>
            <option value="Sangaththanai">Sangaththanai</option>
            <option value="Nunavil">Nunavil</option>
            <option value="Kachchai">Kachchai</option>
            <option value="Kodikamam">Kodikamam</option>
            <option value="Madduvil">Madduvil</option>
          </select>

          <select
            name="province"
            onChange={onChangeHandler}
            value={data.province}
            required
            className="bg-gray-800 text-white border rounded p-2"
          >
            <option value="" disabled>
              Select Province
            </option>
            <option value="Jaffna">Jaffna</option>
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
          <button type="submit" className="proceed-button" disabled={loading}>{loading ? "Processing..." : "PROCEED TO PAYMENT"}</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
