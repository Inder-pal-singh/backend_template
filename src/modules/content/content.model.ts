import { Document, Schema, model } from "mongoose";

export interface IContent extends Document {
  title: {};
  type: string;
  value?: string | null;
  content: string;
  index: number;
  data: any;
  relationType: 0 | 1 | 2 | null; // 0: kid, 1: family, 2: friend
}

const contentSchema = new Schema<IContent>(
  {
    title: { type: {} },
    type: { type: String },
    content: { type: String },
    index: {
      type: Number,
      required: false,
      default: 0,
    },
    data: {
      type: {},
      required: true,
      autopopulate: false,
      default: {},
    },
    relationType: {
      type: Number,
      enum: [0, 1, 2],
      required: false,
    },
  },
  { timestamps: true }
);

const Content = model<IContent>("Content", contentSchema);

export default Content;
