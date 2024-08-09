import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

export const createAnecdote = async (newAnecdote) => {
  const request = await axios.post(baseUrl, newAnecdote);
  return request.data;
};

export const updateAnecdote = async (updatedAnecdote) => {
  const request = await axios.put(
    `${baseUrl}/${updatedAnecdote.id}`,
    updatedAnecdote
  );
  return request.data;
};
