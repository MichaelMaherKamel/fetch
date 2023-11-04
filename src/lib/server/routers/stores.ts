import { getStoreById, getStores } from '@/lib/api/stores/queries'
import { publicProcedure, router } from '../trpc'
import { storeIdSchema, insertStoreParams, updateStoreParams } from '@/lib/db/schema/stores'
import { createStore, deleteStore, updateStore, storeWithSameName } from '@/lib/api/stores/mutations'

export const storesRouter = router({
  getStores: publicProcedure.query(async () => {
    return getStores()
  }),
  getStoreById: publicProcedure.input(storeIdSchema).query(async ({ input }) => {
    return getStoreById(input.id)
  }),
  storeWithSameName: publicProcedure.input(insertStoreParams).query(async ({ input }) => {
    return storeWithSameName(input.name)
  }),
  createStore: publicProcedure.input(insertStoreParams).mutation(async ({ input }) => {
    return createStore(input)
  }),
  updateStore: publicProcedure.input(updateStoreParams).mutation(async ({ input }) => {
    return updateStore(input.id, input)
  }),
  deleteStore: publicProcedure.input(storeIdSchema).mutation(async ({ input }) => {
    return deleteStore(input.id)
  }),
})
