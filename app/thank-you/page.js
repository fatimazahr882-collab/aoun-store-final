import Link from 'next/link';
import styles from './ThankYouPage.module.css'; // Importing CSS module

export default function ThankYouPage() {
  return (
    <div className={styles.container}>
      <i className={`fas fa-check-circle ${styles.icon}`}></i>
      <h2 className={styles.title}>Thank You!</h2>
      <p className={styles.message}>Your order has been placed successfully.</p>
      <Link href="/" className={styles.button}>
        Continue Shopping
      </Link>
    </div>
  );
}