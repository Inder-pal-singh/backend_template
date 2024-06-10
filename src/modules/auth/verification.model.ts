import { Schema, model } from "mongoose";

const schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    autopopulate: true,
  },
  token: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["email", "phone", "password"],
    required: true,
  },
  isExpired: {
    type: Boolean,
    required: true,
    default: false,
  },
});
schema.set("timestamps", true);
export const Verification = model("Verification", schema);
