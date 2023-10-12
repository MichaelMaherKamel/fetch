import { z } from 'zod'

import { stores } from '@/lib/db/schema/stores'

import { relations } from 'drizzle-orm'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { varchar, serial, text, json, mysqlEnum, mysqlTable, decimal, int } from 'drizzle-orm/mysql-core'

import { serverClient } from '@/lib/trpc/server'

export const products = mysqlTable('products', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 191 }).notNull(),
  description: text('description'),
  images: json('images').default(null),
  category: mysqlEnum('category', ['Women', 'Men', 'Kids']).notNull(),
  subcategory: varchar('subcategory', { length: 191 }),
  price: decimal('price', { precision: 10, scale: 2 }).notNull().default('0.00'),
  inventory: int('inventory').notNull().default(0),
  rating: int('rating').notNull().default(0),
  storeId: int('storeId').notNull(),
})

export const productRelations = relations(products, ({ one }) => ({
  store: one(stores, { fields: [products.storeId], references: [stores.id] }),
}))

export const insertProductSchema = createInsertSchema(products)

export const insertProductParams = createSelectSchema(products, {}).omit({
  id: true,
  rating: true,
  storeId: true,
})

export const updateProductSchema = createSelectSchema(products, {}).omit({
  rating: true,
  storeId: true,
})

export const updateProductParams = createSelectSchema(products, {}).omit({
  rating: true,
  storeId: true,
})

export const productIdSchema = updateProductParams.pick({ id: true })

//Types for Products - used to type API request params and within Components
export type Product = z.infer<typeof updateProductSchema>
export type NewProduct = z.infer<typeof insertProductSchema>
export type NewProductParams = z.infer<typeof insertProductParams>
export type UpdateProductParams = z.infer<typeof updateProductParams>
export type ProductId = z.infer<typeof productIdSchema>['id']

// This type infers the return from getProducts() - meaning it will include any joins

export type CompleteProduct = Awaited<ReturnType<(typeof serverClient.products)['getProducts']>>
