// pages/api/auth/password/forgot-password.ts
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/admin";
import { PasswordResetSchema } from "@/models/resetPassword";
import dbConnect from "@/lib/db";
import { sendEmail } from "@/common/email";
import { getEmailTemplate } from "@/common/emailTemplate";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await dbConnect();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const token = crypto.randomBytes(32).toString("hex");

    const existingToken = await PasswordResetSchema.findOne({ email });

    if (existingToken) {
      await PasswordResetSchema.findOneAndUpdate(
        { email },
        { $set: { token, createdAt: new Date() } },
        { new: true }
      );

      return NextResponse.json(
        { message: "Link sent to email", success: true },
        { status: 200 }
      );
    }

    const newToken = new PasswordResetSchema({
      email,
      token,
    });

    await newToken.save();

    const passwordResetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}&email=${email}`;

    const { subject, text, html } = getEmailTemplate({
      heading: "Password Reset",
      subheading: "Reset your password",
      content: passwordResetLink,
      isLink: true,
    });

    await sendEmail({ to: email, subject, text, html });

    return NextResponse.json(
      { message: "Link sent to email", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
