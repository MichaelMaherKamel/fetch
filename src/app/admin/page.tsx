import { getServerSession } from 'next-auth'

import { serverClient } from '@/lib/trpc/server'

import { authOptions } from '../api/auth/[...nextauth]/route'

import SignIn from '@/components/account/SignIn'

import { type Store } from '@/lib/db/schema/stores'
// import StoreModal from '@/components/modals/storeModal'
import StoreModal from '@/components/stores/StoreModal'
import UploadButton from '@/components/products/uploadButton'

//const [site] = (await serverClient.site.getSite()).site

export const dynamic = 'force-dynamic'

const AdminPage = async () => {
  const session = await getServerSession(authOptions)
  if (session) {
    const userId: string = session.user.id as string
    const { user } = await serverClient.users.getUserById({ id: userId })
    const { stores } = await serverClient.stores.getStores()
    return (
      <>
        Signed in as {session.user?.name}
        {user.role === 'admin' ? (
          <div>
            <h1>Admin Page</h1>
            <h1>{user.email}</h1>
          </div>
        ) : (
          <div>
            <h1>Not an Admin</h1>
            <h1>{user.email}</h1>
            <h3> Create new store </h3>
            <StoreModal />
            <UploadButton isSubscribed={true} />
          </div>
        )}
        {stores.length > 0 ? (
          stores.map((store: Store, index: number) => (
            <h1 key={index}>
              {store.id} {store.name}
            </h1>
          ))
        ) : (
          <>
            <h1>No stores</h1>
            <StoreModal />
          </>
        )}
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <SignIn />
    </>
  )
}

export default AdminPage
