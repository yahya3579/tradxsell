// import axios from "axios";
// import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import { AuthContext } from "../../AuthContext.js";
// // import SideNavbar from "./SideNavbar";
// import "./ManageProduct.css";

// class ManageProducts extends Component {
//   static contextType = AuthContext;

//   state = {
//     products: [],
//     showForm: false,
//     id: "",
//     name: "",
//     price: "",
//     imageFile: null,
//     latest: false,
//     category: "",
//     featured: false,
//     terms: false,
//     sizes: "",
//     colors: "",
//     quantity: "",
//     description: "",
//     type: "local",
//     searchTerm: "",
//     sortBy: "name",
//   };

//   componentDidMount() {
//     this.fetchProducts();
//   }

//   // fetchProducts = async () => {
//   //   const { email } = this.context;
//   //   console.log("FetchProducts",email)
//   //   const response = await axios.get(`${process.env.REACT_APP_LOCALHOST_URL}/products/seller/${email}`);
//   //   this.setState({ products: response.data });
//   // };


//   fetchProducts = async () => {
//     const { email } = this.context;
//     const encodedEmail = encodeURIComponent(email);
//     try {
//     const response = await axios.get(`${process.env.REACT_APP_LOCALHOST_URL}/products/seller/${encodedEmail}`);
//     this.setState({ products: response.data });
//   } catch (error) {
//     console.error("Error fetching products:", error);
//   }
//   };
  
//   handleChange = (e) => {
//     const { name, value, type, checked, files } = e.target;
//     if (type === "file") {
//       this.setState({ imageFile: files[0] });
//     } else {
//       this.setState({ [name]: type === "checkbox" ? checked : value });
//     }
//   };

//   handleSubmit = async (e) => {
//     e.preventDefault();
//     const {
//       id,
//       name,
//       price,
//       imageFile,
//       latest,
//       category,
//       featured,
//       terms,
//       sizes,
//       colors,
//       quantity,
//       description,
//       type: productType,
//     } = this.state;
//     const { email } = this.context;

//     const formData = new FormData();
//     formData.append("id", id);
//     formData.append("name", name);
//     formData.append("price", price);
//     formData.append("image", imageFile);
//     formData.append("latest", latest);
//     formData.append("category", category);
//     formData.append("featured", featured);
//     formData.append("terms", terms);
//     formData.append("sizes", sizes ? sizes : null); // Set to null if empty
//     formData.append("colors", colors ? colors : null); // Set to null if empty
//     formData.append("quantity", quantity);
//     formData.append("description", description);
//     formData.append("sellerEmail", email);
//     formData.append("type", productType);

     
//     await axios.post(`${process.env.REACT_APP_LOCALHOST_URL}/products`, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });

//     alert("Product added successfully");
//     this.setState({
//       id: "",
//       name: "",
//       price: "",
//       imageFile: null,
//       latest: false,
//       category: "",
//       featured: false,
//       terms: false,
//       sizes: "",
//       colors: "",
//       quantity: "",
//       description: "",
//       type: "local",
//     });
//     this.fetchProducts();
//   };

//   handleDeleteProduct = async (productId) => {
//     await axios.delete(`${process.env.REACT_APP_LOCALHOST_URL}/products/${productId}`);
//     this.fetchProducts();
//   };

//   toggleForm = () => {
//     this.setState({ showForm: !this.state.showForm });
//   };

//   handleSearch = (e) => {
//     this.setState({ searchTerm: e.target.value });
//   };

//   handleSort = (e) => {
//     this.setState({ sortBy: e.target.value });
//   };

//   render() {
//     const {
//       products,
//       showForm,
//       id,
//       name,
//       price,
//       category,
//       sizes,
//       colors,
//       quantity,
//       description,
//       latest,
//       featured,
//       terms,
//       type,
//       searchTerm,
//       sortBy,
//     } = this.state;

//     const categories = [
//       "Jewelry, Eyewear",
//       "Vehicle Parts & Accessories",
//       "Industrial Machinery",
//       "Luggage, Bags & Cases",
//       "Construction & Real Estate",
//       "Personal Care & Household",
//       "Lights & Lighting",
//       "Renewable Energy",
//       "Shoes & Accessories",
//       "Furniture",
//       "Tools & Hardware",
//       "Home Appliances",
//       "Vehicles & Transportation",
//       "Vehicle Accessories",
//       "Gifts & Crafts",
//       "Health Care",
//       "Electronics",
//        "Clothing",
//        "Toys",
//        "Optical",
//        "Tools & Equipment",
//        "Beauty & Personal Care",
//        "Household & Gardens",
//        "Accessories",
//        "Agricultural Products",
//        "Tractors & Accessories"
//     ];

//     const filteredProducts = products?.filter((product) =>
//         product.name.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//       .sort((a, b) => {
//         if (sortBy === "name") return a.name.localeCompare(b.name);
//         if (sortBy === "price") return a.price - b.price;
//         return 0;
//       });

//     const { username: sellerusername } = this.context;

//     return (
//       <div className=" container ManageProducts">
//         {/* <SideNavbar /> */}
//         <main style={{ flex: 1, padding: "20px" }}>
//           <header
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               marginBottom: "20px",
//               borderBottom: "1px solid gray",
//               paddingBottom: "10px",
//             }}
//           >
//             <h2 style={{ fontSize: "16px", color: "black" }}>
//               Manage Products
//             </h2>
//             <div style={{ display: "flex", alignItems: "center" }}>
//               <span style={{ marginRight: "10px", color: "black" }}>{sellerusername}</span>
//               <div
//                 style={{
//                   width: "40px",
//                   height: "40px",
//                   borderRadius: "50%",
//                   backgroundColor: "#EF5B2B",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   fontWeight: "bold",
//                 }}
//               >
//                 {sellerusername.charAt(0).toUpperCase()}
//               </div>
//             </div>
//           </header>
//           <div >
//             <div className="ManageProduct-Inputs">
//               <input
//                 type="text"
//                 placeholder="Search products..."
//                 className="product-input"
//                 value={searchTerm}
//                 onChange={this.handleSearch}
//               />
//               <select
//                 className="product-inputSelect"
//                 value={sortBy}
//                 onChange={this.handleSort}
//               >
//                 <option value="name">Sort by Name</option>
//                 <option value="price">Sort by Price</option>
//               </select>
//               <button style={styles.button} onClick={this.toggleForm}>
//                 {showForm ? "Close Form" : "Add Product"}
//               </button>
//             </div>
//           </div>

//           {showForm && (
//             <div style={styles.formContainer}>
//               <h6
//                 style={{
//                   color: "#EF5B2B",
//                   // fontWeight: "bold",
//                   marginBottom: "20px",
//                 }}
//               >
//                 Add New Product
//               </h6>
//               <button onClick={this.toggleForm} style={styles.closeButton}>
//                 Close
//               </button>
//               <form onSubmit={this.handleSubmit} encType="multipart/form-data">
//                 <input
//                   type="text"
//                   style={styles.input}
//                   name="id"
//                   value={id}
//                   onChange={this.handleChange}
//                   placeholder="Product ID"
//                   required
//                 />
//                 <input
//                   type="text"
//                   style={styles.input}
//                   name="name"
//                   value={name}
//                   onChange={this.handleChange}
//                   placeholder="Product Name"
//                   required
//                 />
//                 <input
//                   type="number"
//                   style={styles.input}
//                   name="price"
//                   value={price}
//                   onChange={this.handleChange}
//                   placeholder="Product price in USD"
//                   required
//                 />
//                 <input
//                   type="file"
//                   style={styles.fileInput}
//                   name="image"
//                   onChange={this.handleChange}
//                   required
//                 />
//                 <select
//                   style={styles.input}
//                   name="category"
//                   value={category}
//                   onChange={this.handleChange}
//                   required
//                 >
//                   <option value="">Select Category</option>
//                   {categories.map((category, index) => (
//                     <option key={index} value={category}>
//                       {category}
//                     </option>
//                   ))}
//                 </select>
//                 <select
//                   style={styles.input}
//                   name="type"
//                   value={type}
//                   onChange={this.handleChange}
//                   required
//                 >
//                   <option value="local">Local</option>
//                   <option value="international">International</option>
//                 </select>
//                 <input
//                   type="text"
//                   style={styles.input}
//                   name="sizes"
//                   value={sizes}
//                   onChange={this.handleChange}
//                   placeholder="Sizes (comma separated)"
//                 />
//                 <input
//                   type="text"
//                   style={styles.input}
//                   name="colors"
//                   value={colors}
//                   onChange={this.handleChange}
//                   placeholder="Colors (comma separated)"
//                 />
//                 <input
//                   type="number"
//                   style={styles.input}
//                   name="quantity"
//                   value={quantity}
//                   onChange={this.handleChange}
//                   placeholder="Quantity"
//                   required
//                 />
//                 <textarea
//                   style={styles.input}
//                   name="description"
//                   value={description}
//                   onChange={this.handleChange}
//                   placeholder="Description"
//                   rows="4"
//                   required
//                 ></textarea>
//                 <label style={{ marginRight: "10px", color: "black", cursor: "pointer" }}>
//                   <input
//                     type="checkbox"
//                     name="latest"
//                     checked={latest}
//                     onChange={this.handleChange}
//                   />
//                   Latest
//                 </label>
//                 <label style={{ marginRight: "10px" , color: "black", cursor: "pointer" }}>
//                   <input
//                     type="checkbox"
//                     name="featured"
//                     checked={featured}
//                     onChange={this.handleChange}
//                   />
//                   Featured
//                 </label>
//                 <label style={{ marginRight: "10px" , color: "black", cursor: "pointer" }}>
//                   <input
//                     type="checkbox"
//                     name="terms"
//                     checked={terms}
//                     onChange={this.handleChange}
//                   />
//                   I accept the <span ><Link to="/admin/sellerdashboard/addproduct/sellerterms">terms and conditions</Link></span>
//                 </label>
//                 <button type="submit" style={styles.button}>
//                   Add Product
//                 </button>
//               </form>
//             </div>
//           )}

//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
//               gap: "20px",
//               marginTop: "20px",
//             }}
//           >
//             {filteredProducts?.map((product) => (
//               <div key={product.id} style={styles.card}>
//                 <img
//                   src={`${process.env.REACT_APP_LOCALHOST_URL}${product.imageUrl}`}
//                   alt={product.name}
//                   style={styles.cardImage}
//                 />
//                 <div style={styles.cardBody}>
//                   <h5 style={styles.cardID}>{product.id}</h5>
//                   <h5 style={styles.cardTitle}>{product.name}</h5>
//                   <p style={styles.cardPrice}>${product.price}</p>
//                   <p style={styles.cardDescription}>{product.description}</p>
//                   <div style={styles.statusContainer}>
//                     <span
//                       style={{
//                         ...styles.statusIndicator,
//                         backgroundColor:
//                           product.status === "approved"
//                             ? "green"
//                             : product.status === "not approved"
//                             ? "red"
//                             : product.status === "pending"
//                             ? "yellow"
//                             : "transparent",
//                       }}
//                     ></span>
//                     <span style={styles.statusText}>{product.status}</span>
//                   </div>
//                   <div style={styles.cardActions}>
//                     <Link
//                       to={`/adminproducts/${product.id}`}
//                       style={styles.viewButton}
//                     >
//                       View Details
//                     </Link>
//                     <button
//                       style={styles.deleteButton}
//                       onClick={() => this.handleDeleteProduct(product.id)}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </main>
//       </div>
//     );
//   }
// }

// const styles = {
//   input: {
//     width: "100%",
//     padding: "5px",
//     margin: "3px 0",
//     borderRadius: "5px",
//     border: "1px solid #333",
//     backgroundColor: "rgb(237 237 237)",
//     color: "#1f2121",
//     fontsize: "5px"
//   },
//   fileInput: {
//     margin: "5px 0",
//   },
//   button: {
//     padding: "3px 15px",
//     border: "none",
//     borderRadius: "5px",
//     backgroundColor: "#EF5B2B",
//     color: "#FFF",
//     cursor: "pointer",
//     fontSize:"10px"
//   },
//   card: {
//     backgroundColor: "rgb(174 183 203 / 34%)",
//     borderRadius: "8px",
//     // boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
//     border: "1px solid gray",
//     overflow: "hidden",
//   },
//   cardImage: {
//     width: "100%",
//     height: "150px",
//     objectFit: "cover",
//   },
//   cardBody: {
//     padding: "15px",
//   },
//   cardTitle: {
//     fontSize: "18px",
//     fontWeight: "bold",
//     color: "#EF5B2B",
//   },
//   cardID: {
//     fontSize: "14px",
//     color: "#999",
//   },
//   cardPrice: {
//     fontSize: "16px",
//     fontWeight: "bold",
//     color: "rgb(97, 105, 124)",
//   },
//   cardDescription: {
//     fontSize: "14px",
//     color: "#737373",
//     marginBottom: "10px",
//     height: '100px', 
//     overflow: 'hidden', 
//     textOverflow: 'ellipsis',  
//     display: '-webkit-box',
//     WebkitLineClamp: 3, 
//     WebkitBoxOrient: 'vertical',
//   },
//   statusContainer: {
//     display: "flex",
//     alignItems: "center",
//     marginBottom: "10px",
//   },
//   statusIndicator: {
//     width: "10px",
//     height: "10px",
//     borderRadius: "50%",
//     marginRight: "10px",
//   },
//   statusText: {
//     fontSize: "14px",
//     color: "rgb(97, 105, 124)",
//   },
//   cardActions: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   viewButton: {
//     backgroundColor: "#8997b9",
//     color: "#FFF",
//     padding: "5px 10px",
//     borderRadius: "5px",
//     textDecoration: "none",
//     fontSize: "10px"
//   },
//   deleteButton: {
//     backgroundColor: "#61697c",
//     color: "#FFF",
//     padding: "5px 10px",
//     borderRadius: "5px",
//     border: "none",
//     cursor: "pointer",
//     fontSize: "10px"
//   },
//   formContainer: {
//     backgroundColor: "rgb(226 231 238)",
//     borderRadius: "8px",
//     padding: "20px",
//     marginTop: "20px",
//   },
//   closeButton: {
//     backgroundColor: "#EF5B2B",
//     color: "#FFF",
//     padding: "5px 10px",
//     borderRadius: "5px",
//     border: "none",
//     cursor: "pointer",
//     marginBottom: "20px",
//     fontSize: "10px"
//   },
// };

// export default ManageProducts;






import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthContext.js";
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
    terms: false,
    sizes: "",
    colors: "",
    quantity: "",
    description: "",
    type: "local",
    searchTerm: "",
    sortBy: "name",
    isLoading: true,
    error: null
  };

  componentDidMount() {
    // Check if context is ready before fetching products
    if (this.context && this.context.email) {
      this.fetchProducts();
    } else {
      // If context isn't ready, set up a small delay to try again
      this.contextCheckTimer = setTimeout(() => {
        if (this.context && this.context.email) {
          this.fetchProducts();
        } else {
          this.setState({ 
            isLoading: false, 
            error: "Authentication context not available. Please login again." 
          });
        }
      }, 1000);
    }
  }
  
  componentWillUnmount() {
    // Clear the timer if component unmounts
    if (this.contextCheckTimer) {
      clearTimeout(this.contextCheckTimer);
    }
  }

  fetchProducts = async () => {
  const { email } = this.context;
  
  // Safety check - don't proceed if email is empty
  if (!email) {
    this.setState({ 
      isLoading: false, 
      error: "Email not available. Please login again." 
    });
    return;
  }
  
  const encodedEmail = encodeURIComponent(email);
  
  try {
    this.setState({ isLoading: true });
    // Changed from path parameter to query parameter
    const response = await axios.get(`${process.env.REACT_APP_LOCALHOST_URL}/products/seller?email=${encodedEmail}`);
    this.setState({ 
      products: response.data,
      isLoading: false,
      error: null
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    this.setState({ 
      isLoading: false, 
      error: "Failed to load products. Please try again later." 
    });
  }
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
      terms,
      sizes,
      colors,
      quantity,
      description,
      type: productType,
    } = this.state;
    
    // Safety check for email
    const { email } = this.context;
    if (!email) {
      alert("Authentication error. Please login again.");
      return;
    }

    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("image", imageFile);
    formData.append("latest", latest);
    formData.append("category", category);
    formData.append("featured", featured);
    formData.append("terms", terms);
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

      alert("Product added successfully");
      this.setState({
        id: "",
        name: "",
        price: "",
        imageFile: null,
        latest: false,
        category: "",
        featured: false,
        terms: false,
        sizes: "",
        colors: "",
        quantity: "",
        description: "",
        type: "local",
      });
      this.fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    }
  };


// (30 May)
  handleDeleteProduct = async (productId) => {
  try {
    await axios.delete(`${process.env.REACT_APP_LOCALHOST_URL}/products?id=${productId}`);
    console.log("Product Id",productId);
    this.fetchProducts(); // Refresh the product list after deletion
  } catch (error) {
    console.error("Error deleting product:", error);
    alert("Failed to delete product. Please try again.");
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
      terms,
      type,
      searchTerm,
      sortBy,
      isLoading,
      error
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
       "Tractors & Accessories"
    ];

    const filteredProducts = products?.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (sortBy === "name") return a.name.localeCompare(b.name);
        if (sortBy === "price") return a.price - b.price;
        return 0;
      });

    const { username: sellerusername } = this.context || { username: "" };

    return (
      <div className=" container ManageProducts">
        <main style={{ flex: 1, padding: "20px" }}>
          <header
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
              borderBottom: "1px solid gray",
              paddingBottom: "10px",
            }}
          >
            <h2 style={{ fontSize: "16px", color: "black" }}>
              Manage Products
            </h2>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ marginRight: "10px", color: "black" }}>{sellerusername}</span>
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
                {sellerusername ? sellerusername.charAt(0).toUpperCase() : ""}
              </div>
            </div>
          </header>
          <div >
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
              <h6
                style={{
                  color: "#EF5B2B",
                  marginBottom: "20px",
                }}
              >
                Add New Product
              </h6>
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
                  placeholder="Product price in USD"
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
                <label style={{ marginRight: "10px", color: "black", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    name="latest"
                    checked={latest}
                    onChange={this.handleChange}
                  />
                  Latest
                </label>
                <label style={{ marginRight: "10px" , color: "black", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    name="featured"
                    checked={featured}
                    onChange={this.handleChange}
                  />
                  Featured
                </label>
                <label style={{ marginRight: "10px" , color: "black", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    name="terms"
                    checked={terms}
                    onChange={this.handleChange}
                  />
                  I accept the <span ><Link to="/admin/sellerdashboard/addproduct/sellerterms">terms and conditions</Link></span>
                </label>
                <button type="submit" style={styles.button}>
                  Add Product
                </button>
              </form>
            </div>
          )}

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
                    // You might want to redirect to login page here
                  }
                }}
              >
                Retry
              </button>
            </div>
          )}

          {!isLoading && !error && filteredProducts?.length === 0 && (
            <div style={styles.messageBox}>
              <p>No products found. Add your first product!</p>
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
            {!isLoading && !error && filteredProducts?.map((product) => (
              <div key={product.id} style={styles.card}>
                <img
                  src={`${process.env.REACT_APP_LOCALHOST_URL}${product.imageUrl}`}
                  alt={product.name}
                  style={styles.cardImage}
                  onError={(e) => {
                    e.target.onerror = null;
                    // Replace with a simple colored div instead of external placeholder
                    e.target.style.backgroundColor = "#e0e0e0";
                    e.target.style.display = "flex";
                    e.target.style.alignItems = "center";
                    e.target.style.justifyContent = "center";
                    
                    // Add text to the image container
                    const text = document.createTextNode("Image Not Found");
                    e.target.appendChild(text);
                  }}
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
                      onClick={() => this.handleDeleteProduct(product.id)}
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
    padding: "5px",
    margin: "3px 0",
    borderRadius: "5px",
    border: "1px solid #333",
    backgroundColor: "rgb(237 237 237)",
    color: "#1f2121",
    fontsize: "5px"
  },
  fileInput: {
    margin: "5px 0",
  },
  button: {
    padding: "3px 15px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#EF5B2B",
    color: "#FFF",
    cursor: "pointer",
    fontSize:"10px"
  },
  card: {
    backgroundColor: "rgb(174 183 203 / 34%)",
    borderRadius: "8px",
    // boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
    border: "1px solid gray",
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
    color: "rgb(97, 105, 124)",
  },
  cardDescription: {
    fontSize: "14px",
    color: "#737373",
    marginBottom: "10px",
    height: '100px', 
    overflow: 'hidden', 
    textOverflow: 'ellipsis',  
    display: '-webkit-box',
    WebkitLineClamp: 3, 
    WebkitBoxOrient: 'vertical',
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
    color: "rgb(97, 105, 124)",
  },
  cardActions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  viewButton: {
    backgroundColor: "#8997b9",
    color: "#FFF",
    padding: "5px 10px",
    borderRadius: "5px",
    textDecoration: "none",
    fontSize: "10px"
  },
  deleteButton: {
    backgroundColor: "#61697c",
    color: "#FFF",
    padding: "5px 10px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    fontSize: "10px"
  },
  formContainer: {
    backgroundColor: "rgb(226 231 238)",
    borderRadius: "8px",
    padding: "20px",
    marginTop: "20px",
  },
  closeButton: {
    backgroundColor: "#EF5B2B",
    color: "#FFF",
    padding: "5px 10px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    marginBottom: "20px",
    fontSize: "10px"
  },
  messageBox: {
    padding: "20px",
    textAlign: "center",
    backgroundColor: "rgb(226 231 238)",
    borderRadius: "8px",
    margin: "20px 0",
  },
  errorBox: {
    padding: "20px",
    textAlign: "center",
    backgroundColor: "#ffebee",
    borderRadius: "8px",
    margin: "20px 0",
    color: "#d32f2f"
  },
  retryButton: {
    backgroundColor: "#EF5B2B",
    color: "#FFF",
    padding: "5px 15px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    marginTop: "10px",
    fontSize: "12px"
  }
};

export default ManageProducts;