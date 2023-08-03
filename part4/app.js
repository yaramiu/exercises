const cors = require("cors");
const express = require("express");
require("express-async-errors");
const mongoose = require("mongoose");
const middleware = require("./utils/middleware");
const morgan = require("morgan");
const config = require("./utils/config");
const logger = require("./utils/logger");
const blogRouter = require("./controllers/blog");

const app = express();

const mongoUrl = config.MONGODB_URI;
mongoose.set("strictQuery", false);
(async () => {
  try {
    mongoose.connect(mongoUrl);
    logger.info("connected to MongoDB");
  } catch (error) {
    logger.error("Failed to connect to MongoDB:", error.message);
  }
})();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

app.use("/api/blogs", blogRouter);

app.use(middleware.errorHandler);

module.exports = app;
