import { configs } from "#src/initializers/config";
import mongoose from "mongoose";

export const mongoConnect = mongoose.connect(configs.DATABASE_URL);
