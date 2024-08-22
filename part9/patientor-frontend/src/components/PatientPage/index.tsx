import { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";

import { Patient } from "../../types";
import patientService from "../../services/patients";
import GenderIcon from "./GenderIcon";
import Entry from "./Entry";
import HealthCheckEntryForm from "./HealthCheckEntryForm";
import OccupationalHealthcareEntryForm from "./OccupationalHealthcareEntryForm";
import HospitalEntryForm from "./HospitalEntryForm";

interface Props {
  patient: Patient;
}

const PatientPage = ({ patient }: Props) => {
  const [patientInfo, setPatientInfo] = useState<Patient>(patient);
  const [isEntryFormVisible, setIsEntryFormVisible] = useState(false);
  const [entryType, setEntryType] = useState("HealthCheck");

  useEffect(() => {
    const getFullPatientInfo = async () => {
      const fullPatientInfo = await patientService.getById(patient.id);
      setPatientInfo(fullPatientInfo);
    };

    getFullPatientInfo();
  }, [patient]);

  const handleClick = () => {
    setIsEntryFormVisible(true);
  };

  const displayEntryForm = () => {
    switch (entryType) {
      case "HealthCheck":
        return (
          <HealthCheckEntryForm
            patientId={patientInfo.id}
            setPatientInfo={setPatientInfo}
            setIsEntryFormVisible={setIsEntryFormVisible}
          />
        );
      case "OccupationalHealthcare":
        return (
          <OccupationalHealthcareEntryForm
            patientId={patientInfo.id}
            setPatientInfo={setPatientInfo}
            setIsEntryFormVisible={setIsEntryFormVisible}
          />
        );
      case "Hospital":
        return (
          <HospitalEntryForm
            patientId={patientInfo.id}
            setPatientInfo={setPatientInfo}
            setIsEntryFormVisible={setIsEntryFormVisible}
          />
        );
    }
  };

  const headerStyling = {
    fontWeight: "bold",
    marginTop: "1rem",
    marginBottom: "1rem",
  };

  const bodyStyling = {
    margin: 0,
  };

  const entryStyling = {
    marginTop: "0.75rem",
    marginBottom: "0.75rem",
    border: "2px solid",
    borderRadius: "10px",
    paddingLeft: "0.25rem",
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
      {isEntryFormVisible ? displayEntryForm() : null}
      <Typography variant="h6" style={headerStyling}>
        entries
      </Typography>
      {patientInfo.entries
        ? patientInfo.entries.map((entry) => (
            <div key={entry.id} style={entryStyling}>
              <Entry entry={entry} />
            </div>
          ))
        : null}
      {isEntryFormVisible ? null : (
        <>
          <div>
            <InputLabel id="type">entry type</InputLabel>
            <Select
              labelId="type"
              label="type"
              style={{ width: "14rem" }}
              value={entryType}
              onChange={(event) => setEntryType(event.target.value)}
            >
              <MenuItem value={"HealthCheck"}>HealthCheck</MenuItem>
              <MenuItem value={"OccupationalHealthcare"}>
                OccupationalHealthcare
              </MenuItem>
              <MenuItem value={"Hospital"}>Hospital</MenuItem>
            </Select>
          </div>
          <div>
            <Button
              variant="contained"
              sx={{ marginTop: "0.5rem" }}
              onClick={handleClick}
            >
              Add New Entry
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default PatientPage;
