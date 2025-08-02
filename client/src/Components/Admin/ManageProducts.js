import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthContext.js";
import { toast, Toaster } from "react-hot-toast";
import SideNavbar from "./SideNavbar";
import "./ManageProduct.css";

class ManageProducts extends Component {
  static contextType = AuthContext;

  state = {
    products: [],
    showForm: false,
    id: "",
    name: "",
    price: "",
    imageFile: null,
    latest: false,
    category: "",
    featured: false,
    sizes: "",
    colors: "",
    quantity: "",
    description: "",
    type: "local",
    searchTerm: "",
    sortBy: "name",
  };

  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts = async () => {
    const { email } = this.context;
    console.log("FetchProducts",email)
    const response = await axios.get(`${process.env.REACT_APP_LOCALHOST_URL}/products/seller/${email}`);
    this.setState({ products: response.data });
  };

  handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      this.setState({ imageFile: files[0] });
    } else {
      this.setState({ [name]: type === "checkbox" ? checked : value });
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const {
      id,
      name,
      price,
      imageFile,
      latest,
      category,
      featured,
      sizes,
      colors,
      quantity,
      description,
      type: productType,
    } = this.state;
    const { email } = this.context;

    // Show loading toast
    const loadingToast = toast.loading('Adding product...', {
      position: "top-center",
      style: {
        background: '#2196F3',
        color: '#fff',
        borderRadius: '10px',
        fontSize: '16px',
        fontWeight: '500',
        padding: '16px 20px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      },
    });

    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("image", imageFile);
    formData.append("latest", latest);
    formData.append("category", category);
    formData.append("featured", featured);
    formData.append("sizes", sizes ? sizes : null); // Set to null if empty
    formData.append("colors", colors ? colors : null); // Set to null if empty
    formData.append("quantity", quantity);
    formData.append("description", description);
    formData.append("sellerEmail", email);
    formData.append("type", productType);

    try {
      await axios.post(`${process.env.REACT_APP_LOCALHOST_URL}/products`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Dismiss loading toast
      toast.dismiss(loadingToast);

      // Show success toast
      toast.success("Product added successfully!", {
        duration: 3000,
        position: "top-center",
        style: {
          background: '#4CAF50',
          color: '#fff',
          borderRadius: '10px',
          fontSize: '16px',
          fontWeight: '500',
          padding: '16px 20px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        },
        iconTheme: {
          primary: '#fff',
          secondary: '#4CAF50',
        },
      });

      this.setState({
        id: "",
        name: "",
        price: "",
        imageFile: null,
        latest: false,
        category: "",
        featured: false,
        sizes: "",
        colors: "",
        quantity: "",
        description: "",
        type: "local",
      });
      this.fetchProducts();
    } catch (error) {
      // Dismiss loading toast
      toast.dismiss(loadingToast);
      
      // Show error toast
      toast.error("Failed to add product. Please try again.", {
        duration: 4000,
        position: "top-center",
        style: {
          background: '#f44336',
          color: '#fff',
          borderRadius: '10px',
          fontSize: '16px',
          fontWeight: '500',
          padding: '16px 20px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        },
        iconTheme: {
          primary: '#fff',
          secondary: '#f44336',
        },
      });
    }
  };

  handleDeleteProduct = async (productId, productName) => {
    // Show confirmation dialog
    const confirmed = await new Promise((resolve) => {
      toast((t) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>Are you sure you want to delete "{productName}"?</span>
          <div style={{ display: 'flex', gap: '5px' }}>
            <button
              onClick={() => {
                toast.dismiss(t.id);
                resolve(true);
              }}
              style={{
                background: '#f44336',
                color: 'white',
                border: 'none',
                padding: '5px 10px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              Delete
            </button>
            <button
              onClick={() => {
                toast.dismiss(t.id);
                resolve(false);
              }}
              style={{
                background: '#666',
                color: 'white',
                border: 'none',
                padding: '5px 10px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ), {
        duration: 0,
        position: "top-center",
        style: {
          background: '#fff',
          color: '#333',
          borderRadius: '10px',
          fontSize: '16px',
          fontWeight: '500',
          padding: '16px 20px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          border: '1px solid #ddd',
        },
      });
    });

    if (!confirmed) return;

    // Show loading toast
    const loadingToast = toast.loading('Deleting product...', {
      position: "top-center",
      style: {
        background: '#2196F3',
        color: '#fff',
        borderRadius: '10px',
        fontSize: '16px',
        fontWeight: '500',
        padding: '16px 20px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      },
    });

    try {
      await axios.delete(`${process.env.REACT_APP_LOCALHOST_URL}/products/product/${productId}`);
      
      // Dismiss loading toast
      toast.dismiss(loadingToast);
      
      // Show success toast
      toast.success("Product deleted successfully!", {
        duration: 3000,
        position: "top-center",
        style: {
          background: '#4CAF50',
          color: '#fff',
          borderRadius: '10px',
          fontSize: '16px',
          fontWeight: '500',
          padding: '16px 20px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        },
        iconTheme: {
          primary: '#fff',
          secondary: '#4CAF50',
        },
      });
      
      this.fetchProducts();
    } catch (error) {
      // Dismiss loading toast
      toast.dismiss(loadingToast);
      
      // Show error toast
      toast.error("Failed to delete product. Please try again.", {
        duration: 4000,
        position: "top-center",
        style: {
          background: '#f44336',
          color: '#fff',
          borderRadius: '10px',
          fontSize: '16px',
          fontWeight: '500',
          padding: '16px 20px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        },
        iconTheme: {
          primary: '#fff',
          secondary: '#f44336',
        },
      });
    }
  };

  toggleForm = () => {
    this.setState({ showForm: !this.state.showForm });
  };

  handleSearch = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  handleSort = (e) => {
    this.setState({ sortBy: e.target.value });
  };

  render() {
    const {
      products,
      showForm,
      id,
      name,
      price,
      category,
      sizes,
      colors,
      quantity,
      description,
      latest,
      featured,
      type,
      searchTerm,
      sortBy,
    } = this.state;

    const categories = [
      "Jewelry, Eyewear",
      "Vehicle Parts & Accessories",
      "Industrial Machinery",
      "Luggage, Bags & Cases",
      "Construction & Real Estate",
      "Personal Care & Household",
      "Lights & Lighting",
      "Renewable Energy",
      "Shoes & Accessories",
      "Furniture",
      "Tools & Hardware",
      "Home Appliances",
      "Vehicles & Transportation",
      "Vehicle Accessories",
      "Gifts & Crafts",
      "Health Care",
    ];

    const filteredProducts = products
      .filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (sortBy === "name") return a.name.localeCompare(b.name);
        if (sortBy === "price") return a.price - b.price;
        return 0;
      });

    const { username: sellerusername } = this.context;

    return (
      <div className="ManageProducts">
        {/* Toast Container */}
        <Toaster />
        
        <SideNavbar />
        <main style={{ flex: 1, padding: "20px" }}>
          <header
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
              borderBottom: "1px solid #333",
              paddingBottom: "10px",
            }}
          >
            <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>
              Manage Products
            </h2>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ marginRight: "10px" }}>{sellerusername}</span>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "#EF5B2B",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                }}
              >
                {sellerusername.charAt(0).toUpperCase()}
              </div>
            </div>
          </header>
          <div>
            <div className="ManageProduct-Inputs">
              <input
                type="text"
                placeholder="Search products..."
                className="product-input"
                value={searchTerm}
                onChange={this.handleSearch}
              />
              <select
                className="product-inputSelect"
                value={sortBy}
                onChange={this.handleSort}
              >
                <option value="name">Sort by Name</option>
                <option value="price">Sort by Price</option>
              </select>
              <button style={styles.button} onClick={this.toggleForm}>
                {showForm ? "Close Form" : "Add Product"}
              </button>
            </div>
          </div>

          {showForm && (
            <div style={styles.formContainer}>
              <h2
                style={{
                  color: "#EF5B2B",
                  fontWeight: "bold",
                  marginBottom: "20px",
                }}
              >
                Add New Product
              </h2>
              <button onClick={this.toggleForm} style={styles.closeButton}>
                Close
              </button>
              <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                <input
                  type="text"
                  style={styles.input}
                  name="id"
                  value={id}
                  onChange={this.handleChange}
                  placeholder="Product ID"
                  required
                />
                <input
                  type="text"
                  style={styles.input}
                  name="name"
                  value={name}
                  onChange={this.handleChange}
                  placeholder="Product Name"
                  required
                />
                <input
                  type="number"
                  style={styles.input}
                  name="price"
                  value={price}
                  onChange={this.handleChange}
                  placeholder="Product Price"
                  required
                />
                <input
                  type="file"
                  style={styles.fileInput}
                  name="image"
                  onChange={this.handleChange}
                  required
                />
                <select
                  style={styles.input}
                  name="category"
                  value={category}
                  onChange={this.handleChange}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <select
                  style={styles.input}
                  name="type"
                  value={type}
                  onChange={this.handleChange}
                  required
                >
                  <option value="local">Local</option>
                  <option value="international">International</option>
                </select>
                <input
                  type="text"
                  style={styles.input}
                  name="sizes"
                  value={sizes}
                  onChange={this.handleChange}
                  placeholder="Sizes (comma separated)"
                />
                <input
                  type="text"
                  style={styles.input}
                  name="colors"
                  value={colors}
                  onChange={this.handleChange}
                  placeholder="Colors (comma separated)"
                />
                <input
                  type="number"
                  style={styles.input}
                  name="quantity"
                  value={quantity}
                  onChange={this.handleChange}
                  placeholder="Quantity"
                  required
                />
                <textarea
                  style={styles.input}
                  name="description"
                  value={description}
                  onChange={this.handleChange}
                  placeholder="Description"
                  rows="4"
                  required
                ></textarea>
                <label style={{ marginRight: "10px" }}>
                  <input
                    type="checkbox"
                    name="latest"
                    checked={latest}
                    onChange={this.handleChange}
                  />
                  Latest
                </label>
                <label style={{ marginRight: "10px" }}>
                  <input
                    type="checkbox"
                    name="featured"
                    checked={featured}
                    onChange={this.handleChange}
                  />
                  Featured
                </label>
                <button type="submit" style={styles.button}>
                  Add Product
                </button>
              </form>
            </div>
          )}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            {filteredProducts.map((product) => (
              <div key={product.id} style={styles.card}>
                <img
                  src={`${process.env.REACT_APP_LOCALHOST_URL}${product.imageUrl}`}
                  alt={product.name}
                  style={styles.cardImage}
                />
                <div style={styles.cardBody}>
                  <h5 style={styles.cardID}>{product.id}</h5>
                  <h5 style={styles.cardTitle}>{product.name}</h5>
                  <p style={styles.cardPrice}>${product.price}</p>
                  <p style={styles.cardDescription}>{product.description}</p>
                  <div style={styles.statusContainer}>
                    <span
                      style={{
                        ...styles.statusIndicator,
                        backgroundColor:
                          product.status === "approved"
                            ? "green"
                            : product.status === "not approved"
                            ? "red"
                            : product.status === "pending"
                            ? "yellow"
                            : "transparent",
                      }}
                    ></span>
                    <span style={styles.statusText}>{product.status}</span>
                  </div>
                  <div style={styles.cardActions}>
                    <Link
                      to={`/adminproducts/${product.id}`}
                      style={styles.viewButton}
                    >
                      View Details
                    </Link>
                    <button
                      style={styles.deleteButton}
                      onClick={() => this.handleDeleteProduct(product.id, product.name)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }
}

const styles = {
  input: {
    width: "100%",
    padding: "10px",
    margin: "5px 0",
    borderRadius: "5px",
    border: "1px solid #333",
    backgroundColor: "#1e1e1e",
    color: "#E0E0E0",
  },
  fileInput: {
    margin: "5px 0",
  },
  button: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#EF5B2B",
    color: "#FFF",
    cursor: "pointer",
  },
  card: {
    backgroundColor: "#1e1e1e",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
  },
  cardBody: {
    padding: "15px",
  },
  cardTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#EF5B2B",
  },
  cardID: {
    fontSize: "14px",
    color: "#999",
  },
  cardPrice: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#FFF",
  },
  cardDescription: {
    fontSize: "14px",
    color: "#CCC",
    marginBottom: "10px",
  },
  statusContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },
  statusIndicator: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    marginRight: "10px",
  },
  statusText: {
    fontSize: "14px",
    color: "#FFF",
  },
  cardActions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  viewButton: {
    backgroundColor: "#4CAF50",
    color: "#FFF",
    padding: "5px 10px",
    borderRadius: "5px",
    textDecoration: "none",
  },
  deleteButton: {
    backgroundColor: "#f44336",
    color: "#FFF",
    padding: "5px 10px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  },
  formContainer: {
    backgroundColor: "#1e1e1e",
    borderRadius: "8px",
    padding: "20px",
    marginTop: "20px",
  },
  closeButton: {
    backgroundColor: "#EF5B2B",
    color: "#FFF",
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    marginBottom: "20px",
  },
};

export default ManageProducts;
