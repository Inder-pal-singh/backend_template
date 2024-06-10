import { API_STATUS } from "#src/utils/enums";
import { NextFunction, Request, Response } from "express";

export const responseMiddleware = (
  data: any,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    data?.constructor?.name?.includes("Error") ||
    data?.constructor?.name?.includes("error") ||
    data?.error ||
    data?.errors
  ) {
    return next(data);
  }

  return res.json({
    status: API_STATUS.OK,
    message: data?.message || "Success",
    data: { ...data, message: undefined },
  });
};

export const nullResponseMiddleware = (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(403).json({
    status: API_STATUS.ERROR,

    data: null,
  });
};
