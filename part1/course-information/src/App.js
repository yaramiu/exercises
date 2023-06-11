const App = () => {
  const course = "Half Stack application development";
  const part1 = {
    name: "Fundamentals of React",
    exercises: 10,
  };
  const part2 = {
    name: "Using props to pass data",
    exercises: 7,
  };
  const part3 = {
    name: "State of a component",
    exercises: 14,
  };

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} />
      <Total
        totalExercises={part1.exercises + part2.exercises + part3.exercises}
      />
    </div>
  );
};

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Content = (props) => {
  return (
    <>
      <Part
        partName={props.part1.name}
        numberOfExercises={props.part1.exercises}
      />
      <Part
        partName={props.part2.name}
        numberOfExercises={props.part2.exercises}
      />
      <Part
        partName={props.part3.name}
        numberOfExercises={props.part3.exercises}
      />
    </>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.partName} {props.numberOfExercises}
    </p>
  );
};

const Total = (props) => {
  return <p>Number of exercises {props.totalExercises}</p>;
};

export default App;
