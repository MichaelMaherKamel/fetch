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

// import { withContentlayer } from 'next-contentlayer'

// /**
//  * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
//  * for Docker builds.
//  */

// await import('./src/env.mjs')

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   async redirects() {
//     return [
//       {
//         source: '/dashboard',
//         destination: '/dashboard/stores',
//         permanent: true,
//       },
//     ]
//   },
//   images: {
//     domains: ['uploadthing.com', 'utfs.io'],
//   },
//   experimental: {
//     ppr: true,
//   },
// }
// module.exports = nextConfig

// export default withContentlayer(nextConfig)
