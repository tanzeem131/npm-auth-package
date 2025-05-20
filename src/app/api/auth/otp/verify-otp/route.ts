// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { OTP } from "@/models/otp";
import { User } from "@/models/admin";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { email, otp } = await req.json();
    if (!email || !otp) {
      return NextResponse.json(
        { error: "Email and OTP are required" },
        { status: 404 }
      );
    }

    const otpRecord = await OTP.findOne({ email, otp });

    if (!otpRecord) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 404 });
    }

    const user = await User.findOne({ email });

    user.status = true;

    await user.save();

    await OTP.deleteOne({ _id: otpRecord._id });

    return NextResponse.json(
      { message: "OTP verified successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
