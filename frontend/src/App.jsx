// App.jsx
import React, { useState } from 'react';
import TopBar from './components/Topbar/TopBar.jsx';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import BackToTop from './components/BackToTop/BackToTop.jsx';
import Preloader from './components/common/Preloader.jsx';
import SignInPopup from './components/SignInPopup/SignInPopup.jsx';
import RouterConfig from './routers/router.jsx';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin && <SignInPopup setShowLogin={setShowLogin} />}
      <div className="app">
        <TopBar />
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