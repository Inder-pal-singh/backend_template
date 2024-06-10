import { authMiddleware } from "#src/middlewares/auth.middleware";
import { validateRequest } from "#src/middlewares/joi.validator";
import { updateProfileValidator } from "#src/modules/auth/auth.validators";
import UserController from "#src/modules/user/user.controller";
import { Router } from "express";

const router = Router();
router.put(
  "/profile",
  validateRequest(updateProfileValidator),
  authMiddleware(true),
  UserController.updateProfile
);
router.get(
  "/",

  authMiddleware(true),
  UserController.getProfile
);
export { router as userRouter };
