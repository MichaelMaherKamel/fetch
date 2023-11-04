import { getServerSession } from 'next-auth'
import { serverClient } from '@/lib/trpc/server'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export const currentUser = async () => {
  try {
    const session = await getServerSession(authOptions)

    if (session) {
      const userId = session.user.id as string
      const { user } = await serverClient.users.getUserById({ id: userId })
      return user
    } else {
      throw new Error('Session is missing')
    }
  } catch (error: any) {
    throw new Error(`Error fetching the current user: ${error.message}`)
  }
}
