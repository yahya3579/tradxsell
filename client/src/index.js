import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import Aboutus from "./Components/Aboutus.js";
import Manageorders from "./Components/Admin/Manageorders.js";
// import ManageProducts from './Components/Admin/ManageProducts';
import ManageProducts from "./Components/SellerDashboardV2/ManageProducts.js";
import ProductDetails from "./Components/Admin/ProductDetails.js";
import Cart from "./Components/Cart";
import Checkout from "./Components/Checkout";
import Details from "./Components/Details";
import Home from "./Components/Home";
// import Login from './Components/Login';
import CheckProducts from "./Components/MainAdmin/CheckProducts.js";
import Mensproducts from "./Components/Mens_products.js";
// import Navigationbar from './Components/Navigationbar';
import NewArrivals from "./Components/NewArrivals.js";
import Order from "./Components/Order.js";
// import Register from './Components/RegisterPage.js';
import UserDashboard from "./Components/UserDashboard.js";
import Userorders from "./Components/Userorders.js";
import WomensProducts from "./Components/WomensProducts.js";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import CategoryCarousel from "./Components/Category.js";

import CategoryPage from "./Components/CaterogyPage.js";
import CheckSellers from "./Components/MainAdmin/CheckSellers.js";

import SellerDashboard from "./Components/Admin/SellerDashboard.js";

// import RegisterAdmin from './Components/Admin/Register.js';

import SellerRegister from "./Components/Admin/SellerRegister.js";

import ManageProductsQuality from "./Components/QualityWale/ManageProductsQuality.js";

import Complains from "./Components/Admin/Complains.js";

import Complaints from "./Components/UserComplaints.js";

import Checkcomplaints from "../src/Components/MainAdmin/Checkcomplaints.js";

import CheckcomplaintsQuality from "../src/Components/QualityWale/Complains.js";

import Addquality from "../src/Components/MainAdmin/Addquality.js";

import Navbar from "./Components/Homepage/navbar/Navbar";
import SellerPublicProfile from "./Components/SellerPublicProfile.js";

import Login from "./Components/login/Login";

import Register from "./Components/Register/Register";
import HelpCenter from "./Components/Helpcenter/HelpCenter.js";
import ProductOverview from "./Components/ProductDetails/ProductOverview.js";
import SearchResultsPage from "./Components/SearchResultsPage/SearchResultsPage.js";
import Inventry from "./Components/Admin/Inventry.js";
import SellerDashboardV2 from "./Components/SellerDashboardV2/SellerDashboardV2.js";
import ManageOrdersV2 from "./Components/SellerDashboardV2/ManageordersV2.js";
import Feedback from "./Components/SellerDashboardV2/Feedback.js";
import SellerComplain from "./Components/SellerDashboardV2/SellerComplain.js";
import InventoryManagement from "./Components/SellerDashboardV2/InventoryManagement.js";
import SellerComplaints from "./Components/QualityWale/SellerComplaints.js";
import { CartProvider } from "./CartContext";
import ProductsListPage from "./Components/Homepage/ProductsList/ProductsListPage.js";
import AccountSetting from "./Components/SellerDashboardV2/AccountSetting.js";
import Payment from "./Components/PaymentMethod/Checkout.js";
import { CheckoutProvider } from "./CheckoutContext";
import Chat from "./Components/Chat/Chat.js";
import CurrencyProvider from "./CurrencyContext";
import SellerTermsSndCondition from "./Components/SellerDashboardV2/SellerTermsSndCondition.js";
import AdminDashboard from "./Components/MainAdminV2/AdminDashboard.js";

import QualityAssuranceNavbar from "./Components/QualityWale/QualityAssuranceNavbar.js";
import DashboardStats from "./Components/MainAdminV2/DashboardStats.js";
import ManageProductAdmin from "./Components/MainAdminV2/ManageProducts.js";
import ManageUser from "./Components/MainAdminV2/ManageUsers.js";
import ManageComplains from "./Components/MainAdminV2/ManageComplains.js";
import QualityAssurance from "./Components/MainAdminV2/QualityAssurance.js";
import VerifyEmail from "./Components/Register/VerifyEmail .js";
import SellerLogin from "./Components/login/SellerLogin.js";
import ForgotPassword from "./Components/login/ForgotPassword.js";
import ResetPassword from "./Components/login/ResetPassword.js";
import AdminRegister from "./Components/MainAdminV2/AdminRegister.js";
import SellerDashboardV3 from "./Components/SellerDashboardV2/SellerDashboardV3.js";
import SellerDashboardV4 from "./Components/SellerDashboardV2/SellerDashboardV4.js";
import Dashboard from "./Components/SellerDashboardV2/Dashboard.js";
import ManageProductsV2 from "./Components/SellerDashboardV2/ManageProductsV2.js";
import SellerComplainV2 from "./Components/SellerDashboardV2/SellerComplainV2.js";

import UserRFQ from './Components/UserRFQ.js';
import AdminRFQ from './Components/MainAdminV2/AdminRFQ.js';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <CheckoutProvider>
            <CurrencyProvider>
              {/* <Navigationbar /> */}
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<Aboutus />} />
                <Route path="/helpcenter" element={<HelpCenter />} />
                <Route
                  path="/admin/checkcomplaints"
                  element={<Checkcomplaints />}
                />
                <Route
                  path="/productoverview/:id"
                  element={<ProductOverview />}
                />
                <Route path="/chat" element={<Chat />} />
                <Route path="/mens" element={<Mensproducts />} />
                <Route path="/womens" element={<WomensProducts />} />
                <Route path="/newarrivals" element={<NewArrivals />} />

                <Route path="/products/:id" element={<Details />} />
                <Route path="/adminproducts/:id" element={<ProductDetails />} />
                {/* <Route path="/loginpage" element={<Login />} /> */}
                <Route path="/login" element={<Login />} />
                <Route path="/login/seller" element={<SellerLogin />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />

                <Route path="/register" element={<Register />} />
                <Route path="/seller-register" element={<SellerRegister />} />

                <Route path="/cart" element={<Cart />} />

                <Route path="/admin/support" element={<Complains />} />

                <Route path="/admin/support" element={<Complains />} />

                {/* <Route path='/account' element={<Admin />} /> */}
                <Route path="/customersupport" element={<Complaints />} />

                <Route
                  path="/quality/complains"
                  element={<CheckcomplaintsQuality />}
                />

                <Route
                  path="/admin/qualityassuranceadd"
                  element={<Addquality />}
                />

                <Route path="/" element={<CategoryCarousel />} />
                <Route
                  path="/category/:categoryName"
                  element={<CategoryPage />}
                />

                {/* <Route path='/admin/sellerdashboard' element={<SellerDashboard></SellerDashboard>}></Route>  */}
                <Route
                  path="/admin/sellerdashboard"
                  element={<SellerDashboardV2 />}
                ></Route>
                <Route
                  path="/admin/sellerdashboard2"
                  element={<SellerDashboardV3 />}
                ></Route>
                <Route
                  path="/admin/sellerdashboard3"
                  element={<SellerDashboardV4 />}
                ></Route>
                <Route
                  path="/admin/sellerdashboard/addproduct"
                  element={<ManageProducts />}
                ></Route>
                <Route
                  path="/admin/sellerdashboard/addproduct/sellerterms"
                  element={<SellerTermsSndCondition />}
                ></Route>
                <Route
                  path="/admin/sellerdashboard/orders"
                  element={<ManageOrdersV2 />}
                ></Route>
                <Route
                  path="/admin/sellerdashboard/feedbacks"
                  element={<Feedback />}
                ></Route>
                <Route
                  path="/admin/sellerdashboard/inventory"
                  element={<InventoryManagement />}
                ></Route>
                <Route
                  path="/admin/sellerdashboard/complains"
                  element={<SellerComplain />}
                ></Route>
                <Route
                  path="/admin/sellerdashboard/accountsettings"
                  element={<AccountSetting />}
                ></Route>

                {/* New Seller Dashboard Routes */}
                <Route
                  path="/sellerdashboard"
                  element={<SellerDashboardV4 />}
                >
                  <Route index element={<Dashboard />} />
                  {/* <Route path="addproduct" element={<ManageProducts />} /> */}
                  <Route path="addproduct" element={<ManageProductsV2 />} />
                  <Route path="orders" element={<ManageOrdersV2 />} />
                  <Route path="inventory" element={<InventoryManagement />} />
                  <Route path="complains" element={<SellerComplainV2 />} />
                  <Route path="feedbacks" element={<Feedback />} />
                  <Route path="accountsettings" element={<AccountSetting />} />
                </Route>

                {/* <Route path='/admin/registers' element={<RegisterAdmin></RegisterAdmin>}></Route>  */}

                <Route path="/userdashboard" element={<UserDashboard />} />
                <Route path="/quality" element={<QualityAssuranceNavbar />}>
                  <Route
                    path="manageproducts"
                    element={<ManageProductsQuality />}
                  />
                  <Route
                    path="sellercomplaints"
                    element={<SellerComplaints />}
                  />
                </Route>
                <Route path="/admin/products" element={<ManageProducts />} />
                <Route path="/admin/orders" element={<Manageorders />} />
                <Route path="/admin/inventry" element={<Inventry />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order" element={<Order />} />
                <Route path="/userorders" element={<Userorders />} />
                <Route
                  path="/admin/checkproducts"
                  element={<CheckProducts />}
                />
                <Route path="/admin/checksellers" element={<CheckSellers />} />

                <Route path="/search" element={<SearchResultsPage />} />
                <Route path="/allproducts" element={<ProductsListPage />} />

                {/* Payment Method */}
                <Route path="/payment" element={<Payment />} />

                {/* Seller Public Profile */}
                <Route path="/seller/:sellerEmail" element={<SellerPublicProfile />} />

                <Route path="/adminmain" element={<AdminDashboard />} />
                <Route path="/admin" element={<AdminDashboard />}>
                  <Route path="dashboard" element={<DashboardStats />} />
                  <Route
                    path="manageproduct"
                    element={<ManageProductAdmin />}
                  />
                  <Route path="manageusers" element={<ManageUser />} />
                  <Route path="managecomplains" element={<ManageComplains />} />
                  <Route
                    path="createqualityassurance"
                    element={<QualityAssurance />}
                  />
                </Route>
                <Route path="/admin-register" element={<AdminRegister />} />

                <Route path="/verify-email/:token" element={<VerifyEmail />} />
                <Route path="/user/rfq" element={<UserRFQ />} />
                <Route path="/admin/rfq" element={<AdminRFQ />} />
              </Routes>
            </CurrencyProvider>
          </CheckoutProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
