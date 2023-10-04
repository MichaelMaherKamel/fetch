import { publicProcedure, router } from '../trpc'

import { UserIdSchema } from '@/lib/db/schema/auth'
import { getUserById, getUsers } from '@/lib/api/users/queries'

export const userRouter = router({
  getUsers: publicProcedure.query(async () => {
    return getUsers()
  }),
  getUserById: publicProcedure.input(UserIdSchema).query(async ({ input }) => {
    return getUserById(input.id)
  }),
})
