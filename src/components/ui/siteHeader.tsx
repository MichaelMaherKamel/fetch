import Link from 'next/link'
import { siteConfig } from '@/lib/config/site'

import { Icons } from './icons'
import { ThemeToggle } from './theme-toggle'
import User from '@/components/auth/User'

const SiteHeader = () => {
  return (
    <header className='sticky top-0 z-40 w-full border-b bg-background'>
      <div className='container flex h-16 items-center justify-between'>
        <Link aria-label='Home' href='/' className='items-center space-x-2 lg:flex'>
          <Icons.logo
            size={40}
            color='#306d88'
            strokeWidth={1.5}
            aria-hidden='true'
            className='hidden lg:inline-block'
          />
          <span className='text-2xl bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-indigo-600 lg:inline-block '>
            {siteConfig.name.toUpperCase()}
          </span>
        </Link>
        <nav className='flex items-center space-x-4'>
          <ThemeToggle />
          <User />
        </nav>
      </div>
    </header>
  )
}

export default SiteHeader
