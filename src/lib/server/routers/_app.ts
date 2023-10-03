import { userRouter } from './users'
import { router } from '../trpc'

export const appRouter = router({
  users: userRouter,
})

export type AppRouter = typeof appRouter
