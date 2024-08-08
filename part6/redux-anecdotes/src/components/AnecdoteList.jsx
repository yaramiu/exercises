import { useSelector, useDispatch } from "react-redux";
import { increaseVoteOf } from "../reducers/anecdoteReducer";
import PropTypes from "prop-types";

const Anecdote = ({ content, votes, handleClick }) => {
  return (
    <div>
      <div>{content}</div>
      <div>
        has {votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  );
};

Anecdote.propTypes = {
  content: PropTypes.string.isRequired,
  votes: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
};

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state);

  const vote = (id) => {
    dispatch(increaseVoteOf(id));
  };

  return (
    <>
      {anecdotes
        .sort((anecdoteA, anecdoteB) => anecdoteB.votes - anecdoteA.votes)
        .map((anecdote) => (
          <Anecdote
            key={anecdote.id}
            content={anecdote.content}
            votes={anecdote.votes}
            handleClick={() => vote(anecdote.id)}
          />
        ))}
    </>
  );
};

export default AnecdoteList;
