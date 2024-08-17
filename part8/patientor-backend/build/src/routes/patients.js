"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const router = express_1.default.Router();
router.get("/", (_request, response) => {
    response.json(patientService_1.default.getEntries());
});
router.post("/", (request, response) => {
    const { name, dateOfBirth, ssn, gender, occupation } = request.body;
    const addedPatient = patientService_1.default.addPatientEntry({
        name,
        dateOfBirth,
        ssn,
        gender,
        occupation,
    });
    response.json(addedPatient);
});
exports.default = router;
