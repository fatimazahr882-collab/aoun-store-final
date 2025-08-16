import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { CheckoutProvider } from './context/CheckoutContext';
import { SpeedInsights } from "@vercel/speed-insights/next"; // 1. IMPORT THE COMPONENT

// Your metadata object remains the same
export const metadata = {
  title: {
    template: '%s | Aoun Store',
    default: 'Aoun Store - Premium Eastern Clothing for Women',
  },
  description: 'Discover the latest in premium Eastern fashion at Aoun Store...',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ... (your head content: favicons, font awesome link) ... */}
      </head>
      <body>
        <CheckoutProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </CheckoutProvider>
        <SpeedInsights /> {/* 2. ADD THE COMPONENT HERE, RIGHT BEFORE </body> */}
      </body>
    </html>
  );
}