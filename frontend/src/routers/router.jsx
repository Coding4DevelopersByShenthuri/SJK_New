// RouterConfig.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Hero from '../components/Hero/Hero.jsx';
import Service from '../components/Services/Service.jsx';
import About from '../components/About/About.jsx';
import SpecialDish from '../components/SpecialDish/SpecialDish.jsx';
import Menu from '../components/Menu/Menu.jsx';
import Testimonial from '../components/Testimonial/Testimonial.jsx';
import Reservation from '../components/Reservation/Reservation.jsx';
import FeaturesSection from '../components/FeaturesSection/FeaturesSection.jsx';
import EventSection from '../components/EventSection/EventSection.jsx';
import Basket from '../pages/Basket/Basket.jsx';
import PlaceOrder from '../pages/PlaceOrder/PlaceOrder.jsx';

const router = () => {
  return (
    <Routes>
      <Route
        path="/"
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
      <Route path="/basket" element={<Basket />} />
      <Route path="/order" element={<PlaceOrder />} />
    </Routes>
  );
};

export default router;