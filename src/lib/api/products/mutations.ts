import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { 
  ProductId, 
  NewProductParams,
  UpdateProductParams, 
  updateProductSchema,
  insertProductSchema, 
  products,
  productIdSchema 
} from "@/lib/db/schema/products";

export const createProduct = async (product: NewProductParams) => {
  const newProduct = insertProductSchema.parse(product);
  try {
    await db.insert(products).values(newProduct)
    return { success: true }
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

export const updateProduct = async (id: ProductId, product: UpdateProductParams) => {
  const { id: productId } = productIdSchema.parse({ id });
  const newProduct = updateProductSchema.parse(product);
  try {
    await db
     .update(products)
     .set(newProduct)
     .where(eq(products.id, productId!))
    return {success: true}
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

export const deleteProduct = async (id: ProductId) => {
  const { id: productId } = productIdSchema.parse({ id });
  try {
    await db.delete(products).where(eq(products.id, productId!))
    return {success: true}
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

