import React from "react";
import logo from "../../assets/logo.jpeg";

export default function SellerTermsSndCondition() {
  return (
    <div className="container my-5">
      <div className="text-center mb-4">
        <img
          src={logo}
          alt="Tradxsell Logo"
          className="img-fluid"
          style={{ maxWidth: "100px" }}
        />
      </div>
      <div className="bg-light p-4 rounded shadow-sm">
        <h1 className="text-center mb-3">Terms and Conditions for Sellers</h1>
        <p className="text-muted text-center">Effective Date: 24-12-2024</p>

        <p className="small mb-2">
          Welcome to Tradxsell, a global B2B platform connecting manufacturers,
          traders, and suppliers to international markets. By registering as a
          seller on Tradxsell, you agree to abide by the following terms and
          conditions:
         
        </p>

        <h3 className="small">1. Account Registration</h3>
        <ul className="small">
          <li>
            Sellers must provide accurate and complete information during
            registration.
          </li>
          <li>
            Tradxsell reserves the right to approve, suspend, or terminate
            seller accounts for any violation of these terms.
          </li>
        </ul>

        <h3 className="small">2. Product Listings</h3>
        <ul className="small">
          <li>
            Sellers are responsible for ensuring that product descriptions,
            images, and specifications are accurate and not misleading.
          </li>
          <li>
            All products listed must comply with local and international trade
            laws, including but not limited to laws governing intellectual
            property, safety, and quality standards.
          </li>
          <li>
            Tradxsell reserves the right to remove any product listing deemed
            inappropriate, illegal, or in violation of platform policies.
          </li>
        </ul>

        <h3 className="small">3. Seller Obligations</h3>
        <ul className="small">
          <li>Sellers must fulfill orders promptly and accurately.</li>
          <li>Communication with buyers must be professional and courteous.</li>
          <li>
            Sellers are solely responsible for obtaining necessary licenses,
            permits, and certifications for their products.
          </li>
          <li>
            Tradxsell is not liable for disputes arising between buyers and
            sellers.
          </li>
        </ul>

        <h3 className="small">4. Fees and Payments</h3>
        <ul className="small">
          <li>
            Sellers agree to pay any applicable platform fees or commissions as
            specified in Tradxsell’s pricing policy.
          </li>
          <li>
            Payments for sales will be processed in accordance with Tradxsell’s
            payment schedule.
          </li>
          <li>
            Sellers are responsible for all applicable taxes related to their
            sales.
          </li>
        </ul>

        <h3 className="small">5. Prohibited Activities</h3>
        <ul className="small">
          <li>Listing counterfeit, illegal, or restricted products.</li>
          <li>Engaging in fraudulent transactions.</li>
          <li>Spamming or harassing buyers or other sellers.</li>
          <li>Misusing platform features or data.</li>
        </ul>

        <h3 className="small">6. Intellectual Property</h3>
        <ul className="small">
          <li>
            Sellers warrant that they own or have the rights to sell the
            products listed.
          </li>
          <li>
            Tradxsell is not responsible for any intellectual property disputes
            arising from seller’s listings.
          </li>
        </ul>

        <h3 className="small">7. Liability and Indemnity</h3>
        <ul className="small">
          <li>
            Tradxsell provides the platform "as is" and does not guarantee
            uninterrupted service.
          </li>
          <li>
            Sellers agree to indemnify and hold Tradxsell harmless from any
            claims, losses, or damages arising from their use of the platform.
          </li>
        </ul>

        <h3 className="small">8. Termination</h3>
        <ul className="small">
          <li>
            Sellers may terminate their accounts at any time by providing
            written notice.
          </li>
          <li>
            Tradxsell reserves the right to terminate accounts for violations of
            these terms or applicable laws.
          </li>
        </ul>

        <h3 className="small">9. Governing Law</h3>
        <p className="small">
          These terms and conditions are governed by the laws of Pakistan.
        </p>

        <h4 className=" mt-3">Seller Policies at Tradxsell</h4>
        <h4 className="small">1. Data Privacy</h4>
        <ul className="small">
          <li>
            Tradxsell collects and uses seller data in accordance with its
            Privacy Policy.
          </li>
          <li>
            Seller data will not be shared with third parties without consent,
            except as required by law.
          </li>
        </ul>

        <h4 className="small">2. Dispute Resolution</h4>
        <ul className="small">
          <li>
            Tradxsell provides a mediation service for resolving disputes
            between buyers and sellers.
          </li>
          <li>
            Both parties are encouraged to resolve disputes amicably before
            seeking platform intervention.
          </li>
        </ul>

        <h4 className="small">3. Seller Reviews and Ratings</h4>
        <ul className="small">
          <li>
            Buyers can leave reviews and ratings for sellers based on their
            experiences.
          </li>
          <li>Sellers may not manipulate reviews or ratings in any manner.</li>
        </ul>

        <h4 className="small">4. Changes to Policies</h4>
        <ul className="small">
          <li>
            Tradxsell reserves the right to modify these terms and policies at
            any time.
          </li>
          <li>
            Sellers will be notified of significant changes via email or
            platform notifications.
          </li>
        </ul>

        <p className="small">
          For questions or concerns, please contact Tradxsell support at{" "}
          <a href="mailto:support@tradxsell.com">support@tradxsell.com</a>.
        </p>

        <p className="small">
          By using Tradxsell, you acknowledge that you have read, understood,
          and agreed to these terms and conditions.
        </p>
      </div>
    </div>
  );
}
