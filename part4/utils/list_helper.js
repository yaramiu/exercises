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

module.exports = { dummy, totalLikes, favoriteBlog };
