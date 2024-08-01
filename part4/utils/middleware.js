import logger from "./logger.js";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const tokenExtractor = (request, response, next) => {
  request.token = null;
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    request.token = authorization.replace("Bearer ", "");
  }
  next();
};

const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  request.user = await User.findById(decodedToken.id);
  next();
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  const tooShortUsernameErrorMessage = `Path \`username\` (\`${request.body.username}\`) is shorter than the minimum allowed length (3)`;
  const missingUsernameErrorMessage = `Path \`username\` is required`;
  const duplicateKeyMongoErrorMessage = "E11000 duplicate key error";

  if (error.name === "CastError") {
    return response.status(400).json({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    if (error.message.includes(missingUsernameErrorMessage)) {
      return response.status(400).json({ error: "missing username" });
    } else if (error.message.includes(tooShortUsernameErrorMessage)) {
      return response
        .status(400)
        .json({ error: "username length is less than 3 characters" });
    }
  } else if (
    error.name === "MongoServerError" &&
    error.message.includes(duplicateKeyMongoErrorMessage)
  ) {
    return response.status(400).json({ error: "username is not unique" });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "invalid token" });
  }

  next(error);
};

export default { errorHandler, tokenExtractor, userExtractor };
