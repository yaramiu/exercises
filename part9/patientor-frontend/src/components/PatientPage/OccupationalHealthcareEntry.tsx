import { Typography } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";

import type { OccupationalHealthcareEntry, Diagnosis } from "../../types";
import DiagnosisList from "./DiagnosisList";

interface Props {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}

const OccupationalHealthcareEntry = ({ entry, diagnoses }: Props) => {
  return (
    <div>
      <Typography variant="body2">
        {entry.date} <WorkIcon /> {entry.employerName}
        <br />
        <i>{entry.description}</i>
      </Typography>
      <DiagnosisList entry={entry} diagnoses={diagnoses} />
      {entry.sickLeave ? (
        <Typography variant="body2">
          sick leave
          <br />
          start: {entry.sickLeave.startDate}
          <br />
          end: {entry.sickLeave.endDate}
        </Typography>
      ) : null}
      <Typography variant="body2">diagnose by {entry.specialist}</Typography>
    </div>
  );
};
export default OccupationalHealthcareEntry;
