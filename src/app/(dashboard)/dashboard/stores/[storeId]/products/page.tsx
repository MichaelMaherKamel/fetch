import { notFound } from 'next/navigation'

import { db } from '@/lib/db'

import { products, type Product } from '@/lib/db/schema/products'
import { and, asc, desc, eq, gte, inArray, like, lte, sql } from 'drizzle-orm'

import { dashboardProductsSearchParamsSchema } from '@/lib/validations/params'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import { ProductsTableShell } from '@/components/shells/products-table-shell'

import { serverClient } from '@/lib/trpc/server'
import { trpc } from '@/lib/trpc/client'
import ProductsTab from '@/components/dashboard/tabs/productsTab'

export const dynamic = 'force-dynamic'

interface ProductsPageProps {
  params: {
    storeId: string
  }
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function ProductsPage({ params, searchParams }: ProductsPageProps) {
  const storeId = Number(params.storeId)

  // Parse search params using zod schema
  const { page, per_page, sort, name, category, from, to } = dashboardProductsSearchParamsSchema.parse(searchParams)

  const store = await serverClient.stores.getStoreById({ id: storeId })

  if (!store) {
    notFound()
  }

  // Fallback page for invalid page numbers
  const pageAsNumber = Number(page)
  const fallbackPage = isNaN(pageAsNumber) || pageAsNumber < 1 ? 1 : pageAsNumber
  // Number of items per page
  const perPageAsNumber = Number(per_page)
  const limit = isNaN(perPageAsNumber) ? 10 : perPageAsNumber
  // Number of items to skip
  const offset = fallbackPage > 0 ? (fallbackPage - 1) * limit : 0
  // Column and order to sort by
  const [column, order] = (sort?.split('.') as [keyof Product | undefined, 'asc' | 'desc' | undefined]) ?? [
    'createdAt',
    'desc',
  ]

  const categories = (category?.split('.') as Product['category'][]) ?? []

  const fromDay = from ? new Date(from) : undefined
  const toDay = to ? new Date(to) : undefined

  // Transaction is used to ensure both queries are executed in a single transaction
  // const { items, count } = await db.transaction(async (tx) => {
  //   const items = await tx
  //     .select()
  //     .from(products)
  //     .limit(limit)
  //     .offset(offset)
  //     .where(
  //       and(
  //         eq(products.storeId, storeId),
  //         // Filter by name
  //         name ? like(products.name, `%${name}%`) : undefined,
  //         // Filter by category
  //         categories.length > 0 ? inArray(products.category, categories) : undefined,
  //         // Filter by createdAt
  //         fromDay && toDay ? and(gte(products.createdAt, fromDay), lte(products.createdAt, toDay)) : undefined
  //       )
  //     )
  //     .orderBy(
  //       column && column in products
  //         ? order === 'asc'
  //           ? asc(products[column])
  //           : desc(products[column])
  //         : desc(products.createdAt)
  //     )

  //   const count = await tx
  //     .select({
  //       count: sql<number>`count(${products.id})`,
  //     })
  //     .from(products)
  //     .where(
  //       and(
  //         eq(products.storeId, storeId),
  //         // Filter by name
  //         name ? like(products.name, `%${name}%`) : undefined,
  //         // Filter by category
  //         categories.length > 0 ? inArray(products.category, categories) : undefined,
  //         // Filter by createdAt
  //         fromDay && toDay ? and(gte(products.createdAt, fromDay), lte(products.createdAt, toDay)) : undefined
  //       )
  //     )
  //     .then((res) => res[0]?.count ?? 0)

  //   return {
  //     items,
  //     count,
  //   }
  // })

  const { items, count } = await serverClient.products.productFilter({
    storeId: storeId,
    name: name,
    category: category,
    from: from,
    to: to,
    page: Number(page),
    per_page: Number(per_page),
    sort: sort,
  })

  const pageCount = Math.ceil(count / limit)

  return (
    <div className='space-y-6'>
      <div className='flex flex-col gap-4 xs:flex-row xs:items-center xs:justify-between'>
        <h2 className='text-2xl font-bold tracking-tight'>Products</h2>
        <DateRangePicker align='end' />
      </div>
      <ProductsTableShell data={items} pageCount={pageCount} storeId={storeId} />
    </div>
  )
}
