import React, { useState, useContext, useEffect, useCallback } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets.js';

const MyOrders = () => {
    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);

    const fetchOrders = useCallback(async () => {
        if (!token) return;
        try {
            const response = await axios.post(`${url}/api/order/userorders`, {}, { headers: { token } });
            console.log("Orders received:", response.data.data);
            setData(response.data.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }        
    }, [url, token]);

    useEffect(() => {
        console.log("Fetching orders...");
        fetchOrders();
    }, [fetchOrders]);

    
    return (
        <div className="myorders">
            <h2>My Orders</h2>
            <div className="container">
                {data.length > 0 ? (
                    data.map((order, index) => (
                        <div key={index} className="myorders-order">
                            <img src={assets.parcel_icon} alt="Order Parcel" />
                            <p>
                                {order.items
                                    .map(item => `${item.name} x ${item.quantity}`)
                                    .join(', ')}
                            </p>
                            <p>Rs {order.amount}.00 LKR</p>
                            <p>Items: {order.items.length}</p>
                            <p>
                                <span>&#x25cf;</span> <b>{order.status}</b>
                            </p>
                            <button onClick={fetchOrders}>Track Order</button>
                        </div>
                    ))
                ) : (
                    <p>No orders found.</p>
                )}
            </div>
        </div>
    );
};

export default MyOrders;
