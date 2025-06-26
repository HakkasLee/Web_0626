const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: isProd ? '/Web_0626' : '',
  assetPrefix: isProd ? '/Web_0626/' : '',
};

export default nextConfig; 