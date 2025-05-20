// app/api/jobs/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Job } from "@/models/job";

export async function GET() {
  await dbConnect();
  const job = await Job.find({}).lean();
  if (!job) {
    return NextResponse.json({ message: "Job not found" }, { status: 404 });
  }
  return NextResponse.json(job);
}
