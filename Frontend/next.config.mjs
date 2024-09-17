/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enable React Strict Mode
    reactStrictMode: true,
  
    // Enable SWC Minifier for faster builds
    swcMinify: true,
  
    // Add external domains for image optimization
    images: {
      domains: ['via.placeholder.com'], // Add any external domains you need here
    },
  
    // Optional: Set the base path if your app is deployed in a subdirectory
    // basePath: '/my-app',
  
    // Optional: Add experimental features
    experimental: {
      appDir: true, // Enable the new app directory for Next.js 13+
    },
  };
  
  export default nextConfig;
  