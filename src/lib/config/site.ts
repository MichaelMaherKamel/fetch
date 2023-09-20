import { productCategories } from './products'

import { slugify } from './utils'

export const siteConfig = {
  name: 'Fetch',
  description: 'Empowering fashion, global platform uniting creators and consumers',
  goal: 'Buy and sell clothing products from local and global brands and stores',
  url: 'https://fetch-iota.vercel.app',
  navItems: [
    ...productCategories.map((category) => ({
      title: category.title,
      items: [
        {
          title: 'All',
          href: `/shopping/${slugify(category.title)}`,
          description: `All ${category.title}.`,
          items: [],
        },
        ...category.subcategories.map((subcategory) => ({
          title: subcategory.title,
          href: `/shopping/${slugify(category.title)}/${subcategory.slug}`,
          items: [],
        })),
      ],
    })),
  ],
  //   navMenuItems: [
  //     {
  //       label: 'Profile',
  //       href: '/profile',
  //     },
  //     {
  //       label: 'Dashboard',
  //       href: '/dashboard',
  //     },
  //     {
  //       label: 'Projects',
  //       href: '/projects',
  //     },
  //     {
  //       label: 'Team',
  //       href: '/team',
  //     },
  //     {
  //       label: 'Calendar',
  //       href: '/calendar',
  //     },
  //     {
  //       label: 'Settings',
  //       href: '/settings',
  //     },
  //     {
  //       label: 'Help & Feedback',
  //       href: '/help-feedback',
  //     },
  //     {
  //       label: 'Logout',
  //       href: '/logout',
  //     },
  //   ],
  footerNav: [
    {
      title: 'Help',
      items: [
        {
          title: 'About',
          href: '/about',
          external: false,
        },
        {
          title: 'Contact',
          href: '/contact',
          external: false,
        },
        {
          title: 'Terms',
          href: '/terms',
          external: false,
        },
        {
          title: 'Privacy',
          href: '/privacy',
          external: false,
        },
      ],
    },
  ],
  footerNaVSocail: [
    {
      title: 'Follow Us',
      items: [
        {
          title: 'Instgram',
          href: '#',
          //external: true,
          icon: 'instgram',
        },
        {
          title: 'Facebook',
          href: '#',
          //external: true,
          icon: 'facebook',
        },
        {
          title: 'GitHub',
          href: 'https://github.com/MichaelMaherKamel/fetch',
          //external: true,
          icon: 'github',
        },
      ],
    },
  ],
}

export type SiteConfig = typeof siteConfig
