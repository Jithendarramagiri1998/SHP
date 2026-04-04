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

import { generateOTP, verifyOTP } from "./services/otp.service";

/* =========================
   REGISTER ROUTES
========================= */

export async function registerRoutes(httpServer: Server, app: Express): Promise<Server> {

  /* =========================
     AUTH APIs (OTP BASED)
  ========================= */

  // 📩 STEP 1: SEND OTP
  app.post("/api/signup", async (req, res) => {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ error: "Email required" });
      }

      // 🔍 Check existing user
      const existing = await db.query.users.findFirst({
        where: (u, { eq }) => eq(u.email, email),
      });

      if (existing) {
        return res.status(400).json({ error: "Email already registered" });
      }

      generateOTP(email);

      res.json({ message: "OTP sent (check server console)" });

    } catch (err) {
      console.error("Signup error:", err);
      res.status(500).json({ error: "Signup failed" });
    }
  });

  // 🔐 STEP 2: VERIFY OTP + CREATE USER
  app.post("/api/verify-otp", async (req, res) => {
    try {
      const { email, username, password, otp } = req.body;

      const result = verifyOTP(email, otp);

      if (!result.success) {
        return res.status(400).json({ error: result.message });
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

    } catch (err) {
      console.error("OTP verify error:", err);
      res.status(500).json({ error: "OTP verification failed" });
    }
  });

  // 🔑 LOGIN
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

    } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ error: "Login failed" });
    }
  });

  // 🔄 REFRESH TOKEN
  app.post("/api/refresh", (req, res) => {
    try {
      const { refreshToken } = req.body;

      const decoded: any = jwt.verify(
        refreshToken,
        process.env.REFRESH_SECRET!
      );

      const accessToken = generateAccessToken(decoded);

      res.json({ accessToken });

    } catch {
      res.status(401).json({ error: "Invalid refresh token" });
    }
  });

  /* =========================
     CREATE (PROTECTED)
  ========================= */

  app.post("/api/job", verifyToken, async (req: any, res) => {
    try {
      await db.insert(jobs).values({
        ...req.body,
        userId: req.user.id,
      });
      res.json({ success: true });
    } catch (err) {
      console.error(err);
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
     READ APIs
  ========================= */

  app.get("/api/jobs", async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = 6;
    const offset = (page - 1) * limit;

    const data = await db.select().from(jobs).limit(limit).offset(offset);
    res.json(data);
  });

  app.get("/api/interviews", async (_, res) => {
    res.json(await db.select().from(interviews));
  });

  app.get("/api/referrals", async (_, res) => {
    res.json(await db.select().from(referrals));
  });

  app.get("/api/cultures", async (_, res) => {
    res.json(await db.select().from(cultures));
  });

  app.get("/api/hr-feedback", async (_, res) => {
    res.json(await db.select().from(hrFeedback));
  });

  app.get("/api/salaries", async (_, res) => {
    res.json(await db.select().from(salaries));
  });

  return httpServer;
}
