import express from "express";
import Blog from "../models/blog.js";
import middleware from "../utils/middleware.js";

const blogsRouter = express.Router();

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post(
  "/",
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (request, response) => {
    const { url, title, author, likes } = request.body;
    const user = request.user;

    const blog = new Blog({
      url,
      title,
      author,
      user: user.id,
      likes,
    });

    if (blog.title === undefined) {
      response.status(400).json({ error: "missing title" });
    } else if (blog.url === undefined) {
      response.status(400).json({ error: "missing url" });
    }

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog);
  }
);

blogsRouter.delete(
  "/:id",
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (request, response) => {
    const blogId = request.params.id;
    const user = request.user;

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return response.status(404).end();
    }

    if (blog.user.toString() === user.id.toString()) {
      await Blog.findByIdAndDelete(blogId);
      user.blogs = user.blogs.filter((blog) => blog._id.toString() !== blogId);
      await user.save();
      response.status(204).end();
    } else {
      response.status(401).json({ error: "invalid user" });
    }
  }
);

blogsRouter.put(
  "/:id",
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (request, response) => {
    const { url, title, author, likes, user } = request.body;
    const blogId = request.params.id;

    const blog = {
      url,
      title,
      author,
      user: user.id,
      likes,
    };

    const updatedBlog = await Blog.findByIdAndUpdate(blogId, blog, {
      new: true,
    });
    if (updatedBlog) {
      response.status(200).json(updatedBlog);
    } else {
      response.status(404).end();
    }
  }
);

export default blogsRouter;
