import React, { useContext, useEffect } from 'react';
import './Verify.css';
import { useSearchParams, useNavigate } from 'react-router-dom'; 
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');
    const { url } = useContext(StoreContext);
    const navigate = useNavigate(); // Ensure useNavigate is properly imported and used

    const verifyPayment = async () => {
        try {
            const response = await axios.post(url + '/api/order/verify', { orderId, success });
            if (response.data.success) {
                navigate('/myorders');
            } else {
                navigate('/');
            }
        } catch (error) {
            console.error('Error verifying payment:', error);
            navigate('/'); 
        }
    };

    useEffect(() => {
        verifyPayment();
    }, []);

    return (
        <div className='verify'>
            <div className='spinner'></div>
        </div>
    );
};

export default Verify;
