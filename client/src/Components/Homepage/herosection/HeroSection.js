import React, { useEffect, useState } from "react";
// import { Button, Col, Container, Row } from "react-bootstrap";
import { Link, useHistory, useNavigate } from "react-router-dom";
import "./heroSection.css";
import heropic from "./heropic.png";
// import arrowicon from "./arrow.jpeg";
// import profiles from "./icons.jpeg";
// import growth from "./growth.jpeg";
const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [placeholder, setPlaceholder] = useState("Search here...");

  const words = [
    "Search here...",
    "Find your item...",
    "Looking for something?",
  ];
  let wordIndex = 0;

  useEffect(() => {
    const placeholderInterval = setInterval(() => {
      setPlaceholder(words[wordIndex]);
      wordIndex = (wordIndex + 1) % words.length;
    }, 2000); // Change every 2 seconds

    // Clear interval on component unmount
    return () => clearInterval(placeholderInterval);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Redirect to search results page with the query as a URL parameter
      navigate(`/search?query=${searchQuery}`);
    }
  };

  return (
    <div style={{ backgroundColor: "#F0F0F0" }}>
      <div className="container my-5">
        <div className="row align-items-center">
          {/* Left Section */}
          <div className="col-12 col-md-6 pt-5 text-center text-md-start">
            <h1 className="fw-bold">
              Welcome to <br />
              <span style={{ color: "#FF5722" }}>TradxSell Store</span>
            </h1>
            <h6 className="fw-bold mt-4 mb-4">
              The top B2B e-commerce platform for international trade
            </h6>
            <form
              onSubmit={handleSearch}
              className="input-group"
              style={{
                borderRadius: "8px",
                overflow: "hidden",
                border: "1px solid #ddd",
                boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
              }}
            >
              <span
                className="input-group-text"
                style={{
                  backgroundColor: "white",
                  border: "none",
                  padding: "10px 12px",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="gray"
                  className="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder={placeholder}
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  border: "none",
                  boxShadow: "none",
                  padding: "10px",
                  fontSize: "16px",
                }}
              />
              <button
                className="btn"
                style={{
                  background:
                    "linear-gradient(90deg, #FB5420 44.4%, #C52F03 100%)",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  borderTopRightRadius: "8px",
                  borderBottomRightRadius: "8px",
                }}
                type="submit"
              >
                Search
              </button>
            </form>
          </div>

          {/* Right Section */}
          <div className="col-12 col-md-6  mt-4 position-relative">
            {/* Background Image */}
            <img
              src={heropic}
              alt="Hero"
              className="img-fluid rounded-4 w-100 h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
