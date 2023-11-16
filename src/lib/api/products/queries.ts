import { db } from '@/lib/db'
import { products, type Product } from '@/lib/db/schema/products'
import { and, asc, desc, eq, gte, inArray, like, lte, sql } from 'drizzle-orm'
import { type ProductId, productIdSchema } from '@/lib/db/schema/products'

export const getProducts = async () => {
  const p = await db.select().from(products)
  return { products: p }
}

export const getProductById = async (id: ProductId) => {
  const { id: productId } = productIdSchema.parse({ id })
  const [p] = await db.select().from(products).where(eq(products.id, productId))
  return { product: p }
}

export async function productFilter({
  storeId,
  name,
  category,
  from,
  to,
  page = 1,
  per_page = 10,
  sort,
}: {
  storeId: number
  name?: string
  category?: string
  from?: string
  to?: string
  page?: number
  per_page?: number
  sort?: string
}) {
  // Fallback page for invalid page numbers
  const pageAsNumber = Number(page)
  const fallbackPage = isNaN(pageAsNumber) || pageAsNumber < 1 ? 1 : pageAsNumber
  // Number of items per page
  const perPageAsNumber = Number(per_page)
  const limit = isNaN(perPageAsNumber) ? 10 : perPageAsNumber
  // Number of items to skip
  const offset = fallbackPage > 0 ? (fallbackPage - 1) * limit : 0
  // Column and order to sort by
  const [column, order] = (sort?.split('.') as [keyof Product | undefined, 'asc' | 'desc']) ?? ['createdAt', 'desc']

  const categories = (category?.split('.') as Product['category'][]) ?? []

  const fromDay = from ? new Date(from) : undefined
  const toDay = to ? new Date(to) : undefined

  return db.transaction(async (tx) => {
    const items = await tx
      .select()
      .from(products)
      .limit(limit)
      .offset(offset)
      .where(
        and(
          eq(products.storeId, storeId),
          name ? like(products.name, `%${name}%`) : undefined,
          categories.length > 0 ? inArray(products.category, categories) : undefined,
          fromDay && toDay ? and(gte(products.createdAt, fromDay), lte(products.createdAt, toDay)) : undefined
        )
      )
      .orderBy(
        column && column in products
          ? order === 'asc'
            ? asc(products[column])
            : desc(products[column])
          : desc(products.createdAt)
      )

    const count = await tx
      .select({
        count: sql<number>`count(${products.id})`,
      })
      .from(products)
      .where(
        and(
          eq(products.storeId, storeId),
          name ? like(products.name, `%${name}%`) : undefined,
          categories.length > 0 ? inArray(products.category, categories) : undefined,
          fromDay && toDay ? and(gte(products.createdAt, fromDay), lte(products.createdAt, toDay)) : undefined
        )
      )
      .then((res) => res[0]?.count ?? 0)

    return {
      items,
      count,
    }
  })
}
