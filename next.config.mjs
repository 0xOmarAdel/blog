/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["www.leetdesk.com", "lh3.googleusercontent.com"],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "mongodb-client-encryption": false,
      aws4: false,
    };
    return config;
  },
};

export default nextConfig;
