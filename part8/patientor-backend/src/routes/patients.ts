import express from "express";
import patientService from "../services/patientService";
import { toNewPatientEntry, toPatientEntry } from "../utils";

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

router.post("/:id/entries", (request, response) => {
  const id = request.params.id;
  try {
    const patientEntry = toPatientEntry(request.body);
    const updatedPatient = patientService.updatePatientEntry(id, patientEntry);
    if (updatedPatient) {
      return response.json(updatedPatient);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return response.status(400).send("Error: " + error.message);
    }
  }
  return response.status(404).end();
});

export default router;
