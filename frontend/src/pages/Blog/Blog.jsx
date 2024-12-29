import React from 'react';
import food from '../../assets/Do not waste food.png';
import Smoking from '../../assets/No_Smoking.png';
import Washroom from '../../assets/Washroom.png';
import Handwash from '../../assets/Handwash.png';
import './Blog.css';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'Do not waste food',
      author: 'Owner',
      date: 'December 28, 2024',
      excerpt: 'Managing a shop requires good organization, a focus on customer satisfaction, and efficient stock management. Learn the best tips here.',
      image: food,
    },
    {
      id: 2,
      title: 'No Smoking',
      author: 'Owner',
      date: 'December 15, 2024',
      excerpt: 'Discover the top 10 products that every successful supermarket should stock to keep customers coming back.',
      image: Smoking,
    },
    {
      id: 3,
      title: 'Lets keep Clean and tidy',
      author: 'Owner',
      date: 'December 5, 2024',
      excerpt: 'Explore the latest trends in retail technology and how they are shaping the future of shopping experiences.',
      image: Washroom,
    },
    {
      id: 4,
      title: 'HandWash Before Dining',
      author: 'Owner',
      date: 'December 5, 2024',
      excerpt: 'Explore the latest trends in retail technology and how they are shaping the future of shopping experiences.',
      image: Handwash,
    },
  ];

  const categories = [
    'Appetizers',
    'Main Course',
    'Desserts',
    'Beverages',
    'Salads',
    'Vegan Options',
    'Seafood Specials',
    'Kids Menu',
  ];

  return (
    <div>
      <h1 className="blog-title">Welcome to Our Blog</h1>
      <p className="blog-intro">
        Stay updated with the latest tips, trends, and insights in shop management and retail technology.
      </p>

      {/* Categories Section */}
      <div className="categories-container">
        <h2 className="categories-title">Explore Our Categories</h2>
        <div className="categories-list">
          {categories.map((category, index) => (
            <div key={index} className="category-item">
              {category}
            </div>
          ))}
        </div>
      </div>

      {/* Blog Posts Section */}
      <div className="blog-container">
        <div className="blog-posts">
          {blogPosts.map(post => (
            <div key={post.id} className="blog-card">
              <img src={post.image} alt={post.title} className="blog-image" />
              <div className="blog-content">
                <h2 className="blog-post-title">{post.title}</h2>
                <p className="blog-author">
                  By : {post.author} | {post.date}
                </p>
                <p className="blog-excerpt">{post.excerpt}</p>
                <button className="read-more">Read More</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;