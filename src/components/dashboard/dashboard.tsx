// import { Shell } from '@/components/ui/shell'
// import { PageHeader } from '@/components/ui/page-header'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
// import { OrdersTab } from '@/components/dashboard/tabs/ordersTab'
// import { StoreSettings } from '@/components/dashboard/tabs/settingsTab'
// import ProductsTab from '@/components/dashboard/tabs/productsTab'
// import { DashboardOverView } from '@/components/dashboard/tabs/dashboard-overview'
// import StoreSwitcher from '@/components/dashboard/store-switcher'

// import { serverClient } from '@/lib/trpc/server'

// interface DashboardProps {
//   storeId: Number
// }

// const Dashboard = async ({ storeId }: DashboardProps) => {
//   const storeID = Number(storeId)
//   const stores = await serverClient.stores.getStores()
//   const store = stores.stores.find((store) => store.id === storeID)
//   return (
//     <Shell as='div' className='gap-12 snap-y snap-proximity'>
//       <div className='flex flex-col'>
//         <div className='flex justify-between'>
//           <PageHeader title='Dashboard' description={`Manage ${store?.name}`} size='sm' />
//           <span>
//             <StoreSwitcher className='ml-2' initialStores={stores} storeId={storeID} />
//           </span>
//         </div>
//         <Tabs defaultValue='store' className='space-y-4 pt-6'>
//           <TabsList>
//             <TabsTrigger value='store'>Store</TabsTrigger>
//             <TabsTrigger value='products'>Products</TabsTrigger>
//             <TabsTrigger value='orders'>Orders</TabsTrigger>
//             <TabsTrigger value='analytics'>Analytics</TabsTrigger>
//           </TabsList>
//           <TabsContent value='analytics' className='space-y-4'>
//             <DashboardOverView />
//           </TabsContent>
//           <TabsContent value='store' className='space-y-4'>
//             <StoreSettings store={store} />
//           </TabsContent>
//           <TabsContent value='products' className='space-y-4'>
//             <ProductsTab storeId={storeID} />
//           </TabsContent>
//           <TabsContent value='orders' className='space-y-4'>
//             <OrdersTab />
//           </TabsContent>
//         </Tabs>
//       </div>
//     </Shell>
//   )
// }

// export default Dashboard

'use client'

import { useRouter, useSelectedLayoutSegment } from 'next/navigation'

import { cn } from '@/lib/utils'

import { Tabs, TabsList, TabsTrigger } from '@radix-ui/react-tabs'

interface StoreTabsProps {
  storeId: number
}

const StoreTabs = ({ storeId }: StoreTabsProps) => {
  const router = useRouter()
  const segment = useSelectedLayoutSegment()

  const tabs = [
    {
      title: 'Store',
      href: `/dashboard/stores/${storeId}`,
      isActive: segment === null,
    },
    {
      title: 'Products',
      href: `/dashboard/stores/${storeId}/products`,
      isActive: segment === 'products',
    },
    {
      title: 'Orders',
      href: `/dashboard/stores/${storeId}/orders`,
      isActive: segment === 'orders',
    },
    {
      title: 'Analytics',
      href: `/dashboard/stores/${storeId}/analytics`,
      isActive: segment === 'analytics',
    },
  ]

  return (
    <Tabs
      defaultValue={tabs.find((tab) => tab.isActive)?.href ?? tabs[0]?.href}
      onValueChange={(value) => router.push(value)}
    >
      <TabsList className='inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground'>
        {tabs.map((tab) => (
          <div role='none' key={tab.href}>
            <TabsTrigger
              value={tab.href}
              className={cn(
                'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow'
              )}
            >
              {tab.title}
            </TabsTrigger>
          </div>
        ))}
      </TabsList>
    </Tabs>
  )
}

export default StoreTabs
