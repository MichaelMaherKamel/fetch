import { computersRouter } from './computers'
import { userRouter } from './users'
import { router } from '../trpc'

export const appRouter = router({
  computers: computersRouter,
  users: userRouter,
})

export type AppRouter = typeof appRouter
