import { useSelector, useDispatch } from "react-redux";
import { increaseVoteOf, createAnecdoteWith } from "./reducers/anecdoteReducer";

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(increaseVoteOf(id));
  };

  const addAnecdote = (event) => {
    event.preventDefault();
    dispatch(createAnecdoteWith(event.target.content.value));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
        .sort((anecdoteA, anecdoteB) => anecdoteB.votes - anecdoteA.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="content" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default App;
