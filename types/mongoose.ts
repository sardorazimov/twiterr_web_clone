import mongoose, { ConnectOptions } from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGOODB_URl) {
    return console.error("MONGO_URI is not defined");
  }

  if (isConnected) {
    return;
  }

  try {
    const options: ConnectOptions = {
      dbName: "TwitterWebClone",
      autoCreate: true,
    };

    await mongoose.connect(process.env.MONGOODB_URl, options);

    isConnected = true;
    console.log("Connected to database");
  } catch (error) {
    console.log("Error connecting to database");
  }
};