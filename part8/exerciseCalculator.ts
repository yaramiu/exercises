type Ratings = 1 | 2 | 3;
type RatingDescriptions =
  | "bad, not close to target"
  | "not too bad but could be better"
  | "good, target reached";

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: Ratings;
  ratingDescription: RatingDescriptions;
  target: number;
  average: number;
}

const calculateExercises = (
  dailyExerciseHours: number[],
  target: number
): Result => {
  const periodLength: number = dailyExerciseHours.length;

  const trainingDays: number = dailyExerciseHours.filter(
    (dailyHours) => dailyHours > 0
  ).length;

  let average: number = 0;
  if (dailyExerciseHours.length > 0) {
    average =
      dailyExerciseHours.reduce(
        (totalHours, dailyHours) => totalHours + dailyHours,
        0
      ) / dailyExerciseHours.length;
  }

  const success: boolean = average >= target;

  let rating: Ratings;
  if (average / target < 0.5) {
    rating = 1;
  } else if (average / target > 0.5 && average / target < 1) {
    rating = 2;
  } else if (average / target >= 1) {
    rating = 3;
  }

  let ratingDescription: RatingDescriptions;
  if (rating === 1) {
    ratingDescription = "bad, not close to target";
  } else if (rating === 2) {
    ratingDescription = "not too bad but could be better";
  } else if (rating === 3) {
    ratingDescription = "good, target reached";
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
