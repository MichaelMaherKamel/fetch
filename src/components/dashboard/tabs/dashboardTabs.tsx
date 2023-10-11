'use client'

import { cn } from '@/lib/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { usePathname, useRouter } from 'next/navigation'

interface DashboardTabsProps extends React.ComponentPropsWithoutRef<typeof Tabs> {
  storeId: number
}

export const DashboardTabs = ({ className, storeId, ...props }: DashboardTabsProps) => {
  const router = useRouter()
  const pathname = usePathname()

  const tabs = [
    {
      title: 'Analytics',
      href: `/dashboard/${storeId}/analytics`,
    },
    {
      title: 'Products',
      href: `/dashboard/${storeId}/products`,
    },
    {
      title: 'Orders',
      href: `/dashboard/${storeId}/orders`,
    },
    {
      title: 'Settings',
      href: `/dashboard/${storeId}/settings`,
    },
  ]

  return (
    <Tabs
      {...props}
      onValueChange={(value) => {
        router.push(value)
      }}
    >
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.title}
            value={tab.href}
            className={cn(
              'px-4 py-2 text-sm font-medium leading-5 text-gray-500 rounded-md hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:text-gray-700 focus:bg-gray-100',
              pathname === tab.href
                ? 'text-gray-700 bg-gray-100'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            )}
          >
            {tab.title}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
