import { db } from '@/lib/db'
import { eq } from 'drizzle-orm'
import { type UserId, UserIdSchema, users } from '@/lib/db/schema/auth'

export const getUsers = async () => {
  const u = await db.select().from(users)
  return { users: u }
}

export const getUserById = async (id: UserId) => {
  const { id: UserId } = UserIdSchema.parse({ id })
  const [u] = await db.select().from(users).where(eq(users.id, UserId))
  return { user: u }
}
