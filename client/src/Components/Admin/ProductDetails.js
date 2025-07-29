import axios from 'axios';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';
import SideNavbar from './SideNavbar';

function ProductDetails() {
    const { id } = useParams();
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

    // (Before May 20)
    // useEffect(() => {
    //     const fetchProductDetails = async () => {
    //         try {
    //             const response = await axios.get(`${process.env.REACT_APP_LOCALHOST_URL}/products/product/${id}`);
    //             setProduct(response.data);
    //         } catch (error) {
    //             console.error('Error fetching product details:', error);
    //             setError('Failed to fetch product details');
    //         }
    //     };

    //     fetchProductDetails();
    // }, [id]);


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


    if (error) {
        return <div style={styles.errorMessage}>Error: {error}</div>;
    }

    if (!product) {
        return <div style={styles.loadingMessage}>Loading product details...</div>;
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
                    borderBottom: '1px solid #333',
                    paddingBottom: '10px',
                }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Product Details</h2>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ marginRight: '10px' }}>{sellerusername}</span>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            backgroundColor: '#EF5B2B',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
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
                            <p style={styles.text}>Price: ${product.price}</p>
                            <p style={styles.text}>Category: {product.category}</p>
                            <p style={styles.text}>Sizes: {product.sizes.join(', ')}</p>
                            <p style={styles.text}>Colors: {product.colors.join(', ')}</p>
                            <p style={styles.text}>Quantity: {product.quantity}</p>
                            <p style={styles.text}>Latest: {product.latest ? 'Yes' : 'No'}</p>
                            <p style={styles.text}>Featured: {product.featured ? 'Yes' : 'No'}</p>
                            <p style={styles.text}>Description: {product.description}</p>
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
                <div style={styles.reviewsSection}>
                    {product.remarks && (
                        <>
                            <h4 style={styles.reviewsTitle}>Remarks (Not Approved)</h4>
                            <div style={styles.reviewItem}>
                                <p style={styles.text}>{product.remarks}</p>
                            </div>
                        </>
                    )}
                </div>
            </div>
            </main>
        </div>
       
    );
}
const styles = {
    container: {
        minHeight: "100vh",
        display: "flex",
        backgroundColor: "#121212",
        color: "#E0E0E0",
    },
    content: {
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
    },
    pageTitle: {
        fontWeight: "bold",
        marginBottom: "20px",
        color: "#EF5B2B",
        fontSize: "24px",
    },
    card: {
        backgroundColor: '#1E1E1E',
        border: '1px solid #333',
        borderRadius: '10px',
        width: "800px",
        maxWidth: "100%",
        overflow: "hidden",
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
        marginBottom: "10px",
        fontSize: "20px",
    },
    text: {
        marginBottom: "5px",
        color: "#E0E0E0",
    },
    reviewsSection: {
        marginTop: "20px",
        width: "800px",
        maxWidth: "100%",
    },
    reviewsTitle: {
        color: "#EF5B2B",
        marginBottom: "10px",
        fontSize: "20px",
    },
    reviewsList: {
        listStyleType: "none",
        padding: 0,
    },
    reviewItem: {
        backgroundColor: "#1E1E1E",
        border: "1px solid #333",
        borderRadius: "5px",
        padding: "10px",
        marginBottom: "10px",
    },
    reviewUser: {
        color: "#EF5B2B",
        marginBottom: "5px",
    },
    reviewText: {
        color: "#E0E0E0",
        marginBottom: "5px",
    },
    reviewDate: {
        color: "#888",
    },
    noReviews: {
        color: "#888",
        fontStyle: "italic",
    },
    errorMessage: {
        color: '#ff6b6b',
        textAlign: 'center',
        paddingTop: '20px',
    },
    loadingMessage: {
        color: '#EF5B2B',
        textAlign: 'center',
        paddingTop: '20px',
    },
};

export default ProductDetails;