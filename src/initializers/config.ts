import dotenv from "dotenv";

// Singleton class
let instance: Configs | null = null;

class Configs {
  config = {
    AWS_CLIENT_ID: "",
    AWS_CLIENT_SECRET: "",
    AWS_USER_POOL_ID: "",
    AWS_REGION: "",
    AWS_ACCESS_KEY_ID: "",
    AWS_SECRET_ACCESS_KEY: "",
    DATABASE_URL: "",
    JWT_SECRET: "",
    PORT: "",
    OTP_SECRET: "",
    SENDGRID_API_KEY: "",
    STRIPE_WEBHOOK_SECRET: "",
    STRIPE_SECRET_KEY: "",
  };

  constructor() {
    if (instance) {
      return instance;
    }
    dotenv.config();
    this.config = this.initialize();
  }

  initialize() {
    if (!process.env.AWS_CLIENT_ID) {
      throw new Error("AWS_CLIENT_ID is not set");
    }
    if (!process.env.AWS_CLIENT_SECRET) {
      throw new Error("AWS_CLIENT_SECRET is not set");
    }
    if (!process.env.AWS_USER_POOL_ID) {
      throw new Error("AWS_USER_POOL_ID is not set");
    }
    if (!process.env.AWS_REGION) {
      throw new Error("AWS_REGION is not set");
    }
    if (!process.env.AWS_ACCESS_KEY_ID) {
      throw new Error("AWS_ACCESS_KEY_ID is not set");
    }
    if (!process.env.AWS_SECRET_ACCESS_KEY) {
      throw new Error("AWS_SECRET_ACCESS_KEY is not set");
    }
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is not set");
    }
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not set");
    }
    if (!process.env.PORT) {
      throw new Error("PORT is not set");
    }
    if (!process.env.OTP_SECRET) {
      throw new Error("OTP_SECRET is not set");
    }
    if (!process.env.SENDGRID_API_KEY) {
      throw new Error("SENDGRID_API_KEY is not set");
    }
    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      throw new Error("STRIPE_WEBHOOK_SECRET is not set");
    }
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }

    return {
      AWS_CLIENT_ID: process.env.AWS_CLIENT_ID,
      AWS_CLIENT_SECRET: process.env.AWS_CLIENT_SECRET,
      AWS_USER_POOL_ID: process.env.AWS_USER_POOL_ID,
      AWS_REGION: process.env.AWS_REGION,
      AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
      AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
      DATABASE_URL: process.env.DATABASE_URL,
      JWT_SECRET: process.env.JWT_SECRET,
      PORT: process.env.PORT,
      OTP_SECRET: process.env.OTP_SECRET,
      AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
      SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
      STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
      STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    };
  }
}

export const configs = new Configs().config;
