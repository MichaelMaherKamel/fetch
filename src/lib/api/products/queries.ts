import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { type ProductId, productIdSchema, products } from "@/lib/db/schema/products";

export const getProducts = async () => {
  const p = await db.select().from(products);
  return { products: p };
};

export const getProductById = async (id: ProductId) => {
  const { id: productId } = productIdSchema.parse({ id });
  const [p] = await db.select().from(products).where(eq(products.id, productId));
  return { product: p };
};

