import ContentController from "#src/modules/content/content.controller";
import { Router } from "express";

const router = Router();

router.get("/:type", ContentController.getContentController);

router.post("/:type", ContentController.addContentController);
export { router as contentRouter };
