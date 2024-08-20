import { Typography } from "@mui/material";
import { v4 as uuid } from "uuid";
import { useState, useEffect } from "react";

import { Diagnosis, Entry } from "../../types";
import diagnosisService from "../../services/diagnoses";

interface Props {
  entry: Entry;
}

const PatientEntry = ({ entry }: Props) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const getDiagnoses = async () => {
      const fetchedDiagnoses = await diagnosisService.getAll();
      setDiagnoses(fetchedDiagnoses);
    };

    getDiagnoses();
  }, []);

  return (
    <div>
      <Typography variant="body2">
        {entry.date} <i>{entry.description}</i>
      </Typography>
      {
        <ul>
          {entry.diagnosisCodes?.map((diagnosisCode) => (
            <li>
              <Typography key={uuid()} variant="body2" style={{ margin: 0 }}>
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
      }
    </div>
  );
};

export default PatientEntry;
