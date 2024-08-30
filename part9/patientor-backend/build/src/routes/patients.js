"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.get("/", (_request, response) => {
    response.json(patientService_1.default.getEntries());
});
router.get("/:id", (request, response) => {
    const id = request.params.id;
    const foundPatient = patientService_1.default.getPatientEntry(id);
    if (foundPatient) {
        return response.json(foundPatient);
    }
    return response.status(404).end();
});
const newPatientParser = (request, _response, next) => {
    try {
        (0, utils_1.toNewPatientEntry)(request.body);
        next();
    }
    catch (error) {
        next(error);
    }
};
const errorMiddleware = (error, _request, response, next) => {
    if (error instanceof zod_1.z.ZodError) {
        response.status(400).json({ error: error.issues });
    }
    else {
        next(error);
    }
};
router.post("/", newPatientParser, (request, response) => {
    const addedPatient = patientService_1.default.addPatientEntry(request.body);
    response.json(addedPatient);
});
router.use(errorMiddleware);
router.post("/:id/entries", (request, response) => {
    const id = request.params.id;
    try {
        const patientEntry = (0, utils_1.toPatientEntry)(request.body);
        const updatedPatient = patientService_1.default.updatePatientEntry(id, patientEntry);
        if (updatedPatient) {
            return response.json(updatedPatient);
        }
    }
    catch (error) {
        if (error instanceof Error) {
            return response.status(400).send("Error: " + error.message);
        }
    }
    return response.status(404).end();
});
exports.default = router;
