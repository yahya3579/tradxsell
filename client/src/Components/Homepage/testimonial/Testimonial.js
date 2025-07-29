import React, { useEffect, useState } from "react";
import { Carousel, Container, Row, Col } from "react-bootstrap";
import "./testimonial.css";
import testimonial1 from "../../../assets/testimonial/dummy-boyimage.jpg";
import testimonial2 from "../../../assets/testimonial/dummy-girlimage.png";

const testimonials = [
  {
    img: testimonial1,
    text: "When I found TradeXSell, I was astonished by the vast array of suppliers available from around the globe.",
    name: "Sheikh Suleman",
    position: "Founder of Mall",
  },
  {
    img: testimonial1,
    text: "TradeXSell has transformed the landscape for small businesses like ours. I believe we wouldn't have been able to source anything without it.",
    name: "Nouman Butt",
    position: "Business Man",
  },
  {
    img: testimonial2,
    text: "As an entrepreneur immersed in the beauty sector, I have committed to crafting my products. TradeXSell has been a valuable ally in this endeavor.",
    name: "Zainab Ali",
    position: "Bank Manager",
  },
  {
    img: testimonial2,
    text: "TradeXSell offers an unparalleled platform for connecting with manufacturers worldwide.",
    name: "Ali Khan",
    position: "E-commerce Owner",
  },
  {
    img: testimonial1,
    text: "We have found the best deals and suppliers through TradeXSell, making procurement seamless.",
    name: "Ayesha Noor",
    position: "Retailer",
  },
  {
    img: testimonial2,
    text: "TradeXSell helped us grow our network and expand our business internationally.",
    name: "Sarah Ahmed",
    position: "Wholesaler",
  },
  {
    img: testimonial1,
    text: "The user-friendly interface and vast supplier network make TradeXSell my go-to platform for sourcing products.",
    name: "Omar Farooq",
    position: "Entrepreneur",
  },
  {
    img: testimonial2,
    text: "I highly recommend TradeXSell for any business looking to streamline their supply chain.",
    name: "Hina Tariq",
    position: "Distributor",
  },
];

const Testimonial = () => {
  const [itemsPerSlide, setItemsPerSlide] = useState(3);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 576;
      setIsMobile(mobile);

      if (mobile) {
        setItemsPerSlide(1);
      } else if (window.innerWidth < 992) {
        setItemsPerSlide(2);
      } else {
        setItemsPerSlide(3); // Show 3 items on large screens
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const chunkArray = (array, size) => {
    return array.reduce((acc, _, i) =>
      (i % size ? acc : [...acc, array.slice(i, i + size)]),
      []
    );
  };

  const groupedTestimonials = chunkArray(testimonials, itemsPerSlide);

  return (
    <div className="testimonial-topContainer">
      <h2 className="text-center section-title">
        What Our Customers Say
        <span style={{ color: "#FB5420" }}> About Us</span>
      </h2>
      <Container fluid className="testimonial-section">
        <Carousel
          indicators={false}
          controls={true}
          interval={3000}
          className="testimonial-carousel"
        >
          {groupedTestimonials.map((group, index) => (
            <Carousel.Item key={index}>
              <Row className="justify-content-center">
                {group.map((item, idx) => (
                  <Col
                    key={idx}
                    xs={12}
                    sm={itemsPerSlide === 1 ? 12 : 6}
                    md={itemsPerSlide === 3 ? 4 : (itemsPerSlide === 2 ? 6 : 12)}
                    className="testimonial-col"
                  >
                    <div className={`testimonial-wrapper ${isMobile ? "mobile-wrapper" : ""}`}>
                      {!isMobile && <div className="testimonial-circle"></div>}
                      <div className={`testimonial-item ${isMobile ? "mobile-item" : ""}`}>
                        <img src={item.img} className="testimonial-image" alt="testimonial" />
                        <p className="testimonial-author">{item.name}</p>
                        <p className="testimonial-position">{item.position}</p>
                        <p className="testimonial-text">"{item.text}"</p>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </div>
  );
};

export default Testimonial;
