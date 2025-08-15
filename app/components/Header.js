import Link from 'next/link';

// This is the simple, original version of your Header component.
// It is no longer a 'use client' component and has no cart logic.
export default function Header() {
  return (
    <>
      <div className="announcement-bar">
        <p>Pay 200 Before Delivery</p>
      </div>
      <header>
        <div className="header-container">
          <Link href="/" className="logo neon-border">
            <div className="neon-border-content"><h1 className="logo-text">Aoun Store</h1></div>
          </Link>
          <nav>
            <ul>
              <li><Link href="/" className="neon-border"><div className="neon-border-content">Home</div></Link></li>
              <li><Link href="/shop" className="neon-border"><div className="neon-border-content">All Products</div></Link></li>
              <li><Link href="/contact" className="neon-border"><div className="neon-border-content">Contact Us</div></Link></li>
              {/* The cart icon has been removed from the list. */}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}