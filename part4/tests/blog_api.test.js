const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect("Content-Type", /application\/json/)
    .expect(200);
});

afterAll(async () => {
  await mongoose.connection.close();
});
