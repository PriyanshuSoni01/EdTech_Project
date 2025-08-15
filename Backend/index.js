// Importing necessary modules and packages
import mongoose from "mongoose";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";
dotenv.config();

import userRoutes from "./routes/User.js";
import profileRoutes from "./routes/Profile.js";
import courseRoutes from "./routes/Course.js";
import paymentRoutes from "./routes/Payments.js";
import contactUsRoute from "./routes/Contact.js";
import { cloudinaryConnect } from "./config/cloudinary.js";

mongoose.connect(process.env.MONGO_URL).then(()=>{
  console.log('Connected to MongoDB')
})
.catch((err)=>{
  console.log(err)
})

const app = express()
const port = process.env.PORT || 4000
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}!!!`)
})

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);
app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "/tmp/",
	})
);

// Connecting to cloudinary
cloudinaryConnect();

// Setting up routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

app.use((err, req, res ,next) =>{
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server error'
  return res.status(statusCode).json({
    success:false,
    statusCode,
    message,
  })
})