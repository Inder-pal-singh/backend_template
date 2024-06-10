import UserService from "#src/modules/user/user.services";
import { NextFunction, Request, Response } from "express";

export default class UserController {
  static async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body);

      const data = await UserService.updateProfile({
        id: req.user,
        data: req.body,
      });
      next(data);
    } catch (error) {
      next(error);
    }
  }
  static async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.user);

      const data = await UserService.getProfile(req.user);
      next(data);
    } catch (error) {
      console.log(error);

      next(error);
    }
  }
}
