type Ratings = 1 | 2 | 3;
type RatingDescriptions = "bad" | "not too bad but could be better" | "good";

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: Ratings | undefined;
  ratingDescription: RatingDescriptions | undefined;
  target: number;
  average: number;
}

interface CalculateExercisesParameters {
  dailyExerciseHours: number[];
  target: number;
}

const parseArguments = (args: string[]): CalculateExercisesParameters => {
  if (args.length < 3) throw new Error("too few arguments");

  const target = Number(args[2]);
  if (isNaN(target)) throw new Error("target argument is not a number");

  const exerciseHourArguments = args.slice(3);
  if (exerciseHourArguments.some((argument) => isNaN(Number(argument)))) {
    throw new Error("one or more exercise hour arguments is not a number");
  }

  const dailyExerciseHours = exerciseHourArguments.map((argument) =>
    Number(argument)
  );

  return {
    target,
    dailyExerciseHours,
  };
};

export const calculateExercises = (
  dailyExerciseHours: number[],
  target: number
): Result => {
  const periodLength = dailyExerciseHours.length;

  const trainingDays = dailyExerciseHours.filter(
    (dailyHours) => dailyHours > 0
  ).length;

  let average = 0;
  if (dailyExerciseHours.length > 0) {
    average =
      dailyExerciseHours.reduce(
        (totalHours, dailyHours) => totalHours + dailyHours,
        0
      ) / dailyExerciseHours.length;
  }

  const success = average >= target;

  let rating: Ratings | undefined;
  if (average / target < 0.5) {
    rating = 1;
  } else if (average / target > 0.5 && average / target < 1) {
    rating = 2;
  } else if (average / target >= 1) {
    rating = 3;
  }

  let ratingDescription: RatingDescriptions | undefined;
  if (rating === 1) {
    ratingDescription = "bad";
  } else if (rating === 2) {
    ratingDescription = "not too bad but could be better";
  } else if (rating === 3) {
    ratingDescription = "good";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

if (require.main === module) {
  try {
    const { target, dailyExerciseHours } = parseArguments(process.argv);
    console.log(calculateExercises(dailyExerciseHours, target));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error: " + error.message);
    }
  }
}
