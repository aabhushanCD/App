import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
// Configuration (place it outside async functions to be initialized once)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// Function to upload file to Cloudinary
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      throw new Error("No file provided for upload");
    }

    // Upload to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto", // auto detect file type (image/video)
    });

    // Success: log and return the Cloudinary URL
    console.log("File uploaded to Cloudinary:", response.url);

    // Cleanup: remove the local temporary file
    fs.unlinkSync(localFilePath);

    return response; // Return the response from Cloudinary
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error.message);

    // If upload failed, cleanup the temporary file
    if (localFilePath && fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return null; // Return null in case of failure
  }
};

export { uploadOnCloudinary };
