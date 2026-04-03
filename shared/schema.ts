import { pgTable, text, uuid, timestamp, integer } from "drizzle-orm/pg-core";

/* =========================
   USERS
========================= */
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),

  email: text("email").notNull().unique(),         // ✅ login
  username: text("username").notNull(),

  password: text("password").notNull(),            // 🔐 hashed
  role: text("role").default("user"),              // 👨‍💼 admin/user

  createdAt: timestamp("created_at").defaultNow(),
});

/* =========================
   INTERVIEWS
========================= */
export const interviews = pgTable("interviews", {
  id: uuid("id").defaultRandom().primaryKey(),

  company: text("company").notNull(),
  role: text("role").notNull(),
  difficulty: text("difficulty"),
  level: text("level"),
  outcome: text("outcome"),
  experience: text("experience"),
  process: text("process"),
  questions: text("questions"),

  userId: uuid("user_id").notNull(),               // ✅ ownership

  createdAt: timestamp("created_at").defaultNow(),
});

/* =========================
   JOBS
========================= */
export const jobs = pgTable("jobs", {
  id: uuid("id").defaultRandom().primaryKey(),

  title: text("title").notNull(),
  company: text("company").notNull(),
  location: text("location"),
  experienceRequired: text("experience_required"),
  description: text("description"),
  url: text("url"),

  userId: uuid("user_id").notNull(),               // ✅ ownership

  createdAt: timestamp("created_at").defaultNow(),
});

/* =========================
   REFERRALS
========================= */
export const referrals = pgTable("referrals", {
  id: uuid("id").defaultRandom().primaryKey(),

  company: text("company").notNull(),
  role: text("role").notNull(),
  location: text("location"),
  experienceRequired: text("experience_required"),
  instructions: text("instructions"),
  contactEmail: text("contact_email"),
  contactLinkedin: text("contact_linkedin"),

  userId: uuid("user_id").notNull(),               // ✅ ownership

  createdAt: timestamp("created_at").defaultNow(),
});

/* =========================
   CULTURE REVIEWS
========================= */
export const cultures = pgTable("cultures", {
  id: uuid("id").defaultRandom().primaryKey(),

  company: text("company").notNull(),
  rating: integer("rating"),
  pros: text("pros"),
  cons: text("cons"),
  workLifeBalance: text("work_life_balance"),
  management: text("management"),

  userId: uuid("user_id").notNull(),               // ✅ ownership

  createdAt: timestamp("created_at").defaultNow(),
});

/* =========================
   HR FEEDBACK
========================= */
export const hrFeedback = pgTable("hr_feedback", {
  id: uuid("id").defaultRandom().primaryKey(),

  company: text("company").notNull(),
  hrName: text("hr_name"),
  hrEmail: text("hr_email"),
  hrLinkedin: text("hr_linkedin"),
  comments: text("comments"),

  userId: uuid("user_id").notNull(),               // ✅ ownership

  createdAt: timestamp("created_at").defaultNow(),
});

/* =========================
   SALARIES
========================= */
export const salaries = pgTable("salaries", {
  id: uuid("id").defaultRandom().primaryKey(),

  company: text("company").notNull(),
  location: text("location"),
  title: text("title"),
  yoe: integer("yoe"),
  base: integer("base"),
  bonus: integer("bonus"),
  stock: integer("stock"),

  userId: uuid("user_id").notNull(),               // ✅ ownership

  createdAt: timestamp("created_at").defaultNow(),
});
