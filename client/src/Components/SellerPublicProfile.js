import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MdEmail, MdPhone, MdLocationOn, MdFacebook, MdStore, MdVerified, MdVisibility, MdStar, MdChevronLeft, MdChevronRight, MdMessage } from 'react-icons/md';
import { FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { HiOutlineExternalLink } from 'react-icons/hi';
import { AuthContext } from '../AuthContext';
import './SellerPublicProfile.css';

const SellerPublicProfile = () => {
  const { sellerEmail } = useParams();
  const navigate = useNavigate();
  const { id: currentUserId, loggedIn } = useContext(AuthContext);
  const [seller, setSeller] = useState(null);
  const [sellerData, setSellerData] = useState(null);
  const [sellerProducts, setSellerProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const productsPerPage = 10;

  useEffect(() => {
    const fetchSellerData = async () => {
      try {
        // Fetch seller profile
        const sellerResponse = await axios.get(
          `${process.env.REACT_APP_LOCALHOST_URL}/seller/public-profile?email=${encodeURIComponent(sellerEmail)}`
        );
        setSeller(sellerResponse.data.seller);

        // Fetch user data for the seller (to get _id for chat)
        const userResponse = await axios.get(
          `${process.env.REACT_APP_LOCALHOST_URL}/users/user?email=${encodeURIComponent(sellerEmail)}`
        );
        setSellerData(userResponse.data);

        // Fetch seller's products
        const productsResponse = await axios.get(
          `${process.env.REACT_APP_LOCALHOST_URL}/products/seller?email=${encodeURIComponent(sellerEmail)}`
        );
        const products = productsResponse.data;
        setSellerProducts(products);
        
        // Filter featured products
        const featured = products.filter(product => product.featured === true);
        setFeaturedProducts(featured);
      } catch (err) {
        setError('Failed to load seller information');
        console.error('Error fetching seller data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (sellerEmail) {
      fetchSellerData();
    }
  }, [sellerEmail]);

  // Function to start a new chat with seller
  const startNewChat = async () => {
    if (!loggedIn) {
      navigate('/login');
      return;
    }

    if (!sellerData?._id) {
      alert('Unable to start chat. Seller information not available.');
      return;
    }

    try {
      // Hit the API to start a new chat
      const response = await axios.post(`${process.env.REACT_APP_LOCALHOST_URL}/chat/start`, {
        senderId: currentUserId,
        receiverId: sellerData._id,
      });

      // If the chat is successfully created, navigate to the /chat page
      if (response.data.chat) {
        console.log('Chat started:', response.data.chat);
        navigate(`/chat`); // Navigate to the chat page
      } else {
        console.error('Error creating chat:', response.data.message);
        alert('Failed to start chat. Please try again.');
      }
    } catch (error) {
      console.error('Error starting chat:', error);
      alert('Failed to start chat. Please try again.');
    }
  };

  // Calculate average rating for a product
  const calculateAverageRating = (ratings) => {
    if (!ratings || ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, rating) => acc + rating, 0);
    return (sum / ratings.length).toFixed(1);
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sellerProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(sellerProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top of products section
    document.querySelector('.products-section-card')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="seller-profile-loading">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <div className="loading-text">
            <h3>Loading Seller Profile</h3>
            <p>Please wait while we fetch the seller information...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !seller) {
    return (
      <div className="seller-profile-error">
        <div className="error-container">
          <div className="error-icon">😞</div>
          <h3>Seller Not Found</h3>
          <p>{error || 'The seller profile you are looking for does not exist.'}</p>
          <Link to="/" className="back-home-btn">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="seller-public-profile">
      {/* Enhanced Header Section */}
      <div className="seller-header">
        <div className="header-background">
          <div className="header-pattern"></div>
        </div>
        <div className="seller-header-content">
          <div className="seller-avatar-container">
            <div className="seller-avatar">
              <img
                src={seller.profileImageUrl || seller.profilePicture?.url || '/default-seller-avatar.png'}
                alt={seller.companyName}
                className="seller-profile-image"
                onError={(e) => {
                  e.target.src = '/default-seller-avatar.png';
                }}
              />
              {seller.profileStatus?.isVerified && (
                <div className="verified-badge">
                  <MdVerified />
                </div>
              )}
            </div>
          </div>
          
          <div className="seller-info">
            <div className="seller-name-section">
              <h1 className="seller-company-name">
                {seller.companyName}
                {seller.profileStatus?.isVerified && (
                  <MdVerified className="verified-icon" />
                )}
              </h1>
              <p className="seller-business-type">{seller.businessType}</p>
            </div>
            
            <div className="seller-stats">
              <div className="stat-item">
                <MdVisibility className="stat-icon" />
                <span>{seller.analytics?.profileViews || 0} views</span>
              </div>
              <div className="stat-item">
                <MdStore className="stat-icon" />
                <span>{sellerProducts.length} products</span>
              </div>
            </div>

            {/* Contact Seller Button */}
            <div className="seller-actions">
              <button 
                className="contact-seller-btn"
                onClick={startNewChat}
              >
                <MdMessage className="contact-icon" />
                <span>Contact Seller</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="content-container">
        {/* About Section */}
        <div className="about-section-card">
          <h3>About {seller.companyName}</h3>
          <div className="about-content">
            <p className="description">{seller.description}</p>
            {seller.bio && (
              <div className="bio-section">
                <h4>Our Story</h4>
                <p>{seller.bio}</p>
              </div>
            )}
          </div>

          {/* Enhanced Social Links */}
          {(seller.socialLinks?.facebook || seller.socialLinks?.instagram || seller.socialLinks?.linkedin || seller.socialLinks?.twitter) && (
            <div className="social-links-section">
              <h4>Connect with us</h4>
              <div className="social-icons">
                {seller.socialLinks?.facebook && (
                  <a href={seller.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="social-link facebook">
                    <MdFacebook />
                    <span>Facebook</span>
                    <HiOutlineExternalLink className="external-icon" />
                  </a>
                )}
                {seller.socialLinks?.instagram && (
                  <a href={seller.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="social-link instagram">
                    <FaInstagram />
                    <span>Instagram</span>
                    <HiOutlineExternalLink className="external-icon" />
                  </a>
                )}
                {seller.socialLinks?.linkedin && (
                  <a href={seller.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="social-link linkedin">
                    <FaLinkedin />
                    <span>LinkedIn</span>
                    <HiOutlineExternalLink className="external-icon" />
                  </a>
                )}
                {seller.socialLinks?.twitter && (
                  <a href={seller.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="social-link twitter">
                    <FaTwitter />
                    <span>Twitter</span>
                    <HiOutlineExternalLink className="external-icon" />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Featured Products Section */}
        {featuredProducts.length > 0 && (
          <div className="featured-products-section">
            <div className="section-header">
              <h3>Featured Products</h3>
              <div className="featured-badge-header">⭐ Featured</div>
            </div>
            
            <div className="featured-products-grid">
              {featuredProducts.slice(0, 6).map((product) => {
                const avgRating = calculateAverageRating(product.ratings);
                return (
                  <div key={product.id} className="product-card featured">
                    <div className="product-image-wrapper">
                      <img
                        src={`${process.env.REACT_APP_LOCALHOST_URL}${product.imageUrl}`}
                        alt={product.name}
                        className="product-image"
                        onError={(e) => {
                          e.target.src = '/default-product-image.png';
                        }}
                      />
                      <div className="featured-badge">Featured</div>
                      <div className="product-overlay">
                        <Link
                          to={`/productoverview/${product.id}`}
                          className="quick-view-btn"
                        >
                          Quick View
                        </Link>
                      </div>
                    </div>
                    <div className="product-info">
                      <h4 className="product-name">{product.name}</h4>
                      <div className="product-details">
                        <p className="product-price">${product.price}</p>
                        {product.ratings && product.ratings.length > 0 && (
                          <div className="product-rating">
                            <div className="stars">
                              {[...Array(5)].map((_, i) => (
                                <MdStar key={i} className={i < Math.floor(avgRating) ? 'star filled' : 'star'} />
                              ))}
                            </div>
                            <span className="rating-text">{avgRating} ({product.ratings.length})</span>
                          </div>
                        )}
                      </div>
                      <Link
                        to={`/productoverview/${product.id}`}
                        className="view-product-btn"
                      >
                        View Details
                        <HiOutlineExternalLink className="btn-icon" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* All Products Section with Pagination */}
        <div className="products-section-card">
          <div className="products-header">
            <h3>All Products by {seller.companyName}</h3>
            <div className="products-count">
              Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, sellerProducts.length)} of {sellerProducts.length} products
            </div>
          </div>
          
          {currentProducts.length > 0 ? (
            <>
              <div className="products-grid">
                {currentProducts.map((product) => {
                  const avgRating = calculateAverageRating(product.ratings);
                  return (
                    <div key={product.id} className="product-card">
                      <div className="product-image-wrapper">
                        <img
                          src={`${process.env.REACT_APP_LOCALHOST_URL}${product.imageUrl}`}
                          alt={product.name}
                          className="product-image"
                          onError={(e) => {
                            e.target.src = '/default-product-image.png';
                          }}
                        />
                        {product.latest && (
                          <div className="latest-badge">New</div>
                        )}
                        <div className="product-overlay">
                          <Link
                            to={`/productoverview/${product.id}`}
                            className="quick-view-btn"
                          >
                            Quick View
                          </Link>
                        </div>
                      </div>
                      <div className="product-info">
                        <h4 className="product-name">{product.name}</h4>
                        <div className="product-details">
                          <p className="product-price">${product.price}</p>
                          {product.ratings && product.ratings.length > 0 ? (
                            <div className="product-rating">
                              <div className="stars">
                                {[...Array(5)].map((_, i) => (
                                  <MdStar key={i} className={i < Math.floor(avgRating) ? 'star filled' : 'star'} />
                                ))}
                              </div>
                              <span className="rating-text">{avgRating} ({product.ratings.length})</span>
                            </div>
                          ) : (
                            <div className="product-rating">
                              <span className="no-rating">No ratings yet</span>
                            </div>
                          )}
                        </div>
                        <Link
                          to={`/productoverview/${product.id}`}
                          className="view-product-btn"
                        >
                          View Details
                          <HiOutlineExternalLink className="btn-icon" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    className="pagination-btn"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <MdChevronLeft />
                    Previous
                  </button>
                  
                  <div className="pagination-numbers">
                    {[...Array(totalPages)].map((_, index) => {
                      const pageNumber = index + 1;
                      return (
                        <button
                          key={pageNumber}
                          className={`pagination-number ${currentPage === pageNumber ? 'active' : ''}`}
                          onClick={() => handlePageChange(pageNumber)}
                        >
                          {pageNumber}
                        </button>
                      );
                    })}
                  </div>
                  
                  <button
                    className="pagination-btn"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <MdChevronRight />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="no-products">
              <div className="no-products-icon">📦</div>
              <h4>No products available</h4>
              <p>This seller hasn't listed any products yet. Check back later!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerPublicProfile;