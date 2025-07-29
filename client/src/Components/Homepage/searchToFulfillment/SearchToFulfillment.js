import React from "react";
import { IoSearch } from "react-icons/io5";
import { FaRegCheckCircle } from "react-icons/fa";
import { RiSecurePaymentLine } from "react-icons/ri";
import { TbWorldPin } from "react-icons/tb";
import { MdManageAccounts } from "react-icons/md";
import bg from "./bkgcontent.png";

export default function SearchToFulfillment() {
  const data = [
    {
      icon: <IoSearch size={25} color="#ef5b2b" />, 
      title: "Search for matches",
      description:
        "Search and discover a multitude of product and supplier options tailored to meet your business needs.",
    },
    {
      icon: <FaRegCheckCircle size={25} color="#ef5b2b" />,
      title: "Identify the right one",
      description:
        "Assess product quality and supplier capabilities quickly and effectively using verified inspections and digital sourcing solutions.",
    },
    {
      icon: <RiSecurePaymentLine size={25} color="#ef5b2b" />,
      title: "Pay with confidence",
      description:
        "Complete your purchase in over 20 currencies through 20+ secure payment methods, offering flexible payment terms.",
    },
    {
      icon: <TbWorldPin size={25} color="#ef5b2b" />,
      title: "Fulfill with transparency",
      description:
        "Achieve your logistics objectives with bespoke solutions at the TradeXsell Logistics Marketplace, offering real-time tracking for more than 26,000 routes across 220 countries and regions.",
    },
    {
      icon: <MdManageAccounts size={25} color="#ef5b2b" />,
      title: "Manage with ease",
      description:
        "Access your order status, oversee supplier relationships, track payments and shipments, and contact after-sales support, all through My TradeXsell.",
    },
  ];

  return (
    <div style={{ position: "relative", width: "100%", overflow: "hidden" }}>
      <img
        src={bg}
        alt="background"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
        }}
      />
      <div className="container-fluid d-flex justify-content-center align-items-center flex-column py-5" style={{ zIndex: 10, position: "relative" }}>
        <p className="h1 fw-bold text-white text-center w-50">
          Streamline Ordering from search to fulfillment, all in one place
        </p>
        <div className="container position-relative mt-4" style={{ maxWidth: "900px" }}>
          <div className="position-absolute start-50 translate-middle-x" style={{height:"80%" ,width: "4px", backgroundColor: "#FFFFFF", top:"80px" }}></div>
          {data.map((step, index) => (
            <div
              key={index}
              className={`d-flex ${index % 2 === 0 ? "justify-content-start" : "justify-content-end"} align-items-center position-relative my-4`}
            >
              <div
                className="bg-white p-3"
                style={{
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  width: "45%",
                  minWidth: "250px",
                  border: "2px solid #FB5420",
                }}
              >
                <div className="d-flex align-items-center mb-2">
                  {/* {step.icon} */}
                  <h5 className="ms-2" style={{ color: "#ef5b2b", fontWeight:"bold" }}>{step.title}</h5>
                </div>
                <p className="text-muted" style={{ fontSize: "14px" }}>{step.description}</p>
              </div>
              <div className="d-none d-md-block position-absolute top-50 start-50 translate-middle bg-white border border-3 rounded-circle" 
     style={{ width: "16px", height: "16px", borderColor: "#FFC9B9AB", backgroundColor: "#FFC9B9AB", opacity: "0.9" }}>
</div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
