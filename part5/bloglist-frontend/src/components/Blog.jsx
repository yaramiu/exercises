import { Link } from "react-router-dom";

const Comments = ({ blog }) => {
  return (
    <div>
      <h3>comments</h3>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </div>
  );
};

const Blog = ({ blog, addLikes, currentlyViewingUser, remove, isClicked }) => {
  if (!blog) return null;

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
        <>
          <div>
            {" "}
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
            {blog.user.name === currentlyViewingUser.name ? (
              <button style={removeButtonStyle} onClick={() => remove(blog)}>
                remove
              </button>
            ) : null}
          </div>
          <Comments blog={blog} />
        </>
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
