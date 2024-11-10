// import { configAWS } from "./aws.js";
import { mongoConnect } from "#src/initializers/mongo";

export const initialize = async () => {
  try {
    // configAWS();
    console.log("Initializing MongoDB connection");
    await mongoConnect;
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw "Error while connecting to MongoDB";
  }
};
