import "server-only";
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import path from "path";
import sharp from "sharp";
import heicConvert from "heic-convert";

// Same setup as dugsify: DigitalOcean Spaces through the S3 API, every
// object public-read, all keys under DO_SPACE_FOLDER (excellence-cafe/).
const s3Client = new S3Client({
  endpoint: `https://${process.env.DO_SPACE_ENDPOINT}`,
  region: process.env.DO_SPACE_REGION,
  credentials: {
    accessKeyId: process.env.DO_SPACE_ACCESS_KEY_ID!,
    secretAccessKey: process.env.DO_SPACE_SECRET_ACCESS_KEY!,
  },
});

const bucketName = () => process.env.DO_SPACE_BUCKET!;
const folder = () => process.env.DO_SPACE_FOLDER || "excellence-cafe";
const publicBase = () => `https://${bucketName()}.${process.env.DO_SPACE_ENDPOINT}/`;

// Menu photos are shown as thumbnails and cards — 1200px webp is plenty.
const MAX_IMAGE_DIMENSION = 1200;
const IMAGE_QUALITY = 75;
export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;

// iPhone photos are HEIC; sharp's prebuilt libvips can't decode them and only
// Safari can display them, so convert to JPEG first. Some browsers report an
// empty type for HEIC, hence the extension check.
function isHeic(fileName: string, mimeType: string) {
  return /^image\/hei[cf](-sequence)?$/.test(mimeType) || /\.hei[cf]$/i.test(fileName);
}

export function isImageFile(file: File) {
  return file.type.startsWith("image/") || isHeic(file.name, file.type);
}

async function compressImage(buffer: Buffer, fileName: string, mimeType: string) {
  const heic = isHeic(fileName, mimeType);
  if (!heic && mimeType === "image/gif") return { buffer, fileName, mimeType };

  try {
    const input = heic
      ? Buffer.from(await heicConvert({ buffer, format: "JPEG", quality: 0.9 }))
      : buffer;
    const compressed = await sharp(input)
      .rotate()
      .resize({
        width: MAX_IMAGE_DIMENSION,
        height: MAX_IMAGE_DIMENSION,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: IMAGE_QUALITY })
      .toBuffer();
    return {
      buffer: compressed,
      fileName: `${path.parse(fileName).name}.webp`,
      mimeType: "image/webp",
    };
  } catch (error) {
    console.error("Image compression failed, uploading original:", error);
    return { buffer, fileName, mimeType };
  }
}

export async function uploadImage(file: File, subfolder = "menu") {
  const safeFileName = path
    .parse(file.name)
    .base.normalize("NFKD")
    .replace(/[^a-zA-Z0-9.\-_]/g, "-")
    .replace(/-+/g, "-");

  const { buffer, fileName, mimeType } = await compressImage(
    Buffer.from(await file.arrayBuffer()),
    safeFileName,
    file.type,
  );

  const key = `${folder()}/${subfolder}/${randomUUID()}-${fileName}`;
  await s3Client.send(
    new PutObjectCommand({
      Bucket: bucketName(),
      Key: key,
      Body: buffer,
      ContentType: mimeType,
      ACL: "public-read",
    }),
  );
  return publicBase() + key;
}

// Only deletes objects we own — never touches other dugsify files or
// external URLs (e.g. old Unsplash placeholders).
export async function deleteImage(url: string | null | undefined) {
  if (!url?.startsWith(publicBase() + folder() + "/")) return;
  try {
    await s3Client.send(
      new DeleteObjectCommand({ Bucket: bucketName(), Key: url.slice(publicBase().length) }),
    );
  } catch (error) {
    console.error("Error deleting file from DigitalOcean:", error);
  }
}
