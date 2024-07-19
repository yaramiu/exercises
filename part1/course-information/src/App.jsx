const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
      {
        name: "Redux",
        exercises: 11,
        id: 4,
      },
    ],
  };

  return <Course course={course} />;
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part
          key={part.id}
          name={part.name}
          numberOfExercises={part.exercises}
        />
      ))}
    </div>
  );
};

const Part = ({ name, numberOfExercises }) => {
  return (
    <p>
      {name} {numberOfExercises}
    </p>
  );
};

const Total = ({ parts }) => {
  return (
    <h4>
      total of {parts.reduce((total, part) => total + part.exercises, 0)}{" "}
      exercises
    </h4>
  );
};

export default App;
