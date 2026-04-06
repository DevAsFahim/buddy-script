import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import config from "../config";
import AppError from "../error/AppError";
import { StatusCodes } from "http-status-codes";

cloudinary.config({
  cloud_name: config.cloudinary_cloud_name as string,
  api_key: config.cloudinary_api_key as string,
  api_secret: config.cloudinary_api_secret as string,
});

export const uploadToCloudinary = async (
  file: Express.Multer.File, // Accept the full multer file object
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "social_media_posts" },
      (error, result) => {
        if (error) {
          return reject(
            new AppError(StatusCodes.BAD_REQUEST, "Cloudinary upload failed"),
          );
        }
        resolve(result!.secure_url);
      },
    );

    // Write the buffer to the stream
    uploadStream.end(file.buffer);
  });
};
