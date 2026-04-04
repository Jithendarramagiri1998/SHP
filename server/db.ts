import dotenv from "dotenv";
dotenv.config();

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

if (!process.env.DATABASE_URL) {
  throw new Error("❌ DATABASE_URL is not defined in .env");
}

const isProduction = process.env.NODE_ENV === "production";

/* =========================
   PG CONNECTION POOL
========================= */

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,

  // ✅ Production SSL (required for Supabase)
  ssl: isProduction
    ? {
        rejectUnauthorized: false,
      }
    : false,

  // ✅ Pool tuning
  max: 10, // max connections
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

/* =========================
   DB INSTANCE
========================= */

export const db = drizzle(pool);

/* =========================
   CONNECTION TEST (OPTIONAL)
========================= */

pool
  .connect()
  .then((client) => {
    console.log("✅ PostgreSQL connected");
    client.release();
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err);
  });
