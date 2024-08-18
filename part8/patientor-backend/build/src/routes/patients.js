"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.get("/", (_request, response) => {
    response.json(patientService_1.default.getEntries());
});
router.post("/", (request, response) => {
    try {
        const newPatientEntry = (0, utils_1.toNewPatientEntry)(request.body);
        const addedPatient = patientService_1.default.addPatientEntry(newPatientEntry);
        response.json(addedPatient);
    }
    catch (error) {
        if (error instanceof Error) {
            response.status(400).send("Error: " + error.message);
        }
    }
});
exports.default = router;
