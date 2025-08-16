'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
  return (
    <>
      <a href="https://wa.me/923348846378" className="whatsapp-float" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
        {/* Use the FontAwesomeIcon component for the WhatsApp icon */}
        <FontAwesomeIcon icon={faWhatsapp} />
      </a>
      <footer>
        <div className="footer-content">
          <div className="footer-column"><h3>Aoun Store</h3><p>Celebrating cultural heritage through fashion. Quality eastern wear delivered across Pakistan.</p></div>
          <div className="footer-column">
            <h3>Quick Links</h3>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/shop">Products</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
              <li><Link href="/policies">Terms & Policy</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Contact Info</h3>
            <ul>
              <li><FontAwesomeIcon icon={faEnvelope} style={{ marginRight: '8px' }} /> brandcollection120@gmail.com</li>
              <li><FontAwesomeIcon icon={faPhone} style={{ marginRight: '8px' }} /> +92 334 8846378</li>
            </ul>
          </div>
        </div>
        <div className="copyright"><p>© 2024 Aoun Store. All Rights Reserved. Designed by Aoun Abbas</p></div>
      </footer>
    </>
  );
}