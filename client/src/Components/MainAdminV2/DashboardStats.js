import React, { useEffect, useState } from "react";
import { FaUsers, FaUserTie, FaBoxOpen } from "react-icons/fa";
import axios from "axios";

const DashboardStats = () => {
  const [products, setProducts] = useState([]);
    const [userCount, setUserCount] = useState(0);
    const [sellerCount, setSellerCount] = useState(0);
  
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_LOCALHOST_URL}/products/all/x`
          );
          setProducts(response.data);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
  
      fetchProducts();
  
  
      const fetchSellers = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_LOCALHOST_URL}/users/admins`
          );
          const sellers = response.data;
  
  
          // Count users and sellers
          let userCount = 0;
          let sellerCount = 0;
  
          sellers.forEach((person) => {
            if (person.role === "user") {
              userCount++;
            } else if (person.role === "seller") {
              sellerCount++;
            }
          });
  
          setUserCount(userCount);
          setSellerCount(sellerCount);
  
        } catch (error) {
          console.error("Error fetching sellers:", error);
        }
      };
  
      fetchSellers();
    }, []);




  return (
    <div>
      <style>
        {`
          .dashboard-container {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
            background: #ffffff;
            border-radius: 16px;
            padding: 30px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.05);
            font-family: Arial, sans-serif;
            max-width: 1000px;
            margin: 40px 4%;
            gap: 20px;
            flex-wrap: wrap;
          }

          .stat-box {
            display: flex;
            align-items: center;
            gap: 20px;
            text-align: left;
            flex: 1 1 280px;
            min-width: 250px;
            background-color: #fff;
          }

          .text-content {
            display: flex;
            flex-direction: column;
            line-height: 1.2;
          }

          .icon {
            background-color: #ffe5dc;
            padding: 12px 21px;
            border-radius: 50%;
            font-size: 28px;
            color: #fb5420;
          }

          .label {
            font-size: 14px;
            color: #888;
          }

          .value {
            font-size: 22px;
            font-weight: bold;
            margin: 5px 0;
          }

          .change {
            font-size: 12px;
            margin-top: 4px;
          }

          .positive {
            color: green;
          }

          .negative {
            color: red;
          }

          .divider {
            display: none;
          }

          @media (min-width: 769px) {
            .divider {
              display: block;
              border-left: 1px solid #e0e0e0;
              height: 60px;
            }
          }
        `}
      </style>

      <div className="dashboard-container">
        <div className="stat-box">
          <div className="icon">
            <FaUsers />
          </div>
          <div className="text-content">
            <div className="label">Total Customers</div>
            <div className="value">{userCount}</div>
            <div className="change positive">⬆ 18% this month</div>
          </div>
        </div>

        <div className="divider"></div>

        <div className="stat-box">
          <div className="icon">
            <FaUserTie />
          </div>
          <div className="text-content">
            <div className="label">Total Sellers</div>
            <div className="value">{sellerCount}</div>
            <div className="change negative">⬇ 1% this month</div>
          </div>
        </div>

        <div className="divider"></div>

        <div className="stat-box">
          <div className="icon">
            <FaBoxOpen />
          </div>
          <div className="text-content">
            <div className="label">Total Products</div>
            <div className="value">{products.length}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
