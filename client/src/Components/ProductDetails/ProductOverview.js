import { React, useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import Reviews from "./Reviews";
import axios from "axios";
import { MdChat, MdStore } from "react-icons/md";
import { useNavigate } from 'react-router-dom'; 
import { CurrencyContext } from "../../CurrencyContext";
export default function ProductOverview() {
  const { currency, rates } = useContext(CurrencyContext);

  const { id } = useParams(); // Extract id from useParams
  const [product, setProduct] = useState(null); // State to hold product data
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to hold any errors
  const [currentIndex, setCurrentIndex] = useState(0);
  const [averageRating, setAverageRating] = useState(0);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [sellerData, setSellerData] = useState(null);

  const senderId = localStorage.getItem("id");
  const sellerEmail = product?.sellerEmail;

// (Before May 20)
  // useEffect(() => {
  //   const fetchSellerInfo = async () => {
  //     try {
  //       const response = await axios.get(`${process.env.REACT_APP_LOCALHOST_URL}/users/user/${sellerEmail}`);
  //       setSellerData(response.data);
  //     } catch (err) {
  //       setError('Failed to fetch seller information');
  //       console.error('Error fetching seller data:', err);
  //     }
  //   };

  //   if (sellerEmail) {
  //     fetchSellerInfo();
  //   }
  // }, [sellerEmail]);

// (May 20)
  useEffect(() => {
    const fetchSellerInfo = async () => {
      try {
        const encodedEmail = encodeURIComponent(sellerEmail);
        const response = await axios.get(`${process.env.REACT_APP_LOCALHOST_URL}/users/user?email=${encodedEmail}`);
        setSellerData(response.data);
      } catch (err) {
        setError('Failed to fetch seller information');
        console.error('Error fetching seller data:', err);
      }
    };

    if (sellerEmail) {
      fetchSellerInfo();
    }
  }, [sellerEmail]);

  const receiverId = sellerData?._id;
  console.log("senderId", senderId);
  console.log("receiverId", receiverId);

  const navigate = useNavigate(); // Initialize the navigation hook

  // Function to start a new chat
  const startNewChat = async () => {  
    try {
      // Hit the API to start a new chat
      const response = await axios.post(`${process.env.REACT_APP_LOCALHOST_URL}/chat/start`, {
        senderId,
        receiverId,
      });

      // If the chat is successfully created, navigate to the /chat page
      if (response.data.chat) {
        console.log('Chat started:', response.data.chat);
        navigate(`/chat`); // Navigate to the chat page
      } else {
        console.error('Error creating chat:', response.data.message);
      }
    } catch (error) {
      console.error('Error starting chat:', error);
    }
  };

  
  
  // useEffect(() => {
  //   const fetchAverageRating = async () => {
  //     try {
  //       const response = await fetch(`${process.env.REACT_APP_LOCALHOST_URL}/products/${id}/average-rating`);
  //       const data = await response.json();
  //       setAverageRating(data.averageRating);
  //     } catch (error) {
  //       console.error("Error fetching average rating:", error);
  //     }
  //   };

  //   fetchAverageRating();
  //   console.log("ProductIDProduct",id)
  // }, [id]);


  useEffect(() => {
  const fetchAverageRating = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_LOCALHOST_URL}/products/average-rating?productId=${id}`
      );
      const data = await response.json();
      setAverageRating(data.averageRating);
    } catch (error) {
      console.error("Error fetching average rating:", error);
    }
  };

  if (id) {
    fetchAverageRating();
    console.log("ProductIDProduct", id);
  }
}, [id]);


  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedUsername = localStorage.getItem("username");

    setEmail(storedEmail || "");
    setUsername(storedUsername || "");
  }, []);

  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setPrice(product.price || 0);
      setImageUrl(product.imageUrl || "");
      setSize(product.sizes ? product.sizes[0] : ""); // Default to first size, if available
      setColor(product.colors ? product.colors[0] : ""); // Default to first color, if available
      setProductId(product?.id);
    }
  }, [product, id]);

  const handleAddToCart = async () => {
    if(!senderId){
      navigate('/login');
    }
    const itemData = {
      email,
      username,
      productId,
      name,
      price,
      imageUrl,
      quantity,
      size,
      color,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_LOCALHOST_URL}/cart/add`,
        itemData
      );
      toast.success("Product added to cart!");
    } catch (error) {
      console.error(
        "Error adding item to cart:",
        error.response ? error.response.data : error.message
      );
      toast.error("Failed to add product to cart!");
    }
  };

  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     try {
  //       const response = await fetch(`${process.env.REACT_APP_LOCALHOST_URL}/products/${id}`, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });

  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       const data = await response.json();
  //       setProduct(data);
  //       if (data.ratings && data.ratings.length > 0) {
  //         // Convert string ratings to numbers
  //         const numericRatings = data.ratings.map((rating) => Number(rating));

  //         // Calculate total and average ratings
  //         const totalRating = numericRatings.reduce(
  //           (acc, rating) => acc + rating,
  //           0
  //         );
  //         const avgRating = totalRating / numericRatings.length; // Calculate average

  //         // Set the average rating directly
  //         setAverageRating(avgRating);
  //       }
  //     } catch (err) {
  //       setError(err.message || "Failed to fetch product."); // Set error message
  //       console.error("Error fetching product:", err);
  //     } finally {
  //       setLoading(false); // Stop loading
  //     }
  //   };

  //   fetchProduct(); // Call the fetch function
  // }, [id]); // Run effect when ID changes


  useEffect(() => {
  const fetchProduct = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_LOCALHOST_URL}/products?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        let errorMsg = "Network response was not ok";
        try {
          const errorData = await response.json();
          errorMsg = errorData.error || errorMsg;
        } catch {}
        throw new Error(errorMsg);
      }
      const data = await response.json();
      setProduct(data);

      if (data.ratings && data.ratings.length > 0) {
        const numericRatings = data.ratings.map((rating) => Number(rating));
        const totalRating = numericRatings.reduce((acc, rating) => acc + rating, 0);
        const avgRating = totalRating / numericRatings.length;
        setAverageRating(avgRating);
      }
    } catch (err) {
      setError(err.message || "Failed to fetch product.");
      console.error("Error fetching product:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchProduct();
}, [id]);


  // Conditional rendering based on loading, error, or product state
  if (loading) {
    return <div>Loading...</div>; // Show loading indicator
  }

  if (error) {
    return (
      <div style={{ color: 'red', padding: '2rem', textAlign: 'center' }}>
        {error === 'Product not found'
          ? 'Sorry, this product does not exist or was removed.'
          : `Error: ${error}`}
      </div>
    );
  }

  if (!product) {
    return <div>Product not found.</div>; // Handle case where product is null
  }

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  const ratingChanged = async (newRating) => {
    console.log("New rating:", newRating);
    // You can handle the submission of the new rating here
    // For example, you might want to send it to your backend:
    // await fetch(`http://localhost:5000/products/${id}/rate`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ rating: newRating }),
    // });
  };

  const convertedPrice = (product.price * (rates[currency] || 1)).toFixed(2);
  console.log("converted price", convertedPrice);
  return (
    <div className="container my-5">
      <div className="row">
        {/* Thumbnail Column */}
        <div className="col-md-2">
          <div className="d-flex flex-column">
            <img
              src={`${process.env.REACT_APP_LOCALHOST_URL}${product.imageUrl}`}
              alt="Product Thumbnail"
              className={`img-thumbnail mb-2 ${
                currentIndex === 0 ? "border-primary" : ""
              }`}
              style={{
                cursor: "pointer",
                width: "100%",
                height: "95px",
                objectFit: "cover",
              }}
              onClick={() => handleThumbnailClick(0)} // Since there's only one image, the index is 0
            />
          </div>
        </div>

        {/* Main Carousel */}
        <div className="col-md-4">
          <div
            id="mainCarousel"
            className="carousel slide"
            data-bs-ride="carousel"
            data-bs-interval="2000"
          >
            <div className="carousel-inner rounded">
              <div className="carousel-item active">
                <img
                  src={`${process.env.REACT_APP_LOCALHOST_URL}${product.imageUrl}`}
                  className="d-block w-100"
                  alt="Product Image"
                  style={{
                    width: "100%",
                    height: "400px",
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#mainCarousel"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#mainCarousel"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>

        <div className="col-md-6">
          <h5>{product?.name}</h5>
          <p className="text-danger fw-bold mt-3 mb-3">
            
          {`${currency} ${convertedPrice}`}
          </p>
          <ReactStars
        count={5}
        value={Number(averageRating)}
        size={24}
        edit={false}
        color2={"#ffd700"} // Star color
      />
      <p>Average Rating: {averageRating}</p>
          <div className="mb-4">
            <label htmlFor="quantity" className="form-label fw-bold">
              Quantity:
            </label>
            <div className="input-group">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => {
                  const input = document.getElementById("quantity");
                  const currentValue = Math.max(1, parseInt(input.value) - 1);
                  input.value = currentValue;
                }}
              >
                -
              </button>
              <input
                type="number"
                className="form-control text-center"
                id="quantity"
                defaultValue={1}
                min={1}
                style={{ maxWidth: "80px" }}
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => {
                  const input = document.getElementById("quantity");
                  input.value = parseInt(input.value) + 1;
                }}
              >
                +
              </button>
            </div>
          </div>
          <div className="mt-3">
            <button
              className="btn btn-warning me-2 rounded-pill shadow-sm mt-1"
              style={{ padding: "7px 40px" }}
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <button
            onClick={()=> {
              if(!senderId){
                navigate('/login')
              }else{
                navigate('/payment')
              }
            }}
              className="btn btn-success rounded-pill shadow-sm mt-1"
              style={{ padding: "7px 40px" }}
            >
              Buy Now
            </button>
            <Link onClick={startNewChat}
              className="btn  rounded-pill shadow-sm mt-1 ms-2"
              style={{ padding: "7px 40px", backgroundColor:"#f1582b", color: "white" }}
            >
              <MdChat />
              <span className="ms-1">Chat</span>
            </Link>
            <Link
              to={`/seller/${encodeURIComponent(sellerEmail)}`}
              className="btn rounded-pill shadow-sm mt-1 ms-2"
              style={{ padding: "7px 40px", backgroundColor:"#007bff", color: "white" }}
            >
              <MdStore />
              <span className="ms-1">Seller Profile</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="mt-5">
        <div className="container mt-4">
        <h3>Product Details</h3>
        <p>{product?.description}</p>
        </div>
        <Reviews productId={id} />
      </div>
      <ToastContainer />
    </div>
  );
}
