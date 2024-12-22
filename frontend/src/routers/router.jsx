import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Hero from "../components/Hero/Hero";
import Service from "../components/Services/Service";
import About from "../components/About/About";
import SpecialDish from "../components/SpecialDish/SpecialDish";
import Menu from "../components/Menu/Menu";
import Testimonial from "../components/Testimonial/Testimonial";
import Reservation from "../components/Reservation/Reservation";
import FeaturesSection from "../components/FeaturesSection/FeaturesSection";
import EventSection from "../components/EventSection/EventSection";
import Basket from "../pages/Basket/Basket";
import PlaceOrder from "../pages/PlaceOrder/PlaceOrder";
import AllMenu from "../pages/AllMenu/AllMenu";
import Header from "../components/Header/Header";
import TopBar from "../components/Topbar/TopBar";
import BackToTop from "../components/BackToTop/BackToTop";
import Preloader from "../components/common/Preloader";
import Footer from "../components/Footer/Footer";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <TopBar /> 
        <Hero />
        <Header />
        <Service />
        <About />
        <SpecialDish />
        <Menu />
        <BackToTop />
        <Preloader />
        <Testimonial />
        <Reservation />
        <FeaturesSection />
        <EventSection />
        <Footer />
      </>
    ),
  },
  {
    path: "/basket",
    element: <Basket />,
  },
  {
    path: "/order",
    element: <PlaceOrder />,
  },
  {
    path: "/all-menu",
    element: <AllMenu />
  },
]);

export default router;
