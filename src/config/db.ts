import mongoose from "mongoose";

const initializeDB = async () => {
  try {
    const mongoUrl = process.env.MONGODB_URI
    if (!mongoUrl) {
      throw new Error("MONGODB_URI is not defined")
    }
    await mongoose.connect(mongoUrl);
    console.log("DB CONNECTION: SUCCESS");
  } catch (e) {
    console.log("DB CONNECTION: FAILED");
    throw e;
  }

};

export default initializeDB