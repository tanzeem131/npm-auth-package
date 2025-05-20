import mongoose, { Schema, model, models } from "mongoose";

interface IOTP extends mongoose.Document {
  email: string;
  otp: string;
  createdAt: Date;
}

const OTPschema = new Schema<IOTP>({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300,
  },
});

export const OTP = models.OTP || model<IOTP>("OTP", OTPschema);
