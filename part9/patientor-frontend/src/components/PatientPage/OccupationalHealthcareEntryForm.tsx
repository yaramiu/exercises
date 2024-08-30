import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  createTheme,
  ThemeProvider,
  Alert,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  SelectChangeEvent,
  Input,
} from "@mui/material";
import axios from "axios";

import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnoses";
import { Diagnosis, Patient } from "../../types";

interface Props {
  patientId: string;
  setPatientInfo: React.Dispatch<React.SetStateAction<Patient>>;
  setIsEntryFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor: string) =>
  augmentColor({ color: { main: mainColor } });
const theme = createTheme({
  palette: {
    primary: createColor("#DBDBDC"),
    secondary: createColor("#F50457"),
  },
});

const OccupationalHealthcareEntryForm = ({
  patientId,
  setPatientInfo,
  setIsEntryFormVisible,
}: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<
    Array<Diagnosis["code"]>
  >([]);
  const [employerName, setEmployerName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [allDiagnosisCodes, setAllDiagnosisCodes] = useState<
    Array<Diagnosis["code"]>
  >([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getAllDiagnosisCodes = async () => {
      const diagnoses = await diagnosisService.getAll();
      setAllDiagnosisCodes(diagnoses.map((diagnosis) => diagnosis.code));
    };

    getAllDiagnosisCodes();
  });

  const clearFormFields = () => {
    setDescription("");
    setDate("");
    setSpecialist("");
    setDiagnosisCodes([]);
    setEmployerName("");
    setStartDate("");
    setEndDate("");
  };

  const handleCancel = () => {
    clearFormFields();
    setIsEntryFormVisible(false);
  };

  const handleEntryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const updatedPatient = await patientService.addEntry(patientId, {
        description,
        date,
        specialist,
        diagnosisCodes,
        employerName,
        sickLeave:
          startDate !== "" && endDate !== ""
            ? { startDate, endDate }
            : undefined,
        type: "OccupationalHealthcare",
      });
      setPatientInfo(updatedPatient);
      clearFormFields();
      setIsEntryFormVisible(false);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.split("Error: "));
        setTimeout(() => setErrorMessage(""), 5000);
      }
    }
  };

  const handleDiagnosisCodeUpdate = (
    event: SelectChangeEvent<typeof diagnosisCodes>
  ) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(typeof value === "string" ? value.split(",") : value);
  };

  const formStyling = {
    border: "2px dotted",
    padding: "1rem",
    marginTop: "0.5rem",
  };

  const buttonContainerStyling = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "1rem",
    marginBottom: "0",
  };

  return (
    <>
      {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : null}
      <div style={formStyling}>
        <form onSubmit={handleEntryCreation}>
          <Typography
            variant="body1"
            style={{ fontWeight: "bold", marginBottom: "1rem" }}
          >
            New OccupationalHealthcare entry
          </Typography>
          <div>
            <TextField
              variant="standard"
              id="description"
              label="Description"
              value={description}
              fullWidth
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
          <div>
            <InputLabel>Date</InputLabel>
            <Input
              type="date"
              onChange={(event) => setDate(event.target.value)}
              fullWidth
            />
          </div>
          <div>
            <TextField
              variant="standard"
              id="specialist"
              label="Specialist"
              value={specialist}
              fullWidth
              onChange={(event) => setSpecialist(event.target.value)}
            />
          </div>
          <div>
            <InputLabel id="diagnosis-codes">Diagnosis codes</InputLabel>
            <Select
              labelId="diagnosis-codes"
              id="diagnosis-codes"
              multiple
              value={diagnosisCodes}
              onChange={handleDiagnosisCodeUpdate}
              renderValue={(selected) => selected.join(", ")}
              fullWidth
            >
              {allDiagnosisCodes.map((diagnosisCode) => (
                <MenuItem key={diagnosisCode} value={diagnosisCode}>
                  <Checkbox
                    checked={diagnosisCodes.indexOf(diagnosisCode) > -1}
                  />
                  <ListItemText primary={diagnosisCode} />
                </MenuItem>
              ))}
            </Select>
          </div>
          <div>
            <TextField
              variant="standard"
              id="employer"
              label="Employer"
              value={employerName}
              fullWidth
              onChange={(event) => setEmployerName(event.target.value)}
            />
          </div>
          <InputLabel style={{ marginTop: "2rem", marginBottom: "0.5rem" }}>
            Sick leave
          </InputLabel>
          <div>
            <InputLabel>start</InputLabel>
            <Input
              type="date"
              onChange={(event) => setStartDate(event.target.value)}
              fullWidth
            />
          </div>
          <div>
            <InputLabel>end</InputLabel>
            <Input
              type="date"
              onChange={(event) => setEndDate(event.target.value)}
              fullWidth
            />
          </div>
          <ThemeProvider theme={theme}>
            <div style={buttonContainerStyling}>
              <Button
                variant="contained"
                onClick={handleCancel}
                color="secondary"
              >
                Cancel
              </Button>
              <Button variant="contained" type="submit" color="primary">
                Add
              </Button>
            </div>
          </ThemeProvider>
        </form>
      </div>
    </>
  );
};

export default OccupationalHealthcareEntryForm;