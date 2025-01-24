import mongoose from "mongoose";
import {DB_NAME} from "../constants";

const connectDB = async () =>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    } catch (error) {
        console.log("MongoDb Connection error", error);
        process.exit(1)
    }
}

export default connectDB