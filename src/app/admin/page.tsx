import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'

import SignIn from '@/components/account/SignIn'

import { serverClient } from '@/lib/trpc/server'

//const [site] = (await serverClient.site.getSite()).site

const AdminPage = async () => {
  const session = await getServerSession(authOptions)
  if (session) {
    const userId: string = session.user.id as string
    const { user } = await serverClient.users.getUserById({ id: userId })
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
          </div>
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
