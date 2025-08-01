

import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./categories.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBath,
  faBuilding,
  faCar,
  faCouch,
  faGem,
  faGift,
  faHeartbeat,
  faIndustry,
  faLightbulb,
  faShoePrints,
  faSolarPanel,
  faSuitcase,
  faTools,
  faTruck,
  faTv,
  faWrench,
  faTshirt,
  faPuzzlePiece,
  faGlasses,
  faSpa,
  faHome,
} from "@fortawesome/free-solid-svg-icons";

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

const allItems = [
  {
    id: 1,
    icon: <FontAwesomeIcon icon={faGem} />,
    category: "Jewelry, Eyewear",
    link: "/category/Jewelry, Eyewear",
  },
  {
    id: 2,
    icon: <FontAwesomeIcon icon={faCar} />,
    category: "Vehicle Parts & Accessories",
    link: "/category/Vehicle Parts & Accessories",
  },
  {
    id: 3,
    icon: <FontAwesomeIcon icon={faIndustry} />,
    category: "Industrial Machinery",
    link: "/category/Industrial Machinery",
  },
  {
    id: 4,
    icon: <FontAwesomeIcon icon={faSuitcase} />,
    category: "Luggage, Bags & Cases",
    link: "/category/Luggage, Bags & Cases",
  },
  {
    id: 5,
    icon: <FontAwesomeIcon icon={faBuilding} />,
    category: "Construction & Real Estate",
    link: "/category/Construction & Real Estate",
  },
  {
    id: 6,
    icon: <FontAwesomeIcon icon={faBath} />,
    category: "Personal Care & Household",
    link: "/category/Personal Care & Household",
  },
  {
    id: 7,
    icon: <FontAwesomeIcon icon={faLightbulb} />,
    category: "Lights & Lighting",
    link: "/category/Lights & Lighting",
  },
  {
    id: 8,
    icon: <FontAwesomeIcon icon={faSolarPanel} />,
    category: "Renewable Energy",
    link: "/category/Renewable Energy",
  },
  {
    id: 9,
    icon: <FontAwesomeIcon icon={faShoePrints} />,
    category: "Shoes & Accessories",
    link: "/category/Shoes & Accessories",
  },
  {
    id: 10,
    icon: <FontAwesomeIcon icon={faCouch} />,
    category: "Furniture",
    link: "/category/Furniture",
  },
  {
    id: 11,
    icon: <FontAwesomeIcon icon={faWrench} />,
    category: "Tools & Hardware",
    link: "/category/Tools & Hardware",
  },
  {
    id: 12,
    icon: <FontAwesomeIcon icon={faTv} />,
    category: "Home Appliances",
    link: "/category/Home Appliances",
  },
  {
    id: 13,
    icon: <FontAwesomeIcon icon={faTruck} />,
    category: "Vehicles & Transportation",
    link: "/category/Vehicles & Transportation",
  },
  {
    id: 14,
    icon: <FontAwesomeIcon icon={faTools} />,
    category: "Vehicle Accessories",
    link: "/category/Vehicle Accessories",
  },
  {
    id: 15,
    icon: <FontAwesomeIcon icon={faGift} />,
    category: "Gifts & Crafts",
    link: "/category/Gifts & Crafts",
  },
  {
    id: 16,
    icon: <FontAwesomeIcon icon={faHeartbeat} />,
    category: "Health Care",
    link: "/category/Health Care",
  },
  {
    id: 17,
    icon: <FontAwesomeIcon icon={faTv} />,
    category: "Electronics",
    link: "/category/Electronics",
  },
  {
    id: 18,
    icon: <FontAwesomeIcon icon={faTshirt} />,
    category: "Clothing",
    link: "/category/Clothing",
  },
  {
    id: 19,
    icon: <FontAwesomeIcon icon={faPuzzlePiece} />,
    category: "Toys",
    link: "/category/Toys",
  },
  {
    id: 20,
    icon: <FontAwesomeIcon icon={faGlasses} />,
    category: "Optical",
    link: "/category/Optical",
  },
  {
    id: 21,
    icon: <FontAwesomeIcon icon={faTools} />,
    category: "Tools & Equipment",
    link: "/category/Tools & Equipment",
  },
  {
    id: 22,
    icon: <FontAwesomeIcon icon={faSpa} />,
    category: "Beauty & Personal Care",
    link: "/category/Beauty & Personal Care",
  },
  {
    id: 23,
    icon: <FontAwesomeIcon icon={faHome} />,
    category: "Household & Gardens",
    link: "/category/Household & Gardens",
  },
  {
    id: 24,
    icon: <FontAwesomeIcon icon={faGem} />,
    category: "Accessories",
    link: "/category/Accessories",
  },
  {
    id: 25,
    icon: <FontAwesomeIcon icon={faSpa} />,
    category: "Agricultural Products",
    link: "/category/Agricultural Products",
  },
  {
    id: 26,
    icon: <FontAwesomeIcon icon={faTruck} />,
    category: "Tractors & Accessories",
    link: "/category/Tractors & accessories",
  },
];

const Categories = () => {
  const [itemsPerSlide, setItemsPerSlide] = useState(6);
  const [groupedItems, setGroupedItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  // Function to determine items per slide based on screen width
  const updateItemsPerSlide = () => {
    const width = window.innerWidth;
    if (width >= 1600) {
      setItemsPerSlide(6);
    } else if (width >= 1200) {
      setItemsPerSlide(5);
    } else if (width >= 992) {
      setItemsPerSlide(4);
    } else if (width >= 768) {
      setItemsPerSlide(3);
    } else if (width >= 576) {
      setItemsPerSlide(2);
    } else {
      setItemsPerSlide(1);
    }
  };

  // Group items based on items per slide
  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  // Update the grouped items when itemsPerSlide changes
  useEffect(() => {
    setGroupedItems(chunkArray(allItems, itemsPerSlide));
  }, [itemsPerSlide]);

  // Add event listener for window resize
  useEffect(() => {
    updateItemsPerSlide();
    window.addEventListener('resize', updateItemsPerSlide);
    
    return () => {
      window.removeEventListener('resize', updateItemsPerSlide);
    };
  }, []);

  return (
    <div className="container my-5">
      <h2 className="ms-md-5 ms-3 mb-5 fw-bold">
        Search by <span style={{ color: "#FB5420" }}>categories</span>{" "}
      </h2>
      {/* Sub-category dropdown logic */}
      {selectedCategory && (
        <div className="mb-4 d-flex flex-column align-items-start align-items-md-center">
          <label className="fw-bold mb-2">Sub-Category for <span style={{color:'#FB5420'}}>{selectedCategory}</span>:</label>
          <select
            className="form-select"
            style={{ width: 260, maxWidth: "100%" }}
            value={selectedSubCategory}
            onChange={e => setSelectedSubCategory(e.target.value)}
          >
            <option value="">Select Sub-Category</option>
            {categoryOptions[selectedCategory]?.map(sub => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>
          {selectedSubCategory && (
            <div className="mt-2" style={{fontWeight:600}}>
              Selected: <span style={{color:'#1976d2'}}>{selectedSubCategory}</span>
            </div>
          )}
        </div>
      )}
      <Carousel controls={true} interval={null} indicators={true}>
        {groupedItems.map((group, index) => (
          <Carousel.Item key={index}>
            <div className="category-row">
              {group.map((item) => (
                <div key={item.id} className="category-item">
                  <div
                    style={{ textDecoration: "none", color: "black", cursor: "pointer" }}
                    onClick={() => {
                      setSelectedCategory(item.category);
                      setSelectedSubCategory("");
                    }}
                  >
                    <div className="category-icon-wrapper">
                      <div className="category-icon-div">{item.icon}</div>
                    </div>
                    <p className="category-name">{item.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Categories;



