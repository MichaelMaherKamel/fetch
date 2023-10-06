import { Metadata } from 'next'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import AnalyticsTab from '@/components/ui/dashboard-components/tabs/analyticsTab'
import SettingsTab from '@/components/ui/dashboard-components/tabs/settingsTab'

import { CalendarDateRangePicker } from '@/components/ui/dashboard-components/date-range-picker'

import { Shell } from '@/components/ui/shell'

import { serverClient } from '@/lib/trpc/server'

import { dashboardConfig } from '@/lib/config/dashboard'
import ProductsTab from '@/components/ui/dashboard-components/tabs/productsTab'
import OrdersTab from '@/components/ui/dashboard-components/tabs/ordersTab'
import CustomerTab from '@/components/ui/dashboard-components/tabs/customersTab'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'User Dashboard to Check Stores, Products and Stats',
}
export const dynamic = 'force-dynamic'

const DashboardPage = async () => {
  return (
    <Shell as='div' className='gap-12 snap-y snap-proximity'>
      <div className='flex-col md:flex'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
          <div className='flex items-center justify-between space-y-2'>
            <h2 className='text-3xl font-bold tracking-tight'>Dashboard</h2>
            <div className='flex items-center space-x-2'>
              <CalendarDateRangePicker />
              <Button>Download</Button>
            </div>
          </div>
          <Tabs defaultValue='analytics' className='space-y-4'>
            <TabsList>
              <TabsTrigger value='analytics'>Analytics</TabsTrigger>
              <TabsTrigger value='settings'>Settings</TabsTrigger>
              <TabsTrigger value='products'>Products</TabsTrigger>
              <TabsTrigger value='orders'>Orders</TabsTrigger>
              <TabsTrigger value='customers'>Customers</TabsTrigger>
            </TabsList>
            <TabsContent value='analytics' className='space-y-4'>
              <AnalyticsTab />
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
            <TabsContent value='customers' className='space-y-4'>
              <CustomerTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Shell>
  )
}

export default DashboardPage
