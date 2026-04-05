import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import config from "../config";
import AppError from "../error/AppError";
import { StatusCodes } from "http-status-codes";

cloudinary.config({
  cloud_name: config.cloudinary_cloud_name as string,
  api_key: config.cloudinary_api_key as string,
  api_secret: config.cloudinary_api_secret as string,
});

export const uploadToCloudinary = async (filePath: string): Promise<string> => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "social_media_posts",
    });
    
    fs.unlinkSync(filePath);
    return result.secure_url;
  } catch (error) {
    fs.unlinkSync(filePath);
    throw new AppError(StatusCodes.BAD_REQUEST, "Cloudinary upload failed");
  }
};
