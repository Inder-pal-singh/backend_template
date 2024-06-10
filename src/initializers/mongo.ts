import { configs } from "#src/lib/config";
import mongoose from "mongoose";

export const mongoConnect = mongoose.connect(configs.DATABASE_URL);
