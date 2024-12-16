import React from 'react';
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


const App = () => {
  return (
    <div>
      <TopBar />
      <Header />
      <Hero />
      <Service />
      <About />
      <SpecialDish />
      <Menu />
      <Testimonial />
      <Reservation />
      <FeaturesSection />
      <EventSection />
      <Footer />
      <BackToTop />
      <Preloader />
    </div>
  );
};

export default App;
