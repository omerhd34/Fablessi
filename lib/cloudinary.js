import { v2 as cloudinary } from "cloudinary";

export class CloudinaryConfigError extends Error {
 constructor(message = "Cloudinary yapılandırması eksik") {
  super(message);
  this.name = "CloudinaryConfigError";
  this.status = 500;
 }
}

function ensureCloudinaryConfig() {
 const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
 const apiKey = process.env.CLOUDINARY_API_KEY;
 const apiSecret = process.env.CLOUDINARY_API_SECRET;

 if (!cloudName || !apiKey || !apiSecret) {
  throw new CloudinaryConfigError(
   "CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY ve CLOUDINARY_API_SECRET tanımlı olmalı"
  );
 }

 cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true,
 });

 return cloudinary;
}

export async function uploadImageBuffer(buffer, { folder, publicId }) {
 const client = ensureCloudinaryConfig();

 return new Promise((resolve, reject) => {
  const stream = client.uploader.upload_stream(
   {
    folder: `fablessi/${folder}`,
    public_id: publicId,
    resource_type: "image",
    overwrite: true,
   },
   (error, result) => {
    if (error) reject(error);
    else resolve(result);
   }
  );

  stream.end(buffer);
 });
}
