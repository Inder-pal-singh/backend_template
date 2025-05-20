import { authMiddleware } from "#src/middlewares/auth.middleware";
import { validateRequest } from "#src/middlewares/joi.validator";
import { AuthController } from "#src/modules/auth/auth.controller";
import {
  loginValidator,
  otpValidator,
  registerValidator,
} from "#src/modules/auth/auth.validators";
import { Router } from "express";

const router = Router();

router.post("/login", validateRequest(loginValidator), AuthController.login);
router.post(
  "/register",
  validateRequest(registerValidator),
  AuthController.register
);
router.post(
  "/verify-otp",
  validateRequest(otpValidator),
  AuthController.verifyOTP
);

router.get(
  "/profile",
  authMiddleware(true),

  AuthController.getProfile
);

router.post("/logout", authMiddleware(true), AuthController.logout);

/**
 * Router for handling authentication routes.
 * @module authRouter
 */
export { router as authRouter };
