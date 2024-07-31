import logger from "./logger.js";

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  next(error);
};

export default { errorHandler };
