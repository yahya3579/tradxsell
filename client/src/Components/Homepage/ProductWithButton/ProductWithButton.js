import React, { useEffect, useState } from "react";
import "./ProductWithButton.css";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function getRandomProducts(products, count) {
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count); // Get the first 'count' products
}

export default function ProductWithButton() {
  const navigate = useNavigate();
  const [newArrivals, setNewArrivals] = useState([]);
  const [randomRankingProducts, setRandomRankingProducts] = useState([]);

  useEffect(() => {
    // Fetch latest products from the API
    const fetchLatestProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_LOCALHOST_URL}/products/latest`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch latest products");
        }
        const data = await response.json();
        setNewArrivals(data); // Set the fetched data to state

        // Generate random products for Top Ranking section
        const randomProducts = getRandomProducts(data, 6); // Choose 3 random products
        setRandomRankingProducts(randomProducts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLatestProducts();
  }, []);

  const HandleLocalProducts = (data) => {
    navigate("/allproducts", { state: { filter: data } });
  };
  return (
    <div className="container-fluid bg-custom">
      <div className="container py-5">
        <div class="container">
          <div class="row ">
            {/* ranking section  */}
            <div className="col-md-6 py-2 ">
              <h2 className="my-3 fw-bold">
                Explore<br></br> Products
              </h2>
              <p className="fw-semibold">
                Products from verified suppliers only
              </p>
              <div
                className="p-3 rounded-3"
                style={{
                  backgroundColor: "#FFCBBC",
                  width: "100%",
                  color: "rgb(251, 84, 32)",
                }}
              >
                {randomRankingProducts.slice(0, 1).map((product, index) => (
                  <div className="d-flex align-items-center">
                    {/* Image on the left */}
                    <div className="me-3">
                      <img
                        src={product.imgUrl ? `${process.env.REACT_APP_LOCALHOST_URL}${product.imageUrl}` : "https://placehold.co/250x180?text=No+Image+Available"}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://placehold.co/250x180?text=No+Image+Available";
                          // Remember this URL as a failed one to avoid future attempts

                        }}
                        className="rounded"
                        style={{
                          width: "140px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                        alt={product.name}
                      />
                    </div>

                    {/* Text Content on the right */}
                    <div>
                      <p className="mb-1 fs-5">{product.name}</p>

                      <p className="mb-1 fw-bold fs-5">Top Picks for You</p>

                      <Link to="/allproducts">
                        <button
                          className="btn btn-sm"
                          style={{
                            backgroundColor: "white",
                            color: "black",
                            borderRadius: "40px",
                          }}
                        >
                          View More
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <div className="row align-items-center">
                {/* Product Card */}
                <div className="col-md-6" style={{ paddingTop: "20px" }}>
                  <div
                    className="p-3 rounded-3 d-flex flex-column align-items-center"
                    style={{
                      backgroundColor: "#FF5722",
                      width: "100%",
                      position: "relative",
                      color: "white",
                    }}
                  >
                    {/* Product Name above the image */}
                    <h5
                      style={{
                        fontWeight: "bold",
                        alignSelf: "flex-start",
                        marginBottom: "10px",
                      }}
                    >
                      Spotlight Section
                    </h5>

                    {/* Image Container */}
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={`${process.env.REACT_APP_LOCALHOST_URL}${newArrivals[1]?.imageUrl}`}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://placehold.co/250x180?text=No+Image+Available";
                          // Remember this URL as a failed one to avoid future attempts

                        }}
                        className="rounded"
                        style={{
                          width: "85%",
                          height: "100px",
                          objectFit: "cover",
                          borderRadius: "10px",
                        }}
                        alt={newArrivals[1]?.name}
                      />
                    </div>
                  </div>
                </div>

                {/* Category Buttons */}
                <div className="col-md-6" style={{ marginTop: "10px" }}>
                  <div
                    className="p-3 rounded-3"
                    style={{
                      backgroundColor: "#F8F8F8",

                      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25) ",
                    }}
                  >
                    <div className="d-flex flex-wrap gap-2">
                      <button
                        className="border-0 px-2 py-1 rounded-pill"
                        style={{ backgroundColor: "#F9CACA" }}
                      >
                        <Link
                          to="/allproducts"
                          className="text-decoration-none text-dark"
                        >
                          Products
                        </Link>
                      </button>
                      <button
                        className="border-0 px-3 py-1 rounded-pill"
                        style={{ backgroundColor: "#F9CACA" }}
                        onClick={() => HandleLocalProducts("local")}
                      >
                        Local Products
                      </button>
                      <button
                        className="border-0 px-3 py-1 rounded-pill"
                        style={{ backgroundColor: "#F9CACA" }}
                      >
                        <Link
                          to="/allproducts"
                          className="text-decoration-none text-dark"
                        >
                          International Products
                        </Link>
                      </button>
                    </div>
                    <h1 style={{ color: "white" }}>.</h1>
                  </div>
                </div>
              </div>
            </div>

            {/* New arriaval section  */}
            <div class="col-md-6">
              <div className="d-flex flex-column justify-content-lg-start align-items-start ">
                <div className="container bg-light rounded-3 p-1">
                  <div className="d-flex flex-column justify-content-center align-items-start p-2"></div>

                  <div className="container">
                    <div className="row">
                      {newArrivals.slice(0, 2).map((product, index) => (
                        <div
                          className="col-md-6 col-sm-12 p-1 position-relative"
                          key={index}
                        >
                          <Link to="/allproducts">
                            <img
                              src={`${process.env.REACT_APP_LOCALHOST_URL}${product.imageUrl}`}
                                onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://placehold.co/250x180?text=No+Image+Available";
                          // Remember this URL as a failed one to avoid future attempts

                        }}
                              alt={product.name}
                              className="img-fluid rounded"
                              style={{
                                width: "100%",
                                height: "288px",
                                objectFit: "cover",
                              }}
                            />
                            <div
                              className="position-absolute"
                              style={{
                                fontSize: "1.5rem",
                                fontWeight: "bold",
                                top: "4px",
                                left: "4px",
                                backgroundColor: "rgba(0, 0, 0, 0.17)",
                                padding: "4px 10px",
                                borderRadius: "5px",
                                color:
                                  (index + 1) % 2 === 0
                                    ? "rgb(255, 255, 255)"
                                    : "#FB5420",
                              }}
                            >
                              {(index + 1) % 2 === 0
                                ? "Find The Best Furniture"
                                : "Find Your Comfort And Style"}
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="container bg-light rounded-3 mt-2">
                  <div
                    className="row align-items-center "
                    style={{ backgroundColor: "#FF5722", borderRadius: "10px" }}
                  >
                    <div className="col-md-8">
                      <div>
                        <p className="h5 text-white mb-0">New Arrivals</p>
                        <p className="text-white">Verified Suppliers Only</p>
                      </div>
                    </div>
                    {newArrivals.slice(2, 3).map((product, index) => (
                      <div className="col-md-4" key={index} style={{ paddingRight: "0px" }}>
                        <Link to="/allproducts">
                          <img
                            src={`${process.env.REACT_APP_LOCALHOST_URL}${product.imageUrl}`}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                "https://placehold.co/250x180?text=No+Image+Available";
                              // Remember this URL as a failed one to avoid future attempts
    
                            }}
                            alt={product.name}
                            className="img-fluid rounded "
                            style={{
                              height: "140px",
                              paddingRight: "0px",
                              objectFit: "cover",
                              width: "100%",
                            }}
                          />
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons Section */}
            {/* <div class="col-md-4 my-2" style={{backgroundColor: "#f8f9fb"}}>
              <div className="d-flex flex-column justify-content-lg-start align-items-start ">
                <div className="container bg-light rounded-3 p-1">
                  <div className="Three-buttonsContainer">
                    <button className="buttons-Set">
                    <Link to="/allproducts" className="text-decoration-none text-light">
                      <span class="transition"></span>
                      <span class="gradient"></span>
                      <span class="label">Products</span>
                      </Link>
                    </button>
                    <button className="buttons-Set my-3" onClick={()=>HandleLocalProducts("local")}>
                      <span class="transition"></span>
                      <span class="gradient"></span>
                      <span class="label">Local Products</span>
                    </button>
                    <button className="buttons-Set" onClick={()=>HandleLocalProducts("international")}>
                    <Link to="/allproducts" className="text-decoration-none text-light">
                      <span class="transition"></span>
                      <span class="gradient"></span>
                      <span class="label">International Products</span>
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
