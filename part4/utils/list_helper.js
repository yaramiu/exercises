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
  return !blogWithMaxLikes
    ? null
    : {
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
  return !authorWithMostBlogs
    ? null
    : { author: authorWithMostBlogs, blogs: currentMaxNumberOfBlogs };
};

export default { dummy, totalLikes, favoriteBlog, mostBlogs };
