import { useRef, useContext } from "react";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";
import blogService from "../services/blogs";
import UserContext from "../contexts/UserContext";
import NotificationContext from "../contexts/NotificationContext";

const BlogList = () => {
  const blogFormRef = useRef();
  const queryClient = useQueryClient();
  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(["blogs"], blogs.concat(newBlog));
    },
  });
  const updateBlogMutation = useMutation({
    mutationFn: async ({ blog }) => await blogService.update(blog),
    onSuccess: (updatedBlog, { userObject }) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      updatedBlog = { ...updatedBlog, user: userObject };
      const updatedBlogs = blogs.map((blog) =>
        blog.id !== updatedBlog.id ? blog : updatedBlog
      );
      queryClient.setQueryData(["blogs"], updatedBlogs);
    },
  });
  const removeBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: (data, id) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(
        ["blogs"],
        blogs.filter((blog) => blog.id != id)
      );
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

  const addLikes = async (blogToUpdate) => {
    blogService.setToken(user.token);
    updateBlogMutation.mutate({
      blog: { ...blogToUpdate, likes: blogToUpdate.likes + 1 },
      userObject: blogToUpdate.user,
    });
  };

  const removeBlog = async (blogToRemove) => {
    if (
      window.confirm(
        `Remove blog ${blogToRemove.title} by ${blogToRemove.author}`
      )
    ) {
      blogService.setToken(user.token);
      removeBlogMutation.mutate(blogToRemove.id);
    }
  };

  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
  });

  if (result.isLoading) return <div>loading blogs...</div>;
  if (result.isError) return <div>error fetching data from blogs</div>;

  const blogs = result.data;

  return (
    <div>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
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
          />
        ))}
    </div>
  );
};

export default BlogList;
