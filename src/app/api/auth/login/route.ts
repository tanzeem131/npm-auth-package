// app/api/auth/login/route.ts
import { ENDPOINTS } from "@/common/api.endpoints";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { User } from "@/models/admin";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  console.log("Login attempt:", { email, password });
  await dbConnect();

  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  if (user.status === false) {
    try {
      const otpResponse = await fetch(
        new URL(ENDPOINTS.generateOTP, req.url).toString(),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: user.email, userId: user._id }),
        }
      );

      if (!otpResponse.ok) {
        const errorData = await otpResponse.json();
        return NextResponse.json(
          { message: "Failed to generate OTP", error: errorData },
          { status: 500 }
        );
      }

      return NextResponse.json(
        {
          status: "OTP_REQUIRED",
          message: "Account not verified. OTP verification required.",
        },
        { status: 403 }
      );
    } catch (error) {
      return NextResponse.json(
        { message: "Error during OTP generation" },
        { status: 500 }
      );
    }
  }

  // User authenticated, issue JWT
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET || "secret",
    { expiresIn: "1d" }
  );
  return NextResponse.json({ token }, { status: 200 });
}
