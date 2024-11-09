/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  experimental: {
    webVitalsAttribution: ['CLS', 'LCP']
  }
};

module.exports = nextConfig;