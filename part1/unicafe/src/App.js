import { useState } from "react";

const Header = ({ title }) => <h2>{title}</h2>;

const Button = ({ handleClick, text }) => (
  <button onClick={() => handleClick(text)}>{text}</button>
);

const Statistics = ({ feedback }) => {
  const goodOption = feedback.options[0];
  const goodCount = feedback.counts[0];
  const neutralOption = feedback.options[1];
  const neutralCount = feedback.counts[1];
  const badOption = feedback.options[2];
  const badCount = feedback.counts[2];

  let totalCount = 0;
  feedback.counts.forEach((count) => (totalCount += count));

  const calculateAverage = () => {
    const GOOD_SCORE = 1;
    const BAD_SCORE = -1;
    const score = goodCount * GOOD_SCORE + badCount * BAD_SCORE;
    const averageScore = score / totalCount;
    return averageScore;
  };
  const averageScore = calculateAverage();

  const percentGood = goodCount / totalCount;

  if (totalCount === 0) return <p>No feedback given</p>;
  else
    return (
      <>
        <StatisticLine text={goodOption} value={goodCount} />
        <StatisticLine text={neutralOption} value={neutralCount} />
        <StatisticLine text={badOption} value={badCount} />
        <StatisticLine text={"all"} value={totalCount} />
        <StatisticLine text={"average"} value={averageScore} />
        <StatisticLine text={"positive"} value={percentGood} />
      </>
    );
};

const StatisticLine = ({ text, value }) => {
  if (text === "positive")
    return (
      <p>
        {text} {value * 100} %
      </p>
    );
  else
    return (
      <p>
        {text} {value}
      </p>
    );
};

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
      <Statistics feedback={feedback} />
    </div>
  );
};

export default App;
