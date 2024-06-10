import { API_STATUS } from "#src/utils/enums";
import { NextFunction, Request, Response } from "express";

export function errorHandler(
  err: Error | any,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  if (typeof err === "string") {
    // custom application error
    return res.status(400).json({ status: API_STATUS.ERROR, message: err });
  }

  if (err.name === "ValidationError") {
    // mongoose validation error
    return res
      .status(400)
      .json({ status: API_STATUS.ERROR, message: err.message });
  }

  if (err.name === "UnauthorizedError") {
    // jwt authentication error
    return res
      .status(401)
      .json({ status: API_STATUS.ERROR, message: err.error });
  }

  if (typeof err.message === "string") {
    return res
      .status(400)
      .json({ status: API_STATUS.ERROR, message: err.message });
  }

  // default to 500 server error

  return res
    .status(500)
    .json({ status: API_STATUS.ERROR, message: err.message });
}
