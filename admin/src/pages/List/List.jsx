import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({ url }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error('Error fetching data');
      }
    } catch (error) {
      toast.error('Error fetching data');
    }
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchList();
      } else {
        toast.error('Error removing food');
      }
    } catch (error) {
      toast.error('Error removing food');
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  // Format both full and normal prices
  const formatPrice = (price, type) => {
    if (price) {
      return `Rs ${price} (${type})`;
    }
    return '';  // Return empty if price is not available
  };

  return (
    <div className='list add flex-col'>
      <p>All Food List</p>
      <div className='list-table'>
        <div className='list-table-format title'>
          <b>Image</b>
          <b>Name</b>
          <b>Description</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className='list-table-format'>
            <img src={`${url}/images/${item.Image}`} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.description}</p>
            <p>{item.category}</p>
            <p>
              {/* Stacked Prices */}
              {formatPrice(item.fullPrice, 'Full')} <br />
              {formatPrice(item.normalPrice, 'Normal')}
              <p>{formatPrice(item.price, 'Portion')}</p>
            </p>
            <p onClick={() => removeFood(item._id)} className='cursor'>X</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
