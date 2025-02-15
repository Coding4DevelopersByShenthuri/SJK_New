import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
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
import Blog from "../pages/Blog/Blog";
import AllMenu from "../pages/AllMenu/AllMenu";
import Header from "../components/Header/Header";
import TopBar from "../components/Topbar/TopBar";
import BackToTop from "../components/BackToTop/BackToTop";
import Preloader from "../components/common/Preloader";
import Footer from "../components/Footer/Footer";

// Root layout to keep common elements in all pages
const RootLayout = () => (
  <>
    <TopBar />
    <Header />
    <Outlet />
    <BackToTop />
    <Footer />
  </>
);

// Home page component
const Home = () => (
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
    <Preloader />
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, 
    children: [
      { path: "home", index: true, element: <Home /> },
      { path: "basket", element: <Basket /> },
      { path: "order", element: <PlaceOrder /> },
      { path: "all-menu", element: <AllMenu /> },
      { path: "blog", element: <Blog /> },
      { path: "menu", element: <SpecialDish /> },
      { path: "about", element: <About /> },
      { path: "service", element: <Service /> },
    ],
  },
]);

export default router;