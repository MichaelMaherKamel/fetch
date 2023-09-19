import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { mysqlTable, serial, varchar, int } from "drizzle-orm/mysql-core";

export const computers = mysqlTable("computers", {
  id: serial("id").primaryKey(),
  brand: varchar("brand", {length: 256}).notNull(),
  cores: int("cores").notNull(),
});
// Schema for CRUD - used to validate API requests
export const insertComputerSchema = createInsertSchema(computers);
export const selectComputerSchema = createSelectSchema(computers);
export const computerIdSchema = selectComputerSchema.pick({ id: true });
export const updateComputerSchema = selectComputerSchema;

export type Computer = z.infer<typeof selectComputerSchema>;
export type NewComputer = z.infer<typeof insertComputerSchema>;
export type ComputerId = z.infer<typeof computerIdSchema>["id"];