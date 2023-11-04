import { z } from 'zod'

import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { varchar, text, serial, mysqlTable, json, mysqlEnum, decimal, int, timestamp } from 'drizzle-orm/mysql-core'

import type { StoredFile } from '@/lib/types/index'
import { getProducts } from '@/lib/api/products/queries'

export const products = mysqlTable('products', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 191 }).notNull(),
  description: text('description'),
  images: json('images').$type<StoredFile[] | null>().default(null),
  category: mysqlEnum('category', ['Women', 'Men', 'Kids']).notNull().default('Women'),
  subcategory: varchar('subcategory', { length: 191 }),
  price: decimal('price', { precision: 10, scale: 2 }).notNull().default('0'),
  inventory: int('inventory').notNull().default(0),
  storeId: int('storeId').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
})

export const productSchema = z.object({
  name: z.string().min(1, {
    message: 'Must be at least 1 character',
  }),
  description: z.string().optional(),
  category: z
    .enum(products.category.enumValues, {
      required_error: 'Must be a valid category',
    })
    .default(products.category.enumValues[0]),
  subcategory: z.string(),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: 'Must be a valid price',
  }),
  inventory: z.number(),
  images: z
    .unknown()
    .refine((val) => {
      if (!Array.isArray(val)) return false
      if (val.some((file) => !(file instanceof File))) return false
      return true
    }, 'Must be an array of File')
    .optional()
    .nullable()
    .default(null),
})

// Schema for products - used to validate API requests

export const insertProductSchema = createInsertSchema(products, {
  name: z.string().min(1, {
    message: 'Must be at least 1 character',
  }),
  description: z.string().optional(),
  category: z
    .enum(products.category.enumValues, {
      required_error: 'Must be a valid category',
    })
    .default(products.category.enumValues[0]),
  subcategory: z.string(),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: 'Must be a valid price',
  }),
  inventory: z.number(),
  storeId: z.number(),
  images: z
    .object({
      id: z.string(),
      name: z.string(),
      url: z.string(),
    })
    .array()
    .optional()
    .nullable()
    .default(null),
}).omit({
  id: true,
  createdAt: true,
})

export const insertProductParams = createSelectSchema(products, {
  name: z.string().min(1, {
    message: 'Must be at least 1 character',
  }),
  description: z.string().optional(),
  category: z
    .enum(products.category.enumValues, {
      required_error: 'Must be a valid category',
    })
    .default(products.category.enumValues[0]),
  subcategory: z.string(),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: 'Must be a valid price',
  }),
  inventory: z.number(),
  storeId: z.number(),
  images: z
    .object({
      id: z.string(),
      name: z.string(),
      url: z.string(),
    })
    .array()
    .optional()
    .nullable()
    .default(null),
}).omit({
  id: true,
  createdAt: true,
})

export const updateProductSchema = createSelectSchema(products, {
  name: z.string().min(1, {
    message: 'Must be at least 1 character',
  }),
  description: z.string().optional(),
  category: z
    .enum(products.category.enumValues, {
      required_error: 'Must be a valid category',
    })
    .default(products.category.enumValues[0]),
  subcategory: z.string(),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: 'Must be a valid price',
  }),
  inventory: z.number(),
  storeId: z.number(),
  images: z
    .object({
      id: z.string(),
      name: z.string(),
      url: z.string(),
    })
    .array()
    .optional()
    .nullable()
    .default(null),
}).omit({
  createdAt: true,
})

export const updateProductParams = createSelectSchema(products, {
  name: z.string().min(1, {
    message: 'Must be at least 1 character',
  }),
  description: z.string().optional(),
  category: z
    .enum(products.category.enumValues, {
      required_error: 'Must be a valid category',
    })
    .default(products.category.enumValues[0]),
  subcategory: z.string(),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: 'Must be a valid price',
  }),
  inventory: z.number(),
  storeId: z.number(),
  images: z
    .object({
      id: z.string(),
      name: z.string(),
      url: z.string(),
    })
    .array()
    .optional()
    .nullable()
    .default(null),
}).omit({
  createdAt: true,
})

export const productIdSchema = updateProductSchema.pick({ id: true })

// Types for products - used to type API request params and within Components
export type Product = z.infer<typeof updateProductSchema>
export type NewProduct = z.infer<typeof insertProductSchema>
export type NewProductParams = z.infer<typeof insertProductParams>
export type UpdateProductParams = z.infer<typeof updateProductParams>
export type ProductId = z.infer<typeof productIdSchema>['id']

// this type infers the return from getProducts() - meaning it will include any joins
export type CompleteProduct = Awaited<ReturnType<typeof getProducts>>['products'][number]
