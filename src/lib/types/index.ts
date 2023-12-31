import { type z } from 'zod'
import { type Icons } from '@/components/ui/icons'

import { type FileWithPath } from 'react-dropzone'

export interface StoredFile {
  id: string
  name: string
  url: string
}

export interface Option {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
}

export interface NavItem {
  title: string
  slug?: string
  href?: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
  label?: string
  description?: string
}

// export interface AccountNavItem {
//   title: string
//   href?: string
//   icon?: keyof typeof Icons
// }

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[]
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[]
}

export interface FooterItem {
  title: string
  items: {
    title: string
    href: string
    external?: boolean
    icon?: keyof typeof Icons
  }[]
}

export interface FooterNavSocial {
  title: string
  items: {
    title: string
    href: string
    external?: boolean
    icon?: keyof typeof Icons
  }[]
}

export type MainNavItem = NavItemWithOptionalChildren

export type SidebarNavItem = NavItemWithChildren

export interface StoredFile {
  id: string
  name: string
  url: string
}

export type FileWithPreview = FileWithPath & {
  preview: string
}

export interface DataTableSearchableColumn<TData> {
  id: keyof TData
  title: string
}

export interface DataTableFilterableColumn<TData> extends DataTableSearchableColumn<TData> {
  options: Option[]
}
