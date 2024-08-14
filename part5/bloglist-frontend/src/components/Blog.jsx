import { Link } from "react-router-dom";

const Blog = ({ blog, addLikes, currentlyViewingUser, remove, isClicked }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const removeButtonStyle = {
    backgroundColor: "#2d7af4",
  };

  return (
    <div data-testid="blog">
      {isClicked ? (
        <div>
          <h2>
            {blog.title} {blog.author}
          </h2>
          <div>
            <a href={`${blog.url}`}>{blog.url}</a>
            <br />
            {blog.likes} likes<span data-testid="current-likes"></span>
            <button onClick={() => addLikes(blog)}>like</button> <br />
            added by {blog.user.name}
          </div>
          <div>
            {blog.user.name === currentlyViewingUser.name ? (
              <button style={removeButtonStyle} onClick={() => remove(blog)}>
                remove
              </button>
            ) : null}
          </div>
        </div>
      ) : (
        <div style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}{" "}
          </Link>
        </div>
      )}
    </div>
  );
};

export default Blog;
