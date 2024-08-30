import express, { NextFunction, Request, Response } from "express";
import { z } from "zod";
import patientService from "../services/patientService";
import { toNewPatientEntry, toPatientEntry } from "../utils";
import { NewPatientEntry, NonSensitivePatient } from "../types";

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

const newPatientParser = (
  request: Request,
  _response: Response,
  next: NextFunction
) => {
  try {
    toNewPatientEntry(request.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (
  error: unknown,
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    response.status(400).json({ error: error.issues });
  } else {
    next(error);
  }
};

router.post(
  "/",
  newPatientParser,
  (
    request: Request<unknown, unknown, NewPatientEntry>,
    response: Response<NonSensitivePatient>
  ) => {
    const addedPatient = patientService.addPatientEntry(request.body);
    response.json(addedPatient);
  }
);

router.use(errorMiddleware);

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
