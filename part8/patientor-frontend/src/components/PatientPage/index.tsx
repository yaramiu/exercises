import { useState, useEffect } from "react";
import { Typography } from "@mui/material";

import { Patient } from "../../types";
import patientService from "../../services/patients";
import GenderIcon from "./GenderIcon";

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

  const bodyStyling = {
    margin: 0,
  };

  return (
    <div>
      <Typography
        variant="h5"
        style={{ fontWeight: "bold", marginTop: "1rem", marginBottom: "1rem" }}
      >
        {patientInfo.name} <GenderIcon gender={patientInfo.gender} />
      </Typography>
      <Typography style={bodyStyling} variant="body2">
        date of birth: {patientInfo.dateOfBirth}
        <br />
        ssn: {patientInfo.ssn}
        <br />
        occupation: {patient.occupation}
        <br />
      </Typography>
    </div>
  );
};

export default PatientPage;
