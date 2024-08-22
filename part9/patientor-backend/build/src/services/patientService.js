"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const patients_1 = __importDefault(require("../../data/patients"));
const utils_1 = require("../utils");
const getEntries = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};
const getPatientEntry = (patientId) => {
    const foundPatient = patients_1.default.find((patient) => patient.id === patientId);
    if (foundPatient) {
        const { id, name, dateOfBirth, ssn, gender, occupation, entries } = foundPatient;
        if ((0, utils_1.isValidEntries)(entries)) {
            return {
                id,
                name,
                dateOfBirth,
                ssn,
                gender,
                occupation,
                entries,
            };
        }
    }
    return;
};
const addPatientEntry = (entry) => {
    const newPatientEntry = Object.assign({ id: (0, uuid_1.v4)() }, entry);
    patients_1.default.push(newPatientEntry);
    return newPatientEntry;
};
const updatePatientEntry = (patientId, entry) => {
    const foundPatient = patients_1.default.find((patient) => patient.id === patientId);
    if (foundPatient) {
        foundPatient.entries = foundPatient.entries.concat(Object.assign({ id: (0, uuid_1.v4)() }, entry));
        return foundPatient;
    }
    return;
};
exports.default = {
    getEntries,
    addPatientEntry,
    getPatientEntry,
    updatePatientEntry,
};
