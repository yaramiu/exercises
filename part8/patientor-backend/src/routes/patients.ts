import express from "express";
import patientService from "../services/patientService";

const router = express.Router();

router.get("/", (_request, response) => {
  response.json(patientService.getEntries());
});

export default router;
