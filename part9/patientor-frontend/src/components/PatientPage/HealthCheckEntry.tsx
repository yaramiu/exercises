import { Typography } from "@mui/material";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";

import type { Diagnosis, HealthCheckEntry } from "../../types";
import HeartIcon from "./HeartIcon";
import DiagnosisList from "./DiagnosisList";

interface Props {
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[];
}

const HealthCheckEntry = ({ entry, diagnoses }: Props) => {
  return (
    <div>
      <Typography variant="body2">
        {entry.date} <MedicalServicesIcon />
        <br />
        <i>{entry.description}</i>
      </Typography>
      <DiagnosisList entry={entry} diagnoses={diagnoses} />
      <HeartIcon healthCheckRating={entry.healthCheckRating} />
      <Typography variant="body2">diagnose by {entry.specialist}</Typography>
    </div>
  );
};

export default HealthCheckEntry;
