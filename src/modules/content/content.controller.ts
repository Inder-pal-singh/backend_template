import ContentService from "#src/modules/content/content.services";
import { NextFunction, Request, Response } from "express";
export default class ContentController {
  static async getContentController(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const type = req.params.type;
      const { lang } = req.headers;

      const content = await ContentService.getContent(
        type,
        lang?.toString() ?? "en"
      );
      next(content);
    } catch (error) {
      next(error);
    }
  }

  static async addContentController(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const type = req.params.type;

      const content = await ContentService.addContent(type, req.body);
      next(content);
    } catch (error) {
      next(error);
    }
  }

  static async updateSingleContentController(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = req.body._id;
      const content = await ContentService.updateSingleContent(id, req.body);
      next(content);
    } catch (error) {
      next(error);
    }
  }
}
