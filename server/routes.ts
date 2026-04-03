import type { Express } from "express";
import { type Server } from "http";
import { db } from "./db";
import {
  interviews,
  jobs,
  referrals,
  cultures,
  hrFeedback,
  salaries,
  users,
} from "../shared/schema";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} from "./auth";

export async function registerRoutes(httpServer: Server, app: Express): Promise<Server> {

  /* =========================
     AUTH APIs
  ========================= */

  app.post("/api/signup", async (req, res) => {
    try {
      const { email, username, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: "Missing fields" });
      }

      const hashed = await bcrypt.hash(password, 10);

      const [user] = await db.insert(users).values({
        email,
        username,
        password: hashed,
      }).returning();

      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      res.json({ user, accessToken, refreshToken });
    } catch {
      res.status(500).json({ error: "Signup failed" });
    }
  });

  app.post("/api/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await db.query.users.findFirst({
        where: (u, { eq }) => eq(u.email, email),
      });

      if (!user) return res.status(400).json({ error: "User not found" });

      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(400).json({ error: "Invalid password" });

      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      res.json({ user, accessToken, refreshToken });
    } catch {
      res.status(500).json({ error: "Login failed" });
    }
  });

  app.post("/api/refresh", (req, res) => {
    try {
      const { refreshToken } = req.body;

      const user = jwt.verify(refreshToken, process.env.REFRESH_SECRET!);
      const accessToken = generateAccessToken(user);

      res.json({ accessToken });
    } catch {
      res.status(401).json({ error: "Invalid refresh token" });
    }
  });

  /* =========================
     CREATE (POST APIs)
  ========================= */

  app.post("/api/job", verifyToken, async (req: any, res) => {
    try {
      await db.insert(jobs).values({
        ...req.body,
        userId: req.user.id,
      });
      res.json({ success: true });
    } catch {
      res.status(500).json({ error: "Failed to save job" });
    }
  });

  app.post("/api/interview", verifyToken, async (req: any, res) => {
    try {
      await db.insert(interviews).values({
        ...req.body,
        userId: req.user.id,
      });
      res.json({ success: true });
    } catch {
      res.status(500).json({ error: "Failed to save interview" });
    }
  });

  app.post("/api/referral", verifyToken, async (req: any, res) => {
    try {
      await db.insert(referrals).values({
        ...req.body,
        userId: req.user.id,
      });
      res.json({ success: true });
    } catch {
      res.status(500).json({ error: "Failed to save referral" });
    }
  });

  app.post("/api/culture", verifyToken, async (req: any, res) => {
    try {
      await db.insert(cultures).values({
        ...req.body,
        userId: req.user.id,
      });
      res.json({ success: true });
    } catch {
      res.status(500).json({ error: "Failed to save culture" });
    }
  });

  app.post("/api/hr-feedback", verifyToken, async (req: any, res) => {
    try {
      await db.insert(hrFeedback).values({
        ...req.body,
        userId: req.user.id,
      });
      res.json({ success: true });
    } catch {
      res.status(500).json({ error: "Failed to save HR feedback" });
    }
  });

  app.post("/api/salary", verifyToken, async (req: any, res) => {
    try {
      await db.insert(salaries).values({
        ...req.body,
        userId: req.user.id,
      });
      res.json({ success: true });
    } catch {
      res.status(500).json({ error: "Failed to save salary" });
    }
  });

  /* =========================
     READ (GET APIs)
  ========================= */

  app.get("/api/jobs", async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = 6;
    const offset = (page - 1) * limit;

    const data = await db.select().from(jobs).limit(limit).offset(offset);
    res.json(data);
  });

  app.get("/api/interviews", async (req, res) => {
    res.json(await db.select().from(interviews));
  });

  app.get("/api/referrals", async (req, res) => {
    res.json(await db.select().from(referrals));
  });

  app.get("/api/cultures", async (req, res) => {
    res.json(await db.select().from(cultures));
  });

  app.get("/api/hr-feedback", async (req, res) => {
    res.json(await db.select().from(hrFeedback));
  });

  app.get("/api/salaries", async (req, res) => {
    res.json(await db.select().from(salaries));
  });

  /* =========================
     UPDATE (PUT APIs)
  ========================= */

  app.put("/api/job/:id", verifyToken, async (req: any, res) => {
    try {
      const job = await db.query.jobs.findFirst({
        where: (j, { eq }) => eq(j.id, req.params.id),
      });

      if (!job) return res.status(404).json({ error: "Job not found" });

      if (job.userId !== req.user.id && req.user.role !== "admin") {
        return res.status(403).json({ error: "Not allowed" });
      }

      await db.update(jobs).set(req.body).where((j, { eq }) => eq(j.id, req.params.id));

      res.json({ success: true });
    } catch {
      res.status(500).json({ error: "Update failed" });
    }
  });

  /* =========================
     DELETE (ADMIN / OWNER)
  ========================= */

  app.delete("/api/job/:id", verifyToken, async (req: any, res) => {
    try {
      const job = await db.query.jobs.findFirst({
        where: (j, { eq }) => eq(j.id, req.params.id),
      });

      if (!job) return res.status(404).json({ error: "Job not found" });

      if (job.userId !== req.user.id && req.user.role !== "admin") {
        return res.status(403).json({ error: "Not allowed" });
      }

      await db.delete(jobs).where((j, { eq }) => eq(j.id, req.params.id));

      res.json({ success: true });
    } catch {
      res.status(500).json({ error: "Delete failed" });
    }
  });

  return httpServer;
}