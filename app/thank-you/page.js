import Link from 'next/link';

// We do NOT need to import a separate CSS file here.
// All the styles are already in globals.css

export default function ThankYouPage() {
  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
      {/* 
        This div uses the "thank-you-container" class from your global CSS 
        to center the content and style the icon.
      */}
      <div className="thank-you-container">
        <i className="fas fa-check-circle"></i>
        <h2 className="section-title" style={{ marginTop: '20px', opacity: 1, transform: 'none' }}>
            Thank You!
        </h2>
        <p style={{ fontSize: '1.2rem' }}>Your order has been placed successfully.</p>
        <Link href="/" className="btn" style={{ marginTop: '20px' }}>
            Continue Shopping
        </Link>
      </div>
    </div>
  );
}