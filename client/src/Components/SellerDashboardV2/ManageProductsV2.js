
import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthContext.js";
import { FaPlus, FaEllipsisV, FaSearch, FaTimes } from "react-icons/fa";
import "./ManageProduct.css";

class ManageProducts extends Component {
  static contextType = AuthContext;

  state = {
    products: [],
    showForm: false,
    // id: "",
    name: "",
    price: "",
    imageFile: null,
    latest: false,
    category: "",
    subCategory: "",
    featured: false,
    terms: false,
    sizes: "",
    colors: "",
    quantity: "",
    description: "",
    type: "local",
    searchTerm: "",
    sortBy: "name",
    isLoading: true,
    error: null,
    isMobile: window.innerWidth < 576,
    dropdownOpenId: null,
    currentPage: 1,
    itemsPerPage: 10,
  };

  componentDidMount() {
    // Handle window resize
    window.addEventListener("resize", this.handleResize);

    // Check if context is ready before fetching products
    if (this.context && this.context.email) {
      this.fetchProducts();
    } else {
      this.contextCheckTimer = setTimeout(() => {
        if (this.context && this.context.email) {
          this.fetchProducts();
        } else {
          this.setState({
            isLoading: false,
            error: "Authentication context not available. Please login again.",
          });
        }
      }, 1000);
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
    if (this.contextCheckTimer) {
      clearTimeout(this.contextCheckTimer);
    }
  }

  handleResize = () => {
    this.setState({ isMobile: window.innerWidth < 576 });
  };

  toggleDropdown = (id) => {
    this.setState((prevState) => ({
      dropdownOpenId: prevState.dropdownOpenId === id ? null : id,
    }));
  };

  fetchProducts = async () => {
    const { email } = this.context;

    if (!email) {
      this.setState({
        isLoading: false,
        error: "Email not available. Please login again.",
      });
      return;
    }

    const encodedEmail = encodeURIComponent(email);

    try {
      this.setState({ isLoading: true });
      const response = await axios.get(
        `${process.env.REACT_APP_LOCALHOST_URL}/products/seller?email=${encodedEmail}`
      );
      this.setState({
        products: response.data,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      this.setState({
        isLoading: false,
        error: "Failed to load products. Please try again later.",
      });
    }
  };

  handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      this.setState({ imageFile: files[0] });
    } else if (name === "category") {
      this.setState({ category: value, subCategory: "" }); // Reset subCategory when category changes
    } else {
      this.setState({ [name]: type === "checkbox" ? checked : value });
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const {
      // id,
      name,
      price,
      imageFile,
      latest,
      category,
      subCategory,
      featured,
      terms,
      sizes,
      colors,
      quantity,
      description,
      type: productType,
    } = this.state;

    const { email } = this.context;
    if (!email) {
      alert("Authentication error. Please login again.");
      return;
    }

    const formData = new FormData();
    // formData.append("id", id);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("image", imageFile);
    formData.append("latest", latest);
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    formData.append("featured", featured);
    formData.append("terms", terms);
    formData.append("sizes", sizes ? sizes : null);
    formData.append("colors", colors ? colors : null);
    formData.append("quantity", quantity);
    formData.append("description", description);
    formData.append("sellerEmail", email);
    formData.append("type", productType);

    try {
      await axios.post(
        `${process.env.REACT_APP_LOCALHOST_URL}/products`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Product added successfully");
      this.setState({
        // id: "",
        name: "",
        price: "",
        imageFile: null,
        latest: false,
        category: "",
        subCategory: "",
        featured: false,
        terms: false,
        sizes: "",
        colors: "",
        quantity: "",
        description: "",
        type: "local",
        showForm: false,
      });
      this.fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    }
  };

  handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(
          `${process.env.REACT_APP_LOCALHOST_URL}/products?id=${productId}`
        );
        console.log("Product Id", productId);
        this.fetchProducts();
        this.setState({ dropdownOpenId: null });
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product. Please try again.");
      }
    }
  };

  toggleForm = () => {
    this.setState((prevState) => ({
      showForm: !prevState.showForm,
      dropdownOpenId: null,
    }));
  };

  handleSearch = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  handleSort = (e) => {
    this.setState({ sortBy: e.target.value });
  };

  handleDropdownAction = (action, product) => {
    this.setState({ dropdownOpenId: null });

    switch (action) {
      case "View Details":
        window.open(`/adminproducts/${product.id}`, "_blank");
        break;
      case "Edit":
        // You can implement edit functionality here
        alert(`Edit functionality for ${product.name} - Coming soon!`);
        break;
      case "Delete":
        this.handleDeleteProduct(product.id);
        break;
      default:
        break;
    }
  };

  // Handle items per page change
handleItemsPerPageChange = (e) => {
  this.setState({ 
    itemsPerPage: parseInt(e.target.value),
    currentPage: 1 // Reset to first page when changing items per page
  });
};

// Handle page change
handlePageChange = (pageNumber) => {
  this.setState({ currentPage: pageNumber });
};

// Get current page data
getCurrentPageData = () => {
  const { currentPage, itemsPerPage } = this.state;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  
  const filteredProducts = this.state.products
    ?.filter((product) =>
      product.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (this.state.sortBy === "name") return a.name.localeCompare(b.name);
      if (this.state.sortBy === "price") return a.price - b.price;
      return 0;
    });
  
  return {
    currentPageData: filteredProducts?.slice(startIndex, endIndex) || [],
    totalItems: filteredProducts?.length || 0,
    totalPages: Math.ceil((filteredProducts?.length || 0) / itemsPerPage)
  };
};

// Get responsive column class based on items per page
getColumnClass = () => {
  const { itemsPerPage } = this.state;
  
  if (itemsPerPage <= 5) {
    return "col-12 col-sm-6 col-md-4 col-lg-3"; // 5 columns on xl screens
  } else if (itemsPerPage <= 10) {
    return "col-12 col-sm-6 col-md-4 col-lg-3"; // 4 columns on lg screens
  } else if (itemsPerPage <= 20) {
    return "col-12 col-sm-6 col-md-4 col-lg-3"; // 4 columns on lg screens
  } else {
    return "col-12 col-sm-6 col-md-4 col-lg-3"; // More columns for 50 items
  }
};


  render() {
    const {
      products,
      showForm,
      // id,
      name,
      price,
      category,
      sizes,
      colors,
      quantity,
      description,
      latest,
      featured,
      terms,
      type,
      searchTerm,
      sortBy,
      isLoading,
      error,
      isMobile,
      dropdownOpenId,
      currentPage,
    itemsPerPage,
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
      "Electronics",
      "Clothing",
      "Toys",
      "Optical",
      "Tools & Equipment",
      "Beauty & Personal Care",
      "Household & Gardens",
      "Accessories",
      "Agricultural Products",
      "Tractors & Accessories",
    ];

    const filteredProducts = products
      ?.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (sortBy === "name") return a.name.localeCompare(b.name);
        if (sortBy === "price") return a.price - b.price;
        return 0;
      });

    const { username: sellerusername } = this.context || { username: "" };

    // Get pagination data
  const { currentPageData, totalItems, totalPages } = this.getCurrentPageData();
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);
  const columnClass = this.getColumnClass();

    const styles = {
      wrapper: {
        backgroundColor: "#fff",
        padding: "30px",
        borderRadius: "15px",
        boxShadow: "0 0 15px rgba(0,0,0,0.05)",
        marginTop: isMobile ? "15px" : "26px",
        marginBottom: isMobile ? "15px" : "26px",
        minHeight: "100vh",
      },
      header: {
        display: "flex",
        justifyContent: isMobile ? "center" : "space-between",
        alignItems: isMobile ? "stretch" : "center",
        marginBottom: "30px",
        flexWrap: "wrap",
        flexDirection: isMobile ? "column" : "row",
        gap: isMobile ? "12px" : "0",
      },
      heading: {
        fontSize: "2rem",
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: "20px",
        color: "#333",
      },
      card: {
        backgroundColor: "#fff",
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        position: "relative",
        transition: "transform 0.2s ease-in-out",
        cursor: "pointer",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      },
      cardImageContainer: {
        backgroundColor: "#fddedc",
        position: "relative",
        height: "180px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        flexShrink: 0,
      },
      cardBody: {
        padding: "8px 20px 20px",
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        justifyContent: "space-between",
      },
      productContent: {
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      },
      productName: {
        fontWeight: "bold",
        fontSize: "1rem",
        textAlign: "center",
        color: "#fb5420",
        marginBottom: "8px",
        minHeight: "2.5em",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        lineHeight: "1.2",
      },
      bottomContent: {
        marginTop: "auto",
      },
      productImage: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
      },
      productInfo: {
        color: "#888",
        fontSize: "0.9rem",
      },
      ellipsis: {
        position: "absolute",
        top: "10px",
        right: "10px",
        cursor: "pointer",
        color: "#fff",
        backgroundColor: "#fb5420",
        borderRadius: "50%",
        width: "32px",
        height: "32px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2,
      },
      dropdownMenu: {
        position: "absolute",
        top: "50px",
        right: "10px",
        backgroundColor: "#fff",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        zIndex: 10,
        width: "130px",
        fontSize: "0.9rem",
        padding: "6px 0",
      },
      dropdownItem: {
        padding: "8px 12px",
        cursor: "pointer",
        color: "#333",
        transition: "background 0.2s, color 0.2s",
        borderRadius: "4px",
      },
      searchSortAdd: {
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        gap: "12px",
        alignItems: isMobile ? "stretch" : "center",
        width: isMobile ? "100%" : "auto",
        flexGrow: 1,
      },
      searchContainer: {
        position: "relative",
        width: isMobile ? "100%" : "200px",
      },
      searchIcon: {
        position: "absolute",
        top: "50%",
        left: "10px",
        transform: "translateY(-50%)",
        color: "#aaa",
        fontSize: "14px",
      },
      searchInput: {
        width: "100%",
        padding: "8px 12px 8px 32px",
        backgroundColor: "#F9FBFF",
        border: "1px solid #ccc",
        borderRadius: "5px",
        fontSize: "14px",
      },
      selectSort: {
        backgroundColor: "#F9FBFF",
        border: "1px solid #ccc",
        borderRadius: "5px",
        padding: "8px 12px",
        width: isMobile ? "100%" : "200px",
        fontSize: "14px",
      },
      addBtn: {
        backgroundColor: "#ff5722",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        padding: "10px 15px",
        fontSize: "14px",
        width: isMobile ? "100%" : "auto",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "8px",
      },
      productInfoRow: {
        display: "flex",
        justifyContent: "space-between",
        fontSize: "0.9rem",
        color: "#888",
      },
      statusContainer: {
        display: "flex",
        alignItems: "center",
        marginTop: "10px",
      },
      statusIndicator: {
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        marginRight: "10px",
      },
      statusText: {
        fontSize: "14px",
        color: "rgb(97, 105, 124)",
      },
      // Form styles
      formOverlay: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "20px",
      },
      formContainer: {
        backgroundColor: "#fff",
        borderRadius: "15px",
        padding: "30px",
        maxWidth: "600px",
        width: "100%",
        maxHeight: "90vh",
        overflowY: "auto",
        position: "relative",
      },
      formHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
      },
      formTitle: {
        fontSize: "1.5rem",
        fontWeight: "bold",
        color: "#fb5420",
        margin: 0,
      },
      closeButton: {
        background: "none",
        border: "none",
        fontSize: "24px",
        cursor: "pointer",
        color: "#999",
        padding: "0",
        width: "30px",
        height: "30px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      input: {
        width: "100%",
        padding: "10px",
        margin: "8px 0",
        borderRadius: "5px",
        border: "1px solid #ddd",
        backgroundColor: "#F9FBFF",
        fontSize: "14px",
        boxSizing: "border-box",
      },
      textarea: {
        width: "100%",
        padding: "10px",
        margin: "8px 0",
        borderRadius: "5px",
        border: "1px solid #ddd",
        backgroundColor: "#F9FBFF",
        fontSize: "14px",
        boxSizing: "border-box",
        minHeight: "80px",
        resize: "vertical",
      },
      checkboxContainer: {
        display: "flex",
        alignItems: "center",
        margin: "10px 0",
      },
      checkbox: {
        marginRight: "8px",
      },
      checkboxLabel: {
        fontSize: "14px",
        color: "#333",
        cursor: "pointer",
      },
      submitBtn: {
        backgroundColor: "#fb5420",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        padding: "12px 30px",
        fontSize: "16px",
        cursor: "pointer",
        width: "100%",
        marginTop: "20px",
      },
      messageBox: {
        padding: "40px 20px",
        textAlign: "center",
        backgroundColor: "#f8f9fa",
        borderRadius: "10px",
        margin: "20px 0",
      },
      errorBox: {
        padding: "20px",
        textAlign: "center",
        backgroundColor: "#ffebee",
        borderRadius: "8px",
        margin: "20px 0",
        color: "#d32f2f",
      },
      retryButton: {
        backgroundColor: "#fb5420",
        color: "#fff",
        padding: "8px 20px",
        borderRadius: "5px",
        border: "none",
        cursor: "pointer",
        marginTop: "10px",
        fontSize: "14px",
      },
      paginationContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "30px",
    flexWrap: "wrap",
    gap: "15px",
  },
  paginationInfo: {
    fontSize: "14px",
    color: "#666",
    order: isMobile ? 2 : 1,
  },
  paginationControls: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    order: isMobile ? 1 : 2,
  },
  itemsPerPageSelect: {
    backgroundColor: "#F9FBFF",
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "6px 10px",
    fontSize: "14px",
    marginRight: "15px",
  },
  paginationButtonsContainer: {
    display: "flex",
    gap: "5px",
    alignItems: "center",
  },
  paginationButton: {
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "5px",
    padding: "8px 12px",
    fontSize: "14px",
    cursor: "pointer",
    minWidth: "35px",
    height: "35px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s",
  },
  activePaginationButton: {
    backgroundColor: "#fb5420",
    color: "#fff",
    border: "1px solid #fb5420",
  },
  disabledPaginationButton: {
    backgroundColor: "#f8f9fa",
    color: "#6c757d",
    cursor: "not-allowed",
    border: "1px solid #dee2e6",
  },
  gridSizeContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    color: "#666",
  },
    };

    const categoryOptions = {
      "Jewelry, Eyewear": ["Rings", "Necklaces", "Bracelets", "Earrings", "Sunglasses", "Watches"],
      "Vehicle Parts & Accessories": ["Engine Parts", "Tires", "Batteries", "Car Electronics", "Lighting"],
      "Industrial Machinery": ["CNC Machines", "Packaging Machines", "Textile Machinery", "Pumps", "Compressors"],
      "Luggage, Bags & Cases": ["Suitcases", "Backpacks", "Handbags", "Laptop Bags", "Travel Accessories"],
      "Construction & Real Estate": ["Building Materials", "Doors & Windows", "Flooring", "Paints", "Plumbing"],
      "Personal Care & Household": ["Personal Care Appliances", "Cleaning Supplies", "Laundry", "Bathroom Accessories"],
      "Lights & Lighting": ["LED Bulbs", "Ceiling Lights", "Outdoor Lighting", "Smart Lighting"],
      "Renewable Energy": ["Solar Panels", "Wind Turbines", "Inverters", "Batteries"],
      "Shoes & Accessories": ["Men's Shoes", "Women's Shoes", "Kids' Shoes", "Shoe Accessories"],
      "Furniture": ["Sofas", "Beds", "Tables", "Chairs", "Cabinets"],
      "Tools & Hardware": ["Hand Tools", "Power Tools", "Fasteners", "Measuring Tools"],
      "Home Appliances": ["Refrigerators", "Washing Machines", "Microwaves", "Vacuum Cleaners"],
      "Vehicles & Transportation": ["Cars", "Motorcycles", "Bicycles", "Trucks", "Public Transport"],
      "Vehicle Accessories": ["Seat Covers", "Car Mats", "Phone Holders", "Car Chargers"],
      "Gifts & Crafts": ["Gift Boxes", "Handmade Crafts", "Greeting Cards", "Party Supplies"],
      "Health Care": ["Medical Devices", "Supplements", "Personal Protective Equipment"],
      "Electronics": ["Mobile Phones", "Laptops", "Cameras", "Audio Devices"],
      "Clothing": ["Men's Clothing", "Women's Clothing", "Kids' Clothing", "Sportswear"],
      "Toys": ["Educational Toys", "Action Figures", "Dolls", "Outdoor Toys"],
      "Optical": ["Eyeglasses", "Contact Lenses", "Sunglasses", "Optical Instruments"],
      "Tools & Equipment": ["Workshop Tools", "Measuring Equipment", "Safety Equipment"],
      "Beauty & Personal Care": ["Skincare", "Haircare", "Makeup", "Fragrances"],
      "Household & Gardens": ["Garden Tools", "Outdoor Furniture", "Planters", "BBQ Equipment"],
      "Accessories": ["Belts", "Hats", "Scarves", "Wallets"],
      "Agricultural Products": ["Seeds", "Fertilizers", "Pesticides", "Farm Tools"],
      "Tractors & Accessories": ["Tractors", "Tractor Parts", "Implements"],
    };


    // Pagination buttons render function
  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;
    
    // Previous button
    buttons.push(
      <button
        key="prev"
        style={{
          ...styles.paginationButton,
          ...(currentPage === 1 ? styles.disabledPaginationButton : {})
        }}
        onClick={() => this.handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ‹
      </button>
    );
    
    // Page numbers
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          style={{
            ...styles.paginationButton,
            ...(i === currentPage ? styles.activePaginationButton : {})
          }}
          onClick={() => this.handlePageChange(i)}
        >
          {i}
        </button>
      );
    }
    
    // Next button
    buttons.push(
      <button
        key="next"
        style={{
          ...styles.paginationButton,
          ...(currentPage === totalPages ? styles.disabledPaginationButton : {})
        }}
        onClick={() => this.handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        ›
      </button>
    );
    
    return buttons;
  };

    return (
      <div className="container-fluid">
        <div style={styles.wrapper}>
          {/* Header with Search, Sort, and Add Button */}
          <div style={styles.header}>
            <div style={styles.searchSortAdd}>
              <div style={styles.searchContainer}>
                <FaSearch style={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search products..."
                  style={styles.searchInput}
                  value={searchTerm}
                  onChange={this.handleSearch}
                />
              </div>
              <select
                style={styles.selectSort}
                value={sortBy}
                onChange={this.handleSort}
              >
                <option value="name">Sort by: Name</option>
                <option value="price">Sort by: Price</option>
              </select>
              <div style={styles.gridSizeContainer}>
    <span>Show:</span>
    <select
      style={styles.itemsPerPageSelect}
      value={this.state.itemsPerPage}
      onChange={this.handleItemsPerPageChange}
    >
      <option value={5}>5 per page</option>
      <option value={10}>10 per page</option>
      <option value={20}>20 per page</option>
      <option value={50}>50 per page</option>
    </select>
  </div>
            </div>
            <button style={styles.addBtn} onClick={this.toggleForm}>
              <FaPlus /> Add New Product
            </button>
          </div>

          <h2 style={styles.heading}>All Products</h2>

          {/* Loading and error states */}
          {isLoading && (
            <div style={styles.messageBox}>
              <p>Loading products...</p>
            </div>
          )}

          {!isLoading && error && (
            <div style={styles.errorBox}>
              <p>{error}</p>
              <button
                style={styles.retryButton}
                onClick={() => {
                  if (this.context && this.context.email) {
                    this.fetchProducts();
                  } else {
                    alert("Please login again to continue");
                  }
                }}
              >
                Retry
              </button>
            </div>
          )}

          {/* {!isLoading && !error && filteredProducts?.length === 0 && (
            <div style={styles.messageBox}>
              <p>No products found. Add your first product!</p>
            </div>
          )} */}

          {!isLoading && !error && totalItems === 0 && (
          <div style={styles.messageBox}>
            <p>
              {searchTerm 
                ? `No products found matching "${searchTerm}"`
                : "No products found. Add your first product!"
              }
            </p>
          </div>
        )}

          {/* Products Grid */}
          {/* <div className="row">
            {!isLoading &&
              !error &&
              filteredProducts?.map((product) => (
                <div
                  className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                  key={product.id}
                >
                  <div
                    style={styles.card}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-5px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <div style={styles.cardImageContainer}>
                      <div
                        style={styles.ellipsis}
                        onClick={() => this.toggleDropdown(product.id)}
                      >
                        <FaEllipsisV />
                      </div>

                      {dropdownOpenId === product.id && (
                        <div style={styles.dropdownMenu}>
                          {["View Details", "Edit", "Delete"].map((item) => (
                            <div
                              key={item}
                              style={styles.dropdownItem}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor =
                                  "#fb5420";
                                e.currentTarget.style.color = "#fff";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor =
                                  "transparent";
                                e.currentTarget.style.color = "#333";
                              }}
                              onClick={() =>
                                this.handleDropdownAction(item, product)
                              }
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      )}

                      <img
                        src={`${process.env.REACT_APP_LOCALHOST_URL}${product.imageUrl}`}
                        alt={product.name}
                        style={styles.productImage}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 150 150'%3E%3Crect width='150' height='150' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='0.35em' fill='%23999' font-family='Arial, sans-serif' font-size='14'%3ENo Image%3C/text%3E%3C/svg%3E";
                        }}
                      />
                    </div>

                    <div style={styles.cardBody}>
                      <div style={styles.productContent}>
                        <div style={styles.productName}>{product.name}</div>

                        <div style={styles.bottomContent}>
                          <div style={styles.productInfoRow}>
                            <span>USD {product.price}</span>
                            <span>ID: {product.id}</span>
                          </div>
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
                                    ? "orange"
                                    : "gray",
                              }}
                            ></span>
                            <span style={styles.statusText}>
                              {product.status
                                ? product.status.charAt(0).toUpperCase() +
                                  product.status.slice(1)
                                : "Unknown"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div> */}

          {/* Products Grid */}
        <div className="row">
          {!isLoading &&
            !error &&
            currentPageData.map((product) => (
              <div
                className={columnClass}
                key={product.id}
                style={{ marginBottom: "20px" }}
              >
                <div
                  style={styles.card}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div style={styles.cardImageContainer}>
                    <div
                      style={styles.ellipsis}
                      onClick={() => this.toggleDropdown(product.id)}
                    >
                      <FaEllipsisV />
                    </div>

                    {dropdownOpenId === product.id && (
                      <div style={styles.dropdownMenu}>
                        {["View Details", "Edit", "Delete"].map((item) => (
                          <div
                            key={item}
                            style={styles.dropdownItem}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = "#fb5420";
                              e.currentTarget.style.color = "#fff";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = "transparent";
                              e.currentTarget.style.color = "#333";
                            }}
                            onClick={() => this.handleDropdownAction(item, product)}
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    )}

                    <img
                      src={`${process.env.REACT_APP_LOCALHOST_URL}${product.imageUrl}`}
                      alt={product.name}
                      style={styles.productImage}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 150 150'%3E%3Crect width='150' height='150' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='0.35em' fill='%23999' font-family='Arial, sans-serif' font-size='14'%3ENo Image%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  </div>

                  <div style={styles.cardBody}>
                    <div style={styles.productContent}>
                      <div style={styles.productName}>{product.name}</div>

                      <div style={styles.bottomContent}>
                        <div style={styles.productInfoRow}>
                          <span>USD {product.price}</span>
                          <span>ID: {product.id}</span>
                        </div>
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
                                  ? "orange"
                                  : "gray",
                            }}
                          ></span>
                          <span style={styles.statusText}>
                            {product.status
                              ? product.status.charAt(0).toUpperCase() +
                                product.status.slice(1)
                              : "Unknown"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={styles.paginationContainer}>
            <div style={styles.paginationInfo}>
              Showing {startItem}-{endItem} of {totalItems} products
            </div>
            <div style={styles.paginationControls}>
              <div style={styles.paginationButtonsContainer}>
                {renderPaginationButtons()}
              </div>
            </div>
          </div>
        )}
        </div>

        

        {/* Add Product Form Modal */}
        {showForm && (
          <div
            style={styles.formOverlay}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                this.toggleForm();
              }
            }}
          >
            <div style={styles.formContainer}>
              <div style={styles.formHeader}>
                <h3 style={styles.formTitle}>Add New Product</h3>
                <button style={styles.closeButton} onClick={this.toggleForm}>
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                {/* <input
                  type="text"
                  style={styles.input}
                  name="id"
                  value={id}
                  onChange={this.handleChange}
                  placeholder="Product ID"
                  required
                /> */}
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
                  placeholder="Product price in USD"
                  required
                />
                <input
                  type="file"
                  style={styles.input}
                  name="image"
                  onChange={this.handleChange}
                  accept="image/*"
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
                {category && (
                  <select
                    style={styles.input}
                    name="subCategory"
                    value={this.state.subCategory}
                    onChange={this.handleChange}
                    required
                  >
                    <option value="">Select Sub-Category</option>
                    {categoryOptions[category]?.map((sub, idx) => (
                      <option key={idx} value={sub}>{sub}</option>
                    ))}
                  </select>
                )}
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
                  style={styles.textarea}
                  name="description"
                  value={description}
                  onChange={this.handleChange}
                  placeholder="Description"
                  required
                />

                <div style={styles.checkboxContainer}>
                  <input
                    type="checkbox"
                    style={styles.checkbox}
                    name="latest"
                    checked={latest}
                    onChange={this.handleChange}
                  />
                  <label style={styles.checkboxLabel}>Latest Product</label>
                </div>

                <div style={styles.checkboxContainer}>
                  <input
                    type="checkbox"
                    style={styles.checkbox}
                    name="featured"
                    checked={featured}
                    onChange={this.handleChange}
                  />
                  <label style={styles.checkboxLabel}>Featured Product</label>
                </div>

                <div style={styles.checkboxContainer}>
                  <input
                    type="checkbox"
                    style={styles.checkbox}
                    name="terms"
                    checked={terms}
                    onChange={this.handleChange}
                    required
                  />
                  <label style={styles.checkboxLabel}>
                    I accept the{" "}
                    <Link to="/admin/sellerdashboard/addproduct/sellerterms">
                      terms and conditions
                    </Link>
                  </label>
                </div>

                <button type="submit" style={styles.submitBtn}>
                  Add Product
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ManageProducts;
