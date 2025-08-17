// app/layout.js

import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { CheckoutProvider } from './context/CheckoutContext';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter } from 'next/font/google';

// 1. IMPORT THE NEW WRAPPER COMPONENT. The dynamic import is no longer here.
import ClientComponents from './components/ClientComponents';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: {
    template: '%s | Aoun Store',
    default: 'Aoun Store - Premium Eastern Clothing for Women',
  },
  description: 'Discover the latest in premium Eastern fashion at Aoun Store...',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}> 
      <head>
        {/* ... (your head content) ... */}
      </head>
      <body>
        <CheckoutProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </CheckoutProvider>
        <SpeedInsights />
        
        {/* 2. RENDER THE WRAPPER COMPONENT. It will handle loading the WhatsApp button correctly. */}
        <ClientComponents />
      </body>
    </html>
  );
}