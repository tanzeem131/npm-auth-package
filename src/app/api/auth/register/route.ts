import { NextRequest, NextResponse } from "next/server";
import disposableDomains from "disposable-email-domains";
import { User } from "@/models/admin";
import dbConnect from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { email, password, firstName, lastName } = await req.json();

    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { error: "Email, Password, FirstName & LastName are required" },
        { status: 400 }
      );
    }
    const emailDomain = email.split("@")[1];
    const res = await fetch(
      `https://open.kickbox.com/v1/disposable/${emailDomain}`
    );
    const data = await res.json();
    console.log("res", data);
    if (disposableDomains.includes(emailDomain)) {
      return NextResponse.json(
        { error: "Disposable email addresses are not allowed" },
        { status: 400 }
      );
    }
    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    const newUser = await User.create({
      email,
      firstName,
      lastName,
      password: password,
    });

    return NextResponse.json(
      { message: "User registered successfully", userId: newUser._id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register Error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
