import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

/* =========================
   EXTEND REQUEST TYPE
========================= */

export interface AuthRequest extends Request {
  user?: any;
}

/* =========================
   ENV CHECK
========================= */

if (!process.env.JWT_SECRET) {
  throw new Error("❌ JWT_SECRET is not defined");
}

const SECRET = process.env.JWT_SECRET;

/* =========================
   VERIFY TOKEN MIDDLEWARE
========================= */

export const verifyToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    // ❌ No token
    if (!authHeader) {
      return res.status(401).json({
        error: "Authorization header missing",
      });
    }

    // Expect: Bearer token
    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({
        error: "Invalid token format",
      });
    }

    const token = parts[1];

    // 🔐 Verify token
    const decoded = jwt.verify(token, SECRET);

    // Attach user info
    req.user = decoded;

    next();
  } catch (err: any) {
    console.error("Token error:", err.message);

    return res.status(401).json({
      error: "Unauthorized / Token expired",
    });
  }
};
