import { type SidebarNavItem } from '@/lib/types/index'

export interface DashboardConfig {
  sidebarNav: SidebarNavItem[]
}

export const dashboardConfig: DashboardConfig = {
  sidebarNav: [
    {
      title: 'Analytics',
      slug: 'analytics',
      href: '/dashboard/analytics',
      items: [],
    },
    {
      title: 'Settings',
      slug: 'settings',
      href: '/dashboard/store-settings',
      items: [],
    },
    {
      title: 'Products',
      slug: 'products',
      href: '/dashboard/products',
      items: [],
    },
    {
      title: 'Orders',
      slug: 'orders',
      href: '/dashboard/orders',
      items: [],
    },
    {
      title: 'Customers',
      slug: 'customers',
      href: '/dashboard/customers',
      items: [],
    },
  ],
}
