import { React, useContext, useEffect, useState } from "react";
import SideNavbar from "./SideNavbar.js";
import "./inventry.css";
import { AuthContext } from "../../AuthContext.js";

export default function Inventry() {
  const { email: sellerEmail, username: sellerusername } =
    useContext(AuthContext);

  const buttonData = [
    {
      title: "In stock",
      value: [
        {
          id: 1,
          name: "Watch",
          category: "Electronics",
          price: 199.99,
          stock: "Available",
          description: "Approved",
        },
        {
          id: 2,
          name: "Microwave",
          category: "Home Appliance",
          price: 89.99,
          stock: "Out of Stock",
          description: "Not Approved",
        },
        {
          id: 3,
          name: "Mackup Kit",
          category: "Fashion",
          price: 49.99,
          stock: "Available",
          description: "Approved",
        },
        {
          id: 4,
          name: "Mackup Brush",
          category: "Fashion",
          price: 49.99,
          stock: "Available",
          description: "Approved",
        },
      ],
    },
    {
      title: "Pending orders",
      value: [
        {
          id: 1,
          name: "laptop",
          category: "Electronics",
          price: 199.99,
          stock: "1",
          description: "Pending",
        },
        {
          id: 2,
          name: "Microwave",
          category: "Home Appliance",
          price: 89.99,
          stock: "1",
          description: "Pending",
        },
        {
          id: 3,
          name: "Mackup Kit",
          category: "Fashion",
          price: 49.99,
          stock: "1",
          description: "Pinding",
        },
      ],
    },
    {
      title: "Sales",
      value: [
        {
          id: 1,
          name: "mouse",
          category: "Electronics",
          price: 199.99,
          stock: "1",
          description: "Sale",
        },
        {
          id: 2,
          name: "Microwave",
          category: "Home Appliance",
          price: 89.99,
          stock: "1",
          description: "Sale",
        },
      ],
    },
  ];
  const [title, setTitle] = useState(buttonData[0].title);
  const [value, setValue] = useState(buttonData[0].value);
  const [inStockCount, setInStockCount] = useState(0);
  const [inPindingCount, setInpindingCount] = useState(0);
  const [inSalesCount, setInSalesCount] = useState(0);

  useEffect(() => {
    setInStockCount(buttonData[0].value.length);
    setInpindingCount(buttonData[1].value.length);
    setInSalesCount(buttonData[2].value.length);
  }, [buttonData]);
  console.log("in stock data", inStockCount);
  console.log("in pinding data", inPindingCount);
  console.log("in sale data", inSalesCount);

  const handleTitle = (item) => {
    setTitle(item?.title);
    setValue(item?.value);
  };

  return (
    <div className="inventry-dashboard">
      <SideNavbar />
      <main className="flex-grow-1 p-4">
        <header className="dashboard-header">
          <h1>Inventry Management System</h1>
          <div className="user-icon">
            <span className="me-2">{sellerusername}</span>
            <div className="user-avatar">
              {sellerusername.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>
        <section className="row g-3 mb-4">
          {buttonData.map((item, index) => (
            <div
              className="col-md-4 status-button"
              key={index}
              onClick={() => handleTitle(item)}
            >
              <div className="stats-card">
                <h3 className="stats-title">{item.title}</h3>
                <p className="stats-value">
                  {item.title === "In stock"
                    ? inStockCount
                    : item.title === "Pending orders"
                    ? inPindingCount
                    : item.title === "Sales"
                    ? inSalesCount
                    : 0}
                </p>
              </div>
            </div>
          ))}
        </section>
        <section className="row g-3">
          <div className="col-lg-12">
            <div className="chart-container">
              <h3 className="chart-title">{title}</h3>
              <div className="chart-wrapper">
                <div className="table-responsive mt-4 product-table-container">
                  <table className="table table-bordered table-striped table-hover align-middle shadow-sm rounded">
                    <thead className="table-dark">
                      <tr>
                        <th scope="col">Product ID</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {value.map((product, index) => (
                        <tr key={index}>
                          <td>{product.id}</td>
                          <td>{product.name}</td>
                          <td>{product.category}</td>
                          <td>${product.price.toFixed(2)}</td>
                          <td>{product.stock}</td>
                          <td>{product.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
