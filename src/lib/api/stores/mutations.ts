import { db } from '@/lib/db'
import { and, eq } from 'drizzle-orm'
import {
  StoreId,
  NewStoreParams,
  UpdateStoreParams,
  updateStoreSchema,
  insertStoreSchema,
  stores,
  storeIdSchema,
} from '@/lib/db/schema/stores'
import { getUserAuth } from '@/lib/auth/utils'

export const createStore = async (store: NewStoreParams) => {
  const { session } = await getUserAuth()
  const newStore = insertStoreSchema.parse({ ...store, userId: session?.user.id! })
  try {
    await db.insert(stores).values(newStore)
    return { success: true }
  } catch (err) {
    const message = (err as Error).message ?? 'Error while creating store, please try again'
    console.error(message)
    return { error: message }
  }
}

export const updateStore = async (id: StoreId, store: UpdateStoreParams) => {
  const { session } = await getUserAuth()
  const { id: storeId } = storeIdSchema.parse({ id })
  const newStore = updateStoreSchema.parse({ ...store, userId: session?.user.id! })
  try {
    await db
      .update(stores)
      .set(newStore)
      .where(and(eq(stores.id, storeId!), eq(stores.userId, session?.user.id!)))
    return { success: true }
  } catch (err) {
    const message = (err as Error).message ?? 'Error while updating store, please try again'
    console.error(message)
    return { error: message }
  }
}

export const deleteStore = async (id: StoreId) => {
  const { session } = await getUserAuth()
  const { id: storeId } = storeIdSchema.parse({ id })
  try {
    await db.delete(stores).where(and(eq(stores.id, storeId!), eq(stores.userId, session?.user.id!)))
    return { success: true }
  } catch (err) {
    const message = (err as Error).message ?? 'Error while deleting store, please try again'
    console.error(message)
    return { error: message }
  }
}
