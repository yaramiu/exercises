// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((likes, blog) => likes + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  let blogWithMaxLikes = null;
  let currentMaxLikes = 0;
  blogs.forEach((blog) => {
    if (blog.likes >= currentMaxLikes) {
      currentMaxLikes = blog.likes;
      blogWithMaxLikes = blog;
    }
  });

  if (!blogWithMaxLikes) return null;
  return {
    title: blogWithMaxLikes.title,
    author: blogWithMaxLikes.author,
    likes: blogWithMaxLikes.likes,
  };
};

const mostBlogs = (blogs) => {
  const authorBlogs = new Map();
  blogs.forEach((blog) => {
    if (!authorBlogs.get(blog.author)) {
      authorBlogs.set(blog.author, 1);
    } else {
      const currentNumberOfBlogs = authorBlogs.get(blog.author);
      authorBlogs.set(blog.author, currentNumberOfBlogs + 1);
    }
  });

  let authorWithMostBlogs = null;
  let currentMaxNumberOfBlogs = 0;
  for (const entry of authorBlogs.entries()) {
    const currentNumberOfBlogs = entry[1];
    if (currentNumberOfBlogs >= currentMaxNumberOfBlogs) {
      currentMaxNumberOfBlogs = currentNumberOfBlogs;
      authorWithMostBlogs = entry[0];
    }
  }

  if (!authorWithMostBlogs) return null;
  return { author: authorWithMostBlogs, blogs: currentMaxNumberOfBlogs };
};

const mostLikes = (blogs) => {
  const authorLikes = new Map();
  blogs.forEach((blog) => {
    if (!authorLikes.has(blog.author)) {
      authorLikes.set(blog.author, blog.likes);
    } else {
      const currentNumberOfLikes = authorLikes.get(blog.author);
      authorLikes.set(blog.author, currentNumberOfLikes + blog.likes);
    }
  });

  let authorWithMostLikes = null;
  let currentMaxNumberOfLikes = 0;
  for (const [author, likes] of authorLikes.entries()) {
    const currentNumberOfLikes = likes;
    if (currentNumberOfLikes >= currentMaxNumberOfLikes) {
      currentMaxNumberOfLikes = currentNumberOfLikes;
      authorWithMostLikes = author;
    }
  }

  if (!authorWithMostLikes) return null;
  return { author: authorWithMostLikes, likes: currentMaxNumberOfLikes };
};

export default { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
