import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

// Import existing components
import TopBar from '../src/components/Topbar/TopBar.jsx';
import Header from '../src/components/Header/Header.jsx';
import Hero from './components/Hero/Hero.jsx';
import Service from './components/Services/Service.jsx';
import About from './components/About/About.jsx';
import SpecialDish from './components/SpecialDish/SpecialDish.jsx';
import Menu from './components/Menu/Menu.jsx';
import Testimonial from './components/Testimonial/Testimonial.jsx';
import Reservation from './components/Reservation/Reservation.jsx';
import FeaturesSection from './components/FeaturesSection/FeaturesSection.jsx';
import EventSection from './components/EventSection/EventSection.jsx';
import Footer from './components/Footer/Footer.jsx';
import BackToTop from './components/BackToTop/BackToTop.jsx';
import Preloader from './components/common/Preloader.jsx';
import Basket from './pages/Basket/Basket.jsx';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder.jsx';
import SignInPopup from './components/SignInPopup/SignInPopup.jsx';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {/* Show login popup conditionally */}
      {showLogin && <SignInPopup setShowLogin={setShowLogin} />}

      {/* Wrap the main content */}
      <div className='app'>
        <TopBar />
        <Header />

        {/* Add a Header for routing */}
        <Header setShowLogin={setShowLogin} />

        {/* Define routes */}
        <Routes>
          {/* Define the main home page */}
          <Route
            path='/'
            element={
              <>
                <Hero />
                <Service />
                <About />
                <SpecialDish />
                <Menu />
                <Testimonial />
                <Reservation />
                <FeaturesSection />
                <EventSection />
              </>
            }
          />
          {/* Define additional pages */}
          <Route path='/basket' element={<Basket />} />
          <Route path='/order' element={<PlaceOrder />} />
        </Routes>
      </div>

      {/* Footer and other components */}
      <Footer />
      <BackToTop />
      <Preloader />
    </>
  );
};

export default App;
