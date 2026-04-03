import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../db";
import { users } from "../../shared/schema";
import { eq } from "drizzle-orm";

/* =========================
   ENV CHECK
========================= */

if (!process.env.JWT_SECRET || !process.env.REFRESH_SECRET) {
  throw new Error("❌ JWT_SECRET or REFRESH_SECRET missing in .env");
}

const ACCESS_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

/* =========================
   TYPES
========================= */

interface AuthInput {
  email: string;
  username?: string;
  password: string;
}

/* =========================
   AUTH SERVICE
========================= */

export class AuthService {

  /* =========================
     SIGNUP
  ========================= */

  static async signup({ email, username, password }: AuthInput) {
    // 🔍 check existing user
    const existingUser = await db.query.users.findFirst({
      where: (u, { eq }) => eq(u.email, email),
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    // 🔐 hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 💾 insert user
    const [user] = await db.insert(users).values({
      email,
      username,
      password: hashedPassword,
      role: "user",
    }).returning();

    // 🔑 tokens
    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    return { user, accessToken, refreshToken };
  }

  /* =========================
     LOGIN
  ========================= */

  static async login({ email, password }: AuthInput) {
    const user = await db.query.users.findFirst({
      where: (u, { eq }) => eq(u.email, email),
    });

    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Invalid password");
    }

    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    return { user, accessToken, refreshToken };
  }

  /* =========================
     REFRESH TOKEN
  ========================= */

  static refresh(refreshToken: string) {
    try {
      const decoded = jwt.verify(refreshToken, REFRESH_SECRET) as any;

      const accessToken = this.generateAccessToken(decoded);

      return { accessToken };
    } catch {
      throw new Error("Invalid refresh token");
    }
  }

  /* =========================
     TOKEN GENERATION
  ========================= */

  private static generateAccessToken(user: any) {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      ACCESS_SECRET,
      { expiresIn: "15m" }
    );
  }

  private static generateRefreshToken(user: any) {
    return jwt.sign(
      {
        id: user.id,
      },
      REFRESH_SECRET,
      { expiresIn: "7d" }
    );
  }
}
