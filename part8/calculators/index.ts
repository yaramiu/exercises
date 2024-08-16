import express from "express";

import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get("/hello", (_request, response) => {
  response.send("Hello Full Stack!");
});

app.get("/bmi", (request, response) => {
  const { height, weight } = request.query;

  if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))) {
    return response.status(400).json({ error: "malformatted parameters" });
  }

  const bmi = calculateBmi(Number(height), Number(weight));

  return response.status(200).json({
    weight: Number(weight),
    height: Number(height),
    bmi,
  });
});

app.post("/exercises", (request, response) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises: dailyExercises, target } = request.body;

  if (!dailyExercises || !target) {
    return response.status(400).json({ error: "parameters missing" });
  }

  if (
    isNaN(Number(target)) ||
    !Array.isArray(dailyExercises) ||
    dailyExercises.some(isNaN)
  ) {
    return response.status(400).json({ error: "malformatted parameters" });
  }

  return response
    .status(200)
    .json(calculateExercises(dailyExercises as number[], target as number));
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
