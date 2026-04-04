import jwt from "jsonwebtoken";

/* =========================
   ENV CHECK
========================= */

if (!process.env.JWT_SECRET) {
  throw new Error("❌ JWT_SECRET not defined");
}

if (!process.env.REFRESH_SECRET) {
  throw new Error("❌ REFRESH_SECRET not defined");
}

const ACCESS_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

/* =========================
   TOKEN GENERATION
========================= */

// 🔑 Access Token (short-lived)
export const generateAccessToken = (user: any) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role || "user",
      type: "access",
    },
    ACCESS_SECRET,
    {
      expiresIn: "15m",
      issuer: "SHP-App",
    }
  );
};

// 🔄 Refresh Token (long-lived)
export const generateRefreshToken = (user: any) => {
  return jwt.sign(
    {
      id: user.id,
      type: "refresh",
    },
    REFRESH_SECRET,
    {
      expiresIn: "7d",
      issuer: "SHP-App",
    }
  );
};

/* =========================
   VERIFY ACCESS TOKEN
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

    const decoded: any = jwt.verify(token, ACCESS_SECRET);

    if (decoded.type !== "access") {
      return res.status(401).json({ error: "Invalid token type" });
    }

    req.user = decoded;

    next();
  } catch (err: any) {
    console.error("Access token error:", err.message);

    return res.status(401).json({
      error: "Unauthorized / Token expired",
    });
  }
};

/* =========================
   VERIFY REFRESH TOKEN
========================= */

export const verifyRefreshToken = (token: string) => {
  try {
    const decoded: any = jwt.verify(token, REFRESH_SECRET);

    if (decoded.type !== "refresh") {
      throw new Error("Invalid token type");
    }

    return decoded;
  } catch (err) {
    throw new Error("Invalid refresh token");
  }
};

/* =========================
   ROLE BASED ACCESS
========================= */

// 👨‍💼 Admin only
export const isAdmin = (req: any, res: any, next: any) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin only access" });
  }

  next();
};

// 👤 Owner or Admin
export const isOwnerOrAdmin = (getResourceUserId: (req: any) => string) => {
  return (req: any, res: any, next: any) => {
    try {
      const resourceUserId = getResourceUserId(req);

      if (
        req.user.id !== resourceUserId &&
        req.user.role !== "admin"
      ) {
        return res.status(403).json({ error: "Not allowed" });
      }

      next();
    } catch {
      return res.status(500).json({ error: "Authorization failed" });
    }
  };
};
