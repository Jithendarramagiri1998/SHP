import { db } from "./db";
import { users } from "../shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<any>;
  getUserByEmail(email: string): Promise<any>;
  createUser(user: any): Promise<any>;
}

export class DBStorage implements IStorage {

  async getUser(id: string) {
    return await db.query.users.findFirst({
      where: (u, { eq }) => eq(u.id, id),
    });
  }

  async getUserByEmail(email: string) {
    return await db.query.users.findFirst({
      where: (u, { eq }) => eq(u.email, email),
    });
  }

  async createUser(user: any) {
    const [newUser] = await db.insert(users).values(user).returning();
    return newUser;
  }
}

export const storage = new DBStorage();
