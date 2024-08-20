import { v4 as uuid } from "uuid";

import patients from "../../data/patients";
import { NewPatientEntry, NonSensitivePatient, Patient } from "../types";
import { parseGender } from "../utils";

const getEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender: parseGender(gender),
    occupation,
  }));
};

const getPatientEntry = (patientId: string): Patient | undefined => {
  const foundPatient = patients.find((patient) => patient.id === patientId);

  if (foundPatient) {
    const { id, name, dateOfBirth, ssn, gender, occupation } = foundPatient;
    return {
      id,
      name,
      dateOfBirth,
      ssn,
      gender: parseGender(gender),
      occupation,
      entries: [],
    };
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

export default { getEntries, addPatientEntry, getPatientEntry };
