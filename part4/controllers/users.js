import express from "express";
import bcrypt from "bcrypt";
import User from "../models/user.js";

const usersRouter = express.Router();

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
  });
  response.status(200).json(users);
});

usersRouter.post("/", async (request, response, next) => {
  const { username, name, password } = request.body;

  if (!password) {
    return response.status(400).json({ error: "missing password" });
  }
  if (password.length < 3) {
    return response
      .status(400)
      .json({ error: "password length is less than 3 characters" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    blogs: [],
    username,
    name,
    passwordHash,
  });

  try {
    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (exception) {
    next(exception);
  }
});

export default usersRouter;
