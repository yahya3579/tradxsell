import React from "react";
import styles from "./Footer.module.css";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaShoppingCart,
  FaTwitter,
} from "react-icons/fa";
import TechXserve from "../../../assets/Techxserve.png";

const Footer = () => {
  return (
    <div>
      <footer className={styles.footerSection}>
        <Container>
          <Row>
            <Col md={3} className={styles.footerAbout}>
              <h5>About Us</h5>
              <p>
                TradXSell is your trusted online marketplace for buying and
                selling high-quality products. We aim to provide a seamless,
                secure, and convenient platform where buyers and sellers connect
                to find the best deals and grow their businesses.
              </p>
            </Col>
            <Col md={3} className={styles.footerLinks}>
              <h5>Important Links</h5>
              <ul>
              <li>
                  <Link to="/home">Home</Link>
                </li>

                <li>
                  <Link to="/helpcenter">Help Center</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Sign up</Link>
                </li>
              </ul>
            </Col>
            <Col md={3} className={styles.footerLinks}>
              <h5>Buyer Links</h5>
              <ul>
                <li>
                  <Link to="/allproducts">All Products</Link>
                </li>
                {/* <li>
                  <Link to="/login">Buyer Center</Link>
                </li> */}
                <li>
                  <Link to="/userdashboard">Buyer Account</Link>
                </li>
                <li>
                  <Link to="/userorders">Buyer Order</Link>
                </li>
                <li>
                  <Link to="/cart">Buyer Cart</Link>
                </li>
               
              </ul>
            </Col>
            <Col md={3} className={styles.footerLinks}>
              <h5>Sell on TradeXSell</h5>
              <ul>
                <li>
                  <Link to="/seller-register">Start selling</Link>
                </li>
                <li>
                  <Link to="/admin/sellerdashboard">Seller Central</Link>
                </li>
                <li>
                  <Link to="/admin/sellerdashboard">Seller Products</Link>
                </li>
                <li>
                  <Link to="/login">Seller Login</Link>
                </li>
              </ul>
            </Col>
            <Col md={3} className={styles.footerSocial}>
              <h5>Follow Us</h5>
              <div className={styles.socialIcons}>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="https://www.twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter />
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin />
                </a>
              </div>
            </Col>
          </Row>
          <Row className={styles.footerBottom}>
            <Col md={12} className="text-center">
              <p className="mt-2">
                &copy; 2024 TradXSell. All rights reserved.
              </p>
              <p className="mt-2">
              Powered by Techxserve<img src={TechXserve} alt="TechXserve" style={{height:"50px",width:"50px"}} />
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default Footer;
