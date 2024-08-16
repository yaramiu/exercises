import patients from "../../data/patients";
import { PatientWithRedactedSSN } from "../types";

const getEntries = (): PatientWithRedactedSSN[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default { getEntries };
