// import React, { useState } from "react";
// import {
//   Package,
//   TrendingUp,
//   MessageSquare,
//   Store,
//   Settings,
//   ChevronDown,
// } from "lucide-react";
// import FullNavbar from "./FullNavbar";
// import { Link } from "react-router-dom";

// const Dashboard = () => {
//   const [activeTab, setActiveTab] = useState("overview");
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

//   const salesData = [
//     { month: "Jan", sales: 12 },
//     { month: "Feb", sales: 19 },
//     { month: "Mar", sales: 15 },
//     { month: "Apr", sales: 25 },
//     { month: "May", sales: 22 },
//     { month: "Jun", sales: 30 },
//   ];

//   const orderData = [
//     { day: "1", orders: 5 },
//     { day: "5", orders: 8 },
//     { day: "10", orders: 12 },
//     { day: "15", orders: 7 },
//     { day: "20", orders: 15 },
//     { day: "25", orders: 10 },
//     { day: "30", orders: 18 },
//   ];

//   return (
//     <>
//       <style>{`
//         .gradient-bg {
//           background: linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%);
//           min-height: 100vh;
//         }
//         .glass-card {
//           background: rgba(255, 255, 255, 0.6);
//           backdrop-filter: blur(10px);
//           border: 1px solid rgba(255, 255, 255, 0.2);
//           box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
//           transition: all 0.3s ease;
//         }
//         .glass-card:hover {
//           transform: translateY(-5px);
//           box-shadow: 0 16px 40px rgba(0, 0, 0, 0.15);
//         }
//         .gradient-text {
//           background: linear-gradient(135deg, #ff5722 0%, #e65100 100%);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//         }
//         .gradient-blue {
//           background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
//         }
//         .gradient-green {
//           background: linear-gradient(135deg, #10b981 0%, #059669 100%);
//         }
//         .gradient-purple {
//           background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
//         }
//         .gradient-orange {
//           background: linear-gradient(135deg, #ff5722 0%, #ff7043 100%);
//         }
//         .icon-container {
//           width: 50px;
//           height: 50px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }
//         .chart-bar {
//           background: linear-gradient(to top, #ff5722, #ff8a50);
//           border-radius: 8px 8px 0 0;
//         }
//         .order-bar {
//           background: linear-gradient(to top, #f97316, #fb923c);
//           border-radius: 2px 2px 0 0;
//         }
//         .notification-dot {
//           width: 12px;
//           height: 12px;
//           background-color: #ef4444;
//           border-radius: 50%;
//           position: absolute;
//           top: -2px;
//           right: -2px;
//         }
//         .header-bg {
//           background: rgba(255, 255, 255, 0.8);
//           backdrop-filter: blur(10px);
//           border-bottom: 1px solid rgba(255, 255, 255, 0.2);
//         }
//       `}</style>

//       <div className="gradient-bg">
//         <div className="container-fluid m-0 p-0 navbar-dark bg-dark shadow">
//           <FullNavbar />
//         </div>

//         <header className="header-bg">
//           <div className="container-fluid px-4 py-3">
//             <div className="row align-items-center">
//               {/* Title Column */}
//               <div className="col-12 col-md-6">
//                 <h1 className="gradient-text h2 fw-bold mb-1">
//                   Seller Dashboard
//                 </h1>
//                 <p className="text-muted mb-2 mb-md-0">
//                   Welcome back! Here's your business overview
//                 </p>
//               </div>

//               {/* Buttons Column */}
//               <div className="col-12 col-md-6 mt-3 mt-md-0">
//                 <div className="d-flex flex-wrap justify-content-md-end gap-2">
//                   <Link to='/admin/sellerdashboard/accountsettings' className="btn text-white d-flex align-items-center gap-2 gradient-orange">
//                     <Settings size={16} />
//                     Account Settings
//                   </Link>
//                   <Link to='/admin/sellerdashboard/complains' className="btn btn-success">Complain</Link>
//                   <Link
//                     to='/admin/sellerdashboard/feedbacks'
//                     className="btn text-white"
//                     style={{ backgroundColor: "#8b5cf6" }}
//                   >
//                     Customer Feedback
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </header>

//         <div className="container-fluid px-4 py-4">
//           {/* Stats Cards */}
//           <div className="row g-4 mb-4 align-items-stretch">
//             <div className="col-12 col-md-6 col-lg-4">
//               <div className="glass-card rounded-4 p-4 h-100">
//                 <div className="d-flex justify-content-between align-items-center mb-3">
//                   <div className="icon-container gradient-blue rounded-3">
//                     <TrendingUp size={24} className="text-white" />
//                   </div>
//                   <ChevronDown size={16} className="text-muted" />
//                 </div>
//                 <div>
//                   <h6 className="text-muted fw-medium mb-2">Sales</h6>
//                   <h2 className="fw-bold text-dark mb-2">28</h2>
//                   <small className="text-primary fw-medium">Total Sales</small>
//                 </div>
//               </div>
//             </div>

//             <div className="col-12 col-md-6 col-lg-4">
//               <div className="glass-card rounded-4 p-4 h-100">
//                 <div className="d-flex justify-content-between align-items-center mb-3">
//                   <div className="icon-container gradient-green rounded-3">
//                     <Package size={24} className="text-white" />
//                   </div>
//                   <ChevronDown size={16} className="text-muted" />
//                 </div>
//                 <div>
//                   <h6 className="text-muted fw-medium mb-3">
//                     Inventory Management
//                   </h6>
//                   <div className="d-flex justify-content-between align-items-center mb-2">
//                     <small className="text-muted">In Stock</small>
//                     <small className="fw-semibold text-success">1311</small>
//                   </div>
//                   <div className="d-flex justify-content-between align-items-center mb-2">
//                     <small className="text-muted">In Pending</small>
//                     <small className="fw-semibold text-primary">12</small>
//                   </div>
//                   <div className="d-flex justify-content-between align-items-center">
//                     <small className="text-muted">Approved</small>
//                     <small className="fw-semibold text-success">1311</small>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="col-12 col-md-6 col-lg-4">
//               <div className="glass-card rounded-4 p-4 h-100">
//                 <div className="d-flex justify-content-between align-items-center mb-3">
//                   <div className="icon-container gradient-orange rounded-3">
//                     <Store size={24} className="text-white" />
//                   </div>
//                   <ChevronDown size={16} className="text-muted" />
//                 </div>
//                 <div>
//                   <h6 className="text-muted fw-medium mb-2">Stores</h6>
//                   <h2 className="fw-bold text-dark mb-2">1</h2>
//                   <small className="text-warning fw-medium">Total Store</small>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Charts */}
//           <div className="row g-4 mb-4 align-items-stretch">
//             <div className="col-12 col-lg-8">
//               <div className="glass-card rounded-4 p-4 h-100">
//                 <div className="d-flex justify-content-between align-items-center mb-4">
//                   <h5 className="fw-semibold text-dark mb-0">
//                     Products Overview
//                   </h5>
//                   <button className="btn btn-link btn-sm text-primary fw-medium p-0">
//                     View Details
//                   </button>
//                 </div>
//                 <div
//                   className="d-flex align-items-end justify-content-center"
//                   style={{ height: "250px" }}
//                 >
//                   <div
//                     className="chart-bar d-flex align-items-end justify-content-center pb-3"
//                     style={{
//                       width: "100%",
//                       maxWidth: "300px",
//                       height: "120px",
//                     }}
//                   >
//                     <span className="text-white fw-semibold">Products</span>
//                   </div>
//                 </div>
//                 <p className="text-center text-muted mt-3 mb-0">
//                   Total Products
//                 </p>
//               </div>
//             </div>

//             <div className="col-12 col-lg-4">
//               <div className="glass-card rounded-4 p-4 h-100">
//                 <div className="d-flex justify-content-between align-items-center mb-4">
//                   <h5 className="fw-semibold text-dark mb-0">
//                     Customer Feedback
//                   </h5>
//                   <ChevronDown size={16} className="text-muted" />
//                 </div>
//                 <div className="text-center py-5">
//                   <MessageSquare size={48} className="text-muted mb-3" />
//                   <p className="text-muted mb-2">No recent reviews.</p>
//                   <small className="text-muted">Past month</small>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Orders & Messages */}
//           <div className="row g-4 align-items-stretch">
//             <div className="col-12 col-lg-8">
//               <div className="glass-card rounded-4 p-4 h-100">
//                 <div className="d-flex justify-content-between align-items-center mb-4">
//                   <div>
//                     <h5 className="fw-semibold text-dark mb-2">Open Orders</h5>
//                     <h2 className="fw-bold text-dark mb-1">0</h2>
//                     <small className="text-muted">Total Count</small>
//                   </div>
//                   <ChevronDown size={16} className="text-muted" />
//                 </div>
//                 <div
//                   className="d-flex align-items-end gap-1"
//                   style={{ height: "160px" }}
//                 >
//                   {orderData.map((item, index) => (
//                     <div
//                       key={index}
//                       className="d-flex flex-column align-items-center flex-fill"
//                     >
//                       <div
//                         className="order-bar w-100"
//                         style={{ height: `${(item.orders / 18) * 100}%` }}
//                       ></div>
//                       <small className="text-muted mt-2">{item.day}</small>
//                     </div>
//                   ))}
//                 </div>
//                 <p className="text-center text-muted mt-3 mb-0">
//                   Number of Orders
//                 </p>
//               </div>
//             </div>

//             <div className="col-12 col-lg-4">
//               <div className="glass-card rounded-4 p-4 h-100">
//                 <div className="d-flex justify-content-between align-items-center mb-4">
//                   <h5 className="fw-semibold text-dark mb-0">Buyer Messages</h5>
//                 </div>
//                 <div className="text-center py-5">
//                   <button
//                     className="btn text-white px-4 py-3 rounded-3 fw-medium"
//                     style={{ backgroundColor: "#ff5722" }}
//                   >
//                     Chat System
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Dashboard;

// Incomplete integration of the Seller Dashboard component
import { React, useState, useContext, useEffect } from "react";
import {
  Package,
  TrendingUp,
  MessageSquare,
  Store,
  Settings,
  ChevronDown,
} from "lucide-react";
import FullNavbar from "./FullNavbar";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthContext.js";
import axios from "axios";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

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
        throw new Error(
          `${errorMessage}: ${response.status} ${response.statusText}`
        );
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
        const productRequests = recentReviews.map((review) => {
          const url = `${process.env.REACT_APP_LOCALHOST_URL}/products/product/${review.productId}`;
          return axiosWithErrorHandling(url, "Error fetching product details");
        });

        const productResponses = await Promise.all(productRequests);
        // Filter out any null responses
        const validProductData = productResponses.filter(
          (response) => response !== null
        );

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

  // (20 May)
  useEffect(() => {
    const fetchData = async () => {
      if (!sellerEmail) return;

      setIsLoading(true);
      setError(null);

      try {
        const encodedEmail = encodeURIComponent(sellerEmail);
        const baseUrl =
          process.env.REACT_APP_LOCALHOST_URL ||
          "https://backend.tradxsell.com";

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
          ),
        ]);

        // Process responses
        const [
          productRes,
          orderRes,
          reviewRes,
          recentReviewsRes,
          dailyOrdersRes,
        ] = responses;

        if (productRes.status === "fulfilled" && productRes.value) {
          setTotalProducts(productRes.value.totalProducts || 0);
        }

        if (orderRes.status === "fulfilled" && orderRes.value) {
          setTotalOrders(orderRes.value.totalOrders || 0);
        }

        if (reviewRes.status === "fulfilled" && reviewRes.value) {
          setTotalReviews(reviewRes.value.totalReviews || 0);
        }

        if (recentReviewsRes.status === "fulfilled" && recentReviewsRes.value) {
          setRecentReviews(
            Array.isArray(recentReviewsRes.value) ? recentReviewsRes.value : []
          );
        }

        if (dailyOrdersRes.status === "fulfilled" && dailyOrdersRes.value) {
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
            (product) =>
              product &&
              product.id &&
              review &&
              review.productId &&
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

  useEffect(() => {
    const fetchProducts = async () => {
      if (!sellerEmail) return;

      setIsLoading(true);
      try {
        const encodedEmail = encodeURIComponent(sellerEmail);
        const baseUrl =
          process.env.REACT_APP_LOCALHOST_URL ||
          "https://backend.tradxsell.com";
        const url = `${baseUrl}/products/seller?email=${encodedEmail}`;

        const data = await axiosWithErrorHandling(
          url,
          "Error fetching inventory products"
        );
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
        const status = product.status || "unknown";
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

  const salesData = [
    { month: "Jan", sales: 12 },
    { month: "Feb", sales: 19 },
    { month: "Mar", sales: 15 },
    { month: "Apr", sales: 25 },
    { month: "May", sales: 22 },
    { month: "Jun", sales: 30 },
  ];

  const orderData = [
    { day: "1", orders: 5 },
    { day: "5", orders: 8 },
    { day: "10", orders: 12 },
    { day: "15", orders: 7 },
    { day: "20", orders: 15 },
    { day: "25", orders: 10 },
    { day: "30", orders: 18 },
  ];

  return (
    <>
      <style>{`
        .gradient-bg {
          background: linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%);
          min-height: 100vh;
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }
        .glass-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.15);
        }
        .gradient-text {
          background: linear-gradient(135deg, #ff5722 0%, #e65100 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .gradient-blue {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
        }
        .gradient-green {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        }
        .gradient-purple {
          background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
        }
        .gradient-orange {
          background: linear-gradient(135deg, #ff5722 0%, #ff7043 100%);
        }
        .icon-container {
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .chart-bar {
          background: linear-gradient(to top, #ff5722, #ff8a50);
          border-radius: 8px 8px 0 0;
        }
        .order-bar {
          background: linear-gradient(to top, #f97316, #fb923c);
          border-radius: 2px 2px 0 0;
        }
        .notification-dot {
          width: 12px;
          height: 12px;
          background-color: #ef4444;
          border-radius: 50%;
          position: absolute;
          top: -2px;
          right: -2px;
        }
        .header-bg {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }
      `}</style>

      <div className="gradient-bg">
        <div className="container-fluid m-0 p-0 navbar-dark bg-dark shadow">
          <FullNavbar />
        </div>

        <header className="header-bg">
          <div className="container-fluid px-4 py-3">
            <div className="row align-items-center">
              {/* Title Column */}
              <div className="col-12 col-md-6">
                <h1 className="gradient-text h2 fw-bold mb-1">
                  Seller Dashboard
                </h1>
                <p className="text-muted mb-2 mb-md-0">
                  Welcome back! Here's your business overview
                </p>
              </div>

              {/* Buttons Column */}
              <div className="col-12 col-md-6 mt-3 mt-md-0">
                <div className="d-flex flex-wrap justify-content-md-end gap-2">
                  <Link
                    to="/admin/sellerdashboard/accountsettings"
                    className="btn text-white d-flex align-items-center gap-2 gradient-orange"
                  >
                    <Settings size={16} />
                    Account Settings
                  </Link>
                  <Link
                    to="/admin/sellerdashboard/complains"
                    className="btn btn-success"
                  >
                    Complain
                  </Link>
                  <Link
                    to="/admin/sellerdashboard/feedbacks"
                    className="btn text-white"
                    style={{ backgroundColor: "#8b5cf6" }}
                  >
                    Customer Feedback
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="container-fluid px-4 py-4">
          {/* Stats Cards */}
          <div className="row g-4 mb-4 align-items-stretch">
            <div className="col-12 col-md-6 col-lg-4">
              <div className="glass-card rounded-4 p-4 h-100 position-relative">
                {/* Top Row */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="icon-container gradient-blue rounded-3">
                    <TrendingUp size={24} className="text-white" />
                  </div>

                  {/* Dropdown Trigger */}
                  <span
                    className="cursor-pointer"
                    onClick={toggleSalesDropdown}
                    style={{ cursor: "pointer" }}
                  >
                    <ChevronDown size={16} className="text-muted" />
                  </span>

                  {/* Dropdown Menu */}
                  {scrollSalesOpen && (
                    <div
                      className="dropdown-menu show position-absolute p-2"
                      style={{ top: "4rem", right: "1rem", zIndex: 1000 }}
                    >
                      <Link
                        className="dropdown-item"
                        to="/admin/sellerdashboard/salesdashboard"
                      >
                        View Sales Dashboard
                      </Link>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div>
                  <h6 className="text-muted fw-medium mb-2">Sales</h6>
                  <h2 className="fw-bold text-dark mb-2">{totalProducts}</h2>
                  <small className="text-primary fw-medium">Total Sales</small>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <div className="glass-card rounded-4 p-4 h-100 position-relative">
                {/* Header */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="icon-container gradient-green rounded-3">
                    <Package size={24} className="text-white" />
                  </div>

                  {/* Dropdown Trigger */}
                  <span
                    className="cursor-pointer"
                    onClick={toggleInventryDropdown}
                    style={{ cursor: "pointer" }}
                  >
                    <ChevronDown size={16} className="text-muted" />
                  </span>

                  {/* Dropdown Menu */}
                  {scrollInventryOpen && (
                    <div
                      className="dropdown-menu show position-absolute p-2"
                      style={{ top: "4rem", right: "1rem", zIndex: 1000 }}
                    >
                      <Link
                        className="dropdown-item"
                        to="/admin/sellerdashboard/inventory"
                      >
                        View Inventory Dashboard
                      </Link>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div>
                  <h6 className="text-muted fw-medium mb-3">
                    Inventory Management
                  </h6>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <small className="text-muted">In Stock</small>
                    <small className="fw-semibold text-success">{totalQuantity}</small>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <small className="text-muted">In Pending</small>
                    <small className="fw-semibold text-primary">{pendingQuantity}</small>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">Approved</small>
                    <small className="fw-semibold text-success">{approvedQuantity}</small>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <div className="glass-card rounded-4 p-4 h-100">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="icon-container gradient-orange rounded-3">
                    <Store size={24} className="text-white" />
                  </div>
                </div>
                <div>
                  <h6 className="text-muted fw-medium mb-2">Stores</h6>
                  <h2 className="fw-bold text-dark mb-2">1</h2>
                  <small className="text-warning fw-medium">Total Store</small>
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="row g-4 mb-4 align-items-stretch">
            <div className="col-12 col-lg-8">
              <div className="glass-card rounded-4 p-4 h-100">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="fw-semibold text-dark mb-0">
                    Products Overview
                  </h5>
                  <button className="btn btn-link btn-sm text-primary fw-medium p-0">
                    View Details
                  </button>
                </div>
                <div
                  className="d-flex align-items-end justify-content-center"
                  style={{ height: "250px" }}
                >
                  <div
                    className="chart-bar d-flex align-items-end justify-content-center pb-3"
                    style={{
                      width: "100%",
                      maxWidth: "300px",
                      height: "120px",
                    }}
                  >
                    <span className="text-white fw-semibold">Products</span>
                  </div>
                </div>
                <p className="text-center text-muted mt-3 mb-0">
                  Total Products
                </p>
              </div>
            </div>

            <div className="col-12 col-lg-4">
              <div className="glass-card rounded-4 p-4 h-100">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="fw-semibold text-dark mb-0">
                    Customer Feedback
                  </h5>
                  <ChevronDown size={16} className="text-muted" />
                </div>
                <div className="text-center py-5">
                  <MessageSquare size={48} className="text-muted mb-3" />
                  <p className="text-muted mb-2">No recent reviews.</p>
                  <small className="text-muted">Past month</small>
                </div>
              </div>
            </div>
          </div>

          {/* Orders & Messages */}
          <div className="row g-4 align-items-stretch">
            <div className="col-12 col-lg-8">
              <div className="glass-card rounded-4 p-4 h-100">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <h5 className="fw-semibold text-dark mb-2">Open Orders</h5>
                    <h2 className="fw-bold text-dark mb-1">0</h2>
                    <small className="text-muted">Total Count</small>
                  </div>
                  <ChevronDown size={16} className="text-muted" />
                </div>
                <div
                  className="d-flex align-items-end gap-1"
                  style={{ height: "160px" }}
                >
                  {orderData.map((item, index) => (
                    <div
                      key={index}
                      className="d-flex flex-column align-items-center flex-fill"
                    >
                      <div
                        className="order-bar w-100"
                        style={{ height: `${(item.orders / 18) * 100}%` }}
                      ></div>
                      <small className="text-muted mt-2">{item.day}</small>
                    </div>
                  ))}
                </div>
                <p className="text-center text-muted mt-3 mb-0">
                  Number of Orders
                </p>
              </div>
            </div>

            <div className="col-12 col-lg-4">
              <div className="glass-card rounded-4 p-4 h-100">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="fw-semibold text-dark mb-0">Buyer Messages</h5>
                </div>
                <div className="text-center py-5">
                  <button
                    className="btn text-white px-4 py-3 rounded-3 fw-medium"
                    style={{ backgroundColor: "#ff5722" }}
                  >
                    Chat System
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
