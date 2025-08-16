
import { React, useState, useContext, useEffect } from "react";
import FullNavbar from "./FullNavbar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
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
import { Badge } from "react-bootstrap";
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
  const navigate = useNavigate();
  // States
  const [totalProducts, setTotalProducts] = useState(0);
  const { id: userId, email: sellerEmail, username: sellerusername } =
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
  const [tags, setTags] = useState([]);
  const [isVerified, setIsVerified] = useState(false);
  const [verificationError, setVerificationError] = useState(null);

  // New states for order data
  const [orders, setOrders] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [averageOrderValue, setAverageOrderValue] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [approvedOrders, setApprovedOrders] = useState(0);
  const [monthlySales, setMonthlySales] = useState(new Array(12).fill(0));
  const [orderStatusData, setOrderStatusData] = useState({});

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

  // Monthly sales chart data
  const monthlySalesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: "Monthly Sales ($)",
        data: monthlySales,
        backgroundColor: "rgba(239, 91, 43, 0.8)",
        borderColor: "#EF5B2B",
        borderWidth: 2,
        borderRadius: 5,
      },
    ],
  };

  // Order status chart data
  const orderStatusChartData = {
    labels: Object.keys(orderStatusData),
    datasets: [
      {
        label: "Orders by Status",
        data: Object.values(orderStatusData),
        backgroundColor: [
          "rgba(239, 91, 43, 0.8)",
          "rgba(76, 175, 80, 0.8)",
          "rgba(255, 193, 7, 0.8)",
          "rgba(33, 150, 243, 0.8)",
        ],
        borderColor: [
          "#EF5B2B",
          "#4CAF50",
          "#FFC107",
          "#2196F3",
        ],
        borderWidth: 2,
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

  // Function to fetch and process orders data
  const fetchOrdersData = async () => {
    if (!sellerEmail) return;
    
    try {
      // Fetch all orders
      const response = await axios.get(`${process.env.REACT_APP_LOCALHOST_URL}/orders`);
      const allOrders = response.data;
      
      // Filter orders for this seller
      const sellerOrders = allOrders.filter(order => 
        order.items.some(item => item.sellerEmail === sellerEmail)
      );
      
      setOrders(sellerOrders);
      
      // Calculate total sales
      const sales = sellerOrders.reduce((total, order) => {
        const orderTotal = order.items
          .filter(item => item.sellerEmail === sellerEmail)
          .reduce((sum, item) => sum + (item.price * item.quantity), 0);
        return total + orderTotal;
      }, 0);
      setTotalSales(sales);
      
      // Calculate average order value
      const avgValue = sellerOrders.length > 0 ? sales / sellerOrders.length : 0;
      setAverageOrderValue(avgValue);
      
      // Count orders by status
      let pendingCount = 0;
      let approvedCount = 0;
      
      sellerOrders.forEach(order => {
        order.items.forEach(item => {
          if (item.sellerEmail === sellerEmail) {
            if (item.status === 'Pending') pendingCount++;
            if (item.status === 'Approved') approvedCount++;
          }
        });
      });
      
      setPendingOrders(pendingCount);
      setApprovedOrders(approvedCount);
      
      // Calculate monthly sales for the current year
      const currentYear = new Date().getFullYear();
      const monthlyData = new Array(12).fill(0);
      
      sellerOrders.forEach(order => {
        const orderDate = new Date(order.orderDate || order.createdAt);
        if (orderDate.getFullYear() === currentYear) {
          const month = orderDate.getMonth();
          const orderTotal = order.items
            .filter(item => item.sellerEmail === sellerEmail)
            .reduce((sum, item) => sum + (item.price * item.quantity), 0);
          monthlyData[month] += orderTotal;
        }
      });
      
      setMonthlySales(monthlyData);
      
      // Prepare order status data for charts
      const statusCounts = {};
      sellerOrders.forEach(order => {
        order.items.forEach(item => {
          if (item.sellerEmail === sellerEmail) {
            const status = item.status || 'Pending';
            statusCounts[status] = (statusCounts[status] || 0) + 1;
          }
        });
      });
      setOrderStatusData(statusCounts);
      
    } catch (error) {
      console.error('Error fetching orders data:', error);
      setError('Failed to fetch orders data');
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
    
    // Also fetch orders data
    fetchOrdersData();
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

  useEffect(() => {
    if (!userId) return;
    fetch(`${process.env.REACT_APP_LOCALHOST_URL}/seller/profile?userId=${userId}`)
      .then(res => res.json())
      .then(data => {
        if (data.seller) {
          setTags(data.seller.tags || []);
          
          // Check if seller has required verification tags
          const sellerTags = data.seller.tags || [];
          const hasRequiredTags = sellerTags.some(tag => 
            tag === 'registered' || tag === 'verified' || tag === 'gold'
          );
          
          setIsVerified(hasRequiredTags);
          setVerificationError(hasRequiredTags ? null : 'Your account needs verification to access full features');
        } else {
          setIsVerified(false);
          setVerificationError('Seller profile not found. Please contact support.');
        }
      })
      .catch(error => {
        console.error('Error fetching seller profile:', error);
        setIsVerified(false);
        setVerificationError('Unable to verify seller status. Please try again.');
      });
  }, [userId]);

  const handleNavigateToAccountSettings = () => {
    navigate('/admin/sellerdashboard/accountsettings');
  };
  
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
      {/* Welcome Section with Real Tag Badge */}
      <div className="container mt-4 mb-3">
        <div className="d-flex align-items-center" style={{ gap: 12 }}>
          <h1 style={{ margin: 0, fontWeight: 700 }}>
            Welcome back, <span style={{ color: '#EF5B2B' }}>{sellerusername || 'Seller'}</span>!
          </h1>
          {tags.length > 0 && (
            <span style={{ display: "inline-flex", gap: 6 }}>
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  bg={
                    tag === "registered" ? "secondary" :
                    tag === "verified" ? "info" :
                    tag === "gold" ? "warning" : "dark"
                  }
                  style={{
                    fontSize: "1rem",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    padding: "0.35em 0.8em"
                  }}
                >
                  {tag === "verified" ? (
                    <>
                      <span style={{ marginRight: 4, fontWeight: 700 }}>✔</span>
                      Verified
                    </>
                  ) : (
                    tag.charAt(0).toUpperCase() + tag.slice(1)
                  )}
                </Badge>
              ))}
            </span>
          )}
        </div>
        <div style={{ color: '#888', fontSize: '1.1rem', marginTop: 4 }}>
          Here's Your Current Sales Overview
        </div>
      </div>

      {/* Verification Status Banner */}
      {!isVerified && verificationError && (
        <div className="container mt-3 mb-3">
          <div className="alert alert-warning" role="alert" style={{
            backgroundColor: '#fff3cd',
            border: '1px solid #ffeaa7',
            borderRadius: '8px',
            padding: '15px',
            color: '#856404'
          }}>
            <div className="d-flex align-items-center justify-content-between flex-wrap" style={{ gap: '10px' }}>
              <div>
                <strong>⚠️ Account Verification Required</strong>
                <p style={{ margin: '5px 0 0 0', fontSize: '14px' }}>
                  {verificationError}
                </p>
                <p style={{ margin: '5px 0 0 0', fontSize: '14px' }}>
                  Please submit your business documents and wait for admin verification to access full dashboard features.
                </p>
              </div>
              <button 
                className="btn btn-warning"
                style={{
                  backgroundColor: '#ff5722',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  padding: '8px 16px',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
                onClick={handleNavigateToAccountSettings}
              >
                Submit Documents
              </button>
            </div>
          </div>
        </div>
      )}
      
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
                    <p className="card-text card-text-custom">Total Orders</p>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="badge bg-warning text-dark">Pending: {pendingOrders}</span>
                      <span className="badge bg-success">Approved: {approvedOrders}</span>
                    </div>
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
                          ${totalSales.toFixed(2)}
                        </p>
                        <p className="card-text card-text-custom">
                          Total Sales
                        </p>
                        <p className="card-text card-text-value" style={{ fontSize: '0.9rem', color: '#666' }}>
                          ${averageOrderValue.toFixed(2)}
                        </p>
                        <p className="card-text card-text-custom" style={{ fontSize: '0.8rem' }}>
                          Avg Order Value
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

      {/* Additional Charts Section */}
      <section className="container mt-4">
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="card card-custom h-100">
              <div className="card-body card-body-custom">
                <h5 className="card-title card-title-custom">Monthly Sales Trend</h5>
                <div className="chart-wrapper" style={{ height: '300px' }}>
                  <Bar data={monthlySalesData} options={{
                    ...options,
                    plugins: {
                      tooltip: {
                        callbacks: {
                          label: (context) => `Sales: $${context.raw.toFixed(2)}`,
                        },
                      },
                    },
                  }} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card card-custom h-100">
              <div className="card-body card-body-custom">
                <h5 className="card-title card-title-custom">Orders by Status</h5>
                <div className="chart-wrapper" style={{ height: '300px' }}>
                  <Bar data={orderStatusChartData} options={{
                    ...options,
                    plugins: {
                      tooltip: {
                        callbacks: {
                          label: (context) => `Orders: ${context.raw}`,
                        },
                      },
                    },
                  }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}