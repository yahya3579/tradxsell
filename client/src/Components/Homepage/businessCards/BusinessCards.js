import React from "react";
import back from "./BackSquares.png"
import cart from "./cart.png"
import delivery from "./delivery.png"  
import shield from "./Shield.png"
import adjust from "./Adjust.png"
import "./businessCards.css";


const BusinessCards = () => {
  return (
    <div className="container-fluid position-relative bg-gradient py-5" style={{  background: "white" }}>
      <img src={back} alt="" className="position-absolute top-0 start-0" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: "1" }} />
      <div className="container position-relative">
        <h2 className="text-center text-dark fw-bold mb-5">
          Your Gateway to Seamless <span  style={{ color: "#FF5722" }}>Wholesale Trading</span>
        </h2>
        <div className="row justify-content-center" >
          <div className="col-lg-10 p-4 bg-white shadow rounded position-relative">
            <div className="row text-center text-md-start align-items-center" >
              <div className="col-md-6 d-flex py-3">
                <div className="icon-container text-white rounded-3 d-flex align-items-center justify-content-center me-3 p-4 " style={{ width: "50px", height: "50px", background: "#E97655" }}>
                  <img src={cart} alt="" style={{ width: "40px", height: "40px" }} />
                </div>
                <div>
                  <h5 className="fw-bold">Millions of business offerings</h5>
                  <p className="text-muted fw-semibold">Explore products and suppliers for your business from millions of offerings worldwide.</p>
                </div>
              </div>
              <div className="col-md-6 d-flex py-3">
                <div className="icon-container text-white rounded-3 d-flex align-items-center justify-content-center me-3 p-4" style={{ width: "50px", height: "50px", background: "#E97655" }}>
                <img src={delivery} alt="delivery" style={{ width: "40px", height: "40px" }} />
                </div>
                <div>
                  <h5 className="fw-bold">Customized trading experience</h5>
                  <p className="text-muted">Get curated benefits, such as exclusive discounts & enhanced protection.</p>
                </div>
              </div>
            </div>
            <hr className="m-4"/>
            <div className="row text-center text-md-start align-items-center">
              <div className="col-md-6 d-flex py-3">
                <div className="icon-container  text-white rounded-3 d-flex align-items-center justify-content-center me-3 p-4" style={{ width: "50px", height: "50px", background: "#E97655"}}>
                <img src={shield} alt="" style={{ width: "40px", height: "40px" }} />
                </div>
                <div>
                  <h5 className="fw-bold">Guaranteed quality and deals</h5>
                  <p className="text-muted">Ensure production quality from verified suppliers with protection from payment to delivery.</p>
                </div>
              </div>
              <div className="col-md-6 d-flex py-3">
                <div className="icon-container text-white rounded-3 d-flex align-items-center justify-content-center me-3 p-4" style={{ width: "50px", height: "50px", background: "#E97655" }}>
                <img src={adjust} alt="" style={{ width: "40px", height: "40px" }} />
                </div>
                <div>
                  <h5 className="fw-bold">All-in-one trading solution</h5>
                  <p className="text-muted">Order seamlessly from supplier search to order management, payment, and fulfillment.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessCards;
