/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  async redirects() {
    return [
      {
        source: '/signin',
        destination: '/?auth=signin',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
