import { traverseAndModifyDataWithSignedUrls } from "#src/modules/content/content.services";
import { API_STATUS } from "#src/utils/enums";
import { NextFunction, Request, Response } from "express";

export const responseMiddleware = async (
  data: any,
  req: Request,
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

  if (data?.lean) {
    data = data.lean();
  }

  data = JSON.parse(JSON.stringify(data));

  await traverseAndModifyDataWithSignedUrls(
    data,
    req.headers["lang"]?.toString() || "en"
  );
  console.log(data);

  return res.json({
    status: API_STATUS.OK,
    data,
  });
};

export const nullResponseMiddleware = (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(404).json({
    status: API_STATUS.ERROR,
    data: null,
  });
};
