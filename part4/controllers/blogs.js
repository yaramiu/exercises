import express from "express";
import Blog from "../models/blog.js";

const blogsRouter = express.Router();

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/", async (request, response, next) => {
  const blog = new Blog(request.body);

  try {
    const result = await blog.save();
    response.status(201).json(result);
  } catch (exception) {
    if (blog.title === undefined) {
      response.status(400).json({ error: "Missing title" });
    } else if (blog.url === undefined) {
      response.status(400).json({ error: "Missing url" });
    }
    next(exception);
  }
});

export default blogsRouter;
