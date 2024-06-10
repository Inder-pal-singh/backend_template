import { authMiddleware } from "#src/middlewares/auth.middleware";

import { authRouter } from "#src/modules/auth/auth.routes";

import { userRouter } from "#src/modules/user/user.routes";
import { Router } from "express";

const router = Router();

router.use("/auth", authRouter);
router.use("/user", authMiddleware(true), userRouter);

export { router };
