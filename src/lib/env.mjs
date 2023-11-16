import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'
import 'dotenv/config'

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    NEXT_PUBLIC_DATABASE_URL: z.string().min(1),
    NEXTAUTH_SECRET: process.env.NODE_ENV === 'production' ? z.string().min(1) : z.string().min(1).optional(),
    // NEXTAUTH_URL: z.preprocess(
    //   // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
    //   // Since NextAuth.js automatically uses the VERCEL_URL if present.
    //   (str) => process.env.VERCEL_URL ?? str,
    //   // VERCEL_URL doesn't include `https` so it cant be validated as a URL
    //   process.env.VERCEL_URL ? z.string().min(1) : z.string().url()
    // ),
    NEXTAUTH_URL: z.string().url(),
    NEXT_PUBLIC_APP_URL: z.string().url(),
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    // GITHUB_CLIENT_ID: z.string().min(1),
    // GITHUB_CLIENT_SECRET: z.string().min(1),
    RESEND_API_KEY: z.string().min(1),
  },
  client: {
    // NEXT_PUBLIC_PUBLISHABLE_KEY: z.string().min(1),
  },
  // runtimeEnv: {
  //   NODE_ENV: process.env.NODE_ENV,
  //   DATABASE_URL: process.env.DATABASE_URL,
  //   NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  //   NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  //   NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  //   GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  //   GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  //   RESEND_API_KEY: process.env.RESEND_API_KEY,
  //   // RESEND_API_KEY: process.env.RESEND_API_KEY,
  //   // EMAIL_FROM_ADDRESS: process.env.EMAIL_FROM_ADDRESS,
  //   UPLOADTHING_SECRET: process.env.UPLOADTHING_SECRET,
  //   UPLOADTHING_APP_ID: process.env.UPLOADTHING_APP_ID,
  //   // NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
  //   //   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  //   // STRIPE_API_KEY: process.env.STRIPE_API_KEY,
  //   // STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  //   // STRIPE_STD_MONTHLY_PRICE_ID: process.env.STRIPE_STD_MONTHLY_PRICE_ID,
  //   // STRIPE_PRO_MONTHLY_PRICE_ID: process.env.STRIPE_PRO_MONTHLY_PRICE_ID,
  // },
  // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
  // runtimeEnv: {
  //   DATABASE_URL: process.env.DATABASE_URL,
  //   NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
  // },
  // For Next.js >= 13.4.4, you only need to destructure client variables:
  experimental__runtimeEnv: {
    // NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
  },
})
