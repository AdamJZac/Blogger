import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { users } from "../db/schema.js";
import { User } from "../models/users.model.js";
import { Repository } from "../types/index.js";

export class UsersRepository implements Repository<User> {
  async findAll(): Promise<User[] | undefined> {
    const result = await db.select().from(users);
    return result;
  }

  async findById(id: string): Promise<User | undefined> {
    const [result] = await db.select().from(users).where(eq(users.id, id));
    return result;
  }

  async findAllForUserId(id: string): Promise<User[] | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result;
  }

  async create(user: User): Promise<User | undefined> {
    const [result] = await db
      .insert(users)
      .values(user)
      .onConflictDoNothing()
      .returning();
    return result;
  }

  async update(user: User): Promise<User | undefined> {
    const [result] = await db
      .update(users)
      .set(user)
      .where(eq(users.id, user.id))
      .returning();
    return result;
  }

  async delete(user: User): Promise<User | undefined> {
    const [result] = await db
      .delete(users)
      .where(eq(users.id, user.id))
      .returning();
    return result;
  }

  async execute(sqlStatement: string): Promise<User | undefined> {
    const result = await db.execute(sqlStatement);
    return (<unknown>result) as undefined;
  }
}
