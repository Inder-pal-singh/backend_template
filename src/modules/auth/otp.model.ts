import { Document, Schema, Types, model } from "mongoose";

export interface IOTP extends Document {
  user: Types.ObjectId;
  otp: string;
  expiresAt: Date;
}
const schema = new Schema<IOTP>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    default: Date.now,
    index: { expires: "5m" },
  },
});
schema.set("timestamps", true);

const OTP = model<IOTP>("Otp", schema);
export default OTP;
