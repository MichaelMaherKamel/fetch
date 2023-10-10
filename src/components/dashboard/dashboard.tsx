import { Shell } from '@/components/ui/shell'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { OrdersTab } from '@/components/dashboard/tabs/ordersTab'
import { StoreSettings } from '@/components/dashboard/tabs/settingsTab'
import { ProductsTab } from '@/components/dashboard/tabs/productsTab'
import { DashboardOverView } from '@/components/dashboard/tabs/dashboard-overview'
import StoreSwitcher from './store-switcher'

import { type Store } from '@/lib/db/schema/stores'
import { serverClient } from '@/lib/trpc/server'

type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
}

const Dashboard = async (props: Props) => {
  const stores = await serverClient.stores.getStores()
  const selectedStore = props.searchParams.store
  const store = stores.stores.find((store) => store.name === selectedStore)
  // console.log(store)
  return (
    <Shell as='div' className='gap-12 snap-y snap-proximity'>
      <div className='flex flex-col'>
        <div className='flex justify-between'>
          <h2 className='text-3xl font-bold tracking-tight'>Dashboard</h2>
          <span>
            <StoreSwitcher className='ml-2' initialStores={stores} />
          </span>
        </div>
        <Tabs defaultValue='overview' className='space-y-4 pt-6'>
          <TabsList>
            <TabsTrigger value='overview'>Overview</TabsTrigger>
            <TabsTrigger value='settings'>Settings</TabsTrigger>
            <TabsTrigger value='products'>Products</TabsTrigger>
            <TabsTrigger value='orders'>Orders</TabsTrigger>
          </TabsList>
          <TabsContent value='overview' className='space-y-4'>
            <DashboardOverView />
          </TabsContent>
          <TabsContent value='settings' className='space-y-4'>
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
