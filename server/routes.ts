import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "./db";
import { interviews, jobs, referrals, cultures, hrFeedback, salaries } from "../shared/schema";

export async function registerRoutes(httpServer, app) {

  app.post("/api/interview", async (req, res) => {
    await db.insert(interviews).values(req.body);
    res.json({ success: true });
  });

  app.post("/api/job", async (req, res) => {
    await db.insert(jobs).values(req.body);
    res.json({ success: true });
  });

  app.post("/api/referral", async (req, res) => {
    await db.insert(referrals).values(req.body);
    res.json({ success: true });
  });

  app.post("/api/culture", async (req, res) => {
    await db.insert(cultures).values(req.body);
    res.json({ success: true });
  });

  app.post("/api/hr-feedback", async (req, res) => {
    await db.insert(hrFeedback).values(req.body);
    res.json({ success: true });
  });

  app.post("/api/salary", async (req, res) => {
    await db.insert(salaries).values(req.body);
    res.json({ success: true });
  });

  return httpServer;
}
