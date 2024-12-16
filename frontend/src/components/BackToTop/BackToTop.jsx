import React, { useState } from 'react';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Function to show or hide the button based on scroll position
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll back to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Add event listener for scroll event to toggle button visibility
  React.useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <a
      href="#top"
      className={`back-top-btn ${isVisible ? 'active' : ''}`}
      aria-label="Back to top"
      onClick={scrollToTop}
    >
      <ion-icon name="chevron-up" aria-hidden="true"></ion-icon>
    </a>
  );
};

export default BackToTop;
