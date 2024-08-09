/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: true,
  },
  //   ignore all the console log
  
  //   typescript: {
  //     ignoreBuildErrors: true,
  //   }
};

export default nextConfig;
