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
}

module.exports = nextConfig
