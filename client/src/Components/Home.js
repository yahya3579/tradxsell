import React from "react";
import HeroSection from "./Homepage/herosection/HeroSection";
import BusinessCards from "./Homepage/businessCards/BusinessCards";
import StatsSection from "./Homepage/statsSection/StatsSection";
import Categories from "./Homepage/categories/Categories";
import Discover from "./Homepage/discoverSection/Discover";
import SearchToFulfillment from "./Homepage/searchToFulfillment/SearchToFulfillment";
import GetStarted from "./Homepage/getStarted/GetStarted";
import Testimonial from "./Homepage/testimonial/Testimonial";
import Footer from "./Homepage/footer/Footer";
import FeatureProducts from "./Homepage/featureProducts/FeatureProducts";
import ProductWithButton from "./Homepage/ProductWithButton/ProductWithButton";



const Home = () => {


  const loggedin = localStorage.getItem("email");

  return(
    <div>
    <HeroSection />
    <BusinessCards/>
    <Categories/>
    <StatsSection />
    <ProductWithButton/>
    {/* <Discover /> */}
    <SearchToFulfillment />
    <FeatureProducts/>
    {
  !loggedin ? <GetStarted /> : null
}

    <Testimonial/>
    <Footer/>
  </div>
  )
  
};

export default Home;
