import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  createTheme,
  ThemeProvider,
  Alert,
} from "@mui/material";
import axios from "axios";

import patientService from "../../services/patients";
import { Patient } from "../../types";

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

const HealthCheckEntryForm = ({
  patientId,
  setPatientInfo,
  setIsEntryFormVisible,
}: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const clearFormFields = () => {
    setDescription("");
    setDate("");
    setSpecialist("");
    setHealthCheckRating("");
    setDiagnosisCodes([]);
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
        healthCheckRating: Number(healthCheckRating),
        diagnosisCodes,
        type: "HealthCheck",
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
            New HealthCheck entry
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
            <TextField
              variant="standard"
              id="date"
              label="Date"
              value={date}
              fullWidth
              onChange={(event) => setDate(event.target.value)}
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
            <TextField
              variant="standard"
              id="health-check-rating"
              label="Healthcheck rating"
              value={healthCheckRating}
              fullWidth
              onChange={(event) => setHealthCheckRating(event.target.value)}
            />
          </div>
          <div>
            <TextField
              variant="standard"
              id="diagnosis-codes"
              label="Diagnosis codes"
              value={diagnosisCodes}
              fullWidth
              onChange={(event) =>
                setDiagnosisCodes(event.target.value.split(","))
              }
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

export default HealthCheckEntryForm;
