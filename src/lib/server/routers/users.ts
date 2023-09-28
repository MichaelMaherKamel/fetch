import { getUserById, getUsers } from '@/lib/api/users/queries'
import { publicProcedure, router } from '../trpc'

import { UserIdSchema } from '@/lib/db/schema/auth'

export const userRouter = router({
  getUsers: publicProcedure.query(async () => {
    return getUsers()
  }),
  getUserById: publicProcedure.input(UserIdSchema).query(async ({ input }) => {
    return getUserById(input.id)
  }),
})
