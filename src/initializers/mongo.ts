import mongoose from "mongoose";
import { configs } from "./config";

export const mongoConnect = mongoose.connect(configs.DATABASE_URL);
