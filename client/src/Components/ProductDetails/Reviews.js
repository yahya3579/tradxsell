import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Reviews.css";
const Reviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch existing reviews when the component mounts
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_LOCALHOST_URL}/review/getreviews`,
          {
            params: { productId },
          }
        );
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [productId]);


  // (Before May 20)
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError(""); // Reset error message

  //   try {
  //     const newReview = {
  //       username,
  //       userEmail,
  //       review: reviewText,
  //       rating,
  //     };

  //     const response = await axios.post(
  //       `${process.env.REACT_APP_LOCALHOST_URL}/review/addnew/${productId}`,
  //       newReview
  //     );
  //     if (response.data.success) {
  //       // Add the new review to the list of reviews
  //       setReviews((prevReviews) => [...prevReviews, response.data.review]);
  //       // Reset form fields
  //       setUsername("");
  //       setUserEmail("");
  //       setReviewText("");
  //       setRating(0);
  //     }
  //     alert("Your review has been successfully submitted");
  //   } catch (err) {
  //     console.error("Error adding review:", err);
  //     setError(err.response?.data.message || "Error adding review");
  //   }
  // };


  // (May 20)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    try {
      const newReview = {
        username,
        userEmail,
        review: reviewText,
        rating,
      };

      const encodedProductId = encodeURIComponent(productId);
      const response = await axios.post(
        `${process.env.REACT_APP_LOCALHOST_URL}/review/addnew?id=${encodedProductId}`,
        newReview
      );
      if (response.data.success) {
        // Add the new review to the list of reviews
        setReviews((prevReviews) => [...prevReviews, response.data.review]);
        // Reset form fields
        setUsername("");
        setUserEmail("");
        setReviewText("");
        setRating(0);
      }
      alert("Your review has been successfully submitted");
    } catch (err) {
      console.error("Error adding review:", err);
      setError(err.response?.data.message || "Error adding review");
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Existing Reviews</h3>
      {reviews.length > 0 ? (
        <div className="list-group">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="list-group-item d-flex justify-content-between align-items-start border rounded mb-3 shadow-sm"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">{review.username}</div>
                <p className="mb-1"><span className="fw-bold">Product Review: </span>{review.review}</p>
                <small className="text-muted">Rating: {review.rating}</small>
              </div>
              <div className="badge bg-primary rounded-pill">
                {review.userEmail}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted">No reviews yet.</p>
      )}

      <h2 className="mb-4 mt-4">Reviews</h2>

      <form
        onSubmit={handleSubmit}
        className="mb-4 p-3 border rounded form-div"
      >
        <div className="mb-3">
          <input
            type="text"
            placeholder="Your Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            placeholder="Your Email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <textarea
            placeholder="Write your review..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            required
            className="form-control"
            rows="4"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Rating:</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            required
            className="form-select select-custom"
          >
            <option value="">Select Rating</option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-warning px-4 fw-bold ">
          Submit Review
        </button>
      </form>

      {error && <p className="text-danger">{error}</p>}
    </div>
  );
};

export default Reviews;
