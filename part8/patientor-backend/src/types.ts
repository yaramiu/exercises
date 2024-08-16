export type Diagnosis = {
  code: string;
  name: string;
  latin?: string;
};

type _Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
};

export type PatientWithRedactedSSN = Omit<_Patient, "ssn">;
