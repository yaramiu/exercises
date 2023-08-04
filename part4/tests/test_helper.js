const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

const getBlogPostsFromDatabase = async () => {
  const request = await api.get("/api/blogs");
  return request.body;
};

module.exports = { getBlogPostsFromDatabase };
