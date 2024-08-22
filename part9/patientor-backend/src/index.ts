import express from "express";
import cors from "cors";

import diagnosisRouter from "./routes/diagnoses";
import patientRouter from "./routes/patients";

const PORT = 3001;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/ping", (_request, response) => {
  console.log("someone pinged here");
  response.send("pong");
});

app.use("/api/diagnoses", diagnosisRouter);
app.use("/api/patients", patientRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
