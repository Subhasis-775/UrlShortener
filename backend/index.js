import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import urlRouter from './routes/urlRouter.js'
import connectDB from "./config/db.js";
dotenv.config();
connectDB();
const app=express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/',urlRouter);
const port=process.env.PORT||5000;
app.listen(port,()=>{
    console.log(`app is listening on port ${port}`);
})
