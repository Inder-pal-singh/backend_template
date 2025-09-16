import { configs } from "#src/initializers/config";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
export const uploadFileToS3 = async (
  fileContent: Buffer,
  baseName: string,
  keyPrefix: string,
  fileType: string
) => {
  const parallelUploads3 = new Upload({
    client: new S3Client({
      region: configs.AWS_BUCKET_REGION,
      credentials: {
        accessKeyId: configs.AWS_ACCESS_KEY_ID,
        secretAccessKey: configs.AWS_SECRET_ACCESS_KEY,
      },
    }),
    params: {
      Bucket: configs.AWS_BUCKET_NAME,
      Key: `${keyPrefix}/${baseName}`,
      Body: fileContent,
      ACL: "private",
      ContentType: fileType,
    },

    tags: [
      {
        Key: "type",
        Value: "image",
      },
    ], // optional tags
    queueSize: 4, // optional concurrency configuration
    partSize: 1024 * 1024 * 5, // optional size of each part, in bytes, at least 5MB
    leavePartsOnError: false, // optional manually handle dropped parts
  });
  return parallelUploads3;
};
const s3Client = new S3Client({ region: "eu-central-1" });
export const generateDownloadUrl = async (
  objectKey: string | null | undefined
) => {
  // if object key has a leading slash, remove it
  if (!objectKey) {
    return null;
  }
  // if the object is complete URL, extract the object key
  if (objectKey.startsWith("http")) {
    const url = new URL(objectKey);
    objectKey = url.pathname;
  }
  objectKey = objectKey.replace(/^\//, "");

  const command = new GetObjectCommand({
    Bucket: configs.AWS_BUCKET_NAME,
    Key: objectKey,
  });

  const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 30000 });

  return signedUrl;
};
