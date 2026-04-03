import dotenv from "dotenv";
dotenv.config();

import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

const app = express();
const httpServer = createServer(app);

/* =========================
   MIDDLEWARE (PRODUCTION)
========================= */

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* =========================
   LOGGER
========================= */

export function log(message: string, source = "express") {
  const time = new Date().toLocaleTimeString();
  console.log(`${time} [${source}] ${message}`);
}

/* =========================
   REQUEST LOGGER
========================= */

app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;

    if (req.path.startsWith("/api")) {
      log(`${req.method} ${req.path} ${res.statusCode} ${duration}ms`);
    }
  });

  next();
});

/* =========================
   MAIN START
========================= */

(async () => {
  try {
    // ✅ Register routes
    await registerRoutes(httpServer, app);

    /* =========================
       ERROR HANDLER
    ========================= */

    app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
      console.error("Server Error:", err);

      if (res.headersSent) return next(err);

      res.status(err.status || 500).json({
        error: err.message || "Internal Server Error",
      });
    });

    /* =========================
       STATIC / VITE
    ========================= */

    if (process.env.NODE_ENV === "production") {
      serveStatic(app);
    } else {
      const { setupVite } = await import("./vite");
      await setupVite(httpServer, app);
    }

    /* =========================
       START SERVER
    ========================= */

    const port = parseInt(process.env.PORT || "3000", 10);

    httpServer.listen(port, "0.0.0.0", () => {
      log(`🚀 Server running on port ${port}`);
    });

  } catch (err) {
    console.error("Startup Error:", err);
    process.exit(1);
  }
})();