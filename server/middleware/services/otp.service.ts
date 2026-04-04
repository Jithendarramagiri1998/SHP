import crypto from "crypto";

/* =========================
   OTP STORE (IN-MEMORY)
   ⚠️ In production → use Redis
========================= */

type OTPRecord = {
  otp: string;
  expiresAt: number;
};

const otpStore = new Map<string, OTPRecord>();

/* =========================
   GENERATE OTP
========================= */

export const generateOTP = (email: string) => {
  // 🔢 Generate 6-digit OTP
  const otp = crypto.randomInt(100000, 999999).toString();

  // ⏳ Expiry (5 minutes)
  const expiresAt = Date.now() + 5 * 60 * 1000;

  // Save OTP
  otpStore.set(email, { otp, expiresAt });

  console.log(`🔐 OTP for ${email}: ${otp}`); // 👉 replace with email send

  return otp;
};

/* =========================
   VERIFY OTP
========================= */

export const verifyOTP = (email: string, userOtp: string) => {
  const record = otpStore.get(email);

  if (!record) {
    return { success: false, message: "OTP not found" };
  }

  // ❌ Expired
  if (Date.now() > record.expiresAt) {
    otpStore.delete(email);
    return { success: false, message: "OTP expired" };
  }

  // ❌ Wrong OTP
  if (record.otp !== userOtp) {
    return { success: false, message: "Invalid OTP" };
  }

  // ✅ Success → remove OTP
  otpStore.delete(email);

  return { success: true };
};

/* =========================
   RESEND OTP
========================= */

export const resendOTP = (email: string) => {
  return generateOTP(email);
};

/* =========================
   CLEANUP (OPTIONAL)
========================= */

// Auto-clean expired OTPs every 10 mins
setInterval(() => {
  const now = Date.now();

  for (const [email, record] of otpStore.entries()) {
    if (record.expiresAt < now) {
      otpStore.delete(email);
    }
  }
}, 10 * 60 * 1000);
