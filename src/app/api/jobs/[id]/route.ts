// app/api/jobs/[id]/route.ts
import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/db";
import { Job } from "../../../../models/job";

export async function GET(req: Request, context: { params: { id: string } }) {
  const { id } = context.params;
  await dbConnect();
  const job = await Job.findById(id).lean();
  if (!job) {
    return NextResponse.json({ message: "Job not found" }, { status: 404 });
  }
  return NextResponse.json(job);
}
