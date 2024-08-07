import express from "express";
import "express-async-errors";
import cors from "cors";
import mongoose from "mongoose";
import config from "./utils/config.js";
import blogsRouter from "./controllers/blogs.js";
import usersRouter from "./controllers/users.js";
import loginRouter from "./controllers/login.js";
import testingRouter from "./controllers/testing.js";
import morgan from "morgan";
import middleware from "./utils/middleware.js";

const app = express();

mongoose.set("strictQuery", true);

await mongoose.connect(config.MONGODB_URI);

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

if (process.env.NODE_ENV === "test") {
  app.use("/api/testing", testingRouter);
}

app.use(middleware.errorHandler);

export default app;
