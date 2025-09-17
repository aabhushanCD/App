import mongoose from "mongoose";

export const ConnectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("DB connection succesfull.");
  } catch (error) {
    console.log("Failed to connect DB!", error.message);
    process.exit(1);
  }
};
