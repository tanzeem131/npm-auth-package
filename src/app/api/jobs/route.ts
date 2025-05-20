// app/api/jobs/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../lib/db';
import { Job } from '../../../models/job';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  // Check JWT in Authorization header
  const authHeader = req.headers.get('authorization') || '';
  if (!authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ message: 'No token provided' }, { status: 401 });
  }
  const token = authHeader.split(' ')[1];
  try {
    jwt.verify(token, process.env.JWT_SECRET || 'secret');
  } catch (err) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  // Token is valid: create the job
  const jobData = await req.json();
  await dbConnect();
  const job = await Job.create(jobData);
  return NextResponse.json(job);
}
