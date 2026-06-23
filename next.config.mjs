/** @type {import('next').NextConfig} */
const nextConfig = {
 productionBrowserSourceMaps: true,
 reactCompiler: true,
 experimental: {
  optimizePackageImports: ["embla-carousel-react", "react-icons"],
 },
 async rewrites() {
  return [
   {
    source: "/favicon.ico",
    destination: "/brand/favicon.ico",
   },
  ];
 },
 images: {
  remotePatterns: [
   {
    protocol: "https",
    hostname: "res.cloudinary.com",
    pathname: "/**",
   },
  ],
 },
};

export default nextConfig;
