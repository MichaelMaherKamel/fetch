import Link from 'next/link'

import { Icons } from '@/components/ui/icons'
import User from '@/components/account/User'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import StoreSwitcher from '@/components/dashboard/store-switcher'

import { siteConfig } from '@/lib/config/site'
import { serverClient } from '@/lib/trpc/server'

export const DashboardHeader = async () => {
  const stores = await serverClient.stores.getStores()
  return (
    <header className='sticky top-0 z-40 w-full border-b bg-background'>
      <div className='container mx-auto px-4 h-16 flex items-center justify-between'>
        <div className='flex items-center justify-between space-x-4'>
          <Link aria-label='Home' href='/' className='flex items-center space-x-2'>
            <Icons.logo className='h-6 w-6' aria-hidden='false' />
            <span className='hidden font-bold lg:inline-block'>{siteConfig.name}</span>
          </Link>
          <StoreSwitcher className='ml-2' initialStores={stores} />
        </div>

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
