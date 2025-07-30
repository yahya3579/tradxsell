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
import { useNavigate } from "react-router-dom";


const Home = () => {
  const navigate = useNavigate();
  const loggedin = localStorage.getItem("email");

  return(
    <div>
      <HeroSection />
      <BusinessCards/>
      <Categories/>
      <StatsSection />
      <ProductWithButton/>
      {/* <Discover /> */}
      <div className="d-flex justify-content-center my-4">
        <button
          className="btn rounded-2 custombutton fw-bold"
          style={{
            color: "white",
            border: "1px solid #1976d2",
            background: "linear-gradient(90deg, #1976d2 0%, #21cbf3 100%)",
          }}
          onClick={() => navigate("/user/rfq")}
        >
          RFQ (Request for Quotation)
        </button>
      </div>
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
