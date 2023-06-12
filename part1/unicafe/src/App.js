import { useState } from "react";

const Header = ({ title }) => <h2>{title}</h2>;

const Button = ({ handleClick, text }) => (
  <button onClick={() => handleClick(text)}>{text}</button>
);

const Display = ({ feedback }) => {
  return (
    <>
      <Feedback option={feedback.options[0]} count={feedback.counts[0]} />
      <Feedback option={feedback.options[1]} count={feedback.counts[1]} />
      <Feedback option={feedback.options[2]} count={feedback.counts[2]} />
    </>
  );
};

const Feedback = ({ option, count }) => (
  <p>
    {option} {count}
  </p>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const feedback = {
    options: ["good", "neutral", "bad"],
    counts: [good, neutral, bad],
  };

  const handleClick = (text) => {
    if (text === "good") setGood(good + 1);
    else if (text === "neutral") setNeutral(neutral + 1);
    else if (text === "bad") setBad(bad + 1);
  };

  return (
    <div>
      <Header title={"give feedback"} />
      <Button handleClick={handleClick} text={"good"} />
      <Button handleClick={handleClick} text={"neutral"} />
      <Button handleClick={handleClick} text={"bad"} />
      <Header title={"statistics"}></Header>
      <Display feedback={feedback} />
    </div>
  );
};

export default App;
