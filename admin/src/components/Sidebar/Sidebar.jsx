import React, { useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import './Sidebar.css';
import { assets } from '../../assets/assets';

const Sidebar = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/add'); // Redirect to Add Items page on initial load
  }, [navigate]);

  return (
    <div className='sidebar'>
      <div className='sidebar-options'>
        <NavLink to='/add' className='sidebar-option'>
          <img src={assets.add_icon} alt='' />
          <p>Add Items</p>
        </NavLink>
        <NavLink to='/list' className='sidebar-option'>
          <img src={assets.order_icon} alt='' />
          <p>List Items</p>
        </NavLink>
        <NavLink to='/orders' className='sidebar-option'>
          <img src={assets.order_icon} alt='' />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
