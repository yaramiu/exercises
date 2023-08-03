const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");

const api = supertest(app);

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect("Content-Type", /application\/json/)
    .expect(200);
});

test("blog posts contains id property", async () => {
  expect(new Blog().id).toBeDefined();
});

afterAll(async () => {
  await mongoose.connection.close();
});
