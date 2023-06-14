const Total = ({ parts }) => {
  let totalExercises = 0;
  parts.forEach((part) => (totalExercises += part.exercises));

  return (
    <p style={{ fontWeight: "bold" }}>total of {totalExercises} exercises</p>
  );
};

export default Total;
