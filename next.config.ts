import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['res.cloudinary.com'],  
  },
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/products', // When this is called in the frontend
        destination: 'http://localhost:8000/api/products', 
      },
    ];
  },
};

export default nextConfig;

