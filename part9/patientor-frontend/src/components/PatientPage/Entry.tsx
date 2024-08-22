import { useState, useEffect } from "react";

import type { Entry } from "../../types";
import { Diagnosis } from "../../types";
import diagnosisService from "../../services/diagnoses";
import HealthCheckEntry from "./HealthCheckEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";
import HospitalEntry from "./HospitalEntry";

interface Props {
  entry: Entry;
}

const Entry = ({ entry }: Props) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const getDiagnoses = async () => {
      const fetchedDiagnoses = await diagnosisService.getAll();
      setDiagnoses(fetchedDiagnoses);
    };

    getDiagnoses();
  }, []);

  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckEntry entry={entry} diagnoses={diagnoses} />;
    case "OccupationalHealthcare":
      return (
        <OccupationalHealthcareEntry entry={entry} diagnoses={diagnoses} />
      );
    case "Hospital":
      return <HospitalEntry entry={entry} diagnoses={diagnoses} />;
  }
};

export default Entry;
