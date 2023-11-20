import type { Metadata } from 'next'
import { env } from '@/lib/env.mjs'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import ProductForm from '@/components/products/ProductForm'

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: 'New Product',
  description: 'Add a new product',
}

interface NewProductPageProps {
  params: {
    storeId: string
  }
}

export default async function NewProductPage({ params }: NewProductPageProps) {
  const storeId = Number(params.storeId)

  return (
    <Card>
      <CardHeader className='space-y-1'>
        <CardTitle className='text-2xl'>Add product</CardTitle>
        <CardDescription>Add a new product to your store</CardDescription>
      </CardHeader>
      <CardContent>
        <ProductForm storeId={storeId} />
      </CardContent>
    </Card>
  )
}
