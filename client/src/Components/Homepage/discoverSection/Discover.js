import React, { useEffect,useState } from "react";
import "./Discover.css";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

function getRandomProducts(products, count) {
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count); // Get the first 'count' products
}

export default function Discover() {
  const [newArrivals, setNewArrivals] = useState([]);
  const [randomRankingProducts, setRandomRankingProducts] = useState([]);

  useEffect(() => {
    // Fetch latest products from the API
    const fetchLatestProducts = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_LOCALHOST_URL}/products/latest`);
        if (!response.ok) {
          throw new Error("Failed to fetch latest products");
        }
        const data = await response.json();
        setNewArrivals(data); // Set the fetched data to state

        // Generate random products for Top Ranking section
        const randomProducts = getRandomProducts(data, 3); // Choose 3 random products
        setRandomRankingProducts(randomProducts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLatestProducts();
  }, []);

  const rankingData = [
    {
      title: "Men's Regular Sleeve Hoodies",
      productImage:
        "https://www.acecart.pk/cdn/shop/files/f62a7c5e6a6a53f88602dcb0a64b866c.jpg?v=1713569395&width=1200",
    },
    {
      title: "Men's Breathable T-shirts",
      productImage:
        "https://web-assets.cdn.shirtspace.com//representations/proxy/eyJfcmFpbHMiOnsiZGF0YSI6MTYxNzAsInB1ciI6ImJsb2JfaWQifX0=--cbc9cc7bf96a09dcb6bbbfb58afbec6d4fbbff5f/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJqcGciLCJjb252ZXJ0IjoianBlZyJ9LCJwdXIiOiJ2YXJpYXRpb24ifX0=--cd640543e1cb65c3b7b4201ad2165d0a47b93123/categories-t-shirts-shirtspace-blank-apparel.jpg",
    },
    {
      title: "Ballpoint Pens",
      productImage:
        "https://waqarmart.pk/public/uploads/all/10/2022/Feb/DTCepmCJrHWy4MCQt8hpA19qHoSdYyeoZy9ltLj3.jpg",
    },
  ];
  return (
    <div className="container-fluid bg-custom">
      <div className="container p-5">
        <div>
          <p className="h3 fw-bolder ">
            Discover your next business opportunity
          </p>
        </div>

        <div class="container">
          <div class="row ">
            {/* ranking section  */}
            <div class="col-md-4 mt-3">
              <div className="d-flex flex-column justify-content-lg-start align-items-start ">
                <div className="d-flex flex-row flex-row justify-content-between align-items-center w-100">
                  <p className="h4">Top ranking</p>
                  <Link to="/allproducts" className="text-secondary">
                    View More
                  </Link>
                </div>
                <div className="container bg-light rounded-3 mt-4 p-1">
                  <Carousel controls={true}>
                  {randomRankingProducts.map((product, index) => (
                        <Carousel.Item key={index}>
                          <Link to="/allproducts" style={{textDecoration:"none",color:"black"}}>
                          <div className="d-flex justify-content-center align-items-center flex-wrap w-100">
                            <div className="pt-2">
                              <div className="d-flex flex-column justify-content-center align-items-start p-2">
                                <p className="h5">Most popular</p>
                                <p className="text-secondary">{product.name}</p>
                              </div>
                              <div className="text-center rounded">
                                <img
                                  src={`${process.env.REACT_APP_LOCALHOST_URL}${product.imageUrl}`}
                                  className="d-block mx-auto rounded"
                                  style={{
                                    maxWidth: "100%",
                                    height: "300px",
                                    objectFit: "cover",
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          </Link>
                        </Carousel.Item>
                    ))}
                  </Carousel>
                </div>
              </div>
            </div>

            {/* New arriaval section  */}
            <div class="col-md-4 mt-3">
              <div className="d-flex flex-column justify-content-lg-start align-items-start ">
                <div className="d-flex flex-row flex-row justify-content-between align-items-center w-100">
                  <p className="h4">New arrivals</p>
                  <Link to="/allproducts" className="text-secondary">
                    View More
                  </Link>
                </div>

                <div className="container bg-light rounded-3 mt-4 p-1">
                  <div className="d-flex flex-column justify-content-center align-items-start p-2">
                    <p className="h5">{newArrivals.length}+ products added today</p>
                  </div>

                  <div className="container">
                    <div className="row">
                    {newArrivals.slice(0, 4).map((product, index) => (
                      <div className="col-md-6 col-sm-12 p-1" key={index}>
                        <Link to="/allproducts">
                        <img
                          src={`${process.env.REACT_APP_LOCALHOST_URL}${product.imageUrl}`}
                          alt={product.name}
                          className="img-fluid rounded"
                          style={{
                            width: "100%",
                            height: "110px",
                            objectFit: "cover",
                          }}
                        />
                        </Link>
                      </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="container bg-light rounded-3 mt-2 p-1">
                  <div className="row align-items-center p-1">
                  {newArrivals.slice(0, 1).map((product, index) => (
                    <div className="col-md-4" key={index}>
                      <Link to="/allproducts">
                      <img
                        src={`${process.env.REACT_APP_LOCALHOST_URL}${product.imageUrl}`}
                        alt={product.name}
                        className="img-fluid rounded "
                        style={{ maxHeight: "500px", objectFit: "cover" }}
                      />
                      </Link>
                    </div>
                    ))}
                    <div className="col-md-8">
                      <div>
                        <p className="h5 mb-0">New this week</p>
                        <p className="text-secondary">
                          Products from Verified Suppliers only
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* top deals */}
            <div class="col-md-4 mt-3">
              <div className="d-flex flex-column justify-content-lg-start align-items-start ">
                <div className="d-flex flex-row flex-row justify-content-between align-items-center w-100">
                  <p className="h4">Top deals</p>
                  <Link to="/allproducts" className="text-secondary">
                    View More
                  </Link>
                </div>

                <div className="container bg-light rounded-3 mt-4 p-1">
                  <div className="row align-items-center p-1">
                    <div className="col-md-4">
                    <Link to="/allproducts">
                      <img
                        src="https://queue-it.com/media/fk0l0y5l/product-drop-marketing.jpeg"
                        alt="Left Image"
                        className="img-fluid rounded "
                        style={{ maxHeight: "500px", objectFit: "cover" }}
                      />
                      </Link>
                    </div>
                    <div className="col-md-8">
                      <div>
                        <p className="h6 mb-0">180-day lowest price</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="container bg-light rounded-3 mt-4 p-1">
                  <div className="d-flex flex-column justify-content-center align-items-start p-2">
                    <p className="h5">Deals on best sellers</p>
                  </div>

                  <div className="container">
                  {randomRankingProducts.slice(2,3).map((product, index) => (                     
                        <div className="my-3 position-relative"  key={index}>
                          <Link to="/allproducts">
                          <img
                            src={`${process.env.REACT_APP_LOCALHOST_URL}${product.imageUrl}`}
                            alt="Product"
                            className="img-fluid rounded" 
                            style={{ height: "215px", objectFit: "cover", width:"100%" }} 
                          />
                          </Link>
                          <div
                            className="position-absolute top-0 start-0 p-2 m-2"
                            style={{
                              backgroundColor: "white",
                              color: "black",
                              fontSize: "0.8rem", 
                              borderRadius: "0.25rem",
                            }}
                          >
                            30% OFF
                          </div>
                        </div> 
                    ))}
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
