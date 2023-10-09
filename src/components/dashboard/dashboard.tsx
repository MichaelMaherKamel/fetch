import { Shell } from '@/components/ui/shell'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { OrdersTab } from '@/components/dashboard/tabs/ordersTab'
import { SettingsTab } from '@/components/dashboard/tabs/settingsTab'
import { ProductsTab } from '@/components/dashboard/tabs/productsTab'
import { DashboardOverView } from '@/components/dashboard/tabs/dashboard-overview'

const Dashboard = () => {
  return (
    <Shell as='div' className='gap-12 snap-y snap-proximity'>
      <div className='flex flex-col'>
        <div className='flex justify-between'>
          <h2 className='text-3xl font-bold tracking-tight'>Dashboard</h2>
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
            <SettingsTab />
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
