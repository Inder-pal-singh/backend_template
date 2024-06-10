// models/User.ts

import mongoose, { Document, Schema } from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

export interface IUser extends Document {
  email: string;
  firstName: string;
  lastName: string;
  referralCode: string;
  referredBy: string;
  lastLogin?: Date;
  isOnboarded: boolean;
  isActive: boolean;
  lastActive: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, unique: true, required: true },
    firstName: { type: String },
    lastName: { type: String },
    referralCode: { type: String },
    referredBy: { type: String },
    lastLogin: { type: Date },
    isOnboarded: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    lastActive: { type: Date, default: null },
  },
  { timestamps: true }
);

userSchema.plugin(mongooseAutoPopulate);

const User = mongoose.model<IUser>("User", userSchema);
export default User;
