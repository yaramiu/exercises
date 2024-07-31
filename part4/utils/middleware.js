import logger from "./logger.js";

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
  }

  next(error);
};

export default { errorHandler };
