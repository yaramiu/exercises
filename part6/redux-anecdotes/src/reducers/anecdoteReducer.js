import { createSlice } from "@reduxjs/toolkit";

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    increaseVoteOf(state, action) {
      const id = action.payload;
      const anecdoteToUpdate = state.find((anecdote) => anecdote.id === id);
      const updatedAnecdote = {
        ...anecdoteToUpdate,
        votes: anecdoteToUpdate.votes + 1,
      };
      return state.map((anecdote) =>
        anecdote.id === id ? updatedAnecdote : anecdote
      );
    },
    createAnecdoteWith(state, action) {
      return state.concat(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { increaseVoteOf, createAnecdoteWith, setAnecdotes } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
