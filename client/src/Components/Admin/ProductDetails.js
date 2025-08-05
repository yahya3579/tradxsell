import axios from 'axios';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';
import SideNavbar from './SideNavbar';
import { FaArrowLeft } from 'react-icons/fa';

function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState('');
    const { username: sellerusername } = useContext(AuthContext);

    const fetchReviews = useCallback(async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_LOCALHOST_URL}/review/getreviews?productId=${id}`);
            const data = await response.json();
            console.log(data);
            setReviews(data);
        } catch (error) {
            console.log(error);
        }
    }, [id]);

    useEffect(() => {
        fetchReviews();
    }, [fetchReviews]);

    // (May 20)
    useEffect(() => {
    const fetchProductDetails = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_LOCALHOST_URL}/products/product`,
                {
                    params: { id } // query parameter instead of path
                }
            );
            setProduct(response.data);
        } catch (error) {
            console.error('Error fetching product details:', error);
            setError('Failed to fetch product details');
        }
    };

    if (id) {
        fetchProductDetails();
    }
}, [id]);

    const handleBackToDashboard = () => {
        navigate('/admin/manageproducts');
    };

    if (error) {
        return (
            <div style={styles.container}>
                <SideNavbar />
                <main style={{ flex: 1, padding: '20px' }}>
                    <div style={styles.errorMessage}>Error: {error}</div>
                </main>
            </div>
        );
    }

    if (!product) {
        return (
            <div style={styles.container}>
                <SideNavbar />
                <main style={{ flex: 1, padding: '20px' }}>
                    <div style={styles.loadingMessage}>Loading product details...</div>
                </main>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <SideNavbar />
            <main style={{ flex: 1, padding: '20px' }}>
                <header style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px',
                    borderBottom: '1px solid #e0e0e0',
                    paddingBottom: '10px',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <button 
                            onClick={handleBackToDashboard}
                            style={styles.backButton}
                        >
                            <FaArrowLeft style={{ marginRight: '8px' }} />
                            Back to Dashboard
                        </button>
                        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>Product Details</h2>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ marginRight: '10px', color: '#333' }}>{sellerusername}</span>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            backgroundColor: '#EF5B2B',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            color: '#fff',
                        }}>
                            {sellerusername.charAt(0).toUpperCase()}
                        </div>
                    </div>
                </header>

                <div style={styles.content}>
                    <div style={styles.card}>
                        <div style={styles.cardContent}>
                            <div style={styles.imageContainer}>
                                <img src={`${process.env.REACT_APP_LOCALHOST_URL}${product?.imageUrl}`} alt={product.name} style={styles.image} />
                            </div>
                            <div style={styles.details}>
                                <h5 style={styles.productName}>{product.name}</h5>
                                <div style={styles.detailGrid}>
                                    <div style={styles.detailItem}>
                                        <span style={styles.detailLabel}>Price:</span>
                                        <span style={styles.detailValue}>${product.price}</span>
                                    </div>
                                    <div style={styles.detailItem}>
                                        <span style={styles.detailLabel}>Category:</span>
                                        <span style={styles.detailValue}>{product.category}</span>
                                    </div>
                                    <div style={styles.detailItem}>
                                        <span style={styles.detailLabel}>Sizes:</span>
                                        <span style={styles.detailValue}>{Array.isArray(product.sizes) ? product.sizes.join(', ') : product.sizes}</span>
                                    </div>
                                    <div style={styles.detailItem}>
                                        <span style={styles.detailLabel}>Colors:</span>
                                        <span style={styles.detailValue}>{Array.isArray(product.colors) ? product.colors.join(', ') : product.colors}</span>
                                    </div>
                                    <div style={styles.detailItem}>
                                        <span style={styles.detailLabel}>Quantity:</span>
                                        <span style={styles.detailValue}>{product.quantity}</span>
                                    </div>
                                    <div style={styles.detailItem}>
                                        <span style={styles.detailLabel}>Latest:</span>
                                        <span style={styles.detailValue}>{product.latest ? 'Yes' : 'No'}</span>
                                    </div>
                                    <div style={styles.detailItem}>
                                        <span style={styles.detailLabel}>Featured:</span>
                                        <span style={styles.detailValue}>{product.featured ? 'Yes' : 'No'}</span>
                                    </div>
                                </div>
                                <div style={styles.descriptionSection}>
                                    <h6 style={styles.descriptionTitle}>Description:</h6>
                                    <p style={styles.descriptionText}>{product.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div style={styles.reviewsSection}>
                        <h4 style={styles.reviewsTitle}>Reviews</h4>
                        {reviews.length > 0 ? (
                            <ul style={styles.reviewsList}>
                                {reviews.map((review) => (
                                    <li key={review._id} style={styles.reviewItem}>
                                        <p style={styles.reviewUser}><strong>{review.username} ({review.userEmail})</strong></p>
                                        <p style={styles.reviewText}>{review.review}</p>
                                        <p style={styles.reviewDate}><small>{new Date(review.createdAt).toLocaleString()}</small></p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p style={styles.noReviews}>No reviews yet.</p>
                        )}
                    </div>
                    
                    {product.remarks && (
                        <div style={styles.reviewsSection}>
                            <h4 style={styles.reviewsTitle}>Remarks (Not Approved)</h4>
                            <div style={styles.reviewItem}>
                                <p style={styles.text}>{product.remarks}</p>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

const styles = {
    container: {
        minHeight: "100vh",
        display: "flex",
        backgroundColor: "#f8f9fa",
        color: "#333",
    },
    content: {
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
    },
    backButton: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px 15px',
        backgroundColor: '#EF5B2B',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
        transition: 'background-color 0.2s',
        ':hover': {
            backgroundColor: '#d94a1a',
        },
    },
    card: {
        backgroundColor: '#fff',
        border: '1px solid #e0e0e0',
        borderRadius: '10px',
        width: "800px",
        maxWidth: "100%",
        overflow: "hidden",
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    },
    cardContent: {
        display: "flex",
        flexDirection: "row",
        '@media (max-width: 768px)': {
            flexDirection: "column",
        },
    },
    imageContainer: {
        flex: "0 0 40%",
        '@media (max-width: 768px)': {
            flex: "1 0 auto",
        },
    },
    image: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
    details: {
        flex: "1 1 60%",
        padding: "20px",
    },
    productName: {
        fontWeight: "bold",
        color: "#EF5B2B",
        marginBottom: "20px",
        fontSize: "24px",
    },
    detailGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '15px',
        marginBottom: '20px',
    },
    detailItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
        backgroundColor: '#f8f9fa',
        borderRadius: '5px',
    },
    detailLabel: {
        fontWeight: '600',
        color: '#666',
    },
    detailValue: {
        color: '#333',
        fontWeight: '500',
    },
    descriptionSection: {
        marginTop: '20px',
    },
    descriptionTitle: {
        fontWeight: '600',
        color: '#666',
        marginBottom: '10px',
        fontSize: '16px',
    },
    descriptionText: {
        color: '#333',
        lineHeight: '1.6',
        backgroundColor: '#f8f9fa',
        padding: '15px',
        borderRadius: '5px',
    },
    reviewsSection: {
        marginTop: "20px",
        width: "800px",
        maxWidth: "100%",
    },
    reviewsTitle: {
        color: "#EF5B2B",
        marginBottom: "15px",
        fontSize: "20px",
        fontWeight: '600',
    },
    reviewsList: {
        listStyleType: "none",
        padding: 0,
    },
    reviewItem: {
        backgroundColor: "#fff",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        padding: "15px",
        marginBottom: "10px",
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    },
    reviewUser: {
        color: "#EF5B2B",
        marginBottom: "8px",
        fontSize: '14px',
    },
    reviewText: {
        color: "#333",
        marginBottom: "8px",
        lineHeight: '1.5',
    },
    reviewDate: {
        color: "#888",
        fontSize: '12px',
    },
    noReviews: {
        color: "#888",
        fontStyle: "italic",
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        border: '1px solid #e0e0e0',
    },
    errorMessage: {
        color: '#dc3545',
        textAlign: 'center',
        paddingTop: '20px',
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #dc3545',
    },
    loadingMessage: {
        color: '#EF5B2B',
        textAlign: 'center',
        paddingTop: '20px',
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #EF5B2B',
    },
    text: {
        marginBottom: "5px",
        color: "#333",
    },
};

export default ProductDetails;