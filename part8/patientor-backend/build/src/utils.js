"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewPatientEntry = void 0;
const types_1 = require("./types");
const toNewPatientEntry = (object) => {
    if (!object || typeof object !== "object") {
        throw new Error("Incorrect or missing data");
    }
    if ("name" in object &&
        "dateOfBirth" in object &&
        "ssn" in object &&
        "gender" in object &&
        "occupation" in object) {
        const { name, dateOfBirth, ssn, gender, occupation } = object;
        return {
            name: parseName(name),
            dateOfBirth: parseDateOfBirth(dateOfBirth),
            ssn: parseSSN(ssn),
            gender: parseGender(gender),
            occupation: parseOccupation(occupation),
        };
    }
    throw new Error("Incorrect data: some fields are missing");
};
exports.toNewPatientEntry = toNewPatientEntry;
const isString = (text) => {
    return typeof text === "string" || text instanceof String;
};
const parseName = (name) => {
    if (!isString(name)) {
        throw new Error("Incorrect name: " + name);
    }
    return name;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseDateOfBirth = (dateOfBirth) => {
    if (!isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error("Incorrect date of birth: " + dateOfBirth);
    }
    return dateOfBirth;
};
const parseSSN = (ssn) => {
    if (!isString(ssn)) {
        throw new Error("Incorrect ssn: " + ssn);
    }
    return ssn;
};
const isGender = (gender) => {
    return Object.values(types_1.Gender)
        .map((value) => value.toString())
        .includes(gender);
};
const parseGender = (gender) => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error("Incorrect gender: " + gender);
    }
    return gender;
};
const parseOccupation = (occupation) => {
    if (!isString(occupation)) {
        throw new Error("Incorrect occupation: " + occupation);
    }
    return occupation;
};
