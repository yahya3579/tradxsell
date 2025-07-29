import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import React, { useContext, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { AuthContext } from '../../AuthContext.js';
import SideNavbar from './SideNavbar.js';
import './SellerDashboard.css';
import axios from 'axios';
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, LineController, Title, Tooltip, Legend);

const SellerDashboard = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const { email: sellerEmail, username: sellerusername } = useContext(AuthContext);
  const [recentReviews, setRecentReviews] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [dailyOrders, setDailyOrders] = useState(new Array(31).fill(0));
  const [products, setProducts] = useState([]);
  const [combinedData, setCombinedData] = useState([]);

  // (Before May 20)
  // useEffect(() => {
  //   // Fetch product details for each productId in recentReviews
  //   const fetchProducts = async () => {
  //     try {
  //       const productRequests = recentReviews.map((review) =>
  //         axios.get(`${process.env.REACT_APP_LOCALHOST_URL}/products/product/${review.productId}`)
  //       );

  //       const productResponses = await Promise.all(productRequests);
        
  //       // Extract product data from responses
  //       const productData = productResponses.map(response => response.data);

  //       setProducts(productData);
  //     } catch (error) {
  //       console.error('Error fetching product details:', error);
  //     }
  //   };

  //   fetchProducts();
  // }, [recentReviews]);


  // (May 20)
  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const productRequests = recentReviews.map((review) =>
        axios.get(`${process.env.REACT_APP_LOCALHOST_URL}/products/product`, {
          params: { id: review.productId }
        })
      );

      const productResponses = await Promise.all(productRequests);
      const productData = productResponses.map(response => response.data);

      setProducts(productData);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  if (recentReviews.length > 0) {
    fetchProducts();
  }
}, [recentReviews]);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await fetch(`${process.env.REACT_APP_LOCALHOST_URL}/seller/total-products/${sellerEmail}`);
        const orderResponse = await fetch(`${process.env.REACT_APP_LOCALHOST_URL}/seller/total-orders/${sellerEmail}`);
        const reviewResponse = await fetch(`${process.env.REACT_APP_LOCALHOST_URL}/seller/total-reviews/${sellerEmail}`);
        const recentReviewsResponse = await fetch(`${process.env.REACT_APP_LOCALHOST_URL}/seller/recent-reviews/${sellerEmail}`);
        const dailyOrdersResponse = await fetch(`${process.env.REACT_APP_LOCALHOST_URL}/seller/daily-orders/${sellerEmail}`);
        
        const productData = await productResponse.json();
        const orderData = await orderResponse.json();
        const reviewData = await reviewResponse.json();
        const dailyOrdersData = await dailyOrdersResponse.json();
        const recentReviewsData = await recentReviewsResponse.json();

        setTotalProducts(productData.totalProducts);
        setTotalOrders(orderData.totalOrders);
        setTotalReviews(reviewData.totalReviews);
        setRecentReviews(Array.isArray(recentReviewsData) ? recentReviewsData : []);
        setDailyOrders(dailyOrdersData);
      } catch (error) {
        console.error('Error fetching seller data:', error);
      }
    };

    fetchData();
  }, [sellerEmail, sellerusername]);

  useEffect(() => {
    if (recentReviews.length > 0 && products.length > 0) {
      const combined = recentReviews.map((review) => {
        const matchingProduct = products.find(
          (product) => product.id.toString() === review.productId.toString()
        );
        if (matchingProduct) {
          return {
            ...review,
            product: matchingProduct,
          };
        }
        return null;
      }).filter(item => item !== null);
  
      setCombinedData(combined);
    }
  }, [recentReviews, products]);


  const lineData = {
    labels: Array.from({ length: 31 }, (_, i) => i + 1),
    datasets: [
      {
        label: 'Number of Orders',
        data: dailyOrders,
        fill: false,
        borderColor: '#EF5B2B',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        tension: 0.1,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#E0E0E0',
        },
      },
      title: {
        display: true,
        text: 'Number of Orders vs. Day of the Month',
        color: '#E0E0E0',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: Math.max(...dailyOrders) + 1,
        ticks: {
          color: '#E0E0E0',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Days of the Month',
          color: '#E0E0E0',
        },
        ticks: {
          color: '#E0E0E0',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
  };


  return (
    <div className="seller-dashboard">
  <SideNavbar />
  <main className="flex-grow-1 p-4">
    <header className="dashboard-header">
      <h1>Seller Dashboard</h1>
      <div className="user-icon">
        <span className="me-2">{sellerusername}</span>
        <div className="user-avatar">{sellerusername.charAt(0).toUpperCase()}</div>
      </div>
    </header>
    <section className="row g-3 mb-4">
      {[
        { title: 'Total Products', value: totalProducts },
        { title: 'Total Orders', value: totalOrders },
        { title: 'Total Reviews', value: totalReviews },
      ].map((item, index) => (
        <div className="col-md-4" key={index}>
          <div className="stats-card">
            <h3 className="stats-title">{item.title}</h3>
            <p className="stats-value">{item.value}</p>
          </div>
        </div>
      ))}
    </section>
    <section className="row g-3">
      <div className="col-lg-8">
        <div className="chart-container">
          <h3 className="chart-title">Daily Orders</h3>
          <div className="chart-wrapper">
            <Line data={lineData} options={lineOptions} />
          </div>
        </div>
      </div>
      <div className="col-lg-4">
        <div className="reviews-container">
          <h3 className="chart-title">Recent Reviews</h3>
          {combinedData.length === 0 ? (
            <p>No recent reviews.</p>
          ) : (
            combinedData.map((review) => (
              <div key={review._id} className="review-item">
                 <div className='d-flex align-items-center'>
                <img src={`${process.env.REACT_APP_LOCALHOST_URL}${review?.product?.imageUrl}`} className='img-fluid' style={{width : "30px", height: "30px", objectFit: "cover"}} />
                <p className="fw-bold ms-2">{review?.product?.name}</p>
                </div>
                <strong className="review-username">{review.username}</strong>: {review.review}
               
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  </main>
</div>

  );
};

export default SellerDashboard;
