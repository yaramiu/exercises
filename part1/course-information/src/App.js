const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;
  const totalExercises = exercises1 + exercises2 + exercises3;

  return (
    <div>
      <Header course={course} />
      <Content
        part1={part1}
        exercises1={exercises1}
        part2={part2}
        exercises2={exercises2}
        part3={part3}
        exercises3={exercises3}
      />
      <Total totalExercises={totalExercises} />
    </div>
  );
};

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Content = (props) => {
  return (
    <>
      <Part partNumber={props.part1} exercisesNumber={props.exercises1} />
      <Part partNumber={props.part2} exercisesNumber={props.exercises2} />
      <Part partNumber={props.part3} exercisesNumber={props.exercises3} />
    </>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.partNumber} {props.exercisesNumber}
    </p>
  );
};

const Total = (props) => {
  return <p>Number of exercises {props.totalExercises}</p>;
};

export default App;
