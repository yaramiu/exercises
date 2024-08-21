import { v4 as uuid } from "uuid";

import patients from "../../data/patients";
import {
  NewPatientEntry,
  NonSensitivePatient,
  Patient,
  EntryWithoutId,
} from "../types";
import { isValidEntries } from "../utils";

const getEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatientEntry = (patientId: string): Patient | undefined => {
  const foundPatient = patients.find((patient) => patient.id === patientId);

  if (foundPatient) {
    const { id, name, dateOfBirth, ssn, gender, occupation, entries } =
      foundPatient;

    if (isValidEntries(entries)) {
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

const addPatientEntry = (entry: NewPatientEntry): NonSensitivePatient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

const updatePatientEntry = (
  patientId: string,
  entry: EntryWithoutId
): Patient | undefined => {
  const foundPatient = patients.find((patient) => patient.id === patientId);

  if (foundPatient) {
    foundPatient.entries = foundPatient.entries.concat({
      id: uuid(),
      ...entry,
    });
    return foundPatient;
  }
  return;
};

export default {
  getEntries,
  addPatientEntry,
  getPatientEntry,
  updatePatientEntry,
};
