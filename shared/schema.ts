import { pgTable, text, uuid, timestamp, integer, varchar } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

/* USERS */
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

/* INTERVIEW */
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

/* JOB */
export const jobs = pgTable("jobs", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title"),
  company: text("company"),
  location: text("location"),
  experienceRequired: text("experience_required"),
  description: text("description"),
  url: text("url"),
  createdAt: timestamp("created_at").defaultNow(),
});

/* REFERRAL */
export const referrals = pgTable("referrals", {
  id: uuid("id").defaultRandom().primaryKey(),
  company: text("company"),
  role: text("role"),
  location: text("location"),
  experienceRequired: text("experience_required"),
  instructions: text("instructions"),
  contactEmail: text("contact_email"),
  contactLinkedin: text("contact_linkedin"),
  createdAt: timestamp("created_at").defaultNow(),
});

/* CULTURE */
export const cultures = pgTable("cultures", {
  id: uuid("id").defaultRandom().primaryKey(),
  company: text("company"),
  rating: integer("rating"),
  pros: text("pros"),
  cons: text("cons"),
  workLifeBalance: text("work_life_balance"),
  management: text("management"),
  createdAt: timestamp("created_at").defaultNow(),
});

/* HR */
export const hrFeedback = pgTable("hr_feedback", {
  id: uuid("id").defaultRandom().primaryKey(),
  company: text("company"),
  hrName: text("hr_name"),
  hrEmail: text("hr_email"),
  hrLinkedin: text("hr_linkedin"),
  comments: text("comments"),
  createdAt: timestamp("created_at").defaultNow(),
});

/* SALARY */
export const salaries = pgTable("salaries", {
  id: uuid("id").defaultRandom().primaryKey(),
  company: text("company"),
  location: text("location"),
  title: text("title"),
  yoe: integer("yoe"),
  base: integer("base"),
  bonus: integer("bonus"),
  stock: integer("stock"),
  createdAt: timestamp("created_at").defaultNow(),
});
