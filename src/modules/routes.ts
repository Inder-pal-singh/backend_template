import {
  authMiddleware,
  epAuthMiddleware,
} from "#src/middlewares/auth.middleware";

import { adminRoutes } from "#src/modules/admin/admin.routes";
import { authRouter } from "#src/modules/auth/auth.routes";
import { blogRoutes } from "#src/modules/blog/blog.routes";
import { bundleRoutes } from "#src/modules/bundle/bundle.routes";
import { chatRoutes } from "#src/modules/chat/chat.routes";
import { contentRoutes } from "#src/modules/content/content.routes";
import { epRoutes } from "#src/modules/employer/employer.routes";
import { groupRoutes } from "#src/modules/group/group.routes";
import { jsRoutes } from "#src/modules/jobseeker/js.routes";
import { miscRouter } from "#src/modules/misc/misc.routes";
import { notificationsRoutes } from "#src/modules/notification/notification.routes";
import { searchRoutes } from "#src/modules/search/search.routes";
import { statsRoutes } from "#src/modules/stats/stats.routes";
import { subscriptionRoutes } from "#src/modules/subscription/subscription.routes";
import { userRoutes } from "#src/modules/user/user.routes";
import { Router } from "express";
import { getFEContentController } from "./admin/admin.controller.js";
import { billingRoutes } from "./billing/billing.routes.js";
import { connectionRoutes } from "./connection/connection.routes.js";
import { savedProileRoutes } from "./savedProfiles/saved_profile.routes.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/profile", authMiddleware(true), userRoutes);
router.use("/blogs", authMiddleware(true), blogRoutes);
router.use("/js", authMiddleware(true), jsRoutes);
router.use("/content", contentRoutes);
router.use("/employer", epAuthMiddleware(true), epRoutes);
router.use("/subscription", epAuthMiddleware(true), subscriptionRoutes);
router.use("/bundle", epAuthMiddleware(true), bundleRoutes);
router.use("/connection", epAuthMiddleware(true), connectionRoutes);
router.use("/profiles", epAuthMiddleware(true), savedProileRoutes);
router.use("/billing", epAuthMiddleware(true), billingRoutes);

router.use("/misc", authMiddleware(false), miscRouter);
router.use("/groups", authMiddleware(true), groupRoutes);
router.use("/chats", authMiddleware(true), chatRoutes);
router.use("/search", authMiddleware(true), searchRoutes);
router.use("/notifications", authMiddleware(true), notificationsRoutes);
router.use("/stats", authMiddleware(true), statsRoutes);

router.use("/admin", adminRoutes);

router.get("/fe", getFEContentController);

export { router };
