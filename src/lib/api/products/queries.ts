import { eq } from 'drizzle-orm'

import { db } from '@/lib/db'
import { stores } from '@/lib/db/schema/stores'
import { type ProductId, productIdSchema, products } from '@/lib/db/schema/products'

export const getProducts = async () => {
  const p = await db
    .select({ product: products, store: stores })
    .from(products)
    .leftJoin(stores, eq(products.storeId, stores.id))
  return { products: p }
}

export const getProductById = async (id: ProductId) => {
  const { id: productId } = productIdSchema.parse({ id })
  const [p] = await db
    .select()
    .from(products)
    .where(eq(products.id, productId))
    .leftJoin(stores, eq(products.storeId, stores.id))
  return { product: p }
}
