import Link from 'next/link';

export default function Footer() {
  return (
    <>
      <a href="https://wa.me/923348846378" className="whatsapp-float" target="_blank" aria-label="Chat on WhatsApp">
        <i className="fab fa-whatsapp"></i>
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
          <div className="footer-column"><h3>Contact Info</h3><ul><li><i className="fas fa-envelope"></i> brandcollection120@gmail.com</li><li><i className="fas fa-phone"></i> +92 334 8846378</li></ul></div>
        </div>
        <div className="copyright"><p>© 2024 Aoun Store. All Rights Reserved. Designed by Aoun Abbas</p></div>
      </footer>
    </>
  );
}