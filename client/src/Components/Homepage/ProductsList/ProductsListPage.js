import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter } from "lucide-react"; // Assuming react-bootstrap-icons is installed
import { CurrencyContext } from "../../../CurrencyContext";
import Footer from "../footer/Footer";
import { useLocation } from "react-router-dom";
import Categories from "../categories/Categories";
import "./ProductListPage.css"; // Import your CSS file for styling

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

const ProductsListPage = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const { currency, rates } = useContext(CurrencyContext);

  // Detect category from URL (e.g., /category/Jewelry, Eyewear)
  let category = "";
  const match = location.pathname.match(/\/category\/(.+)$/);
  if (match) {
    category = decodeURIComponent(match[1]);
  }

  // Build a flat list of all sub-categories for the dropdown
  const allSubCategories = Array.from(
    new Set(
      Object.values(categoryOptions).flat()
    )
  );

  // Fetch products from backend when category or subCategory changes
  useEffect(() => {
    setLoading(true);
    if (!category) {
      // All Products page: fetch by sub-category if selected, else fetch all
      if (subCategory) {
        fetch(`${process.env.REACT_APP_LOCALHOST_URL}/products/subcategory?name=${encodeURIComponent(subCategory)}`)
          .then(res => res.json())
          .then(data => {
            setProducts(Array.isArray(data) ? data : []);
            setLoading(false);
          })
          .catch(err => {
            setProducts([]);
            setLoading(false);
          });
      } else {
        fetch(`${process.env.REACT_APP_LOCALHOST_URL}/products/all/random`)
          .then(res => res.json())
          .then(data => {
            setProducts(Array.isArray(data) ? data : []);
            setLoading(false);
          })
          .catch(err => {
            setProducts([]);
            setLoading(false);
          });
      }
    } else {
      // Category present: fetch by category (and subCategory)
      const params = new URLSearchParams();
      params.append("name", category.toLowerCase());
      if (subCategory) params.append("subCategory", subCategory);
      fetch(`${process.env.REACT_APP_LOCALHOST_URL}/products/category?${params.toString()}`)
        .then(res => res.json())
        .then(data => {
          setProducts(Array.isArray(data) ? data : []);
          setLoading(false);
        })
        .catch(err => {
          setProducts([]);
          setLoading(false);
        });
    }
  }, [category, subCategory]);

  const failedImageUrls = new Set();
  useEffect(() => {
    if (location.state?.filter) {
      setTypeFilter(location.state.filter);
    }
  }, [location.state]);

  // Filter products by search, type, and status only (category/subCategory handled by backend)
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType =
      typeFilter === "" || product.type === typeFilter.toLowerCase();
    const matchesStatus =
      statusFilter === "" || product.status === statusFilter.toLowerCase();
    return matchesSearch && matchesType && matchesStatus;
  });

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh", backgroundColor: "white" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center">
        <h3 className="mt-3 mb-3">All Products</h3>
        <p style={{ textAlign: "center" }}>No products found.</p>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#F0F0F0" }}>
      <h1
        style={{
          textAlign: "center",
          marginBottom: "20px",
          color: "#333",
          padding: "20px",
        }}
      >
        {category ? category : "All Products"}
      </h1>
      {/* Categories carousel/section */}
      <div style={{ backgroundColor: "white", paddingTop: "1px" }}>
        <Categories />
      </div>

      {/* Sub-category dropdown positioned below categories and above products */}
      {!category && (
        <div className="d-flex justify-content-center mb-4">
          <select
            className="form-select"
            style={{ width: 260, maxWidth: "100%" }}
            value={subCategory}
            onChange={e => setSubCategory(e.target.value)}
          >
            <option value="">All Sub-Categories</option>
            {allSubCategories.map(sub => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>
        </div>
      )}
      {category && categoryOptions[category] && (
        <div className="d-flex justify-content-center mb-4">
          <select
            className="form-select"
            style={{ width: 260, maxWidth: "100%" }}
            value={subCategory}
            onChange={e => setSubCategory(e.target.value)}
          >
            <option value="">All Sub-Categories</option>
            {categoryOptions[category].map(sub => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>
        </div>
      )}
      {/* Products Grid */}
      <div className="product-grid">
        {filteredProducts.map((product) => {
          const convertedPrice = (
            product.price * (rates[currency] || 1)
          ).toFixed(2);

          // Define these variables outside the JSX
          const fullImageUrl = product?.imageUrl
            ? `${process.env.REACT_APP_LOCALHOST_URL}${product.imageUrl}`
            : null;

          const imageUrl =
            !fullImageUrl || failedImageUrls.has(fullImageUrl)
              ? "https://via.placeholder.com/250x180?text=No+Image+Available"
              : fullImageUrl;
          return (
            <Link
              to={`/productoverview/${product._id}`}
              key={product._id}
              style={{ textDecoration: "none" }}
            >
              <div
                style={{
                  backgroundColor: "#ffffff",

                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                  overflow: "hidden",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  cursor: "pointer",
                  textAlign: "center",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 20px rgba(0, 0, 0, 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 10px rgba(0, 0, 0, 0.1)";
                }}
              >
                <img
                  src={imageUrl}
                  alt={product.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://placehold.co/250x180?text=No+Image+Available";
                    // Remember this URL as a failed one to avoid future attempts
                    if (fullImageUrl) failedImageUrls.add(fullImageUrl);
                  }}
                  style={{
                    width: "100%",
                    height: "290px",
                    objectFit: "cover",
                    borderBottom: "1px solid #e0e0e0",
                  }}
                />

                <div style={{ padding: "15px" }}>
                  <h2
                    style={{
                      fontSize: "18px",
                      fontWeight: "600",
                      margin: "2px 0",
                      color: "#FB5420",
                    }}
                  >
                    {product.name}
                  </h2>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "10px 20px 10px 0px",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: "400",
                        color: "#9A9797",
                        margin: "5px 0",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: "2",
                      }}
                    >
                      MOQ: {product.quantity}
                    </p>
                    <p
                      style={{
                        fontSize: "16px",
                        fontWeight: "500",
                        color: "#1E1E1E",
                        margin: "5px 0",
                      }}
                    >{`${currency} ${convertedPrice}`}</p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <Footer />
    </div>
  );
};

export default ProductsListPage;
