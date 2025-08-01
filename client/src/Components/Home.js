import React, { useState } from "react";
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

const categoryOptions = {
  "Jewelry, Eyewear": ["Rings", "Necklaces", "Bracelets", "Earrings", "Sunglasses", "Watches"],
  "Vehicle Parts & Accessories": ["Engine Parts", "Tires", "Batteries", "Car Electronics", "Lighting"],
  "Industrial Machinery": ["CNC Machines", "Packaging Machines", "Textile Machinery", "Pumps", "Compressors"],
  "Luggage, Bags & Cases": ["Suitcases", "Backpacks", "Handbags", "Laptop Bags", "Travel Accessories"],
  "Construction & Real Estate": ["Building Materials", "Doors & Windows", "Flooring", "Paints", "Plumbing"],
  "Personal Care & Household": ["Personal Care Appliances", "Cleaning Supplies", "Laundry", "Bathroom Accessories"],
  "Lights & Lighting": ["LED Bulbs", "Ceiling Lights", "Outdoor Lighting", "Smart Lighting"],
  "Renewable Energy": ["Solar Panels", "Wind Turbines", "Inverters", "Batteries"],
  "Shoes & Accessories": ["Men's Shoes", "Women's Shoes", "Kids' Shoes", "Shoe Accessories"],
  "Furniture": ["Sofas", "Beds", "Tables", "Chairs", "Cabinets"],
  "Tools & Hardware": ["Hand Tools", "Power Tools", "Fasteners", "Measuring Tools"],
  "Home Appliances": ["Refrigerators", "Washing Machines", "Microwaves", "Vacuum Cleaners"],
  "Vehicles & Transportation": ["Cars", "Motorcycles", "Bicycles", "Trucks", "Public Transport"],
  "Vehicle Accessories": ["Seat Covers", "Car Mats", "Phone Holders", "Car Chargers"],
  "Gifts & Crafts": ["Gift Boxes", "Handmade Crafts", "Greeting Cards", "Party Supplies"],
  "Health Care": ["Medical Devices", "Supplements", "Personal Protective Equipment"],
  "Electronics": ["Mobile Phones", "Laptops", "Cameras", "Audio Devices"],
  "Clothing": ["Men's Clothing", "Women's Clothing", "Kids' Clothing", "Sportswear"],
  "Toys": ["Educational Toys", "Action Figures", "Dolls", "Outdoor Toys"],
  "Optical": ["Eyeglasses", "Contact Lenses", "Sunglasses", "Optical Instruments"],
  "Tools & Equipment": ["Workshop Tools", "Measuring Equipment", "Safety Equipment"],
  "Beauty & Personal Care": ["Skincare", "Haircare", "Makeup", "Fragrances"],
  "Household & Gardens": ["Garden Tools", "Outdoor Furniture", "Planters", "BBQ Equipment"],
  "Accessories": ["Belts", "Hats", "Scarves", "Wallets"],
  "Agricultural Products": ["Seeds", "Fertilizers", "Pesticides", "Farm Tools"],
  "Tractors & Accessories": ["Tractors", "Tractor Parts", "Implements"],
};

const Home = () => {
  const navigate = useNavigate();
  const loggedin = localStorage.getItem("email");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  return(
    <div>
      <HeroSection />
      <BusinessCards/>
      <Categories/>
      <StatsSection />
      <ProductWithButton/>
      {/* <Discover /> */}
      <div className="d-flex justify-content-center my-4 flex-column align-items-center">
        <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
          <select
            className="form-select"
            style={{ width: 220 }}
            value={category}
            onChange={e => {
              setCategory(e.target.value);
              setSubCategory("");
            }}
          >
            <option value="">Select Category</option>
            {Object.keys(categoryOptions).map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {category && (
            <select
              className="form-select"
              style={{ width: 220 }}
              value={subCategory}
              onChange={e => setSubCategory(e.target.value)}
            >
              <option value="">Select Sub-Category</option>
              {categoryOptions[category].map(sub => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          )}
        </div>
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
