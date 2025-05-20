// lib/db.ts
import mongoose from 'mongoose';

declare global {
  // For Next.js hot-reloading, avoid multiple mongoose instances
  // eslint-disable-next-line no-var
  var mongoose: { conn: any; promise: any };
}

const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI) {
  console.log(process.env.MONGODB_URI);
  throw new Error("Please define the MONGODB_URI in .env.local");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
