// models/User.ts
import mongoose, { Schema, model, models } from "mongoose";
import bcrypt from "bcrypt";

type UserRole = "user" | "admin";
interface IUser extends mongoose.Document {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  status: boolean;
  role: UserRole;
  comparePassword(candidate: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  status: { type: Boolean, default: false },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare password
UserSchema.methods.comparePassword = function (candidate: string) {
  return bcrypt.compare(candidate, this.password);
};

export const User = models.User || model<IUser>("User", UserSchema);
