import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { serverClient } from '@/lib/trpc/server'
import { env } from '@/lib/env.mjs'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import ProductForm from '@/components/products/ProductForm'

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: 'Manage Product',
  description: 'Manage your product',
}

interface UpdateProductPageProps {
  params: {
    storeId: string
    productId: string
  }
}

export default async function UpdateProductPage({ params }: UpdateProductPageProps) {
  const storeId = Number(params.storeId)
  const productId = Number(params.productId)

  const { product } = await serverClient.products.getProductById({ id: productId })

  if (!product) {
    notFound()
  }

  return (
    <Card>
      <CardHeader className='space-y-1'>
        <div className='flex items-center justify-between space-x-2'>
          <CardTitle className='text-2xl'>{` Update '${product.name}' product`}</CardTitle>
        </div>
        <CardDescription>Update your product information, or delete it</CardDescription>
      </CardHeader>
      <CardContent>
        <ProductForm product={product} storeId={storeId} />
      </CardContent>
    </Card>
  )
}
