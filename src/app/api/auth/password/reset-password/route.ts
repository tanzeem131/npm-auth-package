// app/api/auth/password/reset-password/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { PasswordResetSchema } from "@/models/resetPassword";
import { User } from "@/models/admin";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { email, password, token } = await req.json();

    if (!email || !password || !token) {
      return NextResponse.json(
        { message: "Password and Token are required" },
        { status: 404 }
      );
    }

    const user = await User.findOne({ email });

    if (user.status === false) {
      return NextResponse.json({ error: "User not verified" }, { status: 401 });
    }

    const tokenRecord = await PasswordResetSchema.findOne({ email });

    if (!tokenRecord || !user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (tokenRecord.token !== token) {
      return NextResponse.json(
        { message: "Token not matched" },
        { status: 400 }
      );
    }

    user.password = password;
    await user.save();

    await PasswordResetSchema.deleteOne({ _id: tokenRecord._id });

    return NextResponse.json(
      { message: "Password reset successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
