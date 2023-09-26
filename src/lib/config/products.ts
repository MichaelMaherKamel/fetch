// import { type SelectProduct } from '@/db/schema'

import { Option } from '../types'

export const sortOptions = [
  { label: 'Date: Old to new', value: 'createdAt.asc' },
  {
    label: 'Date: New to old',
    value: 'createdAt.desc',
  },
  { label: 'Price: Low to high', value: 'price.asc' },
  { label: 'Price: High to low', value: 'price.desc' },
  {
    label: 'Alphabetical: A to Z',
    value: 'name.asc',
  },
  {
    label: 'Alphabetical: Z to A',
    value: 'name.desc',
  },
]

export const productCategories = [
  {
    title: 'Women',
    image: '/images/womenswear.webp',
    slug: 'women',
    subcategories: [
      {
        title: 'New in',
        image: '/images/deck-one.webp',
        slug: 'new-in',
      },
      {
        title: 'Brands',
        image: '/images/wheel-one.webp',
        slug: 'designers',
      },
      {
        title: 'Clothing',
        image: '/images/truck-one.webp',
        slug: 'clothing',
      },
      {
        title: 'Shoes',
        image: '/images/bearing-one.webp',
        slug: 'shoes',
      },
      {
        title: 'Bags',
        image: '/images/griptape-one.webp',
        slug: 'bags-purses',
      },
      {
        title: 'Accesssories',
        image: '/images/hardware-one.webp',
        slug: 'accesssories',
      },
      {
        title: 'Jewellery',
        image: '/images/tool-one.webp',
        slug: 'jewellery',
      },
    ],
  },
  {
    title: 'Men',
    image: '/images/menswear.webp',
    slug: 'men',
    subcategories: [
      {
        title: 'New in',
        slug: 'new-in',
      },
      {
        title: 'Brands',
        slug: 'designers',
      },
      {
        title: 'Clothing',
        slug: 'clothing',
      },
      {
        title: 'Shoes',
        slug: 'shoes',
      },
      {
        title: 'Trainers',
        slug: 'trainers',
      },
      {
        title: 'Accesssories',
        slug: 'accesssories',
      },
      {
        title: 'Watches',
        slug: 'watches',
      },
    ],
  },
  {
    title: 'Kids',
    image: '/images/kidswear.webp',
    slug: 'kids',
    subcategories: [
      {
        title: 'New in',
        slug: 'new-in',
      },
      {
        title: 'Brands',
        slug: 'designers',
      },
      {
        title: 'Baby (0-2 yrs)',
        slug: 'kids-1',
      },
      {
        title: 'Baby (3-12 yrs)',
        slug: 'kids-2',
      },
      {
        title: 'Baby (13-16 yrs)',
        slug: 'kids-3',
      },
    ],
  },
] satisfies {
  // title: SelectProduct['category']
  title: string
  image: string
  slug: string
  subcategories: {
    title: string
    description?: string
    image?: string
    slug: string
  }[]
}[]

export const productTags = ['new', 'sale', 'bestseller', 'featured', 'popular', 'trending', 'limited', 'exclusive']

export function getSubcategories(category?: string): Option[] {
  if (!category) return []

  const subcategories =
    productCategories
      .find((c) => c.title === category)
      ?.subcategories.map((s) => ({
        label: s.title,
        value: s.slug,
      })) ?? []

  return subcategories
}
