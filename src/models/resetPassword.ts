import mongoose, { Schema, models, model } from "mongoose";

interface IResetPassword extends mongoose.Document {
  email: string;
  token: string;
  createdAt: Date;
}

const resetPasswordSchema = new Schema<IResetPassword>({
  email: { type: String, required: true },
  token: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300,
  },
});

export const PasswordResetSchema =
  models.PasswordResetSchema ||
  model<IResetPassword>("PasswordResetSchema", resetPasswordSchema);
