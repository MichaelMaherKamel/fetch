import { Shell } from '@/components/ui/shell'
import { PageHeader } from '@/components/ui/page-header'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { OrdersTab } from '@/components/dashboard/tabs/ordersTab'
import { StoreSettings } from '@/components/dashboard/tabs/settingsTab'
import { ProductsTab } from '@/components/dashboard/tabs/productsTab'
import { DashboardOverView } from '@/components/dashboard/tabs/dashboard-overview'
import StoreSwitcher from '@/components/dashboard/store-switcher'

import { serverClient } from '@/lib/trpc/server'

interface DashboardProps {
  storeId: Number
}

const Dashboard = async ({ storeId }: DashboardProps) => {
  const storeID = Number(storeId)
  const stores = await serverClient.stores.getStores()
  const store = stores.stores.find((store) => store.id === storeID)
  return (
    <Shell as='div' className='gap-12 snap-y snap-proximity'>
      <div className='flex flex-col'>
        <div className='flex justify-between'>
          <PageHeader title='Dashboard' description={`Manage ${store?.name}`} size='sm' />
          <span>
            <StoreSwitcher className='ml-2' initialStores={stores} storeId={storeID} />
          </span>
        </div>
        <Tabs defaultValue='store' className='space-y-4 pt-6'>
          <TabsList>
            <TabsTrigger value='store'>Store</TabsTrigger>
            <TabsTrigger value='products'>Products</TabsTrigger>
            <TabsTrigger value='orders'>Orders</TabsTrigger>
            <TabsTrigger value='analytics'>Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value='analytics' className='space-y-4'>
            <DashboardOverView />
          </TabsContent>
          <TabsContent value='store' className='space-y-4'>
            <StoreSettings store={store} />
          </TabsContent>
          <TabsContent value='products' className='space-y-4'>
            <ProductsTab />
          </TabsContent>
          <TabsContent value='orders' className='space-y-4'>
            <OrdersTab />
          </TabsContent>
        </Tabs>
      </div>
    </Shell>
  )
}

export default Dashboard
