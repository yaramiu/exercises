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

export default { dummy, totalLikes, favoriteBlog };
