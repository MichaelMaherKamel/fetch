import { type SidebarNavItem } from '@/lib/types/index'

export interface DashboardConfig {
  sidebarNav: SidebarNavItem[]
}

export const dashboardConfig: DashboardConfig = {
  sidebarNav: [
    {
      title: 'Account',
      href: '/account/settings',
      icon: 'user',
      items: [],
    },
    {
      title: 'Appearance',
      href: '/account/appearance',
      icon: 'sunmoon',
      items: [],
    },
    {
      title: 'Billing',
      href: '/account/paymentmethod',
      icon: 'billing',
      items: [],
    },
  ],
}
