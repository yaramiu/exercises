import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../requests";
import { useContext } from "react";
import NotificationContext from "../NotificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const { notificationDispatch } = useContext(NotificationContext);

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote));
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate(
      { content, votes: 0 },
      {
        onError: handleCreationError,
      }
    );
    notificationDispatch({
      type: "SET",
      payload: `anecdote '${content}' created`,
    });
    setTimeout(() => notificationDispatch({ type: "CLEAR" }), 5000);
  };

  const handleCreationError = (error) => {
    if (
      error.response.data.error ===
      "too short anecdote, must have length 5 or more"
    ) {
      notificationDispatch({ type: "SET", payload: error.response.data.error });
      setTimeout(() => notificationDispatch({ type: "CLEAR" }), 5000);
    }
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
