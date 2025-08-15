import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { CheckoutProvider } from './context/CheckoutContext'; // Import the new provider

// This is your full, correct SEO metadata.
export const metadata = {
  title: {
    template: '%s | Aoun Store',
    default: 'Aoun Store - Premium Eastern Clothing for Women',
  },
  description: 'Discover the latest in premium Eastern fashion at Aoun Store. Shop exclusive lawn, summer, and unstitched collections with COD across Pakistan.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* 
          No favicon links are needed here. 
          Next.js will automatically use the favicon.ico file located in your app/ folder.
        */}
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        />
      </head>
      <body>
        {/* 
          ===================================================================
          THE CHANGE: We wrap the entire application in the CheckoutProvider.
          This makes the checkout "brain" available to all pages.
          ===================================================================
        */}
        <CheckoutProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </CheckoutProvider>
      </body>
    </html>
  );
}