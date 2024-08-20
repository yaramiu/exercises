import express from "express";
import patientService from "../services/patientService";
import { toNewPatientEntry } from "../utils";

const router = express.Router();

router.get("/", (_request, response) => {
  response.json(patientService.getEntries());
});

router.get("/:id", (request, response) => {
  const id = request.params.id;
  const foundPatient = patientService.getPatientEntry(id);
  if (foundPatient) {
    return response.json(foundPatient);
  }
  return response.status(404).end();
});

router.post("/", (request, response) => {
  try {
    const newPatientEntry = toNewPatientEntry(request.body);
    const addedPatient = patientService.addPatientEntry(newPatientEntry);
    response.json(addedPatient);
  } catch (error: unknown) {
    if (error instanceof Error) {
      response.status(400).send("Error: " + error.message);
    }
  }
});

export default router;
