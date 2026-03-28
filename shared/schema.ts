import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { pgTable, text, uuid, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export const interviews = pgTable("interviews", {
  id: uuid("id").defaultRandom().primaryKey(),
  company: text("company"),
  role: text("role"),
  difficulty: text("difficulty"),
  level: text("level"),
  outcome: text("outcome"),
  experience: text("experience"),
  process: text("process"),
  questions: text("questions"),
  createdAt: timestamp("created_at").defaultNow(),
});
