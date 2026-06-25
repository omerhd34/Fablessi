/** @type {import('next').NextConfig} */
const nextConfig = {
 productionBrowserSourceMaps: true,
 reactCompiler: true,
 experimental: {
  inlineCss: true,
  optimizePackageImports: [
   "embla-carousel-react",
   "react-icons",
   "react-icons/md",
   "react-icons/fa",
   "react-icons/lu",
   "react-icons/tb",
   "radix-ui",
  ],
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
  formats: ["image/avif", "image/webp"],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3200],
  qualities: [62, 65, 75],
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
