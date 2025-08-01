import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import styles from "./Feedback.module.css";
import { AuthContext } from "../../AuthContext.js";
import { Link } from "react-router-dom";

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [combinedData, setCombinedData] = useState([]);
  const { email: sellerEmail } = useContext(AuthContext);

  const [products, setProducts] = useState([]);
  const [recentReviews, setRecentReviews] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productRequests = recentReviews.map((review) =>
          axios.get(`${process.env.REACT_APP_LOCALHOST_URL}/products?id=${review.productId}`)
        );

        const productResponses = await Promise.all(productRequests);

        // Always extract the product object, even if response is an array
        const productData = productResponses.map((response) => {
          if (Array.isArray(response.data)) {
            return response.data[0] || null;
          }
          return response.data;
        });
        console.log("Fetched productData:", productData);
        setProducts(productData);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (recentReviews.length > 0) {
      fetchProducts();
    }
  }, [recentReviews]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const recentReviewsResponse = await fetch(
        //   `${process.env.REACT_APP_LOCALHOST_URL}/seller/recent-reviews/${sellerEmail}`
        // );

        const recentReviewsResponse = await fetch(
  `${process.env.REACT_APP_LOCALHOST_URL}/seller/recent-reviews?email=${sellerEmail}`
);

        const recentReviewsData = await recentReviewsResponse.json();
        console.log("DEBUG Frontend: recentReviewsData received:", recentReviewsData);
        setRecentReviews(
          Array.isArray(recentReviewsData) ? recentReviewsData : []
        );
      } catch (error) {
        console.error("Error fetching seller data:", error);
      }
    };

    if (sellerEmail) {
      fetchData();
    }
  }, [sellerEmail]);

  useEffect(() => {
    if (recentReviews.length > 0) {
      // If products are loaded, try to match, else fallback to review only
      const combined = recentReviews.map((review) => {
        const matchingProduct = products.find(
          (product) =>
            product &&
            (product.id?.toString() === review.productId?.toString() ||
             product._id?.toString() === review.productId?.toString())
        );
        if (!matchingProduct) {
          console.log("No match for review", review, "in products", products);
        }
        return {
          ...review,
          product: matchingProduct || null,
        };
      });
      setCombinedData(combined);
    } else {
      setCombinedData([]);
    }
  }, [recentReviews, products]);

  console.log("combine data", combinedData)
  return (
    <div className={styles.feedbackContainer}>
      <h2 className={styles.heading}>Customer Feedbacks</h2>
      <div className={styles.feedbackList}>
        {combinedData.length > 0 ? (
          combinedData.map((review) => (
            <div key={review._id} className={styles.feedbackCard}>
              <div className={styles.feedbackHeader}>
                <img
                  src={
                    review.product && review.product.imageUrl
                      ? `${process.env.REACT_APP_LOCALHOST_URL}${review.product.imageUrl}`
                      : '/default-product-image.png'
                  }
                  alt={review.product?.name || 'Unknown Product'}
                  className={styles.productImage}
                />
                <div className={styles.ProductUsername}>
                  <Link to={`/adminproducts/${review.productId}`}>
                    <p className={styles.productName}>
                      {review.product?.name || 'Unknown Product'}
                    </p>
                  </Link>
                  <p className={styles.username}>{review.username}</p>
                </div>
              </div>
              <div className={styles.feedbackBody}>
                <p className={styles.reviewText}>
                  "{review.review}"
                </p>
                <p className={styles.userEmail}>{review.userEmail}</p>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noFeedback}>No feedbacks available.</p>
        )}
      </div>
    </div>
  );
};

export default Feedback;
