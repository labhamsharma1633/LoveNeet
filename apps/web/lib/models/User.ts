import mongoose, { Schema, Document, Model } from "mongoose";
import { UserRole } from "../types";

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  rollNumber: string;
  targetYear?: number;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["candidate", "admin"], default: "candidate" },
    rollNumber: { type: String, required: true, unique: true },
    targetYear: { type: Number, default: 2026 },
    avatarUrl: { type: String }
  },
  {
    timestamps: true
  }
);

// Prevent mongoose model overwrite error during Next.js hot reload
export const UserModel: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
