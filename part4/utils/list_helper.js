// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let total = 0;
  blogs.forEach((blog) => (total += blog.likes));
  return total;
};

const favoriteBlog = (blogs) => {
  let maxLikes = 0;
  let blogToReturn;
  blogs.forEach((blog) => {
    if (blog.likes > maxLikes) {
      blogToReturn = {
        title: blog.title,
        author: blog.author,
        likes: blog.likes,
      };
      maxLikes = blog.likes;
    }
  });
  return blogToReturn;
};

const mostBlogs = (blogs) => {
  const authorAndBlogs = new Map();
  blogs.forEach((blog) => {
    if (!authorAndBlogs.has(blog.author)) {
      let numBlogs = 1;
      authorAndBlogs.set(blog.author, numBlogs);
    } else {
      let numBlogs = authorAndBlogs.get(blog.author);
      authorAndBlogs.set(blog.author, ++numBlogs);
    }
  });

  let authorWithMostBlogs;
  let mostBlogs = 0;
  for (const [author, numBlogs] of authorAndBlogs.entries()) {
    if (numBlogs > mostBlogs) {
      authorWithMostBlogs = author;
      mostBlogs = numBlogs;
    }
  }

  if (authorWithMostBlogs === undefined) {
    return undefined;
  }

  return { authorWithMostBlogs, mostBlogs };
};

const mostLikes = (blogs) => {
  const authorAndLikes = new Map();
  blogs.forEach((blog) => {
    if (!authorAndLikes.has(blog.author)) {
      authorAndLikes.set(blog.author, blog.likes);
    } else {
      let likes = authorAndLikes.get(blog.author);
      likes += blog.likes;
      authorAndLikes.set(blog.author, likes);
    }
  });

  let authorWithMostLikes;
  let mostLikes = 0;
  for (const [author, likes] of authorAndLikes.entries()) {
    if (likes > mostLikes) {
      authorWithMostLikes = author;
      mostLikes = likes;
    }
  }

  if (authorWithMostLikes === undefined) {
    return undefined;
  }

  return { authorWithMostLikes, mostLikes };
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
