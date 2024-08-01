import Blog from "../models/blog.js";
import app from "../app.js";
import supertest from "supertest";

const api = supertest(app);

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const nonExistentId = async () => {
  const temporaryBlog = new Blog({
    title: "This will be deleted soon",
    url: "some url",
  });

  await temporaryBlog.save();
  await temporaryBlog.deleteOne();

  return temporaryBlog._id.toString();
};

const blogWithMoreLikes = {
  title: "React patterns",
  author: "Michael Chan",
  url: "https://reactpatterns.com/",
  likes: 10,
};

const getTokenFromNewUser = async () => {
  const newUser = {
    username: "root",
    name: "Superuser",
    password: "salainen",
  };
  await api.post("/api/users").send(newUser);

  const loginInfo = {
    username: "root",
    password: "salainen",
  };
  const response = await api.post("/api/login").send(loginInfo);

  return response.body.token;
};

const newBlog = {
  title: "Canonical string reduction",
  author: "Edsger W. Dijkstra",
  url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
  likes: 12,
};

export default {
  initialBlogs,
  blogsInDb,
  nonExistentId,
  blogWithMoreLikes,
  getTokenFromNewUser,
  newBlog,
};
