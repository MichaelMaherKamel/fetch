import { Metadata } from 'next'

import { serverClient } from '@/lib/trpc/server'

import { Shell } from '@/components/ui/shell'
import { StoreCard } from '@/components/dashboard/store-Card'
import { PageHeader } from '@/components/ui/page-header'
import { Icons } from '@/components/ui/icons'
import StoreModal from '@/components/stores/StoreModal'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'User Dashboard to Check Stores, Products and Stats',
}

type Props = {
  params: {}
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function DashboardPage(props: Props) {
  // const searchParams = props.searchParams
  // const selectedStore = searchParams.store
  // console.log(selectedStore)
  // return <Dashboard searchParams={searchParams} />
  const stores = await serverClient.stores.getStores()
  if (stores.stores.length === 0) {
    return (
      <Shell as='div' className='gap-12 snap-y snap-proximity'>
        <div className='flex flex-col'>
          <div className='flex justify-between'>
            <PageHeader title='Dashboard' description='Manage your stores' size='sm' />
            <span>
              <StoreModal />
            </span>
          </div>
          <Alert>
            <Icons.warning className='h-4 w-4' aria-hidden='true' />
            <AlertTitle className='flex justify-between'>No Stores found!</AlertTitle>
            <AlertDescription>Clicking on the Create Store button to create a New Store</AlertDescription>
          </Alert>
        </div>
      </Shell>
    )
  } else
    return (
      <Shell as='div' className='gap-12 snap-y snap-proximity'>
        <div className='flex flex-col'>
          <div className='flex justify-between'>
            <PageHeader title='Dashboard' description='Manage your stores' size='sm' />
            <span>
              <StoreModal />
            </span>
          </div>
          <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>
            {stores.stores.map((store, index) => {
              return <StoreCard key={index} store={store} route={`/dashboard/stores/${store.name}`} />
            })}
          </div>
        </div>
      </Shell>
    )
}
