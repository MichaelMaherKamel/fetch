import { signOut } from 'next-auth/react'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

import { getInitials } from '@/lib/config/utils'

import { db } from '@/lib/db'
import { eq } from 'drizzle-orm'
import { users } from '@/lib/db/schema/auth'

import { Avatar, AvatarImage, AvatarFallback } from './avatar'

import { Icons } from './icons'

const U = async () => {
  const session = await getServerSession(authOptions)
  if (session) {
    const userId = session.user.id
    const [user] = await db.select().from(users).where(eq(users.id, userId))
    const initials = getInitials(user.name ?? '')
    return (
      <Avatar>
        <AvatarImage src={user.image} alt={initials} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
    )
  }
  return <Icons.user />
}

export default U
