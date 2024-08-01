import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import express from "express";
import User from "../models/user.js";

const loginRouter = express.Router();

loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body;

  if (!password) {
    return response.status(401).json({ error: "invalid username or password" });
  }

  const user = await User.findOne({ username });
  const isPasswordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && isPasswordCorrect)) {
    return response.status(401).json({ error: "invalid username or password" });
  }

  const userToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userToken, process.env.SECRET);

  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

export default loginRouter;
