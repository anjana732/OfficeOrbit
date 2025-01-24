import dotenv from "dotenv"
import mongoose from "mongoose";
import connectDB from "./db";

dotenv.config({
    path: './env'
})

connectDB();