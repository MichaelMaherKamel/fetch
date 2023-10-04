import { userRouter } from './users'
import { router } from '../trpc'
import { storesRouter } from './stores'

export const appRouter = router({
  users: userRouter,
  stores: storesRouter,
})

export type AppRouter = typeof appRouter
