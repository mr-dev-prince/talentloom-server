import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, { dbName: "talentloom" });
    console.log("Db connected successfully");
  } catch (error) {
    console.log("Failed to connect db.");
  }
};
