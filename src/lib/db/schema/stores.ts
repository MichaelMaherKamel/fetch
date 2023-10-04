import { varchar, text, serial, boolean, timestamp, mysqlTable } from 'drizzle-orm/mysql-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { getStores } from '@/lib/api/stores/queries'

export const stores = mysqlTable('stores', {
  id: serial('id').primaryKey(),
  userId: varchar('userId', { length: 191 }).notNull(),
  name: varchar('name', { length: 191 }).notNull(),
  description: text('description'),
  slug: text('slug'),
  active: boolean('active').notNull().default(true),
  stripeAccountId: varchar('stripeAccountId', { length: 191 }),
  createdAt: timestamp('createdAt').defaultNow(),
})

// Schema for stores - used to validate API requests
export const insertStoreSchema = createInsertSchema(stores)

export const insertStoreParams = createSelectSchema(stores, {}).omit({
  id: true,
  userId: true,
})

export const updateStoreSchema = createSelectSchema(stores)

export const updateStoreParams = createSelectSchema(stores, {}).omit({
  userId: true,
})

export const storeIdSchema = updateStoreSchema.pick({ id: true })

// Types for stores - used to type API request params and within Components
export type Store = z.infer<typeof updateStoreSchema>
export type NewStore = z.infer<typeof insertStoreSchema>
export type NewStoreParams = z.infer<typeof insertStoreParams>
export type UpdateStoreParams = z.infer<typeof updateStoreParams>
export type StoreId = z.infer<typeof storeIdSchema>['id']

// this type infers the return from getStores() - meaning it will include any joins
export type CompleteStore = Awaited<ReturnType<typeof getStores>>['stores'][number]
