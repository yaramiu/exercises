import { NewPatientEntry, Gender, Entry } from "./types";

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const { name, dateOfBirth, ssn, gender, occupation } = object;
    return {
      name: parseName(name),
      dateOfBirth: parseDateOfBirth(dateOfBirth),
      ssn: parseSSN(ssn),
      gender: parseGender(gender),
      occupation: parseOccupation(occupation),
      entries: [],
    };
  }

  throw new Error("Incorrect data: some fields are missing");
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Incorrect name: " + name);
  }
  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error("Incorrect date of birth: " + dateOfBirth);
  }
  return dateOfBirth;
};

const parseSSN = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error("Incorrect ssn: " + ssn);
  }
  return ssn;
};

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender)
    .map((value) => value.toString())
    .includes(gender);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect gender: " + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error("Incorrect occupation: " + occupation);
  }
  return occupation;
};

export const isValidEntries = (entries: Entry[]): entries is Entry[] => {
  const entryTypes = ["Hospital", "OccupationalHealthcare", "HealthCheck"];
  for (const entry of entries) {
    if (!entryTypes.includes(entry.type)) {
      return false;
    }
  }
  return true;
};
