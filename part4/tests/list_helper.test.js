import { test, describe } from "node:test";
import assert from "node:assert";
import listHelper from "../utils/list_helper.js";

const listWithOneBlog = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
    likes: 5,
    __v: 0,
  },
];
const blogs = [
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
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

test("dummy returns one", () => {
  assert.strictEqual(listHelper.dummy([]), 1);
});

describe("total likes", () => {
  test("of empty list is zero", () => {
    assert.strictEqual(listHelper.totalLikes([]), 0);
  });

  test("when list has only one blog equals the likes of that", () => {
    assert.strictEqual(listHelper.totalLikes(listWithOneBlog), 5);
  });

  test("of a bigger list is calculated right", () => {
    assert.strictEqual(listHelper.totalLikes(blogs), 36);
  });
});

describe("favorite blog", () => {
  test("of empty list is null", () => {
    assert.deepStrictEqual(listHelper.favoriteBlog([]), null);
  });

  test("when list has only one blog equals that blog", () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(listWithOneBlog), {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 5,
    });
  });

  test("of a bigger list returns the blog with most likes (if tied, the blog is the one with the greater index in the list)", () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(blogs), {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    });
  });
});

describe("most blogs", () => {
  test("of empty list is null", () => {
    assert.deepStrictEqual(listHelper.mostBlogs([]), null);
  });

  test("when list has only one blog returns an object with author equal to that blogs author and blogs equal to 1", () => {
    assert.deepStrictEqual(listHelper.mostBlogs(listWithOneBlog), {
      author: "Edsger W. Dijkstra",
      blogs: 1,
    });
  });

  test("of a bigger list returns correct value", () => {
    assert.deepStrictEqual(listHelper.mostBlogs(blogs), {
      author: "Robert C. Martin",
      blogs: 3,
    });
  });
});

describe("most likes", () => {
  test("of empty list is null", () => {
    assert.deepStrictEqual(listHelper.mostLikes([]), null);
  });

  test("when list only has one blog returns an object with author equal to that blogs author and likes equal to number of likes that blog has", () => {
    assert.deepStrictEqual(listHelper.mostLikes(listWithOneBlog), {
      author: "Edsger W. Dijkstra",
      likes: 5,
    });
  });

  test("of a bigger list returns the correct value", () => {
    assert.deepStrictEqual(listHelper.mostLikes(blogs), {
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });
});
