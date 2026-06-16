/** @type {import('next').NextConfig} */
const nextConfig = {
 reactCompiler: true,
 async redirects() {
  return [
   {
    source: "/misyon-vizyon",
    destination: "/hakkimizda",
    permanent: true,
   },
  ];
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
