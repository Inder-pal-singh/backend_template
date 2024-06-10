import AuthService from "#src/modules/auth/auth.services";
import { NextFunction, Request, Response } from "express";

export class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await AuthService.login(req.body.email);
      next(data);
    } catch (error) {
      next(error);
    }
  }
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await AuthService.register({ data: req.body });
      next(data);
    } catch (error) {
      next(error);
    }
  }
  static async verifyOTP(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await AuthService.verifyOTP(req.body);
      next(data);
    } catch (error) {
      next(error);
    }
  }

  static async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await AuthService.getProfile(req.user._id);
      next(data);
    } catch (error) {
      console.log(error);

      next(error);
    }
  }
}
