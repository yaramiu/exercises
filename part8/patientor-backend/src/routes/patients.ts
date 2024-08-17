/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import express from "express";
import patientService from "../services/patientService";

const router = express.Router();

router.get("/", (_request, response) => {
  response.json(patientService.getEntries());
});

router.post("/", (request, response) => {
  const { name, dateOfBirth, ssn, gender, occupation } = request.body;
  const addedPatient = patientService.addPatientEntry({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  });
  response.json(addedPatient);
});

export default router;
