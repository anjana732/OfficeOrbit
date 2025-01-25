import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import { url } from "inspector";
import exp from "constants";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN
}));
app.use(cookieParser());
app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true , limit: "16kb"}));
app.use(express.static("public"))
export {app}