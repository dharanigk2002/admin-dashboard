import mongoose from "mongoose";

export async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDb connected successfully!!!");
  } catch (error) {
    console.log(error.message);
  }
}
