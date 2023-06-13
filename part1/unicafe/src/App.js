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

  return (
    <>
      <Statistic option={goodOption} count={goodCount} />
      <Statistic option={neutralOption} count={neutralCount} />
      <Statistic option={badOption} count={badCount} />
      <Statistic option={"all"} count={totalCount} />
      <Statistic option={"average"} count={averageScore} />
      <Statistic option={"positive"} count={percentGood} />
    </>
  );
};

const Statistic = ({ option, count }) => {
  if (option === "positive") {
    return (
      <p>
        {option} {count * 100} %
      </p>
    );
  }
  return (
    <p>
      {option} {count}
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
