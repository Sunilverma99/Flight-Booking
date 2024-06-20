import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from 'mongoose';
import authRouter from "./routes/auth.router.js"
import flightRouter from "./routes/flight.router.js"
import userRouter from "./routes/user.router.js"
import cors from "cors";

dotenv.config();
const PORT =  5000;
const app = express();

mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true, 	
  useUnifiedTopology: true, // Corrected typo here
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});
const __dirname=path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
app.use("/api",authRouter);
app.use("/api",flightRouter);
app.use("/api",userRouter);

app.use(express.static(path.join(__dirname,"/my-project/dist")))
app.get("*",(req,res)=>{
   res.sendFile(path.join(__dirname,"my-project","dist","index.html"))
});
app.use((err,req,res,next)=>{
     const statusCode=err.statusCode ||500;
     const message=err.message || "Internal Server Error";
     res.json({
      success:false,
      statusCode:statusCode,
      message:message,
     })
});