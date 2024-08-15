import express from "express";

import { calculateBmi } from "./bmiCalculator";

const app = express();

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

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
