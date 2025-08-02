import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./helpcenter.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
export default function HelpCenter() {
  // State to store search query
  const [searchQuery, setSearchQuery] = useState("");
  
  // State for contact form
  const [contactForm, setContactForm] = useState({
    fullName: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const styles = {
    navbar: {
      background: "linear-gradient(to bottom, #ffffff, #f2f2f2)",
      height: "80px",
    },
    searchSection: {
      backgroundColor: "#f54e1a",
      padding: "25px 0",
    },
    searchInput: {
      borderRadius: "20px",
      height: "45px",
    },
    accordionButton: {
      backgroundColor: "#ffded9",
      marginBottom: "4px",
    },
    accordionButtonActive: {
      backgroundColor: "#f8d7d4",
    },
    contactCard: {
      border: "3px solid #ED4F1E",
      backgroundColor: "transparent",
      borderRadius: "5px",
      overflow: "hidden", // This prevents content from spilling outside the border
      height: "100%", // Makes the card take full height of its container
      minHeight: "550px" // Sets minimum height to ensure the border is tall enough
    },
    submitButton: {
      backgroundColor: "#ef5d26",
      border: "none",
    },
    textArea: {
      minHeight: "350px",
    },
  };

  // FAQ Data
  const faqData = [
    {
      id: "headingOne",
      question: "What is TradeXSell?",
      answer:
        "TradeXSell is your trusted online marketplace for buying and selling high-quality products. We provide a seamless, secure, and convenient platform where buyers and sellers connect to find the best deals and grow their businesses.",
    },
    {
      id: "headingTwo",
      question: "How can I create an account on TradeXSell?",
      answer:
        "To create an account, simply click on the “Sign Up” button on our homepage. Fill in the required information, including your email address and a secure password, then follow the prompts to verify your account.",
    },
    {
      id: "headingThree",
      question: "What types of products can I buy or sell on TradeXSell?",
      answer:
        "TradeXSell offers a wide range of products across various categories, including electronics, fashion, home goods, beauty products, and more. Sellers can list their products in relevant categories to reach their target audience.",
    },
    {
      id: "headingFour",
      question: "Is it safe to buy from sellers on TradeXSell?",
      answer:
        "Yes, we prioritize the safety and security of our users. All transactions are encrypted, and we provide buyer protection to ensure a safe shopping experience. Additionally, sellers are vetted to maintain quality and reliability.",
    },
    {
      id: "headingFive",
      question: "How do I make a purchase on TradeXSell?",
      answer:
        "To make a purchase, browse our listings, select the product you wish to buy, and click on the “Add to Cart” button. Once you’re ready, proceed to checkout, where you can enter your shipping details and payment information.",
    },
    {
      id: "headingSix",
      question: "What payment methods are accepted on TradeXSell?",
      answer:
        "TradeXSell accepts various payment methods, including credit/debit cards, PayPal, and other secure payment gateways.Choose your preferred method during the checkout process.",
    },
    {
      id: "headingSeven",
      question: "How can I track my order?",
      answer:
        "After your order is shipped, you will receive a tracking number via email. You can use this number to track your order status on the shipping carrier’s website or through your TradeXSell account.",
    },
    {
      id: "headingEight",
      question: "What should I do if I encounter an issue with my order?",
      answer:
        "If you experience any issues with your order, please contact our customer support team through the “Contact Us” page. We are here to assist you and resolve any concerns you may have.",
    },
    {
      id: "headingNine",
      question: "Are there any fees for selling on TradeXSell?",
      answer:
        "Yes, we charge a nominal fee for each sale made through our platform. This fee helps us maintain a secure and efficient marketplace for both buyers and sellers. Please check our Seller Agreement for detailed information on fees.",
    },
    {
      id: "headingTen",
      question: "How can I contact customer support?",
      answer:
        "You can reach our customer support team via the “Contact Us” page on our website. We also offer support through email and a live chat feature during business hours.",
    },
  ];

  // Filter FAQs based on search query
  const filteredFAQs = faqData.filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle contact form submission
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form fields
    if (!contactForm.fullName.trim() || !contactForm.email.trim() || !contactForm.message.trim()) {
      toast.error("Please fill in all fields", {
        position: "top-center",
        style: {
          background: '#f44336',
          color: '#fff',
          borderRadius: '10px',
          fontSize: '16px',
          fontWeight: '500',
          padding: '16px 20px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        },
        iconTheme: {
          primary: '#fff',
          secondary: '#f44336',
        },
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactForm.email)) {
      toast.error("Please enter a valid email address", {
        position: "top-center",
        style: {
          background: '#f44336',
          color: '#fff',
          borderRadius: '10px',
          fontSize: '16px',
          fontWeight: '500',
          padding: '16px 20px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        },
        iconTheme: {
          primary: '#fff',
          secondary: '#f44336',
        },
      });
      return;
    }

    setIsSubmitting(true);

    // Show loading toast
    const loadingToast = toast.loading('Sending your message...', {
      position: "top-center",
      style: {
        background: '#2196F3',
        color: '#fff',
        borderRadius: '10px',
        fontSize: '16px',
        fontWeight: '500',
        padding: '16px 20px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      },
    });

    try {
      // Simulate API call (replace with actual API endpoint)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Dismiss loading toast
      toast.dismiss(loadingToast);
      
      // Show success toast
      toast.success("Your message has been sent successfully! We'll get back to you soon.", {
        duration: 4000,
        position: "top-center",
        style: {
          background: '#4CAF50',
          color: '#fff',
          borderRadius: '10px',
          fontSize: '16px',
          fontWeight: '500',
          padding: '16px 20px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        },
        iconTheme: {
          primary: '#fff',
          secondary: '#4CAF50',
        },
      });

      // Reset form
      setContactForm({
        fullName: "",
        email: "",
        message: ""
      });
    } catch (error) {
      // Dismiss loading toast
      toast.dismiss(loadingToast);
      
      // Show error toast
      toast.error("Failed to send message. Please try again later.", {
        duration: 4000,
        position: "top-center",
        style: {
          background: '#f44336',
          color: '#fff',
          borderRadius: '10px',
          fontSize: '16px',
          fontWeight: '500',
          padding: '16px 20px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        },
        iconTheme: {
          primary: '#fff',
          secondary: '#f44336',
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="help-center">
      {/* Toast Container */}
      <ToastContainer />
      
      {/* Navbar */}
      {/* Navbar */}
      <nav className="navbar navbar-light" style={styles.navbar}>
        <div className="container d-flex justify-content-center">
          <a
            className="navbar-brand fw-bold"
            href="#"
            style={{ fontSize: "24px" }}
          >
            Help Center
          </a>
        </div>
      </nav>

      {/* Search Input Section */}
      <section
        className="text-center text-white d-flex align-items-center justify-content-center"
        style={styles.searchSection}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-lg-8">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control border-0"
                  placeholder="Search for Topic, Guides or FAQs"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search"
                  style={styles.searchInput}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <div className="container my-5">
        <div className="row">
          {/* FAQ Section */}
          <div className="col-lg-7 col-md-12 mb-4 mb-lg-0">
            <h2 className="fw-bold mb-4" style={{ color: "#f54e1a" }}>
              Frequently Asked Questions
            </h2>
            <div className="accordion" id="faqAccordion">
              {filteredFAQs.length > 0 ? (
                filteredFAQs.map((faq) => (
                  <div className="accordion-item border-0 mb-2" key={faq.id}>
                    <h2 className="accordion-header" id={faq.id}>
                      <button
                        className="accordion-button collapsed text-dark shadow-sm d-flex justify-content-between align-items-center"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse${faq.id}`}
                        aria-expanded="false"
                        aria-controls={`collapse${faq.id}`}
                        style={styles.accordionButton}
                      >
                        <span>{faq.question}</span>
                        <span className="ms-2" style={{ color: "#f54e1a" }}>
                          &gt;
                        </span>
                      </button>
                    </h2>
                    <div
                      id={`collapse${faq.id}`}
                      className="accordion-collapse collapse"
                      aria-labelledby={faq.id}
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body">{faq.answer}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="alert alert-light text-center">
                  No FAQs match your search query.
                </div>
              )}
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-5 col-md-12">
            <div className="card shadow-sm" style={styles.contactCard}>
              <div className="card-body p-4">
                {" "}
                {/* Increased padding inside the card */}
                <h4 className="fw-bold">Got more Questions?</h4>
                <p className="text-muted">Contact Us</p>
                <form onSubmit={handleContactSubmit}>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="fullName"
                      className="form-control"
                      placeholder="Full Name"
                      value={contactForm.fullName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Email"
                      value={contactForm.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <textarea
                      name="message"
                      className="form-control"
                      rows="6"
                      placeholder="Your Message"
                      style={styles.textArea}
                      value={contactForm.message}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="btn w-100 text-white"
                    style={styles.submitButton}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
