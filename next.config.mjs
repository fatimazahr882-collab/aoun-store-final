/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        // This is for your banner images from the previous step.
        protocol: 'https',
        hostname: 'i.postimg.cc',
        port: '',
        pathname: '/**',
      },
      {
        // THIS IS THE NEW PART: Add this block for your Supabase product images.
        protocol: 'https',
        hostname: 'dkoglkvbkxnvsobxigfm.supabase.co', // Your Supabase project hostname
        port: '',
        pathname: '/storage/v1/object/public/productimages/**', // The path to your public images bucket
      },
    ],
  },
};

export default nextConfig;