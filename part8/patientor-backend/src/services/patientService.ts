import { v4 as uuid } from "uuid";

import patients from "../../data/patients";
import { NewPatientEntry, PatientWithRedactedSSN } from "../types";

const getEntries = (): PatientWithRedactedSSN[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatientEntry = (entry: NewPatientEntry): PatientWithRedactedSSN => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default { getEntries, addPatientEntry };
