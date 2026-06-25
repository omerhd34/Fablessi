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
