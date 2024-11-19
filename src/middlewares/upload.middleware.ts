import { storeBufferImageToS3 } from "#src/utils/s3.utils";
import { NextFunction, Request, Response } from "express";
export const singleFieldUploadMiddleware =
  (fieldName: string, type: string, { shouldKeepRawImage = false }) =>
  async (req: Request, res: Response, next: NextFunction) => {
    var keyPrefix = type;
    if (type == "user") {
      keyPrefix = `users/${req.user._id}/${fieldName}`;
    }
    if (req.file) {
      const media = await storeBufferImageToS3(req.file.buffer, keyPrefix);

      req.body = {
        ...req.body,
        [fieldName]: media,
        rawImage: shouldKeepRawImage && req.file.buffer,
      };
    }
    if (req.files) {
      const imagePromises = req.files.map(async (file: any) => {
        const uploadedMedia = await storeBufferImageToS3(
          file.buffer,
          keyPrefix
        );
        return uploadedMedia;
      });

      const satsifiedPromises = await Promise.all(imagePromises);
      req.body = { ...req.body, [fieldName]: satsifiedPromises };
    }
    next();
  };

export const singleBodyReqFieldUploadMiddleware =
  (fieldName: string, type: string) =>
  async (req: Request, res: Response, next: NextFunction) => {
    var keyPrefix = type;
    if (type == "moment") {
      keyPrefix = `moments/${req.params.id}`;
    } else {
      keyPrefix = `${type}/${req.user._id}`;
    }
    if (req.body[fieldName]) {
      const decodedImage = Buffer.from(req.body[fieldName], "base64");
      const imageUrl = await storeBufferImageToS3(decodedImage, keyPrefix);
      console.log(imageUrl);
      req.body = { ...req.body, [fieldName]: imageUrl };
    }

    next();
  };

export const multipleFieldUploadMiddleware =
  (fieldNames: string[], type: string) =>
  async (req: Request, res: Response, next: NextFunction) => {
    var keyPrefix = type;
    console.log("Type", type);

    if (type == "user") {
      keyPrefix = `/users/${req.user._id}`;
    }
    if (req.files) {
      const imagePromises = req.files.map(async (file: any, index: number) => {
        const imageUrl = await storeBufferImageToS3(file.buffer, keyPrefix);
        return { [fieldNames[index]]: imageUrl };
      });

      const images = await Promise.all(imagePromises);
      const resBody = images.reduce((acc, curr) => {
        return { ...acc, ...curr };
      });
      req.body = { ...req.body, ...resBody };
      console.log("Req body", req.body);
    }
    next();
  };
