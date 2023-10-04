import { db } from "@/lib/db";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type StoreId, storeIdSchema, stores } from "@/lib/db/schema/stores";

export const getStores = async () => {
  const { session } = await getUserAuth();
  const s = await db.select().from(stores).where(eq(stores.userId, session?.user.id!));
  return { stores: s };
};

export const getStoreById = async (id: StoreId) => {
  const { session } = await getUserAuth();
  const { id: storeId } = storeIdSchema.parse({ id });
  const [s] = await db.select().from(stores).where(and(eq(stores.id, storeId), eq(stores.userId, session?.user.id!)));
  return { store: s };
};

