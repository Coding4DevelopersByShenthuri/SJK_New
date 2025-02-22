import React, { useState, useEffect } from 'react';
import './Add.css';
import {assets} from '../../assets/assets'

const Add = () => {

    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'Appetizers'
    })

    const onChangeHandler = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setData(data=>({...data, [name]: value}))
    }

    useEffect(() => {
        console.log(data);
    },[data])

  return (
    <div className='add'>
      <form className='flex-col'>
        <div className='add-img-upload flex-col'>
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
        </div>
        <div className='add-product-name flex-col'>
            <p>Product Name</p>
            <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Product Name' />
        </div>
        <div className='add-product-description flex-col'>
            <p>Product Description</p>
            <textarea onChange={onChangeHandler} value={data.description} name='description' rows="6" placeholder='Write Content here' required></textarea>
        </div>
        <div className='add-category-price'>
          <div className='add-category flex-col'>
            <p>Product Category</p>
            <select onChange={onChangeHandler} value={data.category} name="category">
                <option value="Appetizers">Appetizers</option>
                <option value="Manchurian">Manchurian</option>
                <option value="Devilled">Devilled</option>
                <option value="Soups">Soups</option>
                <option value="Fried Rice">Fried Rice</option>
                <option value="Rice & Curry">Rice & Curry</option>
                <option value="Nasi Goreng">Nasi Goreng</option>
                <option value="Noodles">Noodles</option>
                <option value="Koththu">Koththu</option>
                <option value="Biryani">Biryani</option>
                <option value="Curries">Curries</option>
                <option value="Egg">Egg</option>
                <option value="SJK Special">SJK Special</option>
                <option value="Naan">Naan</option>
                <option value="Paratta">Paratta</option>
                <option value="Appam">Appam</option>
                <option value="BBQ">BBQ</option> 
                <option value="Mongolian">Mongolian</option>
                <option value="Ice Creams">Ice Creams</option>
                <option value="Fruit Salads">Fruit Salads</option>
                <option value="Juices">Juices</option>
                <option value="Drinks">Drinks</option>
                <option value="Mojito">Mojito</option>
                <option value="Milk Shakes">Milk Shakes</option>
                <option value="Lassis">Lassis</option>
            </select>
          </div>
          <div className='add-price flex-col'>
            <p>Product Price</p>
            <input onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='Price' required />
          </div>
        </div>
        <button type='submit' className='add-btn'>Add Product</button>
      </form>
    </div>
  )
}

export default Add;
