import React, { useState } from "react";
import axios from "axios";

import { NewDiaryEntry, Weather, Visibility } from "../types";
import ErrorMessage from "./ErrorMessage";

const DiaryForm = ({
  addDiary,
}: {
  addDiary: (object: NewDiaryEntry) => Promise<void>;
}) => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const clearFormFields = () => {
    setDate("");
    setVisibility("");
    setWeather("");
    setComment("");
  };

  const handleDiaryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      await addDiary({
        date,
        weather: weather as Weather,
        visibility: visibility as Visibility,
        comment,
      });
      clearFormFields();
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.split(". ")[1]);
        setTimeout(() => setErrorMessage(""), 5000);
      }
    }
  };

  return (
    <div>
      <h3>Add new entry</h3>
      <ErrorMessage message={errorMessage} />
      <form onSubmit={handleDiaryCreation}>
        <div>
          date{" "}
          <input
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div>
          visibility{" "}
          <input
            value={visibility}
            onChange={(event) => setVisibility(event.target.value)}
          />
        </div>
        <div>
          weather{" "}
          <input
            value={weather}
            onChange={(event) => setWeather(event.target.value)}
          />
        </div>
        <div>
          comment{" "}
          <input
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default DiaryForm;
