"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidEntries = exports.toPatientEntry = exports.toNewPatientEntry = void 0;
const zod_1 = require("zod");
const types_1 = require("./types");
const NewPatientSchema = zod_1.z.object({
    name: zod_1.z.string(),
    dateOfBirth: zod_1.z.string().date(),
    ssn: zod_1.z.string(),
    gender: zod_1.z.nativeEnum(types_1.Gender),
    occupation: zod_1.z.string(),
    entries: zod_1.z.array(zod_1.z.any()),
});
const toNewPatientEntry = (object) => {
    return NewPatientSchema.parse(object);
};
exports.toNewPatientEntry = toNewPatientEntry;
const toPatientEntry = (object) => {
    if (!object || typeof object !== "object") {
        throw new Error("Incorrect or missing data");
    }
    if ("description" in object &&
        "date" in object &&
        "specialist" in object &&
        "type" in object) {
        const { description, date, specialist, type } = object;
        if (type === "HealthCheck") {
            if ("healthCheckRating" in object) {
                const { healthCheckRating } = object;
                return {
                    description: parseDescription(description),
                    date: parseDate(date),
                    specialist: parseSpecialist(specialist),
                    diagnosisCodes: parseDiagnosisCodes(object),
                    type: "HealthCheck",
                    healthCheckRating: parseHealthCheckRating(healthCheckRating),
                };
            }
            throw new Error("Missing healthCheckRating");
        }
        else if (type === "OccupationalHealthcare") {
            if ("employerName" in object) {
                const { employerName } = object;
                return {
                    description: parseDescription(description),
                    date: parseDate(date),
                    specialist: parseSpecialist(specialist),
                    diagnosisCodes: parseDiagnosisCodes(object),
                    type: "OccupationalHealthcare",
                    employerName: parseEmployerName(employerName),
                    sickLeave: "sickLeave" in object
                        ? parseSickLeave(object.sickLeave)
                        : undefined,
                };
            }
            throw new Error("Missing employerName");
        }
        else if (type === "Hospital") {
            if ("discharge" in object) {
                const { discharge } = object;
                return {
                    description: parseDescription(description),
                    date: parseDate(date),
                    specialist: parseSpecialist(specialist),
                    diagnosisCodes: parseDiagnosisCodes(object),
                    type: "Hospital",
                    discharge: parseDischarge(discharge),
                };
            }
            throw new Error("Missing discharge");
        }
        throw new Error("Incorrect entry type: " + object.type);
    }
    throw new Error("Incorrect entry: " + JSON.stringify(object));
};
exports.toPatientEntry = toPatientEntry;
const isString = (text) => {
    return typeof text === "string" || text instanceof String;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const isValidEntries = (entries) => {
    const entryTypes = ["Hospital", "OccupationalHealthcare", "HealthCheck"];
    for (const entry of entries) {
        if (!entryTypes.includes(entry.type)) {
            return false;
        }
    }
    return true;
};
exports.isValidEntries = isValidEntries;
const parseDescription = (description) => {
    if (!isString(description)) {
        throw new Error("Incorrect description: " + description);
    }
    return description;
};
const parseDate = (date) => {
    if (!isString(date) || !isDate(date)) {
        throw new Error("Incorrect date: " + date);
    }
    return date;
};
const parseSpecialist = (specialist) => {
    if (!isString(specialist)) {
        throw new Error("Incorrect specialist: " + specialist);
    }
    return specialist;
};
const isNumber = (num) => {
    return typeof num === "number";
};
const isHealthCheckRating = (healthCheckRating) => {
    return healthCheckRating >= 0 && healthCheckRating <= 3;
};
const parseHealthCheckRating = (healthCheckRating) => {
    if (!isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
        throw new Error("Incorrect health check rating: " + healthCheckRating);
    }
    return healthCheckRating;
};
const parseEmployerName = (employerName) => {
    if (!isString(employerName)) {
        throw new Error("Incorrect employer name: " + employerName);
    }
    return employerName;
};
const isDischarge = (discharge) => {
    if (!("date" in discharge) || !("criteria" in discharge)) {
        return false;
    }
    if (!isString(discharge.date) || !isString(discharge.criteria)) {
        return false;
    }
    if (!isDate(discharge.date)) {
        return false;
    }
    return true;
};
const parseDischarge = (discharge) => {
    if (!discharge || typeof discharge !== "object") {
        throw new Error("Discharge missing or not an object");
    }
    if (!isDischarge(discharge)) {
        throw new Error("Incorrect discharge: " + JSON.stringify(discharge));
    }
    return discharge;
};
const parseDiagnosisCodes = (object) => {
    if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
        // we will just trust the data to be in correct form
        return [];
    }
    return object.diagnosisCodes;
};
const isSickLeave = (sickLeave) => {
    if (!("startDate" in sickLeave) || !("endDate" in sickLeave)) {
        return false;
    }
    if (!isString(sickLeave.startDate) || !isString(sickLeave.endDate)) {
        return false;
    }
    if (!isDate(sickLeave.startDate) || !isDate(sickLeave.endDate)) {
        return false;
    }
    return true;
};
const parseSickLeave = (sickLeave) => {
    if (!sickLeave || typeof sickLeave !== "object") {
        throw new Error("Sick leave missing or not an object");
    }
    if (!isSickLeave(sickLeave)) {
        throw new Error("Invalid sick leave: " + JSON.stringify(sickLeave));
    }
    return sickLeave;
};
