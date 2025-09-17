import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import path from "path";
dotenv.config();

cloudinary.config({
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET_KEY,
  cloud_name: process.env.CLOUD_NAME,
});

export const uploadMedia = async (file) => {
  try {
    console.log(file);
    const ext = path.extname(file).toLowerCase();

    // Determine resource_type
    let resourceType = "image"; // default
    if (ext === ".pdf" || ext === ".doc" || ext === ".docx" || ext === ".txt") {
      resourceType = "raw"; // for documents
    } else if (
      ext === ".mp4" ||
      ext === ".mov" ||
      ext === ".avi" ||
      ext === ".mkv"
    ) {
      resourceType = "video"; // for videos
    }
    const uploadResponse = await cloudinary.uploader.upload(file, {
      resource_type: resourceType,
      access_mode: "public",
      use_filename: true,
      unique_filename: false,
    });
    return uploadResponse;
  } catch (error) {
    console.log(error);
  }
};

// Delete media from cloudinary

export const deleteMedia = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.log(error);
  }
};

export const deleteVideo = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: "video" });
  } catch (error) {
    console.log(error);
  }
};
