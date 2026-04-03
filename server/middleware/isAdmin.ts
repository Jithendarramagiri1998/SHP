import { Response, NextFunction } from "express";
import { AuthRequest } from "./verifyToken";

/* =========================
   ADMIN CHECK MIDDLEWARE
========================= */

export const isAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // ❌ No user (token missing or invalid)
    if (!req.user) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    // ❌ Not admin
    if (req.user.role !== "admin") {
      return res.status(403).json({
        error: "Access denied (Admin only)",
      });
    }

    // ✅ Admin allowed
    next();
  } catch (err) {
    console.error("Admin check error:", err);

    return res.status(500).json({
      error: "Authorization failed",
    });
  }
};
