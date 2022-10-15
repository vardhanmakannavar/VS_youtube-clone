//const express = require("express")
import  express, { request, response }  from "express"  //server
import mongoose from "mongoose"  //database
import dotenv from "dotenv"      //protection
import cookieParser from "cookie-parser";


//components
import userRoutes from './routes/users.js';
import videoRoutes from './routes/videos.js';
import commentRoutes from './routes/comments.js';
import authRoutes from './routes/auth.js';

const app = express()
dotenv.config()

const connect = () => {
     mongoose
     .connect (process.env.MONGO)
     .then(() =>{
         console.log("conected to DB")
     })
     .catch((err) => {
         throw err;
     });          
};

app.use(cookieParser())
app.use(express.json())
app.use('/api/auth',authRoutes);
app.use('/api/users',userRoutes);
app.use('/api/videos',videoRoutes);
app.use('/api/comments',commentRoutes);

app.use((error, request, response, next) => {
    const status = error.status || 500;
    const message = error.message || "something went wrong";
    return response.status(status).json({
        success: false,
        status,
        message,
    });
});

app.listen(2000, () => {
       connect()         
       console.log("Connected to server")         
})