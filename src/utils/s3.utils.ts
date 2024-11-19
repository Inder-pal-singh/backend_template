import { uploadFileToS3 } from "#src/initializers/aws";

import { createHash } from "crypto";
import { fileTypeFromBuffer } from "file-type";

export async function storebase64ImageToS3(base64ImageData: string) {
  const base64Image = base64ImageData.split(";base64,").pop();
  if (!base64Image) {
    throw new Error("Invalid data URL");
  }

  // get  file extension
  const ext = base64ImageData.split(";")[0].split("/")[1];
  console.log(ext);

  const buffer = Buffer.from(base64Image, "base64");
  return await storeBufferImageToS3(buffer, "unknown");
}

export async function storeBufferImageToS3(buffer: any, keyPrefix: string) {
  const hash = createHash("sha256").update(buffer).digest("hex") as any;
  // get file extension
  const fileType = await fileTypeFromBuffer(buffer);
  console.log(fileType);

  if (!fileType) {
    throw new Error("Invalid file type");
  }

  const keyName = `${hash}.${fileType.ext}`;

  const s3 = await uploadFileToS3(buffer, keyName, keyPrefix, fileType.mime);
  await s3.done();

  return `/${keyPrefix}/${keyName}`;
}

export async function storeZipToS3(buffer: Buffer | any) {
  const hash = createHash("sha256").update(buffer).digest("hex");
  const keyName = `${hash}.zip`;
  const keyPrefix = "keewee/exports";
  const s3 = await uploadFileToS3(
    buffer,
    keyName,
    keyPrefix,
    "application/zip"
  );
  await s3.done();

  return `/${keyPrefix}/${keyName}`;
}
