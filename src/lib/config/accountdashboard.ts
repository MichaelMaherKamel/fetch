import { type SidebarNavItem } from '@/lib/types/index'

export interface AccountDashboardConfig {
  sidebarNav: SidebarNavItem[]
}

export const accountdashboardConfig: AccountDashboardConfig = {
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
