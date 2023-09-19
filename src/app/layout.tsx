import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { siteConfig } from '@/lib/site'
import NextAuthProvider from '@/lib/auth/Provider'
import TrpcProvider from '@/lib/trpc/Provider'
import { NextUiProviders } from '@/lib/themeprovider/nextuiproviders'

const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: 'Fetch',
  description: 'Fetch E-Commerce',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <NextAuthProvider>
          <NextUiProviders>
            <TrpcProvider>{children}</TrpcProvider>
          </NextUiProviders>
        </NextAuthProvider>
      </body>
    </html>
  )
}
