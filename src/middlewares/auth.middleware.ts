import { fetchUser, verifyToken } from "#src/utils/auth.utils";
import { NextFunction, Request, Response } from "express";
import Stripe from "stripe";

export const authMiddleware =
  (strict = false, lookForApiKey = false) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return next({ name: "UnauthorizedError", error: "No token provided" });
    }
    try {
      const decoded = verifyToken(token!) as any;
      const user = await fetchUser(decoded.id);
      console.info("Req by user: ", user?.email);

      if (!user && strict) {
        return next({ name: "UnauthorizedError", error: "Invalid token" });
      }
      req.user = user;
      return next();
    } catch (error) {
      console.log(error);
      return next({ name: "UnauthorizedError", error: error });
    }
  };

export const epAuthMiddleware =
  (strict = false, tryQuery = false) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return next({ name: "UnauthorizedError", error: "No token provided" });
    }
    try {
      const decoded = verifyToken(token!) as any;
      const user = await fetchUser(decoded.id);
      console.log("Req by user: ", user?.email);

      if (!user && strict) {
        return next({ name: "UnauthorizedError", error: "Invalid token" });
      }

      if (user?.role !== "employer") {
        return next({
          name: "UnauthorizedError",
          error: "You are not authorized to access this resource",
        });
      }

      req.user = user;
      return next();
    } catch (error) {
      console.log(error);
      return next({ name: "UnauthorizedError", error: error });
    }
  };

export const stripeAuthMiddleware =
  () => async (req: Request, res: Response, next: NextFunction) => {
    const sig = req.headers["stripe-signature"];
    if (!sig) {
      return next({
        name: "UnauthorizedError",
        error: "No signature provided",
      });
    }
    const event = req.body as Stripe.Event;
    const id = event.object;
    console.log(event);
    return next();
  };
