import dotenv from "dotenv"
import mongoose from "mongoose";
import connectDB from "./db";
import { app } from "./app";

dotenv.config({
    path: './env'
})


connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000 , ()=>{
        console.log(`Server is running at port: ${process.env.PORT}`)
    })
})
.catch(()=>{
    console.log("DB connection failed")
});