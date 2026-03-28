import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "./db"; // make sure you have this
import { interviews } from "../shared/schema"; // create this table

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // ✅ INTERVIEW API
  app.post("/api/interview", async (req, res) => {
    try {
      const data = req.body;

      await db.insert(interviews).values(data);

      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to save interview" });
    }
  });

  return httpServer;
}
