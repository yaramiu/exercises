import {
  NewPatientEntry,
  Gender,
  Entry,
  EntryWithoutId,
  HealthCheckRating,
  Discharge,
  Diagnosis,
  SickLeave,
} from "./types";

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

export const toPatientEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "type" in object
  ) {
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
    } else if (type === "OccupationalHealthcare") {
      if ("employerName" in object) {
        const { employerName } = object;
        return {
          description: parseDescription(description),
          date: parseDate(date),
          specialist: parseSpecialist(specialist),
          diagnosisCodes: parseDiagnosisCodes(object),
          type: "OccupationalHealthcare",
          employerName: parseEmployerName(employerName),
          sickLeave:
            "sickLeave" in object
              ? parseSickLeave(object.sickLeave)
              : undefined,
        };
      }
      throw new Error("Missing employerName");
    } else if (type === "Hospital") {
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

const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error("Incorrect description: " + description);
  }
  return description;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect date: " + date);
  }
  return date;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) {
    throw new Error("Incorrect specialist: " + specialist);
  }
  return specialist;
};

const isNumber = (num: unknown): num is number => {
  return typeof num === "number";
};

const isHealthCheckRating = (
  healthCheckRating: number
): healthCheckRating is HealthCheckRating => {
  return healthCheckRating >= 0 && healthCheckRating <= 3;
};

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (!isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
    throw new Error("Incorrect health check rating: " + healthCheckRating);
  }
  return healthCheckRating;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!isString(employerName)) {
    throw new Error("Incorrect employer name: " + employerName);
  }
  return employerName;
};

const isDischarge = (discharge: object): discharge is Discharge => {
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

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || typeof discharge !== "object") {
    throw new Error("Discharge missing or not an object");
  }

  if (!isDischarge(discharge)) {
    throw new Error("Incorrect discharge: " + JSON.stringify(discharge));
  }

  return discharge;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

const isSickLeave = (sickLeave: object): sickLeave is SickLeave => {
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

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!sickLeave || typeof sickLeave !== "object") {
    throw new Error("Sick leave missing or not an object");
  }

  if (!isSickLeave(sickLeave)) {
    throw new Error("Invalid sick leave: " + JSON.stringify(sickLeave));
  }

  return sickLeave;
};
