// pages/api/forgot-password.ts
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/admin";
import { OTP } from "@/models/otp";
import dbConnect from "@/lib/db";
import { sendEmail } from "@/common/email";
import { getEmailTemplate } from "@/common/emailTemplate";
import { generateSecureOTP } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const otp = generateSecureOTP();

    // await OTP.deleteMany({ email });
    // await OTP.create({ email, otp });

    const existingOTP = await OTP.findOne({ email });

    if (existingOTP) {
      await OTP.findOneAndUpdate(
        { email },
        { $set: { otp, createdAt: new Date() } },
        { new: true }
      );

      return NextResponse.json(
        { message: "OTP sent to email", success: true },
        { status: 200 }
      );
    }

    const newDraftOTP = new OTP({
      email,
      otp,
    });

    await newDraftOTP.save();

    const { subject, text, html } = getEmailTemplate({
      heading: "Email verification",
      subheading: "Your OTP code is below",
      content: otp,
      isLink: false,
    });

    await sendEmail({ to: email, subject, text, html });

    return NextResponse.json(
      { message: "OTP sent to email", success: true },
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
