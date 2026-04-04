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
   VERIFY ACCESS TOKEN
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

    // Expect: Bearer <token>
    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({
        error: "Invalid token format",
      });
    }

    const token = parts[1];

    // 🔐 Verify token
    const decoded: any = jwt.verify(token, SECRET);

    // 🚨 IMPORTANT: Ensure it's ACCESS token
    if (decoded.type !== "access") {
      return res.status(401).json({
        error: "Invalid token type",
      });
    }

    // Attach user
    req.user = decoded;

    next();
  } catch (err: any) {
    console.error("Token error:", err.message);

    return res.status(401).json({
      error: "Unauthorized / Token expired",
    });
  }
};

/* =========================
   ADMIN CHECK
========================= */

export const isAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin only access" });
  }

  next();
};

/* =========================
   OWNER OR ADMIN CHECK
========================= */

export const isOwnerOrAdmin = (
  getUserId: (req: AuthRequest) => string
) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const resourceUserId = getUserId(req);

      if (
        req.user?.id !== resourceUserId &&
        req.user?.role !== "admin"
      ) {
        return res.status(403).json({
          error: "Not allowed",
        });
      }

      next();
    } catch (err) {
      return res.status(500).json({
        error: "Authorization failed",
      });
    }
  };
};
