import { users } from "../db/schema.js";

export type NewUser = Omit<
  typeof users.$inferInsert,
  "id" | "createdAt" | "updatedAt"
>;
export type User = typeof users.$inferSelect;
export type SafeUser = Omit<User, "password">;

export function isNewUser(obj: unknown): obj is NewUser {
  if (
    typeof obj !== "object" ||
    obj === null ||
    Object.keys(obj).length !== 4
  ) {
    return false;
  }
  const potentialNewUser = obj as Partial<NewUser>;
  return (
    potentialNewUser &&
    typeof potentialNewUser.email === "string" &&
    typeof potentialNewUser.password === "string" &&
    typeof potentialNewUser.firstName === "string" &&
    typeof potentialNewUser.lastName === "string"
  );
}

export function isUser(obj: unknown): obj is User {
  if (
    typeof obj !== "object" ||
    obj === null ||
    Object.keys(obj).length !== 7
  ) {
    return false;
  }
  const potentialUser = obj as Partial<User>;
  return (
    potentialUser &&
    typeof potentialUser.email === "string" &&
    typeof potentialUser.password === "string" &&
    typeof potentialUser.firstName === "string" &&
    typeof potentialUser.lastName === "string" &&
    typeof potentialUser.id === "string" &&
    potentialUser.createdAt instanceof Date &&
    potentialUser.updatedAt instanceof Date
  );
}

export function userToSafeUser(user: User): SafeUser {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}
