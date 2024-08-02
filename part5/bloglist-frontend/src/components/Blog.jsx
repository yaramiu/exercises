import { useState } from "react";

const Blog = ({ blog }) => {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}{" "}
        <button onClick={() => setIsDetailsVisible(!isDetailsVisible)}>
          {isDetailsVisible ? "hide" : "view"}
        </button>
      </div>
      {isDetailsVisible ? (
        <div>
          {blog.url} <br />
          likes {blog.likes}
          <button>like</button> <br />
          {blog.user.name}
        </div>
      ) : null}
    </div>
  );
};

export default Blog;
