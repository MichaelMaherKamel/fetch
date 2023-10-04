// import StoreList from '@/components/stores/StoreList'
import NewStoreModal from '@/components/stores/StoreModal'
import { getStores } from '@/lib/api/stores/queries'
import { checkAuth } from '@/lib/auth/utils'

export default async function Stores() {
  await checkAuth()
  const { stores } = await getStores()

  return (
    <main className='max-w-3xl mx-auto p-5 md:p-0 sm:pt-4'>
      <div className='flex justify-between'>
        <h1 className='font-semibold text-2xl my-2'>Stores</h1>
        <NewStoreModal />
      </div>
      {/* <StoreList stores={stores} /> */}
    </main>
  )
}
