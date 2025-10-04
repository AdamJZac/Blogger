import { users } from "../db/schema.js";

export type NewUser = Omit<
  typeof users.$inferInsert,
  "id" | "createdAt" | "updatedAt"
>;
export type User = typeof users.$inferSelect;
export type SafeUser = Omit<User, "password">;
