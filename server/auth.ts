import jwt from "jsonwebtoken";

/* =========================
   ENV CHECK
========================= */

if (!process.env.JWT_SECRET) {
  throw new Error("❌ JWT_SECRET not defined in .env");
}

if (!process.env.REFRESH_SECRET) {
  throw new Error("❌ REFRESH_SECRET not defined in .env");
}

const ACCESS_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

/* =========================
   GENERATE TOKENS
========================= */

// 🔑 Access Token (short-lived)
export const generateAccessToken = (user: any) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role || "user",
    },
    ACCESS_SECRET,
    { expiresIn: "15m" }
  );
};

// 🔄 Refresh Token (long-lived)
export const generateRefreshToken = (user: any) => {
  return jwt.sign(
    {
      id: user.id,
    },
    REFRESH_SECRET,
    { expiresIn: "7d" }
  );
};

/* =========================
   VERIFY TOKEN MIDDLEWARE
========================= */

export const verifyToken = (req: any, res: any, next: any) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Invalid token format" });
    }

    const decoded = jwt.verify(token, ACCESS_SECRET);

    req.user = decoded; // attach user info

    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized / Token expired" });
  }
};

/* =========================
   ADMIN MIDDLEWARE
========================= */

export const isAdmin = (req: any, res: any, next: any) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Admin access only" });
    }

    next();
  } catch {
    return res.status(500).json({ error: "Authorization failed" });
  }
};
