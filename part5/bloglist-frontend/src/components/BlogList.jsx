import { useRef, useContext } from "react";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";
import blogService from "../services/blogs";
import UserContext from "../contexts/UserContext";
import NotificationContext from "../contexts/NotificationContext";

const BlogList = ({ addLikes, removeBlog }) => {
  const blogFormRef = useRef();
  const queryClient = useQueryClient();
  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(["blogs"], blogs.concat(newBlog));
    },
  });
  const { user } = useContext(UserContext);
  const { notificationDispatch } = useContext(NotificationContext);

  const addBlog = (blog) => {
    blogService.setToken(user.token);
    newBlogMutation.mutate({ ...blog });
    blogFormRef.current.toggleVisibility();
    notificationDispatch({
      type: "SET",
      payload: `a new blog ${blog.title} by ${blog.author} added`,
    });
    setTimeout(() => {
      notificationDispatch({ type: "CLEAR" });
    }, 5000);
  };

  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
  });

  if (result.isLoading) return <div>loading blogs...</div>;
  if (result.isError) return <div>error fetching data from blogs</div>;

  const blogs = result.data;

  return (
    <div>
      <Togglable buttonLabel="create new" ref={blogFormRef}>
        <h2>create new</h2>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            addLikes={addLikes}
            currentlyViewingUser={user}
            remove={removeBlog}
            isClicked={false}
          />
        ))}
    </div>
  );
};

export default BlogList;
