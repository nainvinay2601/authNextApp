//who will talk to mongoDB? -> Mongoose
import { error } from "console";
import mongoose from "mongoose";

// any involvment of database we have to use the asyn function
export async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI!); // this ! says that it will be always available and it makes the ts error goes away basically we saying we will take of this

    // now once the mongoose has been connected it will give us the connection

    const connection = mongoose.connection; // based on this connection we can listen to variety of the events

    connection.on("connected", () => {
      console.log("MONGODB Connected Successfully");
    });

    connection.on("error", () => {
      console.log(
        "MongoDB connection error please make sure mongodb is runnin.",
        error
      );

      process.exit();
    });
  } catch (error) {
    console.error("Something Went Wrong", error);
    console.log("Error In DB Config File while connecting to database");
  }
}
