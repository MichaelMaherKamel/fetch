import type { FooterItem, MainNavItem, FooterNavSocial } from '@/lib/types/index'

import { productCategories } from './products'
import { slugify } from '@/lib/utils'

export type SiteConfig = typeof siteConfig

const links = {
  instgram: '#',
  facebook: '#',
}

export const siteConfig = {
  name: 'Fetch',
  description: 'Empowering fashion, global platform uniting creators and consumers',
  goal: 'Buy and sell clothing products from local and global brands and stores',
  url: 'https://fetch-iota.vercel.app',
  ogImage: '/images/fetchStore.webp',
  mainNav: [
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
  ] satisfies MainNavItem[],
  links,
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
  ] satisfies FooterItem[],
  footerNaVSocail: [
    {
      title: 'Follow Us',
      items: [
        {
          title: 'Instgram',
          href: links.instgram,
          //external: true,
          icon: 'instgram',
        },
        {
          title: 'Facebook',
          href: links.facebook,
          //external: true,
          icon: 'facebook',
        },
      ],
    },
  ] satisfies FooterNavSocial[],
}
