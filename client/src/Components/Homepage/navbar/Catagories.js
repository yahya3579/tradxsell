import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";
import "./CategorySection.css"; // Import the CSS file for custom styles
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
import { Link } from "react-router-dom";

const CategorySection = ({setShowCategories}) => {
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
        link: "/category/electronics",
      },
      {
        id: 18,
        icon: <FontAwesomeIcon icon={faTshirt} />,
        category: "Clothing",
        link: "/category/clothing",
      },
      {
        id: 19,
        icon: <FontAwesomeIcon icon={faPuzzlePiece} />,
        category: "Toys",
        link: "/category/toys",
      },
      {
        id: 20,
        icon: <FontAwesomeIcon icon={faGlasses} />,
        category: "Optical",
        link: "/category/optical",
      },
      {
        id: 21,
        icon: <FontAwesomeIcon icon={faTools} />,
        category: "Tools & Equipment",
        link: "/category/tools-equipment",
      },
      {
        id: 22,
        icon: <FontAwesomeIcon icon={faSpa} />,
        category: "Beauty & Personal Care",
        link: "/category/beauty-personal-care",
      },
      {
        id: 23,
        icon: <FontAwesomeIcon icon={faHome} />,
        category: "Household & Gardens",
        link: "/category/household-gardens",
      },
      {
        id: 24,
        icon: <FontAwesomeIcon icon={faGem} />,
        category: "Accessories",
        link: "/category/accessories",
      },
  ];


  const HideNavbar = ()=>{
    setShowCategories(false);
  }

  return (
    <div
      className="my-4 position-absolute left-0 mt-1 z-3"
      style={{ width: "auto", display: "inline-block" }}
    >
      <div className="m-0 p-0 ms-2" style={{ width: "320px" }}>
        <ListGroup className="scrollable-list">
          {allItems.map((category) => (
            <Link
              key={category.id}
              to={category?.link}
              className="link-category"
              onClick={HideNavbar}
            >
              <ListGroup.Item className="list-group-item-action">
                {category.category}
              </ListGroup.Item>
            </Link>
          ))}
        </ListGroup>
      </div>
    </div>
  );
};

export default CategorySection;
