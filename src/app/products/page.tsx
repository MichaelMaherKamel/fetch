import Image from 'next/image'

import NewProductModal from '@/components/products/ProductModal'
import { getProducts } from '@/lib/api/products/queries'
import { serverClient } from '@/lib/trpc/server'
import { type Product } from '@/lib/db/schema/products'

export const dynamic = 'force-dynamic'

export default async function Products() {
  const { products } = await serverClient.products.getProducts()

  return (
    <main className='max-w-3xl mx-auto p-5 md:p-0 sm:pt-4'>
      <div className='flex justify-between'>
        <h1 className='font-semibold text-2xl my-2'>Products</h1>
      </div>
      {products.length > 0 ? (
        products.map((product: Product, index: number) => (
          <div key={index}>
            <h1>
              {product.id} {product.name}
            </h1>
            {product.images && product.images.length > 0 && (
              <div>
                {product.images.map((image, imageIndex) => (
                  <Image
                    width={100}
                    height={100}
                    key={imageIndex}
                    src={image.url}
                    alt={`Product Image ${imageIndex}`}
                  />
                ))}
              </div>
            )}
          </div>
        ))
      ) : (
        <>
          <h1>No Products</h1>
        </>
      )}
      <NewProductModal />
    </main>
  )
}
