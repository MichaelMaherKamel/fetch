import { notFound } from 'next/navigation'

import { Shell } from '@/components/ui/shell'
import Dashboard from '@/components/dashboard/dashboard'

import { serverClient } from '@/lib/trpc/server'

interface StorePageProps {
  children: React.ReactNode
  params: {
    storeId: string
  }
}

export default async function StorePage({ children, params }: StorePageProps) {
  const StoreID = Number(params.storeId)
  const stores = await serverClient.stores.getStores()
  const store = stores.stores.find((store) => store.id === StoreID)
  if (!store) {
    notFound()
  }
  return (
    <Shell variant='sidebar' className='gap-4'>
      <div className='flex items-center space-x-4'></div>
      <div className='space-y-4 overflow-hidden'>
        <Dashboard storeId={StoreID} />
        {children}
      </div>
    </Shell>
  )
}
