import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';

// Restoring your full, correct SEO metadata
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
          NO FAVICON LINKS HERE. 
          Next.js will automatically use the favicon.ico file you placed in the app/ folder.
        */}
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}