import React, { useState, useEffect } from 'react';

const Hero = () => {
  const [currentSlidePos, setCurrentSlidePos] = useState(0);

  const heroSliderItems = [
    {
      imgSrc: '../src/assets/images/hero-slider-1.jpg',
      subtitle: 'Traditional & Hygienic',
      title: 'For the love of delicious food',
      text: 'Come with family & feel the joy of mouthwatering food',
      buttonText: 'View Our Menu',
    },
    {
      imgSrc: '../src/assets/images/hero-slider-2.jpg',
      subtitle: 'delightful experience',
      title: 'Flavors Inspired by the Seasons',
      text: 'Our food is fresh, healthy, and delicious',
      buttonText: 'Explore More',
    },
    {
      imgSrc: '../src/assets/images/hero-slider-3.jpg',
      subtitle: 'Amazing & delicious',
      title: 'Where every flavor tells a story',
      text: 'Enjoy the best food made with love',
      buttonText: 'Discover Our Dishes',
    },
    {
      imgSrc: '../src/assets/images/hero-slider-4.jpg',
      subtitle: 'Fresh & Local',
      title: 'A Taste of Fresh Ingredients',
      text: 'Explore fresh, locally sourced ingredients for the ultimate experience',
      buttonText: 'Explore Our Menu',
    },
    {
      imgSrc: '../src/assets/images/hero-slider-7.jpeg',
      subtitle: 'Authentic & Unique',
      title: 'Savor the Art of Fine Dining',
      text: 'Indulge in an unforgettable culinary journey crafted with passion',
      buttonText: 'Reserve Your Table',
    },
    {
      imgSrc: '../src/assets/images/hero-slider-9.avif',
      subtitle: 'Bold & Flavorful',
      title: 'Discover Bold New Flavors',
      text: 'Embark on a taste adventure that will tantalize your senses',
      buttonText: 'Explore Flavors',
    },
    {
      imgSrc: '../src/assets/images/hero-slider-12.jpg',
      subtitle: 'Seasonal Favorites',
      title: 'Taste the Best of Every Season',
      text: 'Fresh seasonal ingredients, prepared to perfection',
      buttonText: 'View Seasonal Menu',
    },
    {
      imgSrc: '../src/assets/images/hero-slider-8.jpg',
      subtitle: 'Elegant & Refined',
      title: 'An Experience Like No Other',
      text: 'Elevate your dining with a touch of elegance',
      buttonText: 'Book Your Visit',
    },
    {
      imgSrc: '../src/assets/images/hero-slider-19.jpg',
      subtitle: 'Bold & Flavorful',
      title: 'Discover Bold New Flavors',
      text: 'Embark on a taste adventure that will tantalize your senses',
      buttonText: 'Explore Flavors',
    },
    {
      imgSrc: '../src/assets/images/hero-slider-15.webp',
      subtitle: 'Local & Fresh',
      title: 'From Farm to Your Table',
      text: 'Supporting local farmers for a truly fresh experience',
      buttonText: 'Learn More',
    },
    {
      imgSrc: '../src/assets/images/hero-slider-10.jpg',
      subtitle: 'Cozy Atmosphere',
      title: 'A Place to Create Memories',
      text: 'Make every gathering special in our warm ambiance',
      buttonText: 'Reserve Now',
    },
    {
      imgSrc: '../src/assets/images/hero-slider-6.jpeg',
      subtitle: 'Local & Fresh',
      title: 'From Farm to Your Table',
      text: 'Supporting local farmers for a truly fresh experience',
      buttonText: 'Learn More',
    },
    {
      imgSrc: '../src/assets/images/hero-slider-11.jpeg',
      subtitle: 'Authentic Recipes',
      title: 'Tradition Meets Innovation',
      text: 'Authentic recipes crafted with a modern touch',
      buttonText: 'Discover More',
    },
    {
      imgSrc: '../src/assets/images/hero-slider-5.jpg',
      subtitle: 'Inspired Creations',
      title: 'Artistry on Every Plate',
      text: 'A dining experience that is as beautiful as it is delicious',
      buttonText: 'View Gallery',
    },
    {
      imgSrc: '../src/assets/images/hero-slider-16.jpg',
      subtitle: 'Sweet Indulgence',
      title: 'Delight in Every Sweet Bite',
      text: 'Our desserts are the perfect ending to your meal',
      buttonText: 'View Desserts',
    },
    {
      imgSrc: '../src/assets/images/hero-slider-13.avif',
      subtitle: 'Perfect Pairings',
      title: 'Wine & Dine in Style',
      text: 'The perfect wine for every meal, expertly paired',
      buttonText: 'Explore Pairings',
    },
    {
      imgSrc: '../src/assets/images/hero-slider-17.jpeg',
      subtitle: 'Local & Fresh',
      title: 'Inspired Creations',
      text: 'Supporting local farmers for a truly fresh experience',
      buttonText: 'Learn More',
    },
    {
      imgSrc: '../src/assets/images/hero-slider-18.avif',
      subtitle: 'Seasonal Favorites',
      title: 'Artistry on Every Plate',
      text: 'Supporting local farmers for a truly fresh experience',
      buttonText: 'Explore Pairings',
    },
  ];

  // Update active slider class
  const updateSliderPos = () => {
    const heroSliderItemsElements = document.querySelectorAll('[data-hero-slider-item]');
    heroSliderItemsElements.forEach((item, index) => {
      item.classList.toggle('active', index === currentSlidePos);
    });
  };

  // Next Slide
  const slideNext = () => {
    setCurrentSlidePos((prevPos) => (prevPos + 1) % heroSliderItems.length);
  };

  // Previous Slide
  const slidePrev = () => {
    setCurrentSlidePos((prevPos) => (prevPos - 1 + heroSliderItems.length) % heroSliderItems.length);
  };

  // Auto-slide every 7 seconds
  useEffect(() => {
    updateSliderPos();
  }, [currentSlidePos]);

  useEffect(() => {
    const autoSlideInterval = setInterval(() => {
      slideNext();
    }, 7000);

    return () => clearInterval(autoSlideInterval);
  }, []);

  // Parallax Effect
  useEffect(() => {
    const parallaxItems = document.querySelectorAll('[data-parallax-item]');
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 10 - 5;
      const y = (event.clientY / window.innerHeight) * 10 - 5;

      parallaxItems.forEach((item) => {
        const speed = item.dataset.parallaxSpeed || 1;
        item.style.transform = `translate3d(${x * speed}px, ${y * speed}px, 0)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="hero text-center" aria-label="home" id="home">
      <ul className="hero-slider" data-hero-slider>
        {heroSliderItems.map((item, index) => (
          <li
            className={`slider-item ${index === currentSlidePos ? 'active' : ''}`}
            data-hero-slider-item
            key={index}
          >
            <div className="slider-bg">
              <img
                src={item.imgSrc}
                width="1880"
                height="950"
                alt={`Slider Image ${index + 1}`}
                className="img-cover"
              />
            </div>
            <p className="label-2 section-subtitle slider-reveal">{item.subtitle}</p>
            <h1 className="display-1 hero-title slider-reveal">{item.title}</h1>
            <p className="body-2 hero-text slider-reveal">{item.text}</p>
            <a href="#" className="btn btn-primary slider-reveal">
              <span className="text text-1">{item.buttonText}</span>
              <span className="text text-2" aria-hidden="true">{item.buttonText}</span>
            </a>
          </li>
        ))}
      </ul>

      <button className="slider-btn prev" aria-label="Previous Slide" onClick={slidePrev}>
        <ion-icon name="chevron-back"></ion-icon>
      </button>

      <button className="slider-btn next" aria-label="Next Slide" onClick={slideNext}>
        <ion-icon name="chevron-forward"></ion-icon>
      </button>

      <a href="#" className="hero-btn has-after">
        <img src="../src/assets/images/hero-icon.png" width="48" height="48" alt="booking icon" />
        <span className="label-2 text-center span">Book A Table</span>
      </a>
    </section>
  );
};

export default Hero;
