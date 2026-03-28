import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

// 👇 Force load env with absolute path
dotenv.config({ path: "./.env" });

console.log("DB URL:", process.env.DATABASE_URL); // debug

export default {
  schema: "./shared/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config;
