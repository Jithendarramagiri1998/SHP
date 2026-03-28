import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config(); // ✅ VERY IMPORTANT

export default {
  schema: "./shared/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!, // ✅ now it works
  },
} satisfies Config;
