import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import crypto from "crypto";

// Generate a secure 6-digit OTP
export function generateSecureOTP() {
  // Generate a random buffer of bytes
  const buffer = crypto.randomBytes(3); // 3 bytes = 24 bits, enough for 6 digits

  // Convert to a number between 0 and 16777215 (2^24 - 1)
  const num = buffer.readUIntBE(0, 3);

  // Scale to 6 digits (between 100000 and 999999)
  const otp = 100000 + (num % 900000);

  return otp.toString();
}
