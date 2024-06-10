import { NextFunction, Request, Response } from "express";
import Joi from "joi";
export const validateRequest =
  (schema: Joi.Schema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) console.error("schema error: ", error);
    if (error)
      return res
        .status(400)
        .json({ status: false, error: error.message, code: 400 });
    else return next();
  };
