import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NextAuthProvider from '@/lib/auth/Provider'
import { ThemeProvider } from '@/components/ui/theme-provider'
import TrpcProvider from '@/lib/trpc/Provider'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Fetch',
  description: 'Fetch Fashion E-Commerce',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <NextAuthProvider>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            <TrpcProvider>
              {children}
              <Toaster />
            </TrpcProvider>
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}
