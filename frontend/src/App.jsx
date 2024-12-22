import React, { useState } from 'react';
import TopBar from './components/Topbar/TopBar';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import BackToTop from './components/BackToTop/BackToTop';
import Preloader from './components/common/Preloader';
import SignInPopup from './components/SignInPopup/SignInPopup';
import RouterConfig from './routers/router';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin && <SignInPopup setShowLogin={setShowLogin} />}
      <div className="app">
        <TopBar /> {/* TopBar should be outside the Router */}
        <Header setShowLogin={setShowLogin} />
        <RouterConfig />
      </div>
      <Footer />
      <BackToTop />
      <Preloader />
    </>
  );
};

export default App;
