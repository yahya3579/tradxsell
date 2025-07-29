// import { React, useState, useContext, useEffect } from "react";
// import FullNavbar from "./FullNavbar";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import "./SellerDashboardV2.css";
// import { AuthContext } from "../../AuthContext.js";
// import {
//   CategoryScale,
//   Chart as ChartJS,
//   Legend,
//   LinearScale,
//   LineController,
//   LineElement,
//   BarElement,
//   PointElement,
//   Title,
//   Tooltip,
// } from "chart.js";
// import { Line, Bar } from "react-chartjs-2";
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   LineElement,
//   PointElement,
//   LineController,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// export default function SellerDashboardV2() {
//   // states
//   const [totalProducts, setTotalProducts] = useState(0);
//   const { email: sellerEmail, username: sellerusername } =
//     useContext(AuthContext);
//   const [recentReviews, setRecentReviews] = useState([]);
//   const [totalOrders, setTotalOrders] = useState(0);
//   const [totalReviews, setTotalReviews] = useState(0);
//   const [products, setProducts] = useState([]);
//   const [combinedData, setCombinedData] = useState([]);
//   const [productsInventory, setproductsInventory] = useState([]); // for inventry management 
//   const [scrollSalesOpen, setScrollSalesOpen] = useState(false);
//   const [scrollOrderOpen, setScrollOrderOpen] = useState(false);
//   const [scrollProductOpen, setScrollProductOpen] = useState(false);
//   const [scrollInventryOpen, setScrollInventryOpen] = useState(false);
//   const [scrollAccountHealtOpen, setScrollAccountHealtOpen] = useState(false);
//   const [scrollFeedbackOpen, setScrollFeedbackOpen] = useState(false);
//   const [scrollStroesOpen, setScrollStroesOpen] = useState(false);
//   const [scrollMessagesOpen, setScrollMessagesOpen] = useState(false);

//   const [dailyOrders, setDailyOrders] = useState(new Array(31).fill(0));

//   const toggleSalesDropdown = () => {
//     setScrollSalesOpen(!scrollSalesOpen);
//   };
//   const toggleOrderDropdown = () => {
//     setScrollOrderOpen(!scrollOrderOpen);
//   };
//   const toggleProductDropdown = () => {
//     setScrollProductOpen(!scrollProductOpen);
//   };
//   const toggleInventryDropdown = () => {
//     setScrollInventryOpen(!scrollInventryOpen);
//   };
//   const toggleAccountHealthDropdown = () => {
//     setScrollAccountHealtOpen(!scrollAccountHealtOpen);
//   };
//   const toggleFeedbackDropdown = () => {
//     setScrollFeedbackOpen(!scrollFeedbackOpen);
//   };
//   const toggleStoresDropdown = () => {
//     setScrollStroesOpen(!scrollStroesOpen);
//   };
//   const toggleMessagesDropdown = () => {
//     setScrollMessagesOpen(!scrollMessagesOpen);
//   };

//   const lineData = {
//     labels: Array.from({ length: 31 }, (_, i) => i + 1),
//     datasets: [
//       {
//         label: "Number of Orders",
//         data: dailyOrders,
//         fill: false,
//         borderColor: "#EF5B2B",
//         backgroundColor: "rgba(76, 175, 80, 0.1)",
//         tension: 0.1,
//       },
//     ],
//   };

//   const lineOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       y: {
//         beginAtZero: true,
//         min: 0,
//         max: Math.max(...dailyOrders) + 1,
//         ticks: {
//           color: "#E0E0E0",
//         },
//         grid: {
//           color: "rgba(255, 255, 255, 0.1)",
//         },
//       },
//     },
//   };

//   useEffect(() => {
//     // Fetch product details for each productId in recentReviews
//     const fetchProducts = async () => {
//       try {
//         const productRequests = recentReviews.map((review) =>
//           axios.get(
//             `${process.env.REACT_APP_LOCALHOST_URL}/products/product/${review.productId}`
//           )
//         );

//         const productResponses = await Promise.all(productRequests);

//         // Extract product data from responses
//         const productData = productResponses.map((response) => response.data);

//         setProducts(productData);
//       } catch (error) {
//         console.error("Error fetching product details:", error);
//       }
//     };

//     fetchProducts();
//   }, [recentReviews]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const productResponse = await fetch(
//           `${process.env.REACT_APP_LOCALHOST_URL}/seller/total-products/${sellerEmail}`
//         );
//         const orderResponse = await fetch(
//           `${process.env.REACT_APP_LOCALHOST_URL}/seller/total-orders/${sellerEmail}`
//         );
//         const reviewResponse = await fetch(
//           `${process.env.REACT_APP_LOCALHOST_URL}/seller/total-reviews/${sellerEmail}`
//         );
//         const recentReviewsResponse = await fetch(
//           `${process.env.REACT_APP_LOCALHOST_URL}/seller/recent-reviews/${sellerEmail}`
//         );
//         const dailyOrdersResponse = await fetch(
//           `${process.env.REACT_APP_LOCALHOST_URL}/seller/daily-orders/${sellerEmail}`
//         );

//         const productData = await productResponse.json();
//         const orderData = await orderResponse.json();
//         const reviewData = await reviewResponse.json();
//         const dailyOrdersData = await dailyOrdersResponse.json();
//         const recentReviewsData = await recentReviewsResponse.json();

//         setTotalProducts(productData.totalProducts);
//         setTotalOrders(orderData.totalOrders);  
//         setTotalReviews(reviewData.totalReviews);
//         setRecentReviews(
//           Array.isArray(recentReviewsData) ? recentReviewsData : []
//         );
//         setDailyOrders(dailyOrdersData);
//       } catch (error) {
//         console.error("Error fetching seller data:", error);
//       }
//     };

//     fetchData();
//   }, [sellerEmail, sellerusername]);
//   useEffect(() => {
//     if (recentReviews.length > 0 && products.length > 0) {
//       const combined = recentReviews
//         .map((review) => {
//           const matchingProduct = products.find(
//             (product) => product.id.toString() === review.productId.toString()
//           );
//           if (matchingProduct) {
//             return {
//               ...review,
//               product: matchingProduct,
//             };
//           }
//           return null;
//         })
//         .filter((item) => item !== null);

//       setCombinedData(combined);
//     }
//   }, [recentReviews, products]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         // const response = await axios.get(`/api/seller/${sellerEmail}`); 
//         const response = await axios.get(`${process.env.REACT_APP_LOCALHOST_URL}/products/seller/${sellerEmail}`); 
//         setproductsInventory(response.data); // Store the fetched products in state
//       } catch (err) {
//         console.error("Error fetching products:", err);
//       }
//     };

//     if (sellerEmail) {
//       fetchProducts();
//     }
//   }, [sellerEmail])
  

//   const data = {
//     labels: ["Total Products"],
//     datasets: [
//       {
//         label: "Number of Products",
//         data: [totalProducts],
//         backgroundColor: "#4CAF50", // Bar color
//         borderColor: "#388E3C",
//         borderWidth: 1,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       y: {
//         beginAtZero: true, // Start y-axis from 0
//         ticks: {
//           color: "#E0E0E0",
//         },
//         grid: {
//           color: "rgba(255, 255, 255, 0.1)",
//         },
//       },
//     },
//     plugins: {
//       tooltip: {
//         callbacks: {
//           label: (context) => `Total Products: ${context.raw}`, // Custom tooltip text
//         },
//       },
//     },
//   };

//   const totalQuantity = productsInventory.reduce((total, product) => {
//     return total + product.quantity; // Accumulate the quantity
//   }, 0);
  
//   const statusData = productsInventory.reduce((acc, product) => {
//     const { status, quantity } = product;
//     // Initialize if not already present
//     if (!acc[status]) {
//       acc[status] = { count: 0, totalQuantity: 0 };
//     }
//     // Increment count and add to quantity
//     acc[status].count += 1;
//     acc[status].totalQuantity += quantity;
    
//     return acc;
//   }, {});


//   return (
//     <>
//       <div className="container-fluid m-0 p-0 navbar-dark bg-dark shadow">
//         <FullNavbar />
//       </div>
//       {/* // Dashboard section  */}
//       <section className="container">
//         <div>
//           <div className="container mt-4">
//             <div className="row align-items-center">
//               {/* Left-side text */}
//               <div className="col">
//                 <h6 className="mb-0">Matrices</h6>
//               </div>

//               {/* Right-side buttons */}
//               <div className="col-auto d-flex justify-content-end gap-2">
//               <Link to='/admin/sellerdashboard/accountsettings' className="btn btn-outline-secondary btn-sm outline-buttons">
//                   Account Settings
//                 </Link>
//                 <Link to='/admin/sellerdashboard/complains' className="btn btn-outline-secondary btn-sm outline-buttons">
//                   Complain
//                 </Link>
//                 <Link to='/admin/sellerdashboard/feedbacks' className="btn btn-outline-secondary btn-sm outline-buttons">
//                   Customer Feedback
//                 </Link>
//               </div>
//             </div>
//           </div>

//           <div className="container p-3">
//             <div className="row">
//               {/* Left side: Card 1 and Card 4 stacked vertically, each covering 2 columns and 2 rows */}
//               <div className="col-md-6 d-flex flex-column">
//                 <div className="card card-custom mb-4 h-100 ">
//                   <div className="card-body card-body-custom position-relative text-black">
//                     {/* Title at the top-left */}
//                     <h5 className="card-title card-title-custom">Products</h5>

//                     <span
//                       className="position-absolute top-0 end-0 custom-arrow-icon mt-2 me-3"
//                       onClick={toggleProductDropdown}
//                     >
//                       <i className="fas fa-chevron-down"></i>
//                     </span>
//                     {scrollProductOpen && (
//                       <div
//                         className="dropdown-menu show position-absolute p-1"
//                         style={{ top: "2rem", right: "1rem" }}
//                       >
//                         <Link
//                           className="dropdown-item"
//                           to="/admin/sellerdashboard/addproduct"
//                         >
//                           View Products Dashboard
//                         </Link>
//                       </div>
//                     )}
//                     <p className="card-text  card-text-value">
//                       {totalProducts}
//                     </p>
//                     <p className="card-text  card-text-custom">
//                       Total Products
//                     </p>
//                     <div className="chart-wrapper">
//                       <Bar data={data} options={options} />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="card card-custom mb-4 h-100">
//                   <div className="card-body card-body-custom position-relative">
//                     {/* Title at the top-left */}
//                     <h5 className="card-title card-title-custom">
//                       Open Orders
//                     </h5>

//                     {/* Arrow down icon at the top-right */}
//                     <span
//                       className="position-absolute top-0 end-0 custom-arrow-icon mt-2 me-3"
//                       onClick={toggleOrderDropdown}
//                     >
//                       <i className="fas fa-chevron-down"></i>
//                     </span>
//                     {scrollOrderOpen && (
//                       <div
//                         className="dropdown-menu show position-absolute p-1"
//                         style={{ top: "2rem", right: "1rem" }}
//                       >
//                         <Link className="dropdown-item" to="/admin/sellerdashboard/orders">
//                           View Orders Dashboard
//                         </Link>
//                       </div>
//                     )}

//                     <p className="card-text  card-text-value">{totalOrders}</p>
//                     <p className="card-text  card-text-custom">Total Count</p>
//                     <div className="chart-wrapper">
//                       <Line data={lineData} options={lineOptions} />
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Right side: Smaller cards in a 2x2 grid */}
//               <div className="col-md-6">
//                 <div className="row">
//                   <div className="col-lg-4 mt-1  col-12 mb-3">
//                     <div className="card card-custom  h-100">
//                       <div className="card-body card-body-custom position-relative">
//                         {/* Title at the top-left */}
//                         <h5 className="card-title card-title-custom">Sales</h5>

//                         {/* Arrow down icon at the top-right */}
//                         <span
//                           className="position-absolute top-0 end-0 custom-arrow-icon mt-2 me-3"
//                           onClick={toggleSalesDropdown}
//                         >
//                           <i className="fas fa-chevron-down"></i>
//                         </span>
//                         {scrollSalesOpen && (
//                           <div
//                             className="dropdown-menu show position-absolute p-1"
//                             style={{ top: "2rem", right: "1rem" }}
//                           >
//                             <Link
//                               className="dropdown-item"
//                               to="/admin/sellerdashboard/salesdashboard"
//                             >
//                               View Sales Dashboard
//                             </Link>
//                           </div>
//                         )}
//                         <p className="card-text  card-text-value">
//                           {totalProducts}
//                         </p>
//                         <p className="card-text  card-text-custom">
//                           Total Sales
//                         </p>
//                         {/* <p className="card-text  card-text-value">8</p>
//                         <p className="card-text  card-text-custom">
//                           Approved Products
//                         </p>
//                         <p className="card-text  card-text-value">4</p>
//                         <p className="card-text  card-text-custom">
//                           Pending Products
//                         </p>
//                         <p className="card-text  card-text-value">2</p>
//                         <p className="card-text  card-text-custom">
//                           Declined Products
//                         </p> */}
//                       </div>
//                     </div>
//                   </div>
//                   <div className="col-lg-4 mt-1  col-12 mb-3">
//                     <div className="card card-custom h-100">
//                       <div className="card-body card-body-custom position-relative">
//                         {/* Title at the top-left */}
//                         <h5 className="card-title card-title-custom">
//                           Inventry Management
//                         </h5>

//                         {/* Arrow down icon at the top-right */}
//                         <span
//                           className="position-absolute top-0 end-0 custom-arrow-icon mt-2 me-3 "
//                           onClick={toggleInventryDropdown}
//                         >
//                           <i className="fas fa-chevron-down"></i>
//                         </span>
//                         {scrollInventryOpen && (
//                           <div
//                             className="dropdown-menu show position-absolute p-1"
//                             style={{ top: "2rem", right: "1rem" }}
//                           >
//                             <Link className="dropdown-item" to='/admin/sellerdashboard/inventory'>
//                               View inventry Dashboard
//                             </Link>
//                           </div>
//                         )}

//                         <p className="card-text  card-text-value">{totalQuantity ? totalQuantity : 0}</p>
//                         <p className="card-text  card-text-custom">In Stock</p>
//                         <p className="card-text  card-text-value">{statusData?.pending?.totalQuantity}</p>
//                         <p className="card-text  card-text-custom">
//                           In Pending
//                         </p>
//                         <p className="card-text  card-text-value">{statusData?.approved?.totalQuantity}</p>
//                         <p className="card-text  card-text-custom">Approved</p>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="col-lg-4 mt-1  col-12 mb-3">
//                     <div className="card card-custom  h-100">
//                       <div className="card-body card-body-custom position-relative">
//                         {/* Title at the top-left */}
//                         <h5 className="card-title card-title-custom">
//                           Account Health
//                         </h5>

//                         {/* Arrow down icon at the top-right */}
//                         <span
//                           className="position-absolute top-0 end-0 custom-arrow-icon mt-2 me-3"
//                           onClick={toggleAccountHealthDropdown}
//                         >
//                           <i className="fas fa-chevron-down"></i>
//                         </span>
//                         {scrollAccountHealtOpen && (
//                           <div
//                             className="dropdown-menu show position-absolute p-1"
//                             style={{ top: "2rem", right: "1rem" }}
//                           >
//                             <a className="dropdown-item" href="#link">
//                               View Account Dashboard
//                             </a>
//                           </div>
//                         )}

//                         <p className="card-text  card-text-value">Good</p>
//                         <p className="card-text  card-text-custom">
//                           Today so far
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="row mt-2">
//                   <div className="col-lg-4 mt-1  col-12">
//                     <div className="card card-custom  h-100">
//                       <div className="card-body card-body-custom position-relative">
//                         {/* Title at the top-left */}
//                         <h5 className="card-title card-title-custom">
//                           Customer Feedback
//                         </h5>

//                         {/* Arrow down icon at the top-right */}
//                         <span
//                           className="position-absolute top-0 end-0 custom-arrow-icon mt-2 me-3"
//                           onClick={toggleFeedbackDropdown}
//                         >
//                           <i className="fas fa-chevron-down"></i>
//                         </span>
//                         {scrollFeedbackOpen && (
//                           <div
//                             className="dropdown-menu show position-absolute p-1"
//                             style={{ top: "2rem", right: "1rem" }}
//                           >
//                             <Link className="dropdown-item" to="/admin/sellerdashboard/feedbacks">
//                               View Feedback Dashboard
//                             </Link>
//                           </div>
//                         )}

//                         <p className="card-text  card-text-value">
//                           {totalReviews}
//                         </p>
//                         <p className="card-text  card-text-custom">
//                           Past month
//                         </p>

//                         {combinedData.length === 0 ? (
//                           <p>No recent reviews.</p>
//                         ) : (
//                           combinedData.slice(0, 2).map((review) => (
//                             <div key={review._id} className="review-item">
//                               <div className="d-flex align-items-center">
//                                 <img
//                                   src={`${process.env.REACT_APP_LOCALHOST_URL}${review?.product?.imageUrl}`}
//                                   className="img-fluid"
//                                   style={{
//                                     width: "20px",
//                                     height: "20px",
//                                     objectFit: "cover",
//                                     borderRadius: "50%",
//                                     marginRight: "10px",
//                                   }}
//                                   alt={review?.product?.name}
//                                 />
//                                 <div className="d-flex flex-column">
//                                   <p
//                                     className="text-muted"
//                                     style={{ fontSize: "0.5rem" }}
//                                   >
//                                     {review?.product?.name}
//                                   </p>
//                                   <strong className="review-username">
//                                     {review.username}
//                                   </strong>
//                                   <p className="review-text small">
//                                     {review.review}
//                                   </p>
//                                 </div>
//                               </div>
//                             </div>
//                           ))
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                   <div className="col-lg-4 mt-1  col-12">
//                     <div className="card card-custom  h-100">
//                       <div className="card-body card-body-custom position-relative">
//                         {/* Title at the top-left */}
//                         <h5 className="card-title card-title-custom">Stores</h5>

//                         {/* Arrow down icon at the top-right */}
//                         <span
//                           className="position-absolute top-0 end-0 custom-arrow-icon mt-2 me-3"
//                           onClick={toggleStoresDropdown}
//                         >
//                           <i className="fas fa-chevron-down"></i>
//                         </span>
//                         {scrollStroesOpen && (
//                           <div
//                             className="dropdown-menu show position-absolute p-1"
//                             style={{ top: "2rem", right: "1rem" }}
//                           >
//                             <a className="dropdown-item" href="#link">
//                               View Store Dashboard
//                             </a>
//                           </div>
//                         )}

//                         <p className="card-text  card-text-value">1</p>
//                         <p className="card-text  card-text-custom">
//                           Total Store
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="col-lg-4 mt-1  col-12">
//                     <Link to="/chat" >
//                     <div className="card card-custom  h-100">
//                       <div className="card-body card-body-custom position-relative">
//                         {/* Title at the top-left */}
//                         <h5 className="card-title card-title-custom">
//                           Buyer Messages
//                         </h5>
//                         <p className="card-text  card-text-value">Chat System</p>
//                       </div>
//                     </div>
//                     </Link>
                    
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }





import { React, useState, useContext, useEffect } from "react";
import FullNavbar from "./FullNavbar";
import axios from "axios";
import { Link } from "react-router-dom";
import "./SellerDashboardV2.css";
import { AuthContext } from "../../AuthContext.js";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  BarElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  LineController,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function SellerDashboardV2() {
  // States
  const [totalProducts, setTotalProducts] = useState(0);
  const { email: sellerEmail, username: sellerusername } =
    useContext(AuthContext);
  const [recentReviews, setRecentReviews] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [products, setProducts] = useState([]);
  const [combinedData, setCombinedData] = useState([]);
  const [productsInventory, setproductsInventory] = useState([]); // for inventry management 
  const [scrollSalesOpen, setScrollSalesOpen] = useState(false);
  const [scrollOrderOpen, setScrollOrderOpen] = useState(false);
  const [scrollProductOpen, setScrollProductOpen] = useState(false);
  const [scrollInventryOpen, setScrollInventryOpen] = useState(false);
  const [scrollAccountHealtOpen, setScrollAccountHealtOpen] = useState(false);
  const [scrollFeedbackOpen, setScrollFeedbackOpen] = useState(false);
  const [scrollStroesOpen, setScrollStroesOpen] = useState(false);
  const [scrollMessagesOpen, setScrollMessagesOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [dailyOrders, setDailyOrders] = useState(new Array(31).fill(0));

  // Debug environment variables
  useEffect(() => {
    console.log("Backend URL:", process.env.REACT_APP_LOCALHOST_URL);
  }, []);

  const toggleSalesDropdown = () => {
    setScrollSalesOpen(!scrollSalesOpen);
  };
  const toggleOrderDropdown = () => {
    setScrollOrderOpen(!scrollOrderOpen);
  };
  const toggleProductDropdown = () => {
    setScrollProductOpen(!scrollProductOpen);
  };
  const toggleInventryDropdown = () => {
    setScrollInventryOpen(!scrollInventryOpen);
  };
  const toggleAccountHealthDropdown = () => {
    setScrollAccountHealtOpen(!scrollAccountHealtOpen);
  };
  const toggleFeedbackDropdown = () => {
    setScrollFeedbackOpen(!scrollFeedbackOpen);
  };
  const toggleStoresDropdown = () => {
    setScrollStroesOpen(!scrollStroesOpen);
  };
  const toggleMessagesDropdown = () => {
    setScrollMessagesOpen(!scrollMessagesOpen);
  };

  const lineData = {
    labels: Array.from({ length: 31 }, (_, i) => i + 1),
    datasets: [
      {
        label: "Number of Orders",
        data: dailyOrders,
        fill: false,
        borderColor: "#EF5B2B",
        backgroundColor: "rgba(76, 175, 80, 0.1)",
        tension: 0.1,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: Math.max(...dailyOrders) + 1,
        ticks: {
          color: "#E0E0E0",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
    },
  };

  // Helper function for API calls with error handling
  const fetchWithErrorHandling = async (url, errorMessage) => {
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`${errorMessage}: ${response.status} ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(errorMessage, error);
      setError(`${errorMessage}: ${error.message}`);
      return null;
    }
  };

  // Helper function for Axios requests with error handling
  const axiosWithErrorHandling = async (url, errorMessage) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(errorMessage, error);
      setError(`${errorMessage}: ${error.message}`);
      return null;
    }
  };

  useEffect(() => {
    // Fetch product details for each productId in recentReviews
    const fetchProducts = async () => {
      if (!recentReviews.length) return;
      
      try {
        setIsLoading(true);
        const productRequests = recentReviews.map(review => {
          const url = `${process.env.REACT_APP_LOCALHOST_URL}/products/product/${review.productId}`;
          return axiosWithErrorHandling(url, "Error fetching product details");
        });

        const productResponses = await Promise.all(productRequests);
        // Filter out any null responses
        const validProductData = productResponses.filter(response => response !== null);
        
        setProducts(validProductData);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError("Failed to fetch product details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [recentReviews]);

  // (Before 20 May)
  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (!sellerEmail) return;
      
  //     setIsLoading(true);
  //     setError(null);
      
  //     try {
  //       const encodedEmail = encodeURIComponent(sellerEmail);
  //       const baseUrl = process.env.REACT_APP_LOCALHOST_URL || 'https://backend.tradxsell.com';
        
  //       // Using Promise.allSettled to handle multiple API calls independently
  //       const responses = await Promise.allSettled([
  //         fetchWithErrorHandling(
  //           `${baseUrl}/seller/total-products/${encodedEmail}`,
  //           "Failed to fetch total products"
  //         ),
  //         fetchWithErrorHandling(
  //           `${baseUrl}/seller/total-orders/${encodedEmail}`,
  //           "Failed to fetch total orders"
  //         ),
  //         fetchWithErrorHandling(
  //           `${baseUrl}/seller/total-reviews/${encodedEmail}`,
  //           "Failed to fetch total reviews"
  //         ),
  //         fetchWithErrorHandling(
  //           `${baseUrl}/seller/recent-reviews/${encodedEmail}`,
  //           "Failed to fetch recent reviews"
  //         ),
  //         fetchWithErrorHandling(
  //           `${baseUrl}/seller/daily-orders/${encodedEmail}`,
  //           "Failed to fetch daily orders"
  //         )
  //       ]);

  //       // Process responses
  //       const [productRes, orderRes, reviewRes, recentReviewsRes, dailyOrdersRes] = responses;
        
  //       if (productRes.status === 'fulfilled' && productRes.value) {
  //         setTotalProducts(productRes.value.totalProducts || 0);
  //       }
        
  //       if (orderRes.status === 'fulfilled' && orderRes.value) {
  //         setTotalOrders(orderRes.value.totalOrders || 0);
  //       }
        
  //       if (reviewRes.status === 'fulfilled' && reviewRes.value) {
  //         setTotalReviews(reviewRes.value.totalReviews || 0);
  //       }
        
  //       if (recentReviewsRes.status === 'fulfilled' && recentReviewsRes.value) {
  //         setRecentReviews(
  //           Array.isArray(recentReviewsRes.value) ? recentReviewsRes.value : []
  //         );
  //       }
        
  //       if (dailyOrdersRes.status === 'fulfilled' && dailyOrdersRes.value) {
  //         setDailyOrders(dailyOrdersRes.value || new Array(31).fill(0));
  //       }
  //     } catch (error) {
  //       console.error("Error fetching seller data:", error);
  //       setError("Failed to fetch seller data. Please try again later.");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [sellerEmail]);


  // (20 May)
  useEffect(() => {
    const fetchData = async () => {
      if (!sellerEmail) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const encodedEmail = encodeURIComponent(sellerEmail);
        const baseUrl = process.env.REACT_APP_LOCALHOST_URL || 'https://backend.tradxsell.com';
        
        // Using Promise.allSettled to handle multiple API calls independently
        const responses = await Promise.allSettled([
          fetchWithErrorHandling(
            `${baseUrl}/seller/total-products?email=${encodedEmail}`,
            "Failed to fetch total products"
          ),
          fetchWithErrorHandling(
            `${baseUrl}/seller/total-orders?email=${encodedEmail}`,
            "Failed to fetch total orders"
          ),
          fetchWithErrorHandling(
            `${baseUrl}/seller/total-reviews?email=${encodedEmail}`,
            "Failed to fetch total reviews"
          ),
          fetchWithErrorHandling(
            `${baseUrl}/seller/recent-reviews?email=${encodedEmail}`,
            "Failed to fetch recent reviews"
          ),
          fetchWithErrorHandling(
            `${baseUrl}/seller/daily-orders?email=${encodedEmail}`,
            "Failed to fetch daily orders"
          )
        ]);

        // Process responses
        const [productRes, orderRes, reviewRes, recentReviewsRes, dailyOrdersRes] = responses;
        
        if (productRes.status === 'fulfilled' && productRes.value) {
          setTotalProducts(productRes.value.totalProducts || 0);
        }
        
        if (orderRes.status === 'fulfilled' && orderRes.value) {
          setTotalOrders(orderRes.value.totalOrders || 0);
        }
        
        if (reviewRes.status === 'fulfilled' && reviewRes.value) {
          setTotalReviews(reviewRes.value.totalReviews || 0);
        }
        
        if (recentReviewsRes.status === 'fulfilled' && recentReviewsRes.value) {
          setRecentReviews(
            Array.isArray(recentReviewsRes.value) ? recentReviewsRes.value : []
          );
        }
        
        if (dailyOrdersRes.status === 'fulfilled' && dailyOrdersRes.value) {
          setDailyOrders(dailyOrdersRes.value || new Array(31).fill(0));
        }
      } catch (error) {
        console.error("Error fetching seller data:", error);
        setError("Failed to fetch seller data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [sellerEmail]);

  useEffect(() => {
    if (recentReviews.length > 0 && products.length > 0) {
      const combined = recentReviews
        .map((review) => {
          const matchingProduct = products.find(
            (product) => product && product.id && review && review.productId && 
            product.id.toString() === review.productId.toString()
          );
          if (matchingProduct) {
            return {
              ...review,
              product: matchingProduct,
            };
          }
          return null;
        })
        .filter((item) => item !== null);

      setCombinedData(combined);
    }
  }, [recentReviews, products]);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     if (!sellerEmail) return;
      
  //     setIsLoading(true);
  //     try {
  //       const encodedEmail = encodeURIComponent(sellerEmail);
  //       const baseUrl = process.env.REACT_APP_LOCALHOST_URL || 'https://backend.tradxsell.com';
  //       const url = `${baseUrl}/products/seller/${encodedEmail}`;
        
  //       const data = await axiosWithErrorHandling(url, "Error fetching inventory products");
  //       if (data) {
  //         setproductsInventory(data);
  //       }
  //     } catch (err) {
  //       console.error("Error fetching products:", err);
  //       setError("Failed to fetch inventory products. Please try again later.");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   if (sellerEmail) {
  //     fetchProducts();
  //   }
  // }, [sellerEmail]);


  useEffect(() => {
    const fetchProducts = async () => {
      if (!sellerEmail) return;
      
      setIsLoading(true);
      try {
        const encodedEmail = encodeURIComponent(sellerEmail);
        const baseUrl = process.env.REACT_APP_LOCALHOST_URL || 'https://backend.tradxsell.com';
        const url = `${baseUrl}/products/seller?email=${encodedEmail}`;
        
        const data = await axiosWithErrorHandling(url, "Error fetching inventory products");
        if (data) {
          setproductsInventory(data);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to fetch inventory products. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    if (sellerEmail) {
      fetchProducts();
    }
  }, [sellerEmail]);
  
  const data = {
    labels: ["Total Products"],
    datasets: [
      {
        label: "Number of Products",
        data: [totalProducts],
        backgroundColor: "#4CAF50", // Bar color
        borderColor: "#388E3C",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true, // Start y-axis from 0
        ticks: {
          color: "#E0E0E0",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => `Total Products: ${context.raw}`, // Custom tooltip text
        },
      },
    },
  };

  // Calculate inventory stats safely
  const totalQuantity = Array.isArray(productsInventory) 
    ? productsInventory.reduce((total, product) => {
        return total + (product.quantity || 0);
      }, 0)
    : 0;
  
  const statusData = Array.isArray(productsInventory) 
    ? productsInventory.reduce((acc, product) => {
        const status = product.status || 'unknown';
        const quantity = product.quantity || 0;
        
        // Initialize if not already present
        if (!acc[status]) {
          acc[status] = { count: 0, totalQuantity: 0 };
        }
        
        // Increment count and add to quantity
        acc[status].count += 1;
        acc[status].totalQuantity += quantity;
        
        return acc;
      }, {})
    : {};

  // Get safe values for rendering
  const pendingQuantity = statusData?.pending?.totalQuantity || 0;
  const approvedQuantity = statusData?.approved?.totalQuantity || 0;

  // Loading and error handling
  if (isLoading && !error) {
    return (
      <>
        <div className="container-fluid m-0 p-0 navbar-dark bg-dark shadow">
          <FullNavbar />
        </div>
        <div className="container mt-5 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading dashboard data...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container-fluid m-0 p-0 navbar-dark bg-dark shadow">
        <FullNavbar />
      </div>
      
      {/* Show error message if exists */}
      {error && (
        <div className="alert alert-danger m-3" role="alert">
          <strong>Error:</strong> {error}
          <p>Please check your network connection and try again, or contact support if the issue persists.</p>
        </div>
      )}
      
      {/* Dashboard section */}
      <section className="container">
        <div>
          <div className="container mt-4">
            <div className="row align-items-center">
              {/* Left-side text */}
              <div className="col">
                <h6 className="mb-0">Matrices</h6>
              </div>

              {/* Right-side buttons */}
              <div className="col-auto d-flex justify-content-end gap-2">
                <Link to='/admin/sellerdashboard/accountsettings' className="btn btn-outline-secondary btn-sm outline-buttons">
                  Account Settings
                </Link>
                <Link to='/admin/sellerdashboard/complains' className="btn btn-outline-secondary btn-sm outline-buttons">
                  Complain
                </Link>
                <Link to='/admin/sellerdashboard/feedbacks' className="btn btn-outline-secondary btn-sm outline-buttons">
                  Customer Feedback
                </Link>
              </div>
            </div>
          </div>

          <div className="container p-3">
            <div className="row">
              {/* Left side: Card 1 and Card 4 stacked vertically, each covering 2 columns and 2 rows */}
              <div className="col-md-6 d-flex flex-column">
                <div className="card card-custom mb-4 h-100 ">
                  <div className="card-body card-body-custom position-relative text-black">
                    {/* Title at the top-left */}
                    <h5 className="card-title card-title-custom">Products</h5>

                    <span
                      className="position-absolute top-0 end-0 custom-arrow-icon mt-2 me-3"
                      onClick={toggleProductDropdown}
                    >
                      <i className="fas fa-chevron-down"></i>
                    </span>
                    {scrollProductOpen && (
                      <div
                        className="dropdown-menu show position-absolute p-1"
                        style={{ top: "2rem", right: "1rem" }}
                      >
                        <Link
                          className="dropdown-item"
                          to="/admin/sellerdashboard/addproduct"
                        >
                          View Products Dashboard
                        </Link>
                      </div>
                    )}
                    <p className="card-text card-text-value">
                      {totalProducts}
                    </p>
                    <p className="card-text card-text-custom">
                      Total Products
                    </p>
                    <div className="chart-wrapper">
                      <Bar data={data} options={options} />
                    </div>
                  </div>
                </div>
                <div className="card card-custom mb-4 h-100">
                  <div className="card-body card-body-custom position-relative">
                    {/* Title at the top-left */}
                    <h5 className="card-title card-title-custom">
                      Open Orders
                    </h5>

                    {/* Arrow down icon at the top-right */}
                    <span
                      className="position-absolute top-0 end-0 custom-arrow-icon mt-2 me-3"
                      onClick={toggleOrderDropdown}
                    >
                      <i className="fas fa-chevron-down"></i>
                    </span>
                    {scrollOrderOpen && (
                      <div
                        className="dropdown-menu show position-absolute p-1"
                        style={{ top: "2rem", right: "1rem" }}
                      >
                        <Link className="dropdown-item" to="/admin/sellerdashboard/orders">
                          View Orders Dashboard
                        </Link>
                      </div>
                    )}

                    <p className="card-text card-text-value">{totalOrders}</p>
                    <p className="card-text card-text-custom">Total Count</p>
                    <div className="chart-wrapper">
                      <Line data={lineData} options={lineOptions} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side: Smaller cards in a 2x2 grid */}
              <div className="col-md-6">
                <div className="row">
                  <div className="col-lg-4 mt-1 col-12 mb-3">
                    <div className="card card-custom h-100">
                      <div className="card-body card-body-custom position-relative">
                        {/* Title at the top-left */}
                        <h5 className="card-title card-title-custom">Sales</h5>

                        {/* Arrow down icon at the top-right */}
                        <span
                          className="position-absolute top-0 end-0 custom-arrow-icon mt-2 me-3"
                          onClick={toggleSalesDropdown}
                        >
                          <i className="fas fa-chevron-down"></i>
                        </span>
                        {scrollSalesOpen && (
                          <div
                            className="dropdown-menu show position-absolute p-1"
                            style={{ top: "2rem", right: "1rem" }}
                          >
                            <Link
                              className="dropdown-item"
                              to="/admin/sellerdashboard/salesdashboard"
                            >
                              View Sales Dashboard
                            </Link>
                          </div>
                        )}
                        <p className="card-text card-text-value">
                          {totalProducts}
                        </p>
                        <p className="card-text card-text-custom">
                          Total Sales
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 mt-1 col-12 mb-3">
                    <div className="card card-custom h-100">
                      <div className="card-body card-body-custom position-relative">
                        {/* Title at the top-left */}
                        <h5 className="card-title card-title-custom">
                          Inventry Management
                        </h5>

                        {/* Arrow down icon at the top-right */}
                        <span
                          className="position-absolute top-0 end-0 custom-arrow-icon mt-2 me-3 "
                          onClick={toggleInventryDropdown}
                        >
                          <i className="fas fa-chevron-down"></i>
                        </span>
                        {scrollInventryOpen && (
                          <div
                            className="dropdown-menu show position-absolute p-1"
                            style={{ top: "2rem", right: "1rem" }}
                          >
                            <Link className="dropdown-item" to='/admin/sellerdashboard/inventory'>
                              View inventry Dashboard
                            </Link>
                          </div>
                        )}

                        <p className="card-text card-text-value">{totalQuantity}</p>
                        <p className="card-text card-text-custom">In Stock</p>
                        <p className="card-text card-text-value">{pendingQuantity}</p>
                        <p className="card-text card-text-custom">
                          In Pending
                        </p>
                        <p className="card-text card-text-value">{approvedQuantity}</p>
                        <p className="card-text card-text-custom">Approved</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 mt-1 col-12 mb-3">
                    <div className="card card-custom h-100">
                      <div className="card-body card-body-custom position-relative">
                        {/* Title at the top-left */}
                        <h5 className="card-title card-title-custom">
                          Account Health
                        </h5>

                        {/* Arrow down icon at the top-right */}
                        <span
                          className="position-absolute top-0 end-0 custom-arrow-icon mt-2 me-3"
                          onClick={toggleAccountHealthDropdown}
                        >
                          <i className="fas fa-chevron-down"></i>
                        </span>
                        {scrollAccountHealtOpen && (
                          <div
                            className="dropdown-menu show position-absolute p-1"
                            style={{ top: "2rem", right: "1rem" }}
                          >
                            <a className="dropdown-item" href="#link">
                              View Account Dashboard
                            </a>
                          </div>
                        )}

                        <p className="card-text card-text-value">Good</p>
                        <p className="card-text card-text-custom">
                          Today so far
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row mt-2">
                  <div className="col-lg-4 mt-1 col-12">
                    <div className="card card-custom h-100">
                      <div className="card-body card-body-custom position-relative">
                        {/* Title at the top-left */}
                        <h5 className="card-title card-title-custom">
                          Customer Feedback
                        </h5>

                        {/* Arrow down icon at the top-right */}
                        <span
                          className="position-absolute top-0 end-0 custom-arrow-icon mt-2 me-3"
                          onClick={toggleFeedbackDropdown}
                        >
                          <i className="fas fa-chevron-down"></i>
                        </span>
                        {scrollFeedbackOpen && (
                          <div
                            className="dropdown-menu show position-absolute p-1"
                            style={{ top: "2rem", right: "1rem" }}
                          >
                            <Link className="dropdown-item" to="/admin/sellerdashboard/feedbacks">
                              View Feedback Dashboard
                            </Link>
                          </div>
                        )}

                        <p className="card-text card-text-value">
                          {totalReviews}
                        </p>
                        <p className="card-text card-text-custom">
                          Past month
                        </p>

                        {combinedData.length === 0 ? (
                          <p>No recent reviews.</p>
                        ) : (
                          combinedData.slice(0, 2).map((review) => (
                            <div key={review._id} className="review-item">
                              <div className="d-flex align-items-center">
                                {review?.product?.imageUrl && (
                                  <img
                                    src={`${process.env.REACT_APP_LOCALHOST_URL || 'https://backend.tradxsell.com'}${review.product.imageUrl}`}
                                    className="img-fluid"
                                    style={{
                                      width: "20px",
                                      height: "20px",
                                      objectFit: "cover",
                                      borderRadius: "50%",
                                      marginRight: "10px",
                                    }}
                                    alt={review?.product?.name || 'Product'}
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = "https://via.placeholder.com/20";
                                    }}
                                  />
                                )}
                                <div className="d-flex flex-column">
                                  <p
                                    className="text-muted"
                                    style={{ fontSize: "0.5rem" }}
                                  >
                                    {review?.product?.name || 'Unknown Product'}
                                  </p>
                                  <strong className="review-username">
                                    {review.username || 'Anonymous'}
                                  </strong>
                                  <p className="review-text small">
                                    {review.review || 'No review text'}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 mt-1 col-12">
                    <div className="card card-custom h-100">
                      <div className="card-body card-body-custom position-relative">
                        {/* Title at the top-left */}
                        <h5 className="card-title card-title-custom">Stores</h5>

                        {/* Arrow down icon at the top-right */}
                        <span
                          className="position-absolute top-0 end-0 custom-arrow-icon mt-2 me-3"
                          onClick={toggleStoresDropdown}
                        >
                          <i className="fas fa-chevron-down"></i>
                        </span>
                        {scrollStroesOpen && (
                          <div
                            className="dropdown-menu show position-absolute p-1"
                            style={{ top: "2rem", right: "1rem" }}
                          >
                            <a className="dropdown-item" href="#link">
                              View Store Dashboard
                            </a>
                          </div>
                        )}

                        <p className="card-text card-text-value">1</p>
                        <p className="card-text card-text-custom">
                          Total Store
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 mt-1 col-12">
                    <Link to="/chat">
                      <div className="card card-custom h-100">
                        <div className="card-body card-body-custom position-relative">
                          {/* Title at the top-left */}
                          <h5 className="card-title card-title-custom">
                            Buyer Messages
                          </h5>
                          <p className="card-text card-text-value">Chat System</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}