/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        // This is your existing rule for postimg.cc images.
        protocol: 'https',
        hostname: 'i.postimg.cc',
        port: '',
        pathname: '/**',
      },
      {
        // This is your existing rule for Supabase product images.
        protocol: 'https',
        hostname: 'dkoglkvbkxnvsobxigfm.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/productimages/**',
      },
      {
        // THIS IS THE NEW RULE for your banner images from i.ibb.co.
        protocol: 'https',
        hostname: 'i.ibb.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;