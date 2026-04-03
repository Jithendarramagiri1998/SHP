import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config({ path: "./.env", override: true });

export default defineConfig({
  schema: "./shared/schema.ts",
  out: "./drizzle",

  dialect: "postgresql", // ✅ FIX (instead of driver)

  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
