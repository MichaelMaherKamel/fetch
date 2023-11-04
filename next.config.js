/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/dashboard',
        destination: '/dashboard/stores',
        permanent: true,
      },
    ]
  },
  images: {
    domains: ['uploadthing.com', 'utfs.io'],
  },
}
module.exports = nextConfig
