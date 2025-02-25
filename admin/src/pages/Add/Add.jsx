import React, { useState } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = ({ url }) => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    normalPrice: '',
    fullPrice: '',
    category: 'Appetizers',
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', image);
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', Number(data.price)); // Portion Price
    formData.append('normalPrice', Number(data.normalPrice));
    formData.append('fullPrice', Number(data.fullPrice));
    formData.append('category', data.category);

    try {
      const response = await axios.post(`${url}/api/food/add`, formData);
      if (response.data.success) {
        setData({
          name: '',
          description: '',
          price: '',
          normalPrice: '',
          fullPrice: '',
          category: 'Appetizers',
        });
        setImage(false);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Error adding product!');
    }
  };

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className='add-img-upload flex-col'>
          <p>Upload Image</p>
          <label htmlFor='image'>
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt='' />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type='file' id='image' hidden required />
        </div>

        <div className='add-product-name flex-col'>
          <p>Product Name</p>
          <input onChange={onChangeHandler} value={data.name} type='text' name='name' placeholder='Product Name' />
        </div>

        <div className='add-product-description flex-col'>
          <p>Product Description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name='description'
            rows='6'
            placeholder='Write Content here'
            required
          ></textarea>
        </div>

        <div className='add-category-price'>
          <div className='add-category flex-col'>
            <p>Product Category</p>
            <select onChange={onChangeHandler} value={data.category} name='category'>
              <option value='Appetizers'>Appetizers</option>
              <option value='Manchurian'>Manchurian</option>
              <option value='Devilled'>Devilled</option>
              <option value='Soups'>Soups</option>
              <option value='Fried Rice'>Fried Rice</option>
              <option value='Rice & Curry'>Rice & Curry</option>
              <option value='Nasi Goreng'>Nasi Goreng</option>
              <option value='Noodles'>Noodles</option>
              <option value='Koththu'>Koththu</option>
              <option value='Biryani'>Biryani</option>
              <option value='Curries'>Curries</option>
              <option value='Egg'>Egg</option>
              <option value='SJK Special'>SJK Special</option>
              <option value='Naan'>Naan</option>
              <option value='Paratta'>Paratta</option>
              <option value='Appam'>Appam</option>
              <option value='BBQ'>BBQ</option>
              <option value='Mongolian'>Mongolian</option>
              <option value='Ice Creams'>Ice Creams</option>
              <option value='Fruit Salads'>Fruit Salads</option>
              <option value='Juices'>Juices</option>
              <option value='Drinks'>Drinks</option>
              <option value='Mojito'>Mojito</option>
              <option value='Milk Shakes'>Milk Shakes</option>
              <option value='Lassis'>Lassis</option>
            </select>
          </div>

          <div className='add-price-group flex-col'>
            <p>Product Prices</p>
            <div className='price-inputs'>
              <input
                onChange={onChangeHandler}
                value={data.price}
                type='number'
                name='price'
                placeholder='Portion Price'
              />
              <br></br>
              <br></br>
              <input
                onChange={onChangeHandler}
                value={data.normalPrice}
                type='number'
                name='normalPrice'
                placeholder='Normal Price'
              />
              <br></br>
              <br></br>
              <input
                onChange={onChangeHandler}
                value={data.fullPrice}
                type='number'
                name='fullPrice'
                placeholder='Full Price'
              />
            </div>
          </div>
        </div>

        <button type='submit' className='add-btn'>
          Add Product
        </button>
      </form>
    </div>
  );
};

export default Add;
