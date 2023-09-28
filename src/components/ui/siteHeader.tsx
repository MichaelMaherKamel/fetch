import Link from 'next/link'
import { siteConfig } from '@/lib/config/site'
import { dashboardConfig } from '@/lib/config/dashboard'

import { Icons } from '@/components/ui/icons'
import { ThemeToggle } from './theme-toggle'

import User from '@/components/account/User'

import { MainNav } from './main-nav'
import { MobileNav } from './mobile-nav'

const SiteHeader = () => {
  return (
    <header className='sticky top-0 z-40 w-full border-b bg-background'>
      <div className='container mx-auto px-4 h-16 flex items-center justify-between'>
        <MainNav items={siteConfig.mainNav} />
        <MobileNav mainNavItems={siteConfig.mainNav} sidebarNavItems={dashboardConfig.sidebarNav} />
        <div className='flex items-center space-x-4'>
          <nav className='flex items-center space-x-2'>
            <ThemeToggle />
            <User />
          </nav>
        </div>
      </div>
    </header>
  )
}

export default SiteHeader
