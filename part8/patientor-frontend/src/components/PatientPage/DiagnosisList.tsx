import { Typography } from "@mui/material";
import { v4 as uuid } from "uuid";

import { Diagnosis, Entry } from "../../types";

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const DiagnosisList = ({ entry, diagnoses }: Props) => {
  return (
    <div>
      {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 ? (
        <ul>
          {entry.diagnosisCodes.map((diagnosisCode) => (
            <li key={uuid()}>
              <Typography variant="body2" style={{ margin: 0 }}>
                {diagnosisCode}{" "}
                {
                  diagnoses.find(
                    (diagnosis) => diagnosis.code === diagnosisCode
                  )?.name
                }
              </Typography>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default DiagnosisList;
