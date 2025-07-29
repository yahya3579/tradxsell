import React from "react";
import styles from "./salesdashboard.module.css";

export default function SalesDashboard() {
  const currentDateTime = new Date().toLocaleString();

  const stats = [
    { title: "Total Sales", count: 1200 },
    { title: "Orders Today", count: 45 },
    { title: "Pending Orders", count: 8 },
    { title: "New Customers", count: 350 },
    { title: "Total Revenue", count: "$15,000" },
  ];

  return (
    <div className="container-fluid p-0 m-0">
      <header className={`bg-light ${styles.header}`}>
        <div className="container">
          <div className="row align-items-center">
            {/* Title on the left side */}
            <div className="col-12 col-md-6">
              <h2 className={`mb-0 ${styles.title}`}>Sales Dashboard</h2>
            </div>
            {/* Buttons on the right side */}
            <div className="col-12 col-md-6 text-md-end mt-2 mt-md-0">
              <button
                className={`btn btn-outline-primary me-2 ${styles.button}`}
                type="button"
              >
                Refresh
              </button>
              <button
                className={`btn btn-outline-success ${styles.button}`}
                type="button"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* // second sales date and time section */}
      <section className="bg-white py-2 border-bottom">
        <div className="container">
          <div className="col-12 col-md-6 d-flex flex-column flex-md-row justify-content-start">
            <h6 className={`mb-0 me-3 ${styles.snapshotTitle}`}>
              Sales Snapshot
            </h6>
            <small className={`text-muted ${styles.tokenText}`}>
              {/* Date and Time */}
              token at {currentDateTime}
            </small>
          </div>
        </div>
      </section>

      {/* // states section  */}

      <section className="container py-4">
        <div className="row d-flex justify-content-center align-items-center">
          {stats.map((stat, index) => (
            <div className="col-12 col-md-2 mb-4" key={index}>
              <div className={` ${styles.statCard} h-100`}>
                <div className={styles.statTitle}>{stat.title}</div>
                <div className={styles.statCount}>{stat.count}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* // sales chart section  */}

      <div className={`container-fluid py-5 ${styles.compareSalesSection}`}>
        <div className="row align-items-center">
          {/* Title on the left */}
          <div className="col-12 col-md-6">
            <h5 className="mb-0">Compare Sales</h5>
          </div>
          {/* Buttons on the right */}
          <div className="col-12 col-md-6 d-flex justify-content-md-end">
            <button
              className={`btn btn-warning me-2 ${styles.button}`}
              type="button"
            >
              Graph View
            </button>
            <button
              className={`btn btn-secondary ${styles.button}`}
              type="button"
            >
              Table View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
