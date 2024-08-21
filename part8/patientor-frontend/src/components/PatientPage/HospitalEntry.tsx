import { Typography } from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

import type { Diagnosis, HospitalEntry } from "../../types";
import DiagnosisList from "./DiagnosisList";

interface Props {
  entry: HospitalEntry;
  diagnoses: Diagnosis[];
}

const HospitalEntry = ({ entry, diagnoses }: Props) => {
  return (
    <div>
      <Typography variant="body2">
        {entry.date} <LocalHospitalIcon />
        <br />
        <i>{entry.description}</i>
      </Typography>
      <DiagnosisList entry={entry} diagnoses={diagnoses} />
      <Typography variant="body2">
        discharge
        <br />
        date: {entry.discharge.date}
        <br />
        criteria: {entry.discharge.criteria}
        <br />
        diagnose by {entry.specialist}
      </Typography>
    </div>
  );
};

export default HospitalEntry;
