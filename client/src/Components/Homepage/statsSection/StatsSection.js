import React from 'react';
import './statsSection.css'; // Make sure to create this CSS file

const StatsSection = () => {
  return (
    <div className="container margin-setting">
      <h2 className="text-center mb-5">Explore millions of offerings tailored to your<span  style={{ color: "#FF5722" }}> business needs</span></h2>
      <div className="row text-center">
        <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
          <div className="stat-card">
            <h3>100M+</h3>
            <p>products</p>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
          <div className="stat-card">
            <h3>100K+</h3>
            <p>suppliers</p>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
          <div className="stat-card">
            <h3>2500</h3>
            <p>product categories</p>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
          <div className="stat-card">
            <h3>200+</h3>
            <p>countries and regions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
