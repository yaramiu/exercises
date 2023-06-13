import { useState } from "react";

const Header = ({ title }) => <h2>{title}</h2>;

const Anecdote = ({ text }) => <div>{text}</div>;

const AnecdoteVotes = ({ votes }) => <p>has {votes} votes</p>;

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Array(8).fill(0));
  let mostVotesIndex = 0;
  let mostVotes = 0;

  const setRandomAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * 8);
    setSelected(randomIndex);
  };

  const updateVotes = () => {
    const pointsCopy = [...points];
    pointsCopy[selected] += 1;
    setPoints(pointsCopy);
  };

  const displayMostVotedAnecdote = () => {
    for (let i = 0; i < points.length; i++) {
      const currentVote = points[i];
      if (currentVote > mostVotes) {
        mostVotesIndex = i;
        mostVotes = currentVote;
      }
    }
    return anecdotes[mostVotesIndex];
  };

  return (
    <>
      <Header title={"Anecdote of the day"} />
      <Anecdote text={anecdotes[selected]} />
      <AnecdoteVotes votes={points[selected]} />
      <button onClick={updateVotes}>{"vote"}</button>
      <button onClick={setRandomAnecdote}>{"next anecdote"}</button>
      <Header title={"Anecdote with most votes"} />
      <Anecdote text={displayMostVotedAnecdote()} />
      <AnecdoteVotes votes={mostVotes} />
    </>
  );
};

export default App;
