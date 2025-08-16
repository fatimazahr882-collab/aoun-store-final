'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faShieldAlt, faHeadset } from '@fortawesome/free-solid-svg-icons';

export default function FeaturesSection() {
  return (
    <div className="features-section">
      <div className="features-container">
        <div className="feature-item">
          <div className="neon-border">
            <div className="neon-border-content">
              {/* Use the FontAwesomeIcon component for the truck icon */}
              <FontAwesomeIcon icon={faTruck} className="feature-icon" />
            </div>
          </div>
          <h4>Fast Shipping</h4>
          <p>Ship the product in 4-6 days</p>
        </div>
        <div className="feature-item">
          <div className="neon-border">
            <div className="neon-border-content">
              {/* Use the FontAwesomeIcon component for the shield icon */}
              <FontAwesomeIcon icon={faShieldAlt} className="feature-icon" />
            </div>
          </div>
          <h4>Return Warranty</h4>
          <p>7-day return warranty</p>
        </div>
        <div className="feature-item">
          <div className="neon-border">
            <div className="neon-border-content">
              {/* Use the FontAwesomeIcon component for the headset icon */}
              <FontAwesomeIcon icon={faHeadset} className="feature-icon" />
            </div>
          </div>
          <h4>Customer Support</h4>
          <p>24/7 customer support</p>
        </div>
      </div>
    </div>
  );
}