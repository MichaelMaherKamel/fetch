import { notFound, redirect } from 'next/navigation'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

import { Shell } from '@/components/ui/shell'
import { PageHeader } from '@/components/ui/page-header'
import StoreSwitcher from '@/components/dashboard/store-switcher'
import StoreTabs from '@/components/dashboard/dashboard'

import { serverClient } from '@/lib/trpc/server'

interface StoreLayoutProps extends React.PropsWithChildren {
  params: {
    storeId: string
  }
}

const StoreLayout = async ({ children, params }: StoreLayoutProps) => {
  const session = await getServerSession(authOptions)
  const stores = await serverClient.stores.getStores()
  const storeId = Number(params.storeId)
  const { store } = await serverClient.stores.getStoreById({ id: storeId })
  if (!store) {
    notFound()
  }
  if (session) {
    return (
      <Shell as='div' className='gap-12 snap-y snap-proximity'>
        <div className='flex flex-col'>
          <div className='flex justify-between'>
            <PageHeader title='Dashboard' description={`Manage ${store?.name}`} size='sm' />
            <span>
              <StoreSwitcher className='ml-2' initialStores={stores} storeId={storeId} />
            </span>
          </div>
          <div className='space-y-4 overflow-hidden'>
            <StoreTabs storeId={storeId} />
            {children}
          </div>
        </div>
      </Shell>
    )
  }
  // To add the Sign In Modal ro redirect to Sign-In Page
  return <div>Not Signed In, You Must Sign In to Continue</div>
}

export default StoreLayout
