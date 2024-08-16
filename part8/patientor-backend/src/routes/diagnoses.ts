import express from "express";

import diagnosisService from "../services/diagnosisService";

const router = express.Router();

router.get("/", (_request, response) => {
  response.json(diagnosisService.getEntries());
});

export default router;
