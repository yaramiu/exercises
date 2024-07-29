import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import config from "./utils/config.js";
import blogsRouter from "./controllers/blogs.js";
import morgan from "morgan";

const app = express();

await mongoose.connect(config.MONGODB_URI);

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/blogs", blogsRouter);

export default app;
