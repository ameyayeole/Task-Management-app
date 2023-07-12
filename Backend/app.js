import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes.js";
import postRouter from "./routes/task-routes.js";
import { connectDB } from "./database/connection.js";
import cors from "cors";
import 'dotenv/config';


const app = express();

connectDB();
app.use(cors())
app.use(express.json());
app.use(router);
app.use(postRouter);


app.listen(4000,(req,res)=>{
    console.log("Server running on port 4000")
})





