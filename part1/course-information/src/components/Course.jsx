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
  return <h3>{course.name}</h3>;
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

export default Course;
