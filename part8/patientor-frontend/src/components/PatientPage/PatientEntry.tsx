import { Typography } from "@mui/material";
import { v4 as uuid } from "uuid";

import { Entry } from "../../types";

interface Props {
  entry: Entry;
}

const PatientEntry = ({ entry }: Props) => {
  return (
    <div>
      <Typography variant="body2">
        {entry.date} <i>{entry.description}</i>
      </Typography>
      {entry.diagnosisCodes ? (
        <ul>
          {entry.diagnosisCodes.map((diagnosisCode) => (
            <li>
              <Typography key={uuid()} variant="body2" style={{ margin: 0 }}>
                {diagnosisCode}
              </Typography>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default PatientEntry;
