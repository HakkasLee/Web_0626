const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/Web_0626',
  assetPrefix: '/Web_0626/',
  images: {
    unoptimized: true,
  },
};

export default nextConfig; 