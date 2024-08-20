import { useState, useEffect } from "react";
import { Typography } from "@mui/material";

import { Patient } from "../../types";
import patientService from "../../services/patients";
import GenderIcon from "./GenderIcon";
import PatientEntry from "./PatientEntry";

interface Props {
  patient: Patient;
}

const PatientPage = ({ patient }: Props) => {
  const [patientInfo, setPatientInfo] = useState<Patient>(patient);

  useEffect(() => {
    const getFullPatientInfo = async () => {
      const fullPatientInfo = await patientService.getById(patient.id);
      setPatientInfo(fullPatientInfo);
    };

    getFullPatientInfo();
  }, [patient]);

  const headerStyling = {
    fontWeight: "bold",
    marginTop: "1rem",
    marginBottom: "1rem",
  };

  const bodyStyling = {
    margin: 0,
  };

  return (
    <div>
      <Typography variant="h5" style={headerStyling}>
        {patientInfo.name} <GenderIcon gender={patientInfo.gender} />
      </Typography>
      <Typography style={bodyStyling} variant="body2">
        ssn: {patientInfo.ssn}
        <br />
        occupation: {patient.occupation}
        <br />
      </Typography>
      <Typography variant="h6" style={headerStyling}>
        entries
      </Typography>
      {patientInfo.entries
        ? patientInfo.entries.map((entry) => (
            <PatientEntry key={entry.id} entry={entry} />
          ))
        : null}
    </div>
  );
};

export default PatientPage;
