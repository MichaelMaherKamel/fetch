import { userRouter } from './users'
import { router } from '../trpc'
import { storesRouter } from './stores'
import { productsRouter } from './products'

export const appRouter = router({
  users: userRouter,
  stores: storesRouter,
  products: productsRouter,
})

export type AppRouter = typeof appRouter
