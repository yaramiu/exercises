interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescription {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background";
}

interface CoursePartSpecial extends CoursePartDescription {
  requirements: string[];
  kind: "special";
}

type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;

const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is the leisured course part",
    kind: "basic",
  },
  {
    name: "Advanced",
    exerciseCount: 7,
    description: "This is the hardest course part",
    kind: "basic",
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    kind: "group",
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    backgroundMaterial: "https://fake-exercise-submit.made-up-url.dev",
    kind: "background",
  },
  {
    name: "Backend development",
    exerciseCount: 21,
    description: "Typing the backend",
    requirements: ["nodejs", "jest"],
    kind: "special",
  },
];

const PartHeader = ({ part }: { part: CoursePart }) => {
  return (
    <h4 style={{ marginBottom: 0, marginTop: "0.5rem" }}>
      {part.name} {part.exerciseCount}
    </h4>
  );
};

const PartDescription = ({
  part,
}: {
  part: CoursePartBasic | CoursePartBackground | CoursePartSpecial;
}) => {
  return (
    <div>
      <i>{part.description}</i>
    </div>
  );
};

const Part = ({ part }: { part: CoursePart }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (part.kind) {
    case "basic":
      return (
        <div>
          <PartHeader part={part} />
          <PartDescription part={part} />
        </div>
      );
    case "group":
      return (
        <div>
          <PartHeader part={part} />
          project exercises {part.groupProjectCount}
        </div>
      );
    case "background":
      return (
        <div>
          <PartHeader part={part} />
          <PartDescription part={part} />
          submit to {part.backgroundMaterial}
        </div>
      );
    case "special":
      return (
        <div>
          <PartHeader part={part} />
          <PartDescription part={part} />
          required skills: {part.requirements.join(", ")}
        </div>
      );
    default:
      assertNever(part);
  }
};

const Header = ({ name }: { name: string }) => {
  return <h1>{name}</h1>;
};

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      {courseParts.map((coursePart) => (
        <Part key={coursePart.name} part={coursePart} />
      ))}
    </div>
  );
};

const Total = ({ totalExercises }: { totalExercises: number }) => {
  return <p>Number of exercises {totalExercises}</p>;
};

const App = () => {
  const courseName = "Half Stack application development";

  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total totalExercises={totalExercises} />
    </div>
  );
};

export default App;
